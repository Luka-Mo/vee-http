function resolveResponse<T>(response: unknown, responseType: XMLHttpRequestResponseType): T | string | ArrayBuffer | Blob | Object | null
{
  const errorMessage = `[http] response type does not match expected: ${responseType ?? 'text'}, received ${typeof response}`;
  if (responseType === 'json') {
    if (typeof response !== 'object') throw new Error(errorMessage);
    return response as T;
  } else if (!responseType || responseType === 'text') {
    if (typeof response !== 'string') throw new Error(errorMessage);
    return response as string;
  } else if (responseType === 'blob') {
    if (!(response instanceof Blob)) throw new Error(errorMessage);
    return response as Blob;
  } else if (responseType === 'arraybuffer') {
    if (!(response instanceof ArrayBuffer)) throw new Error(errorMessage);
    return response as ArrayBuffer
  } else {
    throw new Error(errorMessage);
  }
}

export default resolveResponse