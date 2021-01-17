import { gql } from "apollo-boost";

export const RegisterMutation = gql`
mutation Register($data : RegisterInput!) {
  Register(data : $data) {
    id
    email
    lastName
    firstName
    name
  }
}`;