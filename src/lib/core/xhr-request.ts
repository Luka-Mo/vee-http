import {
  fromEvent,
  map,
  merge,
  Observable,
  take,
  takeWhile
} from 'rxjs';
import {VHttpEvent, VHttpRequest, VHttpResponse, XhrEvent} from '../models/v-http-models';
import parseResponseHeaders from '../utils/parse-response-headers';
import {HttpErrorResponse} from '../classes/http-error-response';
import resolveResponse from '../utils/resolve-response';
import {serializePayload} from '../utils/serialize-payload';

function progressListener(xhr: XMLHttpRequest): Observable<VHttpEvent<unknown>> {
  return merge(
    fromEvent(xhr, XhrEvent.LOADSTART),
    fromEvent(xhr, XhrEvent.PROGRESS),
    fromEvent(xhr, XhrEvent.LOADEND),
    fromEvent(xhr, XhrEvent.LOAD),
    fromEvent(xhr, XhrEvent.ABORT),
    errorListener(xhr)
  )
    .pipe(
      map((ev: unknown) => {
        const progressEvent = ev as ProgressEvent;
        return {
          progress: {
            loaded: progressEvent.loaded,
            total: progressEvent.total
          },
          type: progressEvent.type,
          body: (progressEvent.target as XMLHttpRequest).response,
          headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
          status: xhr.status
        } as VHttpEvent<unknown>;
      }),
      takeWhile(ev => ev.type !== XhrEvent.LOADEND)
    );
}

function loadListener(xhr: XMLHttpRequest): Observable<VHttpResponse<unknown>> {
  return merge(
    fromEvent(xhr, XhrEvent.LOAD),
    errorListener(xhr)
  )
    .pipe(
      map(_ => {
        if (xhr.status && xhr.status > 399) {
          const errorText = xhr.status === 0 ? `Server unreachable response status (${xhr.status}): possible CORS error.` : `${xhr.status}: ${xhr.statusText}`;
          throw new HttpErrorResponse(xhr.status, errorText);
        } else {
          return {
            status: xhr.status,
            body: xhr.response,
            headers: parseResponseHeaders(xhr.getAllResponseHeaders())
          };
        }
      }),
    );
}

function errorListener(xhr: XMLHttpRequest): Observable<unknown> {
  return fromEvent(xhr, XhrEvent.ERROR).pipe(
    map(() => {
      const errorText = xhr.status === 0 ? `Server unreachable response status (${xhr.status}): possible CORS error.` : `${xhr.status}: ${xhr.statusText}`;
      throw new HttpErrorResponse(xhr.status, errorText);
    })
  );
}

function addHeaders(req: VHttpRequest, xhr: XMLHttpRequest): void {
  if (req.headers) {
    req.headers.forEach((value, key) => {
      xhr.setRequestHeader(key, value);
    });
  }

  const hasBody = !!req.body || !!req.options?.body;
  if (!req.headers.has('Content-Type') && hasBody) {
    let contentType = null;
    if (req.options?.body && typeof URLSearchParams !== 'undefined') {
      contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
    } else if (typeof req.body === 'string') {
      contentType = 'text/plain';
    } else if (req.body && (req.body as unknown) instanceof Blob) {
      contentType = (req.body as Blob).type || null;
    } else if (typeof req.body === 'object') {
      contentType = 'application/json';
    }

    if (contentType) {
      xhr.setRequestHeader('Content-Type', contentType);
    }
  }

  if (!req.headers.has('Accept')) {
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
  }
}

function xhrRequest(req: VHttpRequest & { options: { observe: 'response' } }): Observable<VHttpEvent<unknown>>;
function xhrRequest<T>(req: VHttpRequest & { options: { observe: 'response' } }): Observable<VHttpEvent<T>>;
function xhrRequest(req: VHttpRequest & { options: { responseType: 'arrayBuffer' } }): Observable<ArrayBuffer>;
function xhrRequest(req: VHttpRequest & { options: { responseType: 'blob' } }): Observable<Blob>;
function xhrRequest(req: VHttpRequest & { options: { responseType: 'formData' } }): Observable<FormData>;
function xhrRequest(req: VHttpRequest & { options: { responseType: 'text' } }): Observable<string>;
function xhrRequest(req: VHttpRequest & { options: { responseType: 'json' } }): Observable<object>;
function xhrRequest<T>(req: VHttpRequest & { options: { responseType: 'json' } }): Observable<T>;
function xhrRequest<T>(req: VHttpRequest): Observable<T>;
function xhrRequest(req: VHttpRequest): Observable<unknown>
{
  const xhr = new XMLHttpRequest();

  let requestCall$;
  if (req.options?.observe !== 'response') {
    requestCall$ = loadListener(xhr).pipe(
      map(res => resolveResponse(res.body, xhr.responseType)),
      take(1)
    );
  } else {
    requestCall$ = progressListener(xhr);
  }

  xhr.responseType = req.options?.responseType as XMLHttpRequestResponseType ?? 'json';
  xhr.open(req.method, req.url);

  addHeaders(req, xhr);

  const serializedPayload = serializePayload(req.body);
  if (serializedPayload) {
    xhr.send(serializedPayload);
  } else {
    xhr.send();
  }

  return requestCall$;
}

export default xhrRequest;