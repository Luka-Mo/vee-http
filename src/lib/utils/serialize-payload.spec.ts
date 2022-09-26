import {serializePayload} from "./serialize-payload";

describe('serializePayload should', () => {
  test('not serialize ArrayBuffer payload', () => {
    const arrayBuffer = new ArrayBuffer(50);
    const serializedBuffer = serializePayload(arrayBuffer);
    expect(arrayBuffer instanceof ArrayBuffer).toBe(true);
    expect(serializedBuffer).toBe(arrayBuffer);
  });

  test('not serialize Blob payload', () => {
    const blob = new Blob(['50']);
    const serializedBlob = serializePayload(blob);
    expect(blob instanceof Blob).toBe(true);
    expect(serializedBlob).toBe(blob);
  });

  test('FormData', () => {
    const formData = new FormData();
    const serializedFormData = serializePayload(formData);
    expect(formData instanceof FormData).toBe(true);
    expect(serializedFormData).toBe(formData);
  });

  test('URLSearchParams', () => {
    const urlSearchParams = new URLSearchParams();
    const serializedSearchParams = serializePayload(urlSearchParams);
    expect(urlSearchParams instanceof URLSearchParams).toBe(true);
    expect(serializedSearchParams).toBe(urlSearchParams);
  });

  test('handle undefined and null', () => {
    expect(serializePayload(null)).toBeNull();
    expect(serializePayload(undefined)).toBeNull();
  });

  test('handle objects', () => {
    expect(serializePayload({})).toBe('{}');
    expect(serializePayload({value: '123'})).toBe('{\"value\":\"123\"}');
  });

  test('handle arrays', () => {
    expect(serializePayload([])).toBe('[]');
    expect(serializePayload([1, 2, 3])).toBe('[1,2,3]');
    expect(serializePayload(['a', 'b', 'c'])).toBe('[\"a\",\"b\",\"c\"]');
    expect(serializePayload([{value: 'test'}])).toBe('[{\"value\":\"test\"}]');
  });

  test('handle numbers', () => {
    expect(serializePayload(123)).toBe('123');
    expect(serializePayload(3.14)).toBe('3.14');
  });

  test('handle falsy values', () => {
    expect(serializePayload(0)).toBe('0');
    expect(serializePayload(false)).toBe('false');
    expect(serializePayload('')).toBe('');
  });

});