import {XhrEvent} from "../../src/lib/models/v-http-models";
import {take, timer} from "rxjs";


export class XhrMock extends XMLHttpRequest {
  setRequestHeader = jest.fn()
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

export class XhrBlobMock extends XhrMock {
  send(_body: any | null) {
    timer(50)
      .pipe(take(1))
      .subscribe(() => {
        const event = new ProgressEvent(XhrEvent.LOAD, {loaded: 250, total: 250});
        this.readyState = 4;
        this.status = 200;
        this.response = new Blob(['test blob'], {type: 'application/text'})
        this.dispatchEvent(event);
      });
  }
}