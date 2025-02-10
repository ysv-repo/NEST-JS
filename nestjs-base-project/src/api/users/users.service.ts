import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ALL_USERS, GET_USER_BY_ID, GET_USERS_BY_IDS, PROCEDURE_WITH_PARAMETERS, PROCEDURE_WITHOUT_PARAMETERS } from 'src/queries/user-queries';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: UserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto); 
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async updateUser(id: number, updateUserDto: UserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  findAllByQuery(): User[] | PromiseLike<User[]> {
    return this.usersRepository.query(ALL_USERS);
  }

  getUserById(id: number): Promise<User> {
    return this.usersRepository
      .query(GET_USER_BY_ID, [ id ])
      .then((result) => {
        if (result && result.length > 0) {
          return result[0];
        } else {
          throw new Error(`User ${id} not found`);
        }
      });
  }

  getUserByIds(ids:string):  PromiseLike<User[]> {
    const idsArray = ids.split(',');
    return this.usersRepository.query(GET_USERS_BY_IDS,[idsArray]);
  }

  getAllUsersByProcedure(): User[] | PromiseLike<User[]> {
    return this.usersRepository.query(PROCEDURE_WITHOUT_PARAMETERS);
  }


  getAllUsersByProcedureParam(id: number): User[] | PromiseLike<User[]> {
    return this.usersRepository.query(PROCEDURE_WITH_PARAMETERS,[id]);
  }
  
}
