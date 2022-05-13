import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType()
export class User{
    @Field(() => ID)
    id: number;

    @Field()
    username: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}

@InputType()
export class UserInput{
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
export class Errors{
    @Field()
    field: string;

    @Field()
    message: string;
}

export interface Context {
	req: Express.Request;
	res: Express.Response;
}