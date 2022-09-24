import {RequestBody, RequestMethod, StringOrRef, VHttpEvent, VHttpReqOptions} from "../models/v-http-models";
import {Observable} from "rxjs";


/**
 * Triggers an HTTP request that is executed when the observable is subscribed to
 * @param {RequestMethod} method
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: {observe?: 'response'} | undefined): Observable<VHttpEvent<T>>
export function request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
export function request(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>


/**
 * Triggers a GET method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function get<T>(url: StringOrRef, options?: VHttpReqOptions & {observe?: 'response'}): Observable<VHttpEvent<T>>
export function get<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function get(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


/**
 * Triggers a POST method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {RequestBody} body
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function post<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions & {observe?: 'response'}): Observable<VHttpEvent<T>>
export function post<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T>
export function post(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<any>


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


/**
 * Triggers an OPTIONS method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 * @return {Observable<T>}
 */
export function options<T>(url: StringOrRef, options?: VHttpReqOptions & {observe: 'response'}): Observable<VHttpEvent<T>>
export function options<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function options(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


/**
 * Triggers a DELETE method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param {VHttpReqOptions} options
 */
export function del<T>(url: StringOrRef, options?: VHttpReqOptions & {observe: 'response'}): Observable<VHttpEvent<T>>
export function del<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function del(url: StringOrRef, options?: VHttpReqOptions): Observable<any>


/**
 * Triggers a HEAD method call that is executed when the observable is subscribed to
 * @param {StringOrRef} url
 * @param options
 * @return {Observable<T>}
 */
export function head<T>(url: StringOrRef, options?: VHttpReqOptions & {observe?: 'response'}): Observable<VHttpEvent<T>>
export function head<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function head(url: StringOrRef, options?: VHttpReqOptions): Observable<any>
