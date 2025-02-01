import {
  Controller,
  Get,
  Post,
  Ip,
  Headers,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'You sent a get require to users endpoint';
  }

  @Get(':id')
  public getUser(@Param('id') id: any, @Query('limit') limit: number) {
    return `You sent a get require to user ${id} endpoint with ${limit}`;
  }

  @Post()
  public createUsers(
    @Body() request: any,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(request);
    console.log(headers);
    console.log(ip);
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
}
