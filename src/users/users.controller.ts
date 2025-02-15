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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsers } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('{:id}')
  @ApiOperation({
    description: 'blablabla',
  })
  @ApiResponse({
    status: 200,
    description: 'users fetched successfully',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    example: 10,
    description: 'The number of entries returned per query example 10',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  public getUser(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Get(':id')
  public getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('create-many')
  public createManyUsers(@Body() createManyUsers: CreateManyUsers) {
    return this.usersService.createManyUsers(createManyUsers);
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
