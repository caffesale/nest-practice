import {
  Controller,
  Get,
  ParseIntPipe,
  DefaultValuePipe,
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
  @Get('{/:id}')
  public getUser(
    @Param('id', new DefaultValuePipe(1), ParseIntPipe) id: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(id);
    console.log(limit);
    console.log(page);
    return `You sent a get require to user ${limit} and ${page}`;
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
