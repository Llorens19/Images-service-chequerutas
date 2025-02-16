
export interface IImageOutputPort {
  saveImage(file: NodeJS.ReadableStream, filePath: string): Promise<void>;
}
