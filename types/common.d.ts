export interface Media {
  id: number;
  title: string;
  filePath: string;
  fileUrl?: string | null;
  size: number | null;
  extension: string;
}
