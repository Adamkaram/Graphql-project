import { gql } from "apollo-boost";


export const logoutMuation = gql`
mutation Logout {
    logout
}
`