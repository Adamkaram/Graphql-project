import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/Fields/InputField";
import Layout from "../components/Layout";
import { ChangePasswordComponent } from "../generated/apolloComponents";
import { MyContext } from "../interfaces/MyContext";

const ChangePassword = ({token}: {token : string }) => {
  return (
    <Layout title="change Password page">
      <ChangePasswordComponent>
        {(changePassword) => (
          <Formik
            onSubmit={async (data) => {
              const response = await changePassword({
                variables: {
                  data: {
                    password: data.password,
                    token
                  },
                },
              });
              console.log(response);
              Router.push("/");
            }}
            initialValues={{
              password: "",
            }}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="password"
                  placeholder="password"
                  component={InputField}
                  type="password"
                />

                <button type="submit">Change password</button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({ query : {token}}: MyContext) => {
    return {
        token 
    }
}
export default ChangePassword;