import Chance from 'chance';
import { TestingModule } from '@nestjs/testing';
import { User } from '@domain/entities/user.entity';
import { UserModule } from '@infrastructure/api/user/user.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { createMockApp } from '@mocks/infrastructure/api/main.mock';
import { DatabaseService } from '@infrastructure/database/database.service';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { BcryptHandler } from '@infrastructure/api/services/bcrypt/bcrypt.service';
import { UserPrismaRepository } from '@infrastructure/database/repositories/user.prisma.repository';

const chance = new Chance();

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication;
  let moduleFixture: TestingModule;
  let bcryptService: ICryptoService;
  let userRepository: IUserRepository;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    ({ moduleFixture, app } = await createMockApp({ imports: [UserModule] }));

    bcryptService = moduleFixture.get<ICryptoService>(BcryptHandler);
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
        const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');

        const response = await app.inject({
          method: 'POST',
          url: '/user/login',
          payload,
        });

        expect(findByEmailSpy).not.toHaveBeenCalled();
        expect(response.statusCode).toBe(400);
      });
    });
    describe('when user do not exists', () => {
      it('should return 401 if user does not exist', async () => {
        const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');

        const response = await app.inject({
          method: 'POST',
          url: '/user/login',
          payload: { userEmail: chance.email(), userPassword: chance.string({ length: 8 }) },
        });

        expect(findByEmailSpy).toHaveBeenCalled();
        expect(response.statusCode).toBe(401);
      });
    });
    describe('when user exists', () => {
      it('should return 401 if user exists and password is incorrect', async () => {
        const userEmail = chance.email();
        const userPassword = chance.string({ length: 8 });
        const user = new User({ userFirstname: chance.first(), userLastname: chance.last(), userEmail, userPassword });

        const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');

        await userRepository.register(user);

        const response = await app.inject({
          method: 'POST',
          url: '/user/login',
          payload: { userEmail, userPassword: chance.string({ length: 8 }) },
        });

        expect(findByEmailSpy).toHaveBeenCalled();
        expect(response.statusCode).toBe(401);
      });
    });

    it('should return 200 if user exists and password is correct', async () => {
      const userEmail = chance.email();
      const userPassword = chance.string({ length: 8 });
      const user = new User({
        userEmail,
        userLastname: chance.last(),
        userFirstname: chance.first(),
        userPassword: await bcryptService.hashPassword(userPassword),
      });

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
        const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');

        const response = await app.inject({
          method: 'POST',
          url: '/user/register',
          payload,
        });

        expect(findByEmailSpy).not.toHaveBeenCalled();
        expect(response.statusCode).toBe(400);
      });
    });
    describe('when user already exists', () => {
      it('should return 409 if user already exists', async () => {
        const userEmail = chance.email();
        const user = new User({
          userFirstname: chance.first(),
          userLastname: chance.last(),
          userEmail,
          userPassword: chance.string({ length: 8 }),
        });

        const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');

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

        expect(findByEmailSpy).toHaveBeenCalled();
        expect(response.statusCode).toBe(409);
      });
    });
    it('should return 201 if user is registered', async () => {
      const userFirstname = chance.first();
      const userLastname = chance.last();
      const userEmail = chance.email();
      const userPassword = chance.string({ length: 8 });

      const response = await app.inject({
        method: 'POST',
        url: '/user/register',
        payload: { userFirstname, userLastname, userEmail, userPassword },
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
