import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(UserService)private readonly userService: UserService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: process.env.JWT_secret,
        });
    }

    async validate(payload: any) {
        // check if user in the token actually exist
        const user = await this.userService.findOne(payload.id);
        if (!user) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        return payload;
    }
}