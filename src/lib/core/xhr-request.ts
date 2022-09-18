import {
  delay,
  finalize,
  fromEvent,
  map,
  merge,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError
} from "rxjs";
import {RequestResponseType, VHttpEvent, VHttpReq, VHttpResponse, XhrEvent} from "../models/v-http-models";
import parseResponseHeaders from "../utils/parse-response-headers";
import {HttpErrorResponse} from "../classes/http-error-response";
import resolveResponse from "../utils/resolve-response";

function progressListener(xhr: XMLHttpRequest): Observable<VHttpEvent<any>> {
  const dispose$ = new Subject<unknown>();
  return merge(
    fromEvent(xhr, XhrEvent.LOADSTART),
    fromEvent(xhr, XhrEvent.PROGRESS),
    fromEvent(xhr, XhrEvent.LOADEND),
    fromEvent(xhr, XhrEvent.LOAD),
    errorListener(xhr)
    )
    .pipe(
      map((ev: any): VHttpEvent<any> => ({
        progress: {
          loaded: ev.loaded,
          total: ev.total
        },
        body: null,
        headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
        status: xhr.status
      })),
      takeUntil(dispose$.pipe(delay(1))),
      tap(_ => {
        if (xhr.readyState === xhr.DONE) dispose$.next(null);
      }),
      finalize(() => dispose$.complete())
    );
}

function loadListener(xhr: XMLHttpRequest): Observable<VHttpResponse<any>> {
  return merge(
    fromEvent(xhr, XhrEvent.LOAD),
    errorListener(xhr)
  )
    .pipe(
      map(_ => {
          if (xhr.status && xhr.status > 399) {
            const errorMessage = `${xhr.status}: ${xhr.statusText}`;
            console.error(errorMessage);
          }
          return {
            status: xhr.status,
            body: xhr.response,
            headers: parseResponseHeaders(xhr.getAllResponseHeaders())
          }
      })
    )
}

function errorListener(xhr: XMLHttpRequest): Observable<VHttpResponse<any>> {
  return fromEvent(xhr, XhrEvent.ERROR).pipe(
    switchMap(() => throwError(() => {
      const errorText = `${xhr.status}: ${xhr.statusText}`;
      console.error(errorText);
      new HttpErrorResponse(xhr.status, errorText)
    }))
  );
}

export default function <T>(req: VHttpReq): Observable<T | any> {
  const xhr = new XMLHttpRequest();

  let requestCall$;
  if (req.options?.observe !== 'response') {
    requestCall$ = loadListener(xhr).pipe(
      map(res => resolveResponse(res.body, xhr.responseType as RequestResponseType ?? 'json')),
      take(1)
    );
  } else {
    requestCall$ = progressListener(xhr);
  }

  xhr.responseType = req.options?.responseType as any ?? 'json';
  xhr.open(req.method, req.url);
  if (!req.options?.skipDefaultHeaders) {
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }
  if (req.headers) {
    req.headers.forEach((value, key) => {
      xhr.setRequestHeader(key, value);
    })
  }

  if (!req.body) {
    xhr.send();
  } else {
    let body;
    try {
      body = JSON.stringify(req.body);
    } catch (_) {
      body = req.body;
    }
    xhr.send(body as any);
  }

  return requestCall$;
}