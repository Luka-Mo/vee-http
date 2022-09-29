import resolveResponse from "../../src/lib/utils/resolve-response";

describe('resolveResponse should', () => {
  describe('return correct type', () => {
    test('for text', () => {
      expect(resolveResponse('test', 'text')).toBe('test');
    });

    test('for blob', () => {
      const blob = new Blob(['test']);
      expect(resolveResponse(blob, 'blob')).toBe(blob);
    });

    test('for arraybuffer', () => {
      const arrayBuffer = new ArrayBuffer(50);
      expect(resolveResponse(arrayBuffer, 'arraybuffer')).toBe(arrayBuffer);
    });

    test('for json', () => {
      const testObject = {
        value: 5,
        item: 'test'
      }

      expect(resolveResponse(testObject, 'json')).toBe(testObject);
    });
  });

  describe('handle errors and throw', () => {
    test('when expected object but got string', () => {
      function throwTest() {
        resolveResponse('test', 'json');
      }
      expect(throwTest).toThrow(/response type does not match/);
    });

    test('when expected object but got string', () => {
      function throwTest() {
        resolveResponse('test', 'blob');
      }
      expect(throwTest).toThrow(/response type does not match/);
    });

    test('when expected object but got string', () => {
      function throwTest() {
        resolveResponse('test', 'arraybuffer');
      }
      expect(throwTest).toThrow(/response type does not match/);
    });

    test('when expected null but got string', () => {
      function throwTest() {
        resolveResponse('test', 'randomstring' as any);
      }
      expect(throwTest).toThrow(/response type does not match/);
    });
  });
});
