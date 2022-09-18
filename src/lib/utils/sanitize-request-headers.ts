import {unref} from "vue-demi";
import {StringOrRef} from "../models/v-http-models";

export const sanitizeRequestHeaders = (headers: Record<string, StringOrRef> | undefined): Headers => {
  const sanitizedHeaders = new Headers();
  if (!!headers) {
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        const sanitizedValue = unref(headers[key]);
        if (sanitizedValue != null) sanitizedHeaders.append(key, unref(headers[key]));
      }
    }
  }
  return sanitizedHeaders
}