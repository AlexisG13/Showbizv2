import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  ParseIntPipe,
  Param,
  UnauthorizedException,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dto/auth.credentials.dto';
import { UsersService } from './users.service';
import { AccessToken } from './dto/access-token.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/users.entity';
import { GetUser } from './decorators/get-user.decorator';
import { PasswordChangeDto } from './dto/password-change.dto';
import { AuthService } from 'src/auth/auth.service';
import { Order } from './entities/order.entity ';
import { RentMovieDto } from '../movies/dto/rent-movie.dto';
import { LoginCredentialsDto } from 'src/auth/dto/login-credentials.dto';
import { GetToken } from 'src/auth/decorators/get-token.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { RoleDto } from './dto/role.dto';
import { SignedGuard } from 'src/auth/guards/signed.guard';
import { checkUrlId } from './utils/check-url-id';
import { MoviesService } from 'src/movies/movies.service';
import { OrderDto } from './dto/order.dto';
import { Rental } from './entities/rental.entity';
import { RentDto } from './dto/rent.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authcredentialsDTo: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authcredentialsDTo);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() loginCredentials: LoginCredentialsDto): Promise<AccessToken> {
    return this.authService.login(loginCredentials);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  logout(@GetToken() token: string): Promise<void> {
    return this.authService.logout(token);
  }

  @Patch('/:userId/password')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  @UsePipes(ValidationPipe)
  changePassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() passwordDto: PasswordChangeDto,
    @GetUser() user: User,
  ): Promise<void> {
    if (!checkUrlId(userId, user.id)) {
      throw new UnauthorizedException('Unathorized userId in request');
    }
    return this.authService.changePassword(user, passwordDto);
  }

  @Post(':userId/orders')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  buyMovie(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() order: OrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    if (!checkUrlId(userId, user.id)) {
      throw new UnauthorizedException('Unathorized userId in request');
    }
    return this.moviesService.buyMovie(user, order);
  }

  @Post(':userId/rentals')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  rentMovie(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId') movieId: number,
    @Body() rentDto: RentDto,
    @GetUser() user: User,
  ): Promise<Rental> {
    if (!checkUrlId(userId, user.id)) {
      throw new UnauthorizedException('Unathorized userId in request');
    }
    return this.moviesService.rentMovie(user, rentDto);
  }

  @Patch(':userId/rentals/:rentalId')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  returnMovie(
    @Param('rentalId') rentalId: number,
    @GetUser() user: User,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    if (!checkUrlId(userId, user.id)) {
      throw new UnauthorizedException('Unathorized userId in request');
    }
    return this.moviesService.returnMovies(user, rentalId);
  }

  @Patch(':userId/roles')
  @UseGuards(AuthGuard('jwt'), SignedGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  changeUserRole(@Param('userId') userId: number, @Body() roleDto: RoleDto): Promise<User> {
    return this.usersService.changeUserRole(userId, roleDto);
  }

  @Delete(':userId/delete')
  @UseGuards(AuthGuard('jwt'), SignedGuard, RolesGuard)
  deleteUser(@Param('userId') userId: number): Promise<void> {
    return this.usersService.deleteUser(userId);
  }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'), SignedGuard, RolesGuard)
  getUser(@Param('userId') userId: number): Promise<User> {
    return this.usersService.getUser(userId);
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'), SignedGuard, RolesGuard)
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('orders')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  getOrders(@GetUser() user: User): Promise<Order[]> {
    return this.usersService.getOrders(user);
  }

  @Get('rentals')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  getRentals(@GetUser() user: User): Promise<Order[]> {
    return this.usersService.getOrders(user);
  }
}
