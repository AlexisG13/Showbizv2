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
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
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
import { LoginCredentialsDto } from 'src/auth/dto/login-credentials.dto';
import { GetToken } from 'src/auth/decorators/get-token.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { RoleDto } from './dto/role.dto';
import { SignedGuard } from 'src/auth/guards/signed.guard';
import { checkUrlId } from './utils/check-url-id';
import { OrderDto } from './dto/order.dto';
import { Rental } from '../rental/entities/rental.entity';
import { RentDto } from '../rental/dto/rent.dto';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { ResetTokenDto } from 'src/auth/dto/reset-token.dto';
import { NewPasswordDto } from 'src/auth/dto/new-password.dto';
import { ResetTokenGuard } from 'src/auth/guards/reset-token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSerializer } from './serializers/user.serializer';
import { RentalService } from 'src/rental/rental.service';
import { OrderService } from 'src/order/order.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly orderService: OrderService,
    private readonly rentalService: RentalService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() authcredentialsDTo: AuthCredentialsDto): Promise<UserSerializer> {
    return new UserSerializer(await this.authService.signUp(authcredentialsDTo));
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  buyMovie(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() order: OrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    if (!checkUrlId(userId, user.id)) {
      throw new UnauthorizedException('Unathorized userId in request');
    }
    return this.orderService.buyMovie(user, order);
  }

  @Post(':userId/rentals')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  @ApiBearerAuth()
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
    return this.rentalService.rentMovie(user, rentDto);
  }

  @Patch(':userId/rentals/:rentalId')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  @ApiBearerAuth()
  returnMovie(
    @Param('rentalId') rentalId: number,
    @GetUser() user: User,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    if (!checkUrlId(userId, user.id)) {
      throw new UnauthorizedException('Unathorized userId in request');
    }
    return this.rentalService.returnMovies(user, rentalId);
  }

  @Patch(':userId/roles')
  @UseGuards(AuthGuard('jwt'), SignedGuard, RolesGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  changeUserRole(@Param('userId') userId: number, @Body() roleDto: RoleDto): Promise<User> {
    return this.usersService.changeUserRole(userId, roleDto);
  }

  @Delete(':userId/delete')
  @UseGuards(AuthGuard('jwt'), SignedGuard, RolesGuard)
  @ApiBearerAuth()
  deleteUser(@Param('userId') userId: number): Promise<void> {
    return this.usersService.deleteUser(userId);
  }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'), SignedGuard, RolesGuard)
  @ApiBearerAuth()
  getUser(@Param('userId') userId: number): Promise<User> {
    return this.usersService.getUser(userId);
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'), SignedGuard, RolesGuard)
  @ApiBearerAuth()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('orders')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  @ApiBearerAuth()
  getOrders(@GetUser() user: User): Promise<Order[]> {
    return this.orderService.getOrders(user);
  }

  @Get('rentals')
  @UseGuards(AuthGuard('jwt'), SignedGuard)
  @ApiBearerAuth()
  getRentals(@GetUser() user: User): Promise<Rental[]> {
    return this.rentalService.getRentals(user);
  }

  @Post('password/recovery')
  recoverPassword(@Body() recoverPassword: ResetPasswordDto): void {
    this.authService.sendPasswordReset(recoverPassword);
  }

  @Patch('password/set')
  @UseGuards(AuthGuard('jwt-reset'), ResetTokenGuard)
  resetPassword(
    @Query() token: ResetTokenDto,
    @Body() newPassword: NewPasswordDto,
    @GetUser() user: User,
  ): void {
    this.authService.resetPassword(user, newPassword, token.jwt);
  }
}
