import {
  RequestBody,
  RequestMethod,
  RequestResponseType,
  StringOrRef,
  VHttpEvent,
  VHttpReqOptions,
} from "../models/v-http-models";
import type {Observable} from "rxjs";

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
   */
  request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
  }): Observable<VHttpEvent<T>>
  /**
   *
   * @param {RequestMethod} method
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
  /**
   *
   * @param {RequestMethod} method
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   */
  request(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a GET method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   */
  get<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a GET method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  get<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a GET method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   */
  get(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a POST method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   */
  post<T>(url: StringOrRef, body: RequestBody, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a POST method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  post<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a POST method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
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
   */
  patch<T>(url: StringOrRef, body: RequestBody, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a PATCH method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  patch<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a PATCH method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {RequestBody} body
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   */
  patch(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>

  /**
   * Triggers an OPTIONS method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   */
  options<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers an OPTIONS method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<T>}
   */
  options<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers an OPTIONS method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   */
  options(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a DELETE method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   */
  delete<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a DELETE method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>>}
   */
  delete<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a DELETE method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<any>}
   */
  delete(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


  /**
   * Triggers a HEAD method call that is executed when the observable is subscribed to.
   *
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>}
   */
  head<T>(url: StringOrRef, options: {
    body?: URLSearchParams;
    headers?: Record<string, StringOrRef>;
    queryParams?: Record<string, StringOrRef>;
    responseType?: RequestResponseType;
    observe?: 'response';
  }): Observable<VHttpEvent<T>>
  /**
   * Triggers a HEAD method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<T>}
   */
  head<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
  /**
   * Triggers a HEAD method call that is executed when the observable is subscribed to
   * @param {StringOrRef} url
   * @param {VHttpReqOptions} options
   * @return {Observable<VHttpEvent<any>}
   */
  head(url: StringOrRef, options?: VHttpReqOptions): Observable<any>
}