import type {RequestResponseType} from "../models/v-http-models";

export default (response: unknown, responseType: RequestResponseType | undefined): string | ArrayBuffer | Blob | object | null => {
  const errorMessage = `[v-http] response type does not match expected: ${responseType ?? 'text'}, received ${typeof response}`;
  if (response == null) {
    return null;
  } else if (!responseType || responseType === 'text') {
    if (typeof response !== 'string') throw new Error(errorMessage);
    return response as string;
  } else if (responseType === 'json') {
    if (typeof response !== 'object') throw new Error(errorMessage);
    return response as object;
  } else if (responseType === 'blob') {
    if (!(response instanceof Blob)) throw new Error(errorMessage);
    return response as Blob;
  } else if (responseType === 'arrayBuffer') {
    if (!(response instanceof ArrayBuffer)) throw new Error(errorMessage);
    return response as ArrayBuffer
  } else {
    return response;
  }
}