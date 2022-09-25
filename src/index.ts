import type {App} from 'vue';
import xhrHandler, {initHandler} from './lib/core/xhr-handler';
import {VHttpInterceptor} from './lib/models/v-http-models';
import {HttpClient} from './lib/classes/http-client';

let _Vue: App;
let _client: HttpClient;

/**
 * A Hook used in Composition API that
 * can be destructured to access the
 * Http client
 *
 * ```
 * const {http} = useVHttpClient();
 * ```
 *
 * @category createVHttpClient
 */
export const useVHttpClient = () => ({
  http: _client
});

/**
 * Creates a http client
 *
 *
 * Once registered it can be used in the options API
 * via the globalProperties $vHttpClient
 * ```
 * this.$vHttpClient.get(...)
 * ```
 * @param interceptors - an array of interceptors
 * @category createVHttpClient
 * @returns an object with install method that
 * can be used in `Vue.use(createVHttpClient())` call
 */
export const createVHttpClient = (interceptors: VHttpInterceptor[] | undefined) => {
  initHandler(interceptors);
  _client = new HttpClient(xhrHandler.instance);
  return {
    install(app: App){
      _Vue = app;
      _Vue.config.globalProperties.$vHttpClient = _client;
    }
  };
};