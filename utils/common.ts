export function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function titleLimit(input: string, limit: number) {
  return input.substring(0, limit);
}

export function stripHtml(input: string) {
  return input?.replace(/(<([^>]+)>)/gi, '');
}
