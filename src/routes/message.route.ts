import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { broadcastMessage } from "../sockets/index";

async function messageRoutes(fastify: FastifyInstance) {
  fastify.post("/send", {
    schema: {
      body: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
        },
      },
    },

    handler: async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const { message } = req.body as { message: string };
        broadcastMessage(message);
        reply.send({ status: "Message sent to all WebSocket clients" });
      } catch (err) {
        reply.status(500).send({ error: "Failed to send message" });
      }
    },
  });
}

export default messageRoutes;
