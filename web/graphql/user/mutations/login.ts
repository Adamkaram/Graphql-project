import { gql } from "apollo-boost";

export const loginMutation = gql`
mutation Login($email : String! , $password : String! ) {
  Login(email: $email, password: $password ) {
    id
    email
    lastName
    firstName
    name
  }
}`