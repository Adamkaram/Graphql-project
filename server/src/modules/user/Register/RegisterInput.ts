import { IsEmail, Length } from "class-validator";
import { PasswordMixin } from "../../Shared/PasswordInput";
import { Field, InputType } from "type-graphql";
import { IsUserAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput extends PasswordMixin(class { }) {
    @Length(5, 13)
    @Field()
    firstName: string;

    @Length(5, 13)
    @Field()
    lastName: string;

    @IsEmail()
    @Field()
    @IsUserAlreadyExist({ message: "email already in use" })
    email: string;
   
}