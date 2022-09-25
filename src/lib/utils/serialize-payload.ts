export function serializePayload(payload: unknown): ArrayBuffer | Blob | FormData | string | null {
  if (payload == null) {
    return null;
  } else if (payload instanceof ArrayBuffer
    || payload instanceof Blob
    || payload instanceof FormData
    || payload instanceof URLSearchParams) {
    return payload;
  } else if (typeof payload === 'object' || typeof payload === 'boolean' || Array.isArray(payload)) {
    return JSON.stringify(payload);
  } else {
    return payload.toString();
  }
}