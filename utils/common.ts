export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ObjectFilter = (obj: any, predicate: any) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));

export function eliminateNullValues<T>(data: any): T {
  return ObjectFilter(data, ([_name, value]: any) => value) as T;
}
