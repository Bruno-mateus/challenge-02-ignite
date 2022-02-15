/* eslint-disable prettier/prettier */
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User {
    const userID = this.usersRepository.findById(user_id);
    if (!userID) throw new Error("This user not found");

    return this.usersRepository.turnAdmin(userID);
  }
}

export { TurnUserAdminUseCase };
