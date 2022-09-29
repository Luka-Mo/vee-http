import {XhrMock} from "./xhr.mock";
import {interval, map, scan, skipWhile, switchMap, tap, timer} from "rxjs";
import {XhrEvent} from "../../src/lib/models/v-http-models";

export class XhrEventsMock extends XhrMock {
  send(_body: any | null) {
    timer(50)
      .pipe(
        tap(() => {
          const event = new ProgressEvent(XhrEvent.LOADSTART);
          this.dispatchEvent(event);
        }),
        switchMap(() => interval(20)),
        map(_ => 1),
        scan((acc: number, val: number) => {
          return acc + val
        }, 0),
        tap(loaded => {
          if (loaded < 4) {
            const event = new ProgressEvent(XhrEvent.PROGRESS, {loaded: loaded * 20, total: 100});
            this.dispatchEvent(event);
          } else if (loaded === 4) {
            const event = new ProgressEvent(XhrEvent.LOAD, {loaded: 100, total: 100});
            this.readyState = 4;
            this.status = 204;
            this.dispatchEvent(event);
          }
        }),
        skipWhile((loaded: number) => loaded !== 4)
      ).subscribe(() => {
        const event = new ProgressEvent(XhrEvent.LOADEND);
        this.dispatchEvent(event);
      });
  }
}