import {HttpClient} from "../../src/lib/classes/http-client";
import {of, take} from "rxjs";
import {VHttpRequest} from "../../src/lib/models/v-http-models";
import {ref} from "vue";

describe('HttpClient', () => {
  const client = new HttpClient({handle: (req) => of(req)});

  test('should handle a GET request', (done) => {
    client.get('test.url/endpoint', {
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
      .pipe(take(1))
      .subscribe((res) => {
        // override type as we are only interested in what
        // the request passes on to the handler
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint');
        expect(builtRequest.body).toBe(null);
        expect(builtRequest.options?.queryParams).toBeUndefined();
        expect(builtRequest.options?.responseType).toBeUndefined()
        expect(builtRequest.method).toBe('GET');
        expect(builtRequest.headers.get('X-Requested-With')).toBe('XMLHttpRequest');
        done();
      })
  });

  test('should handle a request with Ref as url', (done) => {
    client.get(ref('ref.test.url/endpoint'), {
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('ref.test.url/endpoint');
        expect(typeof builtRequest.url).toBe('string');
        expect(builtRequest.method).toBe('GET');
        expect(builtRequest.headers.get('X-Requested-With')).toBe('XMLHttpRequest');
        done();
      });
  });

  test('should handle a GET request with query params', (done) => {
    client.get('test.url/endpoint', {
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      queryParams: {'search': 'tes', '_count': '10'}
    })
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint?search=tes&_count=10');
        expect(builtRequest.body).toBe(null);
        expect(builtRequest.options?.responseType).toBe(undefined);
        expect(builtRequest.method).toBe('GET');
        expect(builtRequest.headers.get('X-Requested-With')).toBe('XMLHttpRequest');
        done();
      })
  });

  test('should handle a GET request with URLSearchParams', (done) => {
    client.get('test.url/endpoint', {
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      body: new URLSearchParams([['search','tes'], ['_count','10']])
    })
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint');
        expect(builtRequest.body instanceof URLSearchParams).toBe(true);
        expect(builtRequest.options?.responseType).toBeUndefined();
        expect(builtRequest.method).toBe('GET');
        expect(builtRequest.headers.get('X-Requested-With')).toBe('XMLHttpRequest');
        done();
      });
  });

  test('should handle a POST request with Blob as body', (done) => {
    client.post('test.url/endpoint', new Blob(['test']), {
      headers: {'Content-Type': 'image/png'}
    })
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint');
        expect(builtRequest.body instanceof Blob).toBe(true);
        expect(builtRequest.method).toBe('POST');
        expect(builtRequest.headers.get('Content-Type')).toBe('image/png');
        done();
      });
  });

  test('should handle a PUT', (done) => {
    client.put('test.url/endpoint', new Blob(['test']), {
      headers: {'Content-Type': 'image/png'}
    })
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint');
        expect(builtRequest.method).toBe('PUT');
        done();
      });
  });

  test('should handle a PATCH', (done) => {
    client.patch('test.url/endpoint', new Blob(['test']), {
      headers: {'Content-Type': 'image/png'}
    })
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint');
        expect(builtRequest.method).toBe('PATCH');
        done();
      });
  });

  test('should handle a OPTIONS', (done) => {
    client.options('test.url/endpoint')
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint');
        expect(builtRequest.method).toBe('OPTIONS');
        done();
      });
  });

  test('should handle a HEAD', (done) => {
    client.head('test.url/endpoint')
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint');
        expect(builtRequest.method).toBe('HEAD');
        done();
      });
  });

  test('should handle a DELETE', (done) => {
    client.delete('test.url/endpoint')
      .pipe(take(1))
      .subscribe((res) => {
        const builtRequest = res as unknown as VHttpRequest;
        expect(builtRequest.url).toBe('test.url/endpoint');
        expect(builtRequest.method).toBe('DELETE');
        done();
      });
  });
});