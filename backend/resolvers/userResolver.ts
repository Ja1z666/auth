import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { prisma } from '../prismaConnect';
import * as bcrypt from 'bcryptjs';

@ObjectType()
class User{
    @Field(() => ID)
    id: number;

    @Field()
    username: String;

    @Field()
    password: String;
}

@InputType()
class UserInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async getAllUsers() {
        return await prisma.user.findMany();
    }

    @Mutation(() => User)
    async register(@Arg("options", () => UserInput) options: UserInput) {
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
}