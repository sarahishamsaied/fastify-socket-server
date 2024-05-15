import { FastifyRequest, FastifyReply } from "fastify";
import UserRepository from "../repository/user.repository";
import { BaseUser } from "../types/User";

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userRepo = new UserRepository();
    const { name, email, password }: BaseUser = req.body as BaseUser;
    const user = await userRepo.create({
      name,
      email,
      password,
    });
    return reply.code(201).send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const index = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userRepo = new UserRepository();
    const users = await userRepo.index();
    return reply.send(users);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const show = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userRepo = new UserRepository();
    const { id } = req.params as Record<string, string>;

    const user = await userRepo.show(id as string);
    return reply.send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const update = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as Record<string, string>;
    const { name, email, password } = req.body as BaseUser;
    const userRepo = new UserRepository();
    const user = await userRepo.update(id as string, {
      name,
      email,
      password,
    });
    return reply.send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const remove = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as Record<string, string>;
    const userRepo = new UserRepository();
    await userRepo.delete(id as string);
    return reply.code(204).send();
  } catch (error) {
    reply.code(500).send(error);
  }
};
