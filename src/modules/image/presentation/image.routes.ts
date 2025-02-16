//Interfaces
import { FastifyInstance } from "fastify";

//Adapters

import { ImageRepoAdapter } from "@/modules/image/infrastructure/repoImplement/image.adapter";
import { genericController } from "@/presentation/adapters/genericController.adapter";
import { uploadImageUseCase } from "@/modules/image/application/use-cases/uploadImage.use-case";


const imageRepo= new ImageRepoAdapter();

const imageRoutes = (routes: FastifyInstance): void => {
  routes.post("/upload", genericController(uploadImageUseCase, imageRepo));
};

export default imageRoutes;
