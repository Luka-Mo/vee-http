import {App} from 'vue';
import {VHttpInterceptor} from "./lib/models/v-http-models";
import {HttpClient} from "./lib/classes/http-client";


/**
 * Extends Vue types
 */
declare module 'vue' {
  interface ComponentCustomProperties {
    $vHttpClient: HttpClient;
  }
}

/**
 * Method for accessing VHttpClient methods from composition API
 */
export declare function useVHttpClient(): { http: HttpClient };

/**
 * Register the client with interceptors as a plugin
 * @param interceptors: VHttpInterceptor[]
 */
export declare function createVHttpClient(interceptors: VHttpInterceptor[]): {
  install: (V: App) => void
};

export * from './lib/models/v-http-models';
export * from './lib/classes/http-error-response';
