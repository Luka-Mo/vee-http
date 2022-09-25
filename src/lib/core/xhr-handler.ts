import type {Observable} from 'rxjs';
import type {VHttpEvent, VHttpInterceptor, VHttpRequest, XhrHandlerInstance} from '../models/v-http-models';
import xhrRequest from './xhr-request';

let _xhrHandlerInstance: XhrHandler;

/**
 * @ignore
 */
class XhrHandler {
  handle: <T>(req: VHttpRequest) => Observable<T> | Observable<VHttpEvent<T>> | Observable<unknown>;
  next: XhrHandler | undefined;

  constructor(next?: XhrHandler,
    interceptor?: VHttpInterceptor) {
    if (next && interceptor) {
      this.next = next;
      this.handle = (req) => interceptor!(req, this.next!);
    } else {
      this.handle = (req) => xhrRequest(req);
    }
  }
}

/**
 * @ignore
 * @param interceptors
 */
export const initHandler = (interceptors: VHttpInterceptor[] | undefined) => {
  if (_xhrHandlerInstance) throw Error('[v-http] Handler already initialized!');
  let handler = new XhrHandler();
  while(interceptors?.length) {
    const currentHandlerFn = interceptors.pop();
    if (!currentHandlerFn || typeof currentHandlerFn !== 'function') {
      throw Error('[v-http] Incorrect interceptor present in the interceptor chain!');
    }
    handler = new XhrHandler(handler, currentHandlerFn);
  }
  _xhrHandlerInstance = handler;
};

export default {
  /**
   * @ignore
   */
  get instance(): XhrHandlerInstance {
    return _xhrHandlerInstance;
  }
};