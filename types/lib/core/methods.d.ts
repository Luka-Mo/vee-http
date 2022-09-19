import {ReqBody, StringOrRef, VHttpReqOptions} from "../models/v-http-models";
import {Observable} from "rxjs";

export function get<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;
export function post<T>(url: StringOrRef, body: ReqBody, options?: VHttpReqOptions): Observable<T>;
export function put<T>(url: StringOrRef, body: ReqBody, options?: VHttpReqOptions): Observable<T>;
export function patch<T>(url: StringOrRef, body: ReqBody, options?: VHttpReqOptions): Observable<T>;
export function options<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;
export function del<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;
export function head<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>;

