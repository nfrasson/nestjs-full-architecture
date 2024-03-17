import Chance from 'chance';
import { TestingModule } from '@nestjs/testing';
import { UserModule } from '@infrastructure/api/user/user.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { mockUser } from '@mocks/domain/entities/user.entity.mock';
import { createMockApp } from '@mocks/infrastructure/api/main.mock';
import { DatabaseService } from '@infrastructure/database/database.service';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { UserPrismaRepository } from '@infrastructure/database/repositories/user.prisma.repository';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { BcryptService } from '@application/services/bcrypt.service';

const chance = new Chance();

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication;
  let moduleFixture: TestingModule;
  let cryptoService: ICryptoService;
  let userRepository: IUserRepository;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    ({ moduleFixture, app } = await createMockApp({ imports: [UserModule] }));

    cryptoService = moduleFixture.get<ICryptoService>(BcryptService);
    databaseService = moduleFixture.get<DatabaseService>(DatabaseService);
    userRepository = moduleFixture.get<IUserRepository>(UserPrismaRepository);
  });

  describe('/user/login (POST)', () => {
    describe('when payload is incorrect', () => {
      const invalidPayloads = [
        {},
        { userEmail: chance.email() },
        { userPassword: chance.string({ length: 8 }) },
        { userEmail: chance.email(), userPassword: chance.string({ length: 5 }) },
        { userEmail: chance.string(), userPassword: chance.string({ length: 8 }) },
      ];
      test.each(invalidPayloads)('should return 400 if payload is invalid: %p', async payload => {
        const response = await app.inject({
          method: 'POST',
          url: '/user/login',
          payload,
        });

        expect(response.statusCode).toBe(400);
      });
    });
    it('should return 401 if user does not exist', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/user/login',
        payload: { userEmail: chance.email(), userPassword: chance.string({ length: 8 }) },
      });

      expect(response.statusCode).toBe(401);
    });
    it('should return 401 if user exists and password is incorrect', async () => {
      const userEmail = chance.email();
      const userPassword = chance.string({ length: 8 });
      const user = mockUser({ userEmail, userPassword: await cryptoService.hashPassword(userPassword) });

      await userRepository.register(user);

      const response = await app.inject({
        method: 'POST',
        url: '/user/login',
        payload: { userEmail, userPassword: chance.string({ length: 8 }) },
      });

      expect(response.statusCode).toBe(401);
    });

    it('should return 200 if user exists and password is correct', async () => {
      const userEmail = chance.email();
      const userPassword = chance.string({ length: 8 });
      const user = mockUser({ userEmail, userPassword: await cryptoService.hashPassword(userPassword) });

      await userRepository.register(user);

      const response = await app.inject({
        method: 'POST',
        url: '/user/login',
        payload: { userEmail, userPassword },
      });

      expect(response.statusCode).toBe(200);

      const responseBody = response.json();
      expect(Object.keys(responseBody)).toEqual(['token']);

      expect(typeof responseBody.token).toBe('string');
      expect(responseBody.token).toBeTruthy();
    });
  });

  describe('/user/register (POST)', () => {
    describe('when payload is incorrect', () => {
      const invalidPayloads = [
        {},
        { userFirstname: chance.first(), userLastname: chance.last() },
        { userLastname: chance.last(), userEmail: chance.email() },
        { userFirstname: chance.first(), userEmail: chance.email() },
        { userFirstname: chance.first(), userLastname: chance.last(), userPassword: chance.string({ length: 8 }) },
        {
          userFirstname: chance.first(),
          userLastname: chance.last(),
          userPassword: chance.string({ length: 5 }),
          userEmail: chance.email(),
        },
        {
          userFirstname: chance.first(),
          userLastname: chance.last(),
          userPassword: chance.string({ length: 8 }),
          userEmail: chance.string(),
        },
      ];
      test.each(invalidPayloads)('should return 400 if payload is invalid: %p', async payload => {
        const response = await app.inject({
          method: 'POST',
          url: '/user/register',
          payload,
        });

        expect(response.statusCode).toBe(400);
      });
    });
    describe('when user already exists', () => {
      it('should return 409 if user already exists', async () => {
        const userEmail = chance.email();
        const user = mockUser({ userEmail });

        await userRepository.register(user);

        const response = await app.inject({
          method: 'POST',
          url: '/user/register',
          payload: {
            userEmail,
            userFirstname: chance.first(),
            userLastname: chance.last(),
            userPassword: chance.string({ length: 8 }),
          },
        });

        expect(response.statusCode).toBe(409);
      });
    });
    it('should return 201 if user is registered', async () => {
      const input = {
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string({ length: 8 }),
      };

      const response = await app.inject({
        method: 'POST',
        url: '/user/register',
        payload: input,
      });

      expect(response.statusCode).toBe(201);

      const responseBody = response.json();
      expect(Object.keys(responseBody)).toEqual(['token']);

      expect(typeof responseBody.token).toBe('string');
      expect(responseBody.token).toBeTruthy();
    });
  });

  afterAll(async () => {
    await app.close();
    await databaseService.cleanDatabase();
  });
});
