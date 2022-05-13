import * as passport from 'passport';
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { prisma } from '../prismaConnect';
import * as bcrypt from 'bcryptjs';
import { User, UserInput, Context} from './resolversTypes';

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async getAllUsers() {
        return await prisma.user.findMany();
    }

    @Mutation(() => User)
    async register(@Arg('options', () => UserInput) options: UserInput) {
        let user = await prisma.user.findFirst({ where: { username: options.username } });
        if(user) return;
        const hashedPassword = await bcrypt.hash(options.password, 10);
        user = await prisma.user.create({
            data: {
                username: options.username,
                password: hashedPassword
            }
        });
        return user;
    }

    @Mutation(() => User)
    async login(@Arg('options', () => UserInput) options: UserInput, @Ctx() { req }: Context){
        passport.authenticate("local", (err, user) => {
            if(err) return err;
            if(!user) return;
            else{
                req.logIn(user, err => {
                    if(err) return;
                    return user;
                });
            }
        });
    }
}