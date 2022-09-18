import Vue from 'vue';
import {App} from 'vue-demi';
import {ReqBody, StringOrRef, VHttpInterceptor, VHttpReqOptions} from "./lib/models/v-http-models";
import {Observable} from "rxjs";

export declare module 'vue/types/vue' {
  interface Vue {
    $vHttpClient: VHttpClient;
  }
}

/**
 * Method for accessing VHttpClient methods from composition API
 */
export declare function useVHttpClient(): VHttpClient;

/**
 * Register the client with interceptors as a plugin
 * @param interceptors: VHttpInterceptor[]
 */
export declare function createVHttpClient(interceptors: VHttpInterceptor[]): {
  install: (V: App) => void
};

/**
 * Available VHttpClient methods
 */
export interface VHttpClient {
  get: <T>(url: StringOrRef, options?: VHttpReqOptions) => Observable<T>,
  post: <T>(url: StringOrRef, body?: ReqBody, options?: VHttpReqOptions) => Observable<T>,
  options: <T>(url: StringOrRef, options?: VHttpReqOptions) => Observable<T>,
  delete: <T>(url: StringOrRef, options?: VHttpReqOptions) => Observable<T>
  put: <T>(url: StringOrRef, body?: ReqBody, options?: VHttpReqOptions) => Observable<T>,
  patch: <T>(url: StringOrRef, body?: ReqBody, options?: VHttpReqOptions) => Observable<T>,
  head: <T>(url: StringOrRef, body?: ReqBody, options?: VHttpReqOptions) => Observable<T>
}

export * from './lib/models/v-http-models';
export * from './lib/classes/v-http-error';
