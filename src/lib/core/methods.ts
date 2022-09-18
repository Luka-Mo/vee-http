import {ReqBody, ReqMethod, StringOrRef, VHttpReq, VHttpReqOptions} from "../models/v-http-models";
import {Observable} from "rxjs";
import xhrHandler from "./xhr-handler";
import {unref} from "vue-demi";
import {sanitizeQueryParams} from "../utils/sanitize-query-params";
import {sanitizeRequestHeaders} from "../utils/sanitize-request-headers";

const buildRequest = (url: StringOrRef,
                             method: ReqMethod,
                             body: ReqBody,
                             options?: VHttpReqOptions): VHttpReq => {
  const sanitizedUrl = unref(url) + sanitizeQueryParams(options?.queryParams);
  console.log(sanitizedUrl);
  const sanitizedHeaders = sanitizeRequestHeaders(options?.headers);
  return {
    url: sanitizedUrl,
    options,
    headers: sanitizedHeaders,
    body,
    method
  };
}

export const get = <T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T> => {
  return xhrHandler.instance.handle(buildRequest(url, 'GET', null, options));
}

export const post = <T>(url: StringOrRef, body: ReqBody, options?: VHttpReqOptions): Observable<T> => {
  return xhrHandler.instance.handle(buildRequest(url, 'POST', body, options));
}

export const put = <T>(url: StringOrRef, body: ReqBody, options?: VHttpReqOptions): Observable<T> => {
  return xhrHandler.instance.handle(buildRequest(url, 'PUT', body, options));
}

export const patch = <T>(url: StringOrRef, body: ReqBody, options?: VHttpReqOptions): Observable<T> => {
  return xhrHandler.instance.handle(buildRequest(url, 'PATCH', body, options));
}

export const options = <T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T> => {
  return xhrHandler.instance.handle(buildRequest(url, 'OPTIONS', null, options));
}

export const head = <T>(url: StringOrRef, options?: VHttpReqOptions): Observable<T> => {
  return xhrHandler.instance.handle(buildRequest(url, 'HEAD', null, options));
}
