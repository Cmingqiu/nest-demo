import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Version,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { NoAuth } from '@/common/decorators/noAuth.decorator';

/* @Controller({
  path: 'user',
  version: '1',
}) */
@Controller('user')
// @UseGuards(AuthGuard)  局部守卫
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @Version('2')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(['admin'])
  findAll(@Query() queryParams: SearchUserDto) {
    return this.userService.findAll(queryParams);
  }

  @NoAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
