describe('xhrHandler should', () => {
  beforeEach(() => {
    jest.resetModules();
  })
  test('init handler without interceptors', async () => {
    const module: any = await import('../../src/lib/core/xhr-handler');

    module.initHandler(undefined);
    expect(module.default.instance).toBeDefined();
    expect(module.default.instance?.next).toBeUndefined();
    expect(module.default.instance.handle).toBeDefined();
  });

  test('init handler with interceptors', async () => {
    const module: any = await import('../../src/lib/core/xhr-handler');
    const interceptors = [
      function interceptor1(req: any, next: any) { return next.handle(req) },
      function interceptor2(req: any, next: any) { return next.handle(req) }
    ];

    module.initHandler(interceptors);
    expect(module.default.instance.next).toBeDefined();
    expect(module.default.instance.next.handle).toBeDefined();
    expect(module.default.instance.next.next).toBeDefined();
    expect(module.default.instance.next.next.handle).toBeDefined();
  });
});

export default {}