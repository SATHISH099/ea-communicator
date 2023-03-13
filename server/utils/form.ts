export function objectToURLSearchParams(data: Record<string, any>) {
  const urlSearchParam = new URLSearchParams();
  for (const key in data) {
    urlSearchParam.append(key, data[key]);
  }
  return urlSearchParam;
}
