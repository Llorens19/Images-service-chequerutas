import { config } from 'dotenv';
config();

import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import fs from "fs";
import util from "util";
import imageRoutes from '@/modules/image/presentation/image.routes';

const pump = util.promisify(require("stream").pipeline);

const start = async () => {
  try {
    const app = Fastify({ logger: false });

    await app.register(cors, {
      origin: (origin, callback) => {
        const urls_allowed = process.env.CORS_URLS?.split(",") || [];

        if (!origin || urls_allowed.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("No permitido por CORS"), false);
        }
      }
    });

    await app.register(multipart);

    const BASE_UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "uploads";


    if (!fs.existsSync(BASE_UPLOAD_FOLDER)) {
      fs.mkdirSync(BASE_UPLOAD_FOLDER, { recursive: true });
    }

    await app.register(fastifyStatic, {
      root: path.join(process.cwd(), BASE_UPLOAD_FOLDER),
      prefix: "/images/",
    });

    app.register(imageRoutes);

    await app.listen({
      port: Number(process.env.PORT) || 5000,
      host: process.env.HOST || "0.0.0.0",
    });

    console.log(`Servidor Fastify ejecutándose en http://${process.env.HOST}:${process.env.PORT}`);
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

start();
