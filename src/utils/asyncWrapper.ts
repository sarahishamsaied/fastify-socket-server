import { FastifyRequest, FastifyReply } from "fastify";

/**
    @param handler: (req: FastifyRequest, reply: FastifyReply) => void | Promise<void>
    This is a helper function that wraps an async function to catch any errors that may occur during the execution of the function. 
    If an error occurs, the function logs the error to the console and sends the error as a response to the client.    
*/

export const asyncWrapper = (
  handler: (req: FastifyRequest, reply: FastifyReply) => void | Promise<void>
) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = handler(req, reply);
      if (result instanceof Promise) {
        result.catch((error: any) => {
          console.error(error);
          reply.send(error);
        });
      }
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  };
};
