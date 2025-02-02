import {
  Controller,
  Get,
  ParseIntPipe,
  DefaultValuePipe,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('{/:id}')
  public getUser(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Get(':id')
  public getUserById(@Param() id: number) {
    return this.usersService.findOneById(id);
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return 'You sent a post require to users endpoint';
  }

  @Patch()
  public PatchUsers() {
    return 'You sent a patch require to users endpoint';
  }

  @Put()
  public PutUsers() {
    return 'You sent a put require to users endpoint';
  }

  @Delete()
  public DeleteUsers() {
    return 'You sent a delete require to users endpoint';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'You sent a patch require to users endpoint';
  }
}
