export default function (headers: string): Record<string, string> {
  const sanitizedHeaders: Record<string, string> = {};
  const keyValuePairs = headers.split('\n');
  keyValuePairs
    .filter(keyValuePair => !!keyValuePair && keyValuePair.includes(':'))
    .forEach((keyValuePair: string) => {
      const [key, value] = keyValuePair.split(':');
      sanitizedHeaders[key.trim()] = value.trim();
    });
  return sanitizedHeaders;
}