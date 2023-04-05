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
  return input?.replace(/<[^>]*>|&nbsp;/g, '');
}

export function formatBytes(bytes?: number, decimals = 2) {
  if (!bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return [parseFloat((bytes / k ** i).toFixed(dm)), sizes[i]];
}

export const limitCharacter = (
  data: any,
  text: string,
  inputName: string,
  limit: number,
): void => {
  if (text.length > limit) {
    data[inputName] = text.substring(0, limit);
  }
};
