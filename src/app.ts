import fastify from "fastify";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route";
import { errorHandler } from "./utils/errorHandler";
import messageRoutes from "./routes/message.route";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyStatic from "@fastify/static";
import path from "path";
console.log("dirnsma", __dirname);

const app = fastify({ logger: true });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (_request, _reply, next) {
      next();
    },
    preHandler: function (_request, _reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});
app.register(userRoutes, { prefix: "/users" });
app.register(messageRoutes, { prefix: "/messages" });

app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "/public"),
});
app.get("/", {
  schema: {
    response: {
      200: {
        type: "string",
      },
    },
  },

  handler: async (request, reply) => {
    console.log("Welcome to Fastify");
    return reply.sendFile("index.html");
  },
});

errorHandler(app);

mongoose
  .connect("mongodb://localhost/fastifydb", {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

export default app;
