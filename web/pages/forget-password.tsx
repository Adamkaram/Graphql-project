import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/Fields/InputField";
import Layout from "../components/Layout";
import { ForgetPasswordComponent} from "../generated/apolloComponents";

export default () => {
  return (
    <Layout title="forget Password page">
      <ForgetPasswordComponent>
        {ForgetPassword => (
          <Formik
          
            onSubmit={async (data) => {
                const response = await ForgetPassword({
                  variables: data
                });
                console.log(response);
                Router.push("/check-email");
            }}
            initialValues={{
              email: "",
            
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
               
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                
                <button type="submit">send Email</button>
              </form>
            )}
          </Formik>
        )}
      </ForgetPasswordComponent>
    </Layout>
  );
};