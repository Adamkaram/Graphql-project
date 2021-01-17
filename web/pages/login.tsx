import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { LoginComponent, MeQuery } from "../generated/apolloComponents";
import { MeMutation } from "../graphql/user/queries/me";

export default () => {
  return (
    <Layout title="Login page">
      <LoginComponent>
        {login => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              const response = await login({
                variables: data, 
                update: (cache,   {data} ) => {
                  if (!data || data.Login) {
                    return;
                  }
                  cache.writeQuery<MeQuery>({
                    query: MeMutation,
                    data: {
                      __typename : 'Query',
                       me : data.Login
                     }
                  })
                }
                
              });
              console.log(response);
              if (response && response.data && !response.data.login) {
                setErrors({
                  email: "invalid login"
                });
                return;
              }

              Router.push("/");
            }}
            initialValues={{
              email: "",
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">submit</button>
              </form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
};
