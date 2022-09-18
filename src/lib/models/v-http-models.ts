import type {Observable} from "rxjs";
import type {Ref} from "vue-demi";

export type VHttpInterceptor = <T>(req: VHttpReq, next: { handle: VHttpInterceptor }) => Observable<T>;

export interface XhrHandlerInstance {
  handle: <T>(req: any) => Observable<T>;
}

export type ReqMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD';

export type ReqBody = object | ReadableStream<any> | Blob | ArrayBufferView
  | ArrayBuffer | FormData | URLSearchParams | string | null;

export type RequestResponseType = 'json' | 'blob' | 'arrayBuffer' | 'text' | 'formData' | 'document' | '' | null | undefined;

export type ResObserveType = 'response' | 'body';

export interface VHttpReq {
  url: string;
  method: ReqMethod;
  headers: Headers;
  body?: ReqBody;
  options?: VHttpReqOptions;
}

export type StringOrRef = string | Ref<string>

export interface VHttpReqOptions {
  headers?: Record<string, StringOrRef>;
  queryParams?: Record<string, StringOrRef>;
  responseType?: RequestResponseType;
  observe?: ResObserveType;
  skipDefaultHeaders?: boolean;
}

export enum XhrEvent {
  LOAD = 'load',
  LOADSTART = 'loadstart',
  LOADEND = 'loadend',
  PROGRESS = 'progress',
  ERROR = 'error',
  ABORT = 'abort'
}

export interface VHttpEvent<T> extends VHttpResponse<T> {
  progress?: VHttpProgressReport
  status: number,
  body: T | null,
  headers: Record<string, string>;
}

export interface VHttpResponse<T> {
  status: number,
  body: T | null,
  headers: Record<string, string>;
}

export interface VHttpProgressReport {
  total: number | null,
  loaded: number | null
}
