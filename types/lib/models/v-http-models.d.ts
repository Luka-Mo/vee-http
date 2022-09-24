import type {Observable} from 'rxjs';
import type {Ref} from 'vue';

/**
 * Interceptor function
 * @param {VHttpRequest} req
 * @param {XhrHandlerInstance} next
 */
export type VHttpInterceptor = <T>(req: VHttpRequest, next: XhrHandlerInstance) => Observable<T>;

/**
 * Object passed as the second argument to the Interceptor function
 * that passes the request to the next interceptor function
 * with calling the handle method
 */
export interface XhrHandlerInstance {
  handle: VHttpInterceptor;
}

export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD';

/**
 * A type of payload to be sent to the backend
 */
export type RequestBody = object | ReadableStream<any> | Blob | ArrayBufferView
  | ArrayBuffer | FormData | URLSearchParams | string | null;

/**
 * Available response types for the XHR to properly handle the response payload
 *
 * if '', null or undefined are used the default type is 'json'
 *
 * It should be noted that the appropriate headers should be added to the request as well.
 */
export type RequestResponseType = 'json' | 'blob' | 'arrayBuffer' | 'text' | 'formData' | 'document' | '' | null | undefined;

/**
 * Calls can return either a response object or the
 * content of the response body
 *
 * Observing the response will return all events related to the XHR
 */
export type ResObserveType = 'response' | 'body';

/**
 * A request object passed as the first argument to the interceptor
 */
export interface VHttpRequest {
  url: string;
  method: RequestMethod;
  headers: Headers;
  body?: RequestBody;
  options?: VHttpReqOptions;
}


/**
 * Passing a Ref as an argument is possible, however it will not make the
 * call reactive as unref() is used to obtain the Ref value
 */
export type StringOrRef = string | Ref<string>


/**
 * Request settings that can optionally be
 * passed to the call
 */
export interface VHttpReqOptions {
  headers?: Record<string, StringOrRef>;
  queryParams?: Record<string, StringOrRef>;
  responseType?: RequestResponseType;
  observe?: ResObserveType;
  skipDefaultHeaders?: boolean;
}


/**
 * When observe is set to 'response' events are sent out instead
 * of the response which additionally includes the Progress data
 *
 */
export interface VHttpEvent<T> extends VHttpResponse<T> {
  progress?: VHttpProgressReport
  status: number,
  body: T | null,
  headers: Record<string, string>;
}


/**
 * A response returned by the XHR
 *
 * If the status is > 399 it returns a HttpErrorResponse Instead
 */
export interface VHttpResponse<T> {
  status: number,
  body: T | null,
  headers: Record<string, string>;
}

/**
 * Progress report used in VHttpEvent<T>
 */
export interface VHttpProgressReport {
  total: number | null,
  loaded: number | null
}
