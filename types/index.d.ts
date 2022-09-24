import {App} from 'vue';
import {RequestBody, StringOrRef, VHttpInterceptor, VHttpReqOptions} from "./lib/models/v-http-models";
import {Observable} from "rxjs";


/**
 * Extends Vue types
 */
declare module 'vue' {
  interface ComponentCustomProperties {
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
  post: <T>(url: StringOrRef, body?: RequestBody, options?: VHttpReqOptions) => Observable<T>,
  options: <T>(url: StringOrRef, options?: VHttpReqOptions) => Observable<T>,
  del: <T>(url: StringOrRef, options?: VHttpReqOptions) => Observable<T>
  put: <T>(url: StringOrRef, body?: RequestBody, options?: VHttpReqOptions) => Observable<T>,
  patch: <T>(url: StringOrRef, body?: RequestBody, options?: VHttpReqOptions) => Observable<T>,
  head: <T>(url: StringOrRef, body?: RequestBody, options?: VHttpReqOptions) => Observable<T>
}

export * from './lib/models/v-http-models';
export * from './lib/classes/http-error-response';
