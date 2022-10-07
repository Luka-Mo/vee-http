import {XhrHandlerInstance} from '../../src/lib/models/v-http-models';

describe('xhrHandler should', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('init handler without interceptors', async () => {
    // eslint-disable-next-line
    const module: any = await import('../../src/lib/core/xhr-handler');

    module.initHandler(undefined);
    expect(module.default.instance).toBeDefined();
    expect(module.default.instance?.next).toBeUndefined();
    expect(module.default.instance.handle).toBeDefined();
  });

  test('init handler with interceptors', async () => {
    // eslint-disable-next-line
    const module: any = await import('../../src/lib/core/xhr-handler');
    const interceptors = [
      // eslint-disable-next-line
      function interceptor1(req: any, next: any) { return next.handle(req); },
      // eslint-disable-next-line
      function interceptor2(req: any, next: any) { return next.handle(req); }
    ];

    module.initHandler(interceptors);
    expect(module.default.instance.next).toBeDefined();
    expect(module.default.instance.next.handle).toBeDefined();
    expect(module.default.instance.next.next).toBeDefined();
    expect(module.default.instance.next.next.handle).toBeDefined();
  });

  test('throw an error if an interceptor is not a function', async () => {
    // eslint-disable-next-line
    const module: any = await import('../../src/lib/core/xhr-handler');
    const interceptors = [
      'string',
    ];

    const initHandlerCall = (): XhrHandlerInstance => module.initHandler(interceptors);
    expect(initHandlerCall).toThrow(/Incorrect interceptor present in the interceptor chain!/);
  });

  test('throw an error if handler has already been initialized', async () => {
    // eslint-disable-next-line
    const module: any = await import('../../src/lib/core/xhr-handler');

    module.initHandler(undefined);
    expect(module.default.instance).toBeDefined();

    const throwCall = () => module.initHandler(undefined);
    expect(throwCall).toThrow(/Handler already initialized!/);
  });
});

export default {};
