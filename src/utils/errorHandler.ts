import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export const errorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, req: FastifyRequest, reply: FastifyReply) => {
    fastify.log.error(error);

    const statusCode = error.statusCode || 500;
    const message = error.message || "An unexpected error occurred";

    reply.status(statusCode).send({
      statusCode,
      message,
      error: error.name || "InternalServerError",
    });
  });
};
