import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            firstName: any;
            lastName: any;
            email: any;
            role: any;
            avatarUrl: any;
            phone: any;
            title: any;
            department: any;
            barNumber: any;
            bio: any;
        };
    }>;
}
