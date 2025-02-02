import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param';

@Injectable()
export class UsersService {
  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    console.log(getUsersParamDto, limit, page);
    return [
      { firstName: 'John', email: 'john@doe.com' },
      { firstName: 'Alice', email: 'alice@doe.com' },
    ];
  }

  findOneById(id: number) {
    return { id, firstName: 'Alice', email: 'alice@doe.com' };
  }
}
