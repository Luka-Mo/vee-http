import {
  RequestBody,
  RequestMethod,
  StringOrRef,
  VHttpEvent,
  VHttpReqOptions,
} from "../models/v-http-models";
import type {Observable} from "rxjs";
import {RequestResponseType} from "../../../src/lib/models/v-http-models";

/**
 * Client that executes the HTTP request with the provided interceptor chain
 */
export class HttpClient {
  /**
   *
   * @param {RequestMethod} method
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   *
   * @publicApi
   */
  request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>
  /**
   *
   * @param {RequestMethod} method
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   *
   * @publicApi
   */
  request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
  /**
   *
   * @param {RequestMethod} method
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   *
   * @publicApi
   */
  request(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a GET method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   *
   * @publicApi
   */
  get<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a GET method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   *
   * @publicApi
   */
  get<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a GET method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   *
   * @publicApi
   */
  get(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a POST method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   *
   * @publicApi
   */
  post<T>(url: StringOrRef, body: RequestBody, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a POST method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   *
   * @publicApi
   */
  post<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a POST method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   *
   * @publicApi
   */
  post(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a PUT method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   */
  put<T>(url: StringOrRef, body: RequestBody, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a PUT method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  put<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a PUT method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   */
  put(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>

  /**
   * Triggers a PATCH method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   *
   * @publicApi
   */
  patch<T>(url: StringOrRef, body: RequestBody, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a PATCH method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   *
   * @publicApi
   */
  patch<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a PATCH method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   *
   * @publicApi
   */
  patch(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>

  /**
   * Triggers an OPTIONS method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   *
   * @publicApi
   */
  options<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers an OPTIONS method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   *
   * @publicApi
   */
  options<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers an OPTIONS method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   *
   * @publicApi
   */
  options(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a DELETE method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   *
   * @publicApi
   */
  delete<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a DELETE method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   *
   * @publicApi
   */
  delete<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a DELETE method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   *
   * @publicApi
   */
  delete(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a HEAD method call that is executed when the observable is subscribed to.
   *
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>}
   *
   * @publicApi
   */
  head<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
    skipDefaultHeaders?: boolean;
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a HEAD method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>}
   *
   * @publicApi
   */
  head<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a HEAD method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<any>}
   *
   * @publicApi
   */
  head(url: StringOrRef, options?: VHttpReqOptions): Observable<any>
}