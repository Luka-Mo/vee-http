import parseResponseHeaders from '../../src/lib/utils/parse-response-headers';

describe('parseResponseHeaders', () => {
  test('should parse headers', () => {
    expect(parseResponseHeaders('content-length: 170\n' +
      'content-type: application/javascript; charset=UTF-8\n' +
      'date: Mon, 26 Sep 2022 17:37:44 GMT\n' +
      'last-modified: Mon, 12 Sep 2022 09:36:30 GMT\n' +
      'vary: Accept-Encoding'))
      .toEqual({
        'content-length': '170',
        'content-type': 'application/javascript; charset=UTF-8',
        'date': 'Mon, 26 Sep 2022 17:37:44 GMT',
        'last-modified': 'Mon, 12 Sep 2022 09:36:30 GMT',
        'vary': 'Accept-Encoding'
      });
  });

  test('should handle empty string', () => {
    expect(parseResponseHeaders('')).toEqual({});
  });
})
