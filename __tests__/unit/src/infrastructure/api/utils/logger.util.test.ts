import { Chance } from 'chance';
import pino, { Logger as PinoLogger } from 'pino';
import { Logger } from '@infrastructure/api/utils/logger.util';

const chance = new Chance();

jest.mock('pino');

describe('Logger', () => {
  let logger: Logger;
  let context: string;
  let mockPinoLogger: jest.Mocked<Partial<PinoLogger>>;

  beforeEach(() => {
    mockPinoLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    (pino as unknown as jest.Mock).mockReturnValue(mockPinoLogger as PinoLogger);

    context = chance.word();
    logger = new Logger(context);
  });

  it('should log message at info level', () => {
    const message = chance.word();

    logger.log(message);
    expect(mockPinoLogger.info).toHaveBeenCalledWith({ context }, message);
  });

  it('should log message at warn level', () => {
    const message = chance.word();

    logger.warn(message);
    expect(mockPinoLogger.warn).toHaveBeenCalledWith({ context }, message);
  });

  it('should log message at error level', () => {
    const message = chance.word();

    logger.error(message);
    expect(mockPinoLogger.error).toHaveBeenCalledWith({ context }, message);
  });
});
