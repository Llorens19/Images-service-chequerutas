import { IImageOutputPort } from "@/modules/image/domain/repo/image.port";
import fs from "fs";
import util from "util";

const pump = util.promisify(require("stream").pipeline);

export class ImageRepoAdapter implements IImageOutputPort {
  async saveImage(file: NodeJS.ReadableStream, filePath: string): Promise<void> {
    await pump(file, fs.createWriteStream(filePath));
  }
}
