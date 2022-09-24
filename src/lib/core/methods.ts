import {RequestBody, RequestMethod, StringOrRef, VHttpRequest, VHttpReqOptions} from "../models/v-http-models";
import {Observable} from "rxjs";
import xhrHandler from "./xhr-handler";
import {unref} from "vue";
import {sanitizeQueryParams} from "../utils/sanitize-query-params";
import {sanitizeRequestHeaders} from "../utils/sanitize-request-headers";

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

export function request<T>(method: RequestMethod, url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T> {
  return xhrHandler.instance.handle(buildRequest(url, method, body ?? null, options));
}

export function get <T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function get<T>(url: StringOrRef, body: URLSearchParams, options?: VHttpReqOptions): Observable<T> {
  return request<T>('GET', url, body ?? null, options);
}

export function post <T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T> {
  return request<T>('POST', url, body ?? null, options);
}

export function put<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T> {
  return request<T>('PUT', url, body ?? null, options);
}

export function patch<T>(url: StringOrRef, body: RequestBody, options?: VHttpReqOptions): Observable<T> {
  return request<T>('PATCH', url, body ?? null, options);
}

export function options<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function options<T>(url: StringOrRef, body: URLSearchParams, options?: VHttpReqOptions): Observable<T> {
  return request<T>('OPTIONS', url, body ?? null, options);
}

export function del<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function del<T>(url: StringOrRef, body: URLSearchParams, options?: VHttpReqOptions): Observable<T> {
  return request<T>('DELETE', url, body ?? null, options);
}

export function head<T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T>
export function head<T>(url: StringOrRef, body: URLSearchParams, options?: VHttpReqOptions): Observable<T> {
  return request<T>('HEAD', url, body ?? null, options);
}
