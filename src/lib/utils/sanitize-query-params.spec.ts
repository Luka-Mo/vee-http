import {sanitizeQueryParams} from "./sanitize-query-params";

describe('sanitizeQueryParams', () => {
  test('should sanitize params', () => {
    const params = {
      'search': 'test',
      '_count': '1'
    }

    expect(sanitizeQueryParams(params)).toBe('?search=test&_count=1');
  });

  test('should handle empty params', () => {
    expect(sanitizeQueryParams(undefined)).toBe('');
  });
});