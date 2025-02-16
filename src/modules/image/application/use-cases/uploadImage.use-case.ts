import { IImageOutputPort } from "@/modules/image/domain/repo/image.port";
import { IUseCaseData } from "@/shared/utils/useCaseGenericInpur.interface";
import path from "path";
import { resp } from "@/shared/utils/resp.util";
import { IResp } from "@/shared/utils/respUtils.interface";
import crypto from "crypto";
import { ErrorsImages } from "@/modules/image/domain/errors/image.errors";

export const uploadImageUseCase = async ({ request, repo }: IUseCaseData<IImageOutputPort>): Promise<IResp<{ url: string }>> => {

    const data = await request.file() as { fields: { folder: string }, filename: string, file: NodeJS.ReadableStream };
    if (!data) throw ErrorsImages.ErrorUploadingImage;

    const folder = String(data.fields?.folder || "uploads");
    const uploadPath = path.join(process.env.UPLOAD_FOLDER || "uploads", folder);

    const randomName = crypto.randomBytes(16).toString("hex");
    const fileExtension = path.extname(data.filename);
    const newFilename = `${randomName}${fileExtension}`;

    const filePath = path.join(uploadPath, newFilename);

    await repo.saveImage(data.file, filePath);

    return resp(200, { url: `http://localhost:${process.env.PORT}/images/${folder}/${newFilename}` });
};