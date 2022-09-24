/**
 * An error returned if the XHR error event is triggered
 *
 * @publicApi
 */
export interface HttpErrorResponse extends Error {
  name: 'HttpErrorResponse';
  status: number;
  message: string;
}
