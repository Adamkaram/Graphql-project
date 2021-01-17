import * as React from "react";
import Layout from "../components/Layout";
import { HelloComponent } from "../generated/apolloComponents";
export default () => {
  return (
    <Layout title = "hello">
      <HelloComponent>
        {({ data }) => (
          <div>{data && data.hello ? data.hello : "loding ....."}</div>
        )}
      </HelloComponent>
    </Layout>
  );
};
