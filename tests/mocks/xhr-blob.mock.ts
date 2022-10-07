import {take, timer} from 'rxjs';
import {XhrEvent} from '../../src/lib/models/v-http-models';
import {XhrMock} from './xhr.mock';

export class XhrBlobMock extends XhrMock {
  send(_body: unknown | null) {
    timer(50)
      .pipe(take(1))
      .subscribe(() => {
        const event = new ProgressEvent(XhrEvent.LOAD, {loaded: 250, total: 250});
        this.readyState = 4;
        this.status = 200;
        this.response = new Blob(['test blob'], {type: 'application/text'});
        this.dispatchEvent(event);
      });
  }
}
