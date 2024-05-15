import { FastifyInstance } from "fastify";
import {
  create,
  index,
  show,
  update,
  remove,
} from "../controllers/user.controller";

async function routes(fastify: FastifyInstance) {
  fastify.post("/", {
    schema: {
      body: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },

    handler: create,
  });
  fastify.get("/", index);
  fastify.get("/:id", show);
  fastify.put("/:id", {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },

    handler: update,
  });
  fastify.delete("/:id", remove);
}

export default routes;
