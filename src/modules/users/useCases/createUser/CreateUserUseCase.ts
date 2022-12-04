import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ email, name }: IRequest): User {
        const userWithEmailAlreadyUsed = this.usersRepository.findByEmail(
            email
        );

        if (userWithEmailAlreadyUsed) {
            throw new Error("Email is already being used!");
        }

        return this.usersRepository.create({ email, name });
    }
}

export { CreateUserUseCase };
