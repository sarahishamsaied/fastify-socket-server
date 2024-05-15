import User from "../models/User";
import { BaseUser } from "../types/User";

class UserRepository {
  public async create(user: BaseUser): Promise<BaseUser> {
    return await User.create(user);
  }

  public async show(id: string): Promise<BaseUser | null> {
    return await User.findById(id);
  }

  public async index(): Promise<BaseUser[]> {
    return await User.find();
  }

  public async update(
    id: string,
    user: BaseUser
  ): Promise<Partial<BaseUser> | null> {
    const foundUser = await User.findById(id);
    if (!foundUser) throw new Error("User not found");

    foundUser.name = user.name;
    foundUser.email = user.email;
    foundUser.password = user.password;
    console.log(foundUser);
    await foundUser.save();
    return foundUser;
  }

  public async delete(id: string): Promise<BaseUser | null> {
    return await User.findByIdAndDelete(id);
  }

  public async findByEmail(email: string): Promise<BaseUser | null> {
    return await User.findOne({ email });
  }
}

export default UserRepository;
