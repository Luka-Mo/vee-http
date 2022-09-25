import {StringOrRef} from '../models/v-http-models';
import {unref} from 'vue';

export const sanitizeQueryParams = (queryParams: Record<string, StringOrRef> | undefined): string => {
  if (!queryParams) return '';
  const sanitizedParams = Object.keys(queryParams)
    .filter(key => unref(queryParams[key]) != null)
    .map(key => `${key}=${unref(queryParams[key])}`)
    .join('&');
  return '?' + sanitizedParams;
};