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

export function textLimit(input: string, limit: number) {
  if (input.length > limit) {
    return `${input.substring(0, limit)}...`;
  }
  return input;
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

export const getPaginationNumbers = (
  currentPage: number,
  totalPages: number,
  maxLength: number,
) => {
  let pages: number[] = [];

  // Calculate the start and end page numbers for the pagination list
  let start = 1;
  let end = totalPages;
  if (totalPages > maxLength) {
    const halfLength = Math.floor(maxLength / 2);
    start = Math.max(currentPage - halfLength, 1);
    end = Math.min(start + maxLength - 1, totalPages);
    if (end - start + 1 < maxLength) {
      start = end - maxLength + 1;
    }
  }

  // Add the page numbers to the list
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};
