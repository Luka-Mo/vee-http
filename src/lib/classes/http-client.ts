import {
  RequestBody,
  RequestMethod,
  StringOrRef,
  VHttpRequest,
  VHttpReqOptions, XhrHandlerInstance, RequestResponseType, VHttpEvent
} from '../models/v-http-models';
import {Observable} from 'rxjs';
import {unref} from 'vue';
import {sanitizeQueryParams} from '../utils/sanitize-query-params';
import {sanitizeRequestHeaders} from '../utils/sanitize-request-headers';

export class HttpClient {
  /**
   * @ignore
   * @param xhrHandler
   */
  constructor(private xhrHandler: XhrHandlerInstance) {
  }


  /**
   *
   * @param {RequestMethod} method HTTP method used
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>;
  request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>;
  request(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<unknown>
  {
    return this.xhrHandler.handle(this.buildRequest(url, method, body, options));
  }


  /**
   * Triggers a GET method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  get<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>;
  get<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;
  get(url: StringOrRef, options?: VHttpReqOptions): Observable<unknown>
  {
    return this.request('GET', url, null, options as VHttpReqOptions);
  }


  /**
   * Triggers a POST method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   */
  post<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>;
  post<T>(url: StringOrRef, body: RequestBody, options?: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>;
  post(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<unknown>
  {
    return this.request('POST', url, body, options as VHttpReqOptions);
  }


  /**
   * Triggers a PUT method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  put<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>;
  put<T>(url: StringOrRef, body: RequestBody, options?: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>;
  put(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<unknown>
  {
    return this.request('PUT', url, body ?? null, options as VHttpReqOptions);
  }

  /**
   * Triggers a PATCH method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  patch<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>;
  patch<T>(url: StringOrRef, body: RequestBody, options?: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>;
  patch(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<unknown>
  {
    return this.request('PATCH', url, body ?? null, options as VHttpReqOptions);
  }

  /**
   * Triggers an OPTIONS method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  options<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;
  options<T>(url: StringOrRef, options?: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>;
  options(url: StringOrRef, options?: VHttpReqOptions): Observable<unknown>
  {
    return this.request('OPTIONS', url, null, options as VHttpReqOptions);
  }


  /**
   * Triggers a DELETE method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   */
  delete<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;
  delete<T>(url: StringOrRef, options?: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>;
  delete(url: StringOrRef, options?: VHttpReqOptions): Observable<unknown>
  {
    return this.request('DELETE', url, null, options as VHttpReqOptions);
  }


  /**
   * Triggers a HEAD method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param options
   * @return {Observable<T>}
   */
  head<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;
  head<T>(url: StringOrRef, options?: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>;
  head(url: StringOrRef, options?: VHttpReqOptions): Observable<unknown>
  {
    return this.request('HEAD', url, null, options as VHttpReqOptions);
  }

  /**
   * @ignore
   * @private
   */
  private buildRequest(url: StringOrRef, method: RequestMethod, body: RequestBody, options?: VHttpReqOptions): VHttpRequest {
    const sanitizedUrl = unref(url) + sanitizeQueryParams(options?.queryParams);
    const sanitizedHeaders = sanitizeRequestHeaders(options?.headers);
    return {
      url: sanitizedUrl,
      options,
      headers: sanitizedHeaders,
      body,
      method
    };
  }
}