import {sanitizeRequestHeaders} from '../../src/lib/utils/sanitize-request-headers';

describe('sanitizeRequestHeaders', () => {
  test('should sanitize request headers', () => {
    const headers: Record<string, string> = {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    };

    const sanitizedHeaders = sanitizeRequestHeaders(headers);

    expect(sanitizedHeaders.has('Accept')).toBe(true);
    expect(sanitizedHeaders.get('Accept')).toBe('*/*');
    expect(sanitizedHeaders.has('Content-Type')).toBe(true);
    expect(sanitizedHeaders.get('Content-Type')).toBe('application/json');
  });
});