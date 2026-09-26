import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
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
