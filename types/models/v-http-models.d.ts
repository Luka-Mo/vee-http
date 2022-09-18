import type {Observable} from "rxjs";
import type {Ref} from "vue-demi";
import {VHttpReq} from "../../src/lib/models/v-http-models";

export type VHttpInterceptor = <T>(req: VHttpReq, next: { handle: VHttpInterceptor }) => Observable<T>;

export type ReqBody = object | ReadableStream<any> | Blob | ArrayBufferView
  | ArrayBuffer | FormData | URLSearchParams | string | null;

export type ResType = 'json' | 'blob' | 'arrayBuffer' | 'text' | 'formData';

export type ResObserveType = 'response' | 'body';

export type StringOrRef = string | Ref<string>

export interface VHttpReqOptions {
  headers?: Record<string, StringOrRef>;
  queryParams?: Record<string, StringOrRef>;
  responseType?: ResType;
  observe?: ResObserveType;
  skipDefaultHeaders?: boolean;
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
