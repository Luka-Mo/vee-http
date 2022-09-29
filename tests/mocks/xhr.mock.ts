import {XhrEvent} from "../../src/lib/models/v-http-models";
import {take, timer} from "rxjs";


export class XhrMock extends XMLHttpRequest {
  readyState!: number;
  status!: number
  response: any;

  send(_body: any | null) {
    timer(50)
      .pipe(take(1))
      .subscribe(() => {
        const event = new ProgressEvent(XhrEvent.LOAD, {loaded: 50, total: 50});
        this.readyState = 4;
        this.status = 200;
        this.response = {mockValue: 'mock data'}
        this.dispatchEvent(event);
      });
  }
}