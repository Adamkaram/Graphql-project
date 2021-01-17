import { gql } from "apollo-boost";

export const changePasswordMutation = gql`
mutation ChangePassword($data : ChangePasswordInput!){
    ChangePassword(data : $data){
        id
        firstName
        lastName
        email 
        name
    }
}
`