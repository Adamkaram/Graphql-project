import { gql } from "apollo-boost"

export const MeMutation = gql`
query Me {
    me{
        id 
        firstName
        lastName
        email
        name
    }
}
`