import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/use.schema';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    //register a new user
    @Post('/signUp')
    signUser(@Body() signUpDto: SignUpDto): Promise<{token: string}> {
        return this.authService.signUp(signUpDto)
    }

    //login of user
    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{token: string}> {
        return this.authService.login(loginDto)
    }

}
