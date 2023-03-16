import type { H3Event } from 'h3';

export function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function classToJson(data: unknown) {
  return JSON.parse(JSON.stringify(data));
}

export async function parseRequestFormData(event: H3Event) {
  const formData = await readMultipartFormData(event);

  return formData?.reduce((prev: any, current, _index) => {
    if (typeof current.name === 'string') {
      if (current.type && current.filename) {
        const keyName = current.name.replace('[]', '');
        const fileName = current.filename;
        const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        const value = {
          name: fileName.substring(
            0,
            fileName.includes('.') ? fileName.indexOf('.') : fileName.length,
          ),
          data: current.data,
          type: current.type,
          extension: fileExtension,
          size: Buffer.byteLength(current.data),
        };

        if (current.name?.includes('[]')) {
          prev[keyName] = Array.isArray(prev[keyName]) ? prev[keyName] : [];
          prev[keyName].push(value);
        } else {
          prev[keyName] = value;
        }
      } else if (current.name?.includes('[]')) {
        const keyName = current.name.replace('[]', '');
        let value: string | number | boolean = current.data.toString();
        if (!isNaN(Number(value))) {
          value = Number(value);
        } else if (['true', 'false', '0', '1'].includes(value)) {
          value = Boolean(value);
        }

        prev[keyName] = Array.isArray(prev[keyName]) ? prev[keyName] : [];
        prev[keyName].push(current.data.toString());
      } else {
        prev[current.name] = current.data.toString();
      }
    }

    return prev;
  }, {});
}
