import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser: User = new User();
    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
      admin: false,
    });
    this.users.push(newUser);
    return newUser;
  }

  findById(id: string): User | undefined {
    const userId = this.users.find((user) => user.id === id);
    return userId;
  }

  findByEmail(email: string): User | undefined {
    const userEmail = this.users.find((user) => user.email === email);
    return userEmail;
  }

  turnAdmin(receivedUser: User): User {
    const user = this.users.find((user) => user.id === receivedUser.id);
    Object.assign(user, {
      admin: true,
      updated_at: new Date(),
    });
    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
