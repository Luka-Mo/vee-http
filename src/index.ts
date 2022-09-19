import type {App} from "vue-demi";
import {initHandler} from "./lib/core/xhr-handler";
import {del, get, head, options, patch, post, put} from "./lib/core/methods";
import {VHttpInterceptor} from "./lib/models/v-http-models";

let _Vue: App;

const vHttp = {
  get,
  post,
  put,
  patch,
  /*
   * it might present problems when used in destructuring
   * so it's renamed from delete to del
   */
  del,
  options,
  head
};

export const useVHttpClient = () => vHttp;

export const createVHttpClient = (interceptors: VHttpInterceptor[]) => {
  initHandler(interceptors);
  return {
    install(app: App){
      _Vue = app;
      _Vue.config.globalProperties.$vHttpClient = vHttp;
    }
  }
}