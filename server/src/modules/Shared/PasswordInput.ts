import { ClassType, Field, InputType } from "type-graphql";


export const PasswordMixin = <T extends ClassType>(BaseClass: T) => { 
    @InputType({ isAbstract: true })
     class PasswordInput extends BaseClass{
    
        // @Min(5)
        @Field()
        password: string;
    }
    return PasswordInput;
}