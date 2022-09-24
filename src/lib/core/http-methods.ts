import {
  RequestBody,
  RequestMethod,
  StringOrRef,
  VHttpRequest,
  VHttpReqOptions
} from "../models/v-http-models";
import {Observable} from "rxjs";
import xhrHandler from "./xhr-handler";
import {unref} from "vue";
import {sanitizeQueryParams} from "../utils/sanitize-query-params";
import {sanitizeRequestHeaders} from "../utils/sanitize-request-headers";
import {VHttpEvent} from "../../../types";

const buildRequest = (url: StringOrRef,
                             method: RequestMethod,
                             body: RequestBody,
                             options?: VHttpReqOptions): VHttpRequest => {
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
export function request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: {observe?: 'response'} | undefined): Observable<VHttpEvent<T>>
export function request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
export function request(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>
{
  return xhrHandler.instance.handle(buildRequest(url, method, body, options));
}


/**
 * Triggers a GET method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 *
 * @publicApi
 */
export function get<T>(url: StringOrRef, options?: VHttpReqOptions & {observe?: 'response'}): Observable<VHttpEvent<T>>
export function get<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function get(url: StringOrRef, options?: VHttpReqOptions): Observable<any>
{
  return request('GET', url, null, options as VHttpReqOptions);
}


/**
 * Triggers a POST method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 *
 * @publicApi
 */
export function post<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions & {observe?: 'response'}): Observable<VHttpEvent<T>>
export function post<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
export function post(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>
{
  return request('POST', url, body, options as VHttpReqOptions);
}


/**
 * Triggers a PUT method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function put<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions & {observe?: 'response'}): Observable<VHttpEvent<T>>
export function put<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
export function put(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>
{
  return request('PUT', url, body ?? null, options as VHttpReqOptions);
}


/**
 * Triggers a PATCH method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function patch<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions & {observe?: 'response'}): Observable<VHttpEvent<T>>
export function patch<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
export function patch(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>
{
  return request('PATCH', url, body ?? null, options as VHttpReqOptions);
}


/**
 * Triggers an OPTIONS method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function options<T>(url: StringOrRef, options?: VHttpReqOptions & {observe: 'response'}): Observable<VHttpEvent<T>>
export function options<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function options(url: StringOrRef, options?: VHttpReqOptions): Observable<any>
{
  return request('OPTIONS', url, null, options as VHttpReqOptions);
}


/**
 * Triggers a DELETE method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 */
export function del<T>(url: StringOrRef, options?: VHttpReqOptions & {observe: 'response'}): Observable<VHttpEvent<T>>
export function del<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function del(url: StringOrRef, options?: VHttpReqOptions): Observable<any>
 {
  return request('DELETE', url, null, options as VHttpReqOptions);
}


/**
 * Triggers a HEAD method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param options
 * @return {Observable<T>}
 */
export function head<T>(url: StringOrRef, options?: VHttpReqOptions & {observe?: 'response'}): Observable<VHttpEvent<T>>
export function head<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function head(url: StringOrRef, options?: VHttpReqOptions): Observable<any>
{
  return request('HEAD', url, null, options as VHttpReqOptions);
}
