import { graphql, GraphQLSchema } from "graphql"
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "../utils/CreateSchema";
interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    userId?: number,
};
let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues, userId }: Options) => {
    schema
    if (!schema) {
        schema = await createSchema()
    }

    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                session: {
                    userId
                }
            },
            res: {
                clearCookie: jest.fn()
            }
        }
    });
}