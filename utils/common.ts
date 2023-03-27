export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ObjectFilter = (obj: any, predicate: any) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));

export function eliminateNullValues<T>(data: any): T {
  return ObjectFilter(data, ([_name, value]: any) => value) as T;
}

export function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function titleLimit(input: string, limit: number) {
  return input.substring(0, limit);
}

export function stripHtml(input: string) {
  return input?.replace(/(<([^>]+)>)/gi, '');
}
