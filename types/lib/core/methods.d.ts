import {RequestBody, RequestMethod, StringOrRef, VHttpReqOptions} from "../models/v-http-models";
import {Observable} from "rxjs";

/**
 *
 * @param {RequestMethod} method
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers a GET method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function get<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>

/**
 * Triggers a GET method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {URLSearchParams} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function get<T>(url: StringOrRef, body: URLSearchParams, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers a POST method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function post<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers a PUT method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function put<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers a PATCH method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function patch<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers an OPTIONS method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function options<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers an OPTIONS method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {URLSearchParams} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function options<T>(url: StringOrRef, body: URLSearchParams, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers a DELETE method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 */
export function del<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers a DELETE method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {URLSearchParams} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function del<T>(url: StringOrRef, body: URLSearchParams, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers a HEAD method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param options
 * @return {Observable<T>}
 */
export function head<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;

/**
 * Triggers a HEAD method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {URLSearchParams} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function head<T>(url: StringOrRef, body: URLSearchParams, options?: VHttpReqOptions): Observable<T>;