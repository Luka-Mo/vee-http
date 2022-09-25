import type {App} from "vue";
import xhrHandler, {initHandler} from "./lib/core/xhr-handler";
import {VHttpInterceptor} from "./lib/models/v-http-models";
import {HttpClient} from "./lib/classes/http-client";

let _Vue: App;
let _client: HttpClient;

export const useVHttpClient = () => ({
  http: _client
});

export const createVHttpClient = (interceptors: VHttpInterceptor[]) => {
  initHandler(interceptors);
  _client = new HttpClient(xhrHandler.instance);
  return {
    install(app: App){
      _Vue = app;
      _Vue.config.globalProperties.$vHttpClient = _client;
    }
  }
}