import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { User } from './entities/user.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { JWTAuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UseGuards(JWTAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
  @Get('')
  @UseGuards(AdminGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  @Get('/:id')
  @UseGuards(JWTAuthGuard)
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(+id);
  }
  @Delete('/:id')
  @UseGuards(JWTAuthGuard)
  async remove(@Param('id') id: string): Promise<User> {
    return await this.userService.remove(+id);
  }
}
