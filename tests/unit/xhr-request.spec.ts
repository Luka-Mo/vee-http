import xhrRequest from "../../src/lib/core/xhr-request";
import {XhrBlobMock, XhrMock} from "../mocks/xhr.mock";
import {VHttpRequest} from "../../types";
import {catchError, EMPTY, finalize} from "rxjs";

describe('XhrRequest', () => {
  const baseRequest: VHttpRequest = {
    url: 'testUrl/api',
    headers: new Headers(),
    body: null,
    method: 'GET'
  }

  test('should trigger a simple request', (done) => {
    window.XMLHttpRequest = XhrMock;

    xhrRequest(baseRequest)
      .subscribe(c => {
        console.log(c);
        expect(c).toEqual({mockValue: 'mock data'});
        done();
      });
  });

  test('should throw an error if receiving a wrong body type', (done) => {
    window.XMLHttpRequest = XhrMock;

    xhrRequest({
      ...baseRequest,
      options: {
        responseType: 'text'
      }
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
      .subscribe(data => {
        expect(data instanceof Blob).toBe(true);
        expect(data.type).toBe('application/text');
        done();
      });
  });
});