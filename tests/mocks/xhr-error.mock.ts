import {XhrMock} from "./xhr.mock";
import {take, timer} from "rxjs";
import {XhrEvent} from "../../src/lib/models/v-http-models";

export class XhrErrorMock extends XhrMock {
  send(_body: any | null) {
    timer(50)
      .pipe(take(1))
      .subscribe(() => {
        const event = new ProgressEvent(XhrEvent.ERROR, {loaded: 250, total: 250});
        this.readyState = 4;
        this.status = 404;
        this.dispatchEvent(event);
      });
  }
}
