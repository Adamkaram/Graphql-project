import { gql } from 'apollo-boost'
export const forgetPasswordMutation = gql`
mutation ForgetPassword ($email : String! ){
    ForgetPassword(email : $email)
}
`