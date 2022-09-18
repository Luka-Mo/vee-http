import {App} from 'vue-demi';
import {get, post, options, put, patch, head} from './core/methods'

export as namespace vHttpClient;

export * from './models/v-http-models';
export * from './classes/v-http-error';

export function createVHttpClient(V: App): void;
export function useVHttpClient(): {
  get: get<any>,
  post: post<any>,
  options: options<any>,
  put: put<any>,
  patch: patch<any>,
  head: head<any>
}
