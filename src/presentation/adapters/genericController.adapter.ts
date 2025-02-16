import { IUseCaseFunction } from "@/presentation/ports/genericInput.port";
import { ErrorResp } from "@/shared/utils/error.util";
import { FastifyReply, FastifyRequest } from "fastify";


export const genericController = <T>(useCase: IUseCaseFunction<T>, repo:T) => {

  return async (request: FastifyRequest, reply: FastifyReply) => {

    try {
      const { status, result } = await useCase({request, repo});
      return reply.code(status).send(result);
    } catch (error: unknown) {

      if (error instanceof ErrorResp) {
        return reply.code(error.state).send({ code: error.code, error: error.message });
      }
      if (error instanceof Error) {
        console.error(error.message);
        return reply.code(500).send({ error: error.message });
      }
    }
  };
};