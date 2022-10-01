import {unref} from 'vue';
import {StringOrRef} from '../models/v-http-models';

export const sanitizeRequestHeaders = (headers: Record<string, StringOrRef> | undefined): Map<string, string> => {
  const sanitizedHeaders = new Map<string, string>();
  if (headers) {
    for (const key in headers) {
      const sanitizedValue = unref(headers[key]);
      if (sanitizedValue != null) sanitizedHeaders.set(key, unref(headers[key]));
    }
  }
  return sanitizedHeaders;
};