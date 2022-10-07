import xhrRequest from '../../src/lib/core/xhr-request';
import {XhrMock} from '../mocks/xhr.mock';
import {catchError, EMPTY, finalize, scan, tap} from 'rxjs';
import {XhrBlobMock} from '../mocks/xhr-blob.mock';
import {XhrErrorMock} from '../mocks/xhr-error.mock';
import {HttpErrorResponse} from '../../src/lib/classes/http-error-response';
import {XhrEventsMock} from '../mocks/xhr-events.mock';
import {VHttpEvent, VHttpRequest, XhrEvent} from '../../src/lib/models/v-http-models';

describe('XhrRequest', () => {
  const baseRequest: VHttpRequest = {
    url: 'testUrl/api',
    headers: new Map(),
    body: null,
    method: 'GET'
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should trigger a simple request', (done) => {
    window.XMLHttpRequest = XhrMock;
    const headersSpy = jest.spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
    xhrRequest(baseRequest)
      .pipe(finalize(() => done()))
      .subscribe(c => {
        expect(headersSpy).toHaveBeenCalledTimes(1);
        expect(headersSpy).toHaveBeenCalledWith('Accept', 'application/json, text/plain, */*');
        expect(c).toEqual({mockValue: 'mock data'});
      });
  });

  test('should add headers from the request', (done) => {
    window.XMLHttpRequest = XhrMock;
    const headersSpy = jest.spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
    xhrRequest({...baseRequest, headers: new Map([['X-Requested-With', 'XMLHttpRequest']])})
      .pipe(finalize(() => done()))
      .subscribe(c => {
        expect(headersSpy).toHaveBeenCalledTimes(2);
        expect(headersSpy.mock.calls).toEqual([
          ['X-Requested-With', 'XMLHttpRequest'],
          ['Accept', 'application/json, text/plain, */*']
        ]);
        expect(c).toEqual({mockValue: 'mock data'});
      });
  });

  describe('should try to add a Content-Type header if request has body but not headers', () => {
    window.XMLHttpRequest = XhrMock;
    const headersSpy = jest.spyOn(XMLHttpRequest.prototype, 'setRequestHeader');

    test('for JSON', (done) => {
      xhrRequest({
        ...baseRequest,
        method: 'POST',
        body: {testValue: 1}
      })
        .pipe(finalize(() => done()))
        .subscribe(() => {
          expect(headersSpy).toHaveBeenCalledTimes(2);
          expect(headersSpy.mock.calls).toEqual([
            ['Content-Type', 'application/json'],
            ['Accept', 'application/json, text/plain, */*']
          ]);
        });
    });

    test('for Blob with type', (done) => {
      xhrRequest({
        ...baseRequest,
        method: 'POST',
        body: new Blob(['test'], {type: 'image/png'}),
        headers: new Map()
      })
        .pipe(finalize(() => done()))
        .subscribe(() => {
          expect(headersSpy).toHaveBeenCalledTimes(2);
          expect(headersSpy.mock.calls).toEqual([
            ['Content-Type', 'image/png'],
            ['Accept', 'application/json, text/plain, */*']
          ]);
        });
    });

    test('for URLSearchParams with type', (done) => {
      xhrRequest({
        ...baseRequest,
        method: 'GET',
        options: {
          body: new URLSearchParams({'search': 'test'})
        },
        headers: new Map()
      })
        .pipe(finalize(() => done()))
        .subscribe(() => {
          expect(headersSpy).toHaveBeenCalledTimes(2);
          expect(headersSpy.mock.calls).toEqual([
            ['Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8'],
            ['Accept', 'application/json, text/plain, */*']
          ]);
        });
    });

    test('for string with type', (done) => {
      xhrRequest({
        ...baseRequest,
        method: 'POST',
        body: 'body as string',
        headers: new Map()
      })
        .pipe(finalize(() => done()))
        .subscribe(() => {
          expect(headersSpy).toHaveBeenCalledTimes(2);
          expect(headersSpy.mock.calls).toEqual([
            ['Content-Type', 'text/plain'],
            ['Accept', 'application/json, text/plain, */*']
          ]);
        });
    });
  });

  test('should throw an error if receiving a wrong body type', (done) => {
    window.XMLHttpRequest = XhrMock;

    xhrRequest({
      ...baseRequest,
      options: {responseType: 'text'}
    })
      .pipe(
        catchError(e => {
          expect(e.message).toContain('type does not match expected: text, received object');
          return EMPTY;
        }),
        finalize(() => done())
      )
      .subscribe();
  });

  test('should handle an object as a response', (done) => {
    window.XMLHttpRequest = XhrBlobMock;
    xhrRequest({
      ...baseRequest,
      options: {responseType: 'blob'}
    })
      .pipe(finalize(() => done()))
      .subscribe(data => {
        expect(data instanceof Blob).toBe(true);
        expect(data.type).toBe('application/text');
      });
  });

  test('should return an HttpErrorResponse', (done) => {
    window.XMLHttpRequest = XhrErrorMock;
    xhrRequest({
      ...baseRequest,
      options: {responseType: 'blob'}
    })
      .pipe(
        catchError((e: HttpErrorResponse) => {
          expect(e instanceof HttpErrorResponse).toBe(true);
          expect(e.status).toBe(404);
          return EMPTY;
        }),
        finalize(() => done())
      )
      .subscribe();
  });

  test('should track progress events', (done) => {
    window.XMLHttpRequest = XhrEventsMock;
    const events: VHttpEvent<unknown>[] = [];
    xhrRequest({
      ...baseRequest,
      headers: new Map(),
      options: {observe: 'response'}
    })
      .pipe(
        tap((ev: VHttpEvent<unknown>) => events.push(ev)),
        scan((acc) => acc + 1, -1),
        finalize(() => done())
      ).subscribe(i => {
        if (i === 0) {
          expect(events[i].progress!.loaded).toBe(0);
          expect(events[i].type).toBe(XhrEvent.LOADSTART);
        } else if (i === 4) {
          expect(events[i].progress!.loaded).toBe(100);
          expect(events[i].type).toBe(XhrEvent.LOAD);
        } else {
          expect(events[i].progress!.loaded).toBe(i * 20);
          expect(events[i].type).toBe(XhrEvent.PROGRESS);
        }
      });
  });
});