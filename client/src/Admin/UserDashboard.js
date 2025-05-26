import React from "react";
import AdminMenu from "../components/Layouts/AdminMenu";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth";

const UserDashboard = () => {
  const [auth]  = useAuth();
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <section>
          <AdminMenu />
        </section>
        <section>
          <div className="flex flex-col gap-2">
            <h1>User Name : {auth?.user?.name}</h1>
            <h2>User Email : {auth?.user?.email}</h2>
            <h3>User Contact : {auth?.user?.phone}</h3>
          </div>
        </section>
      </div>
    </Layout>
  );
};
export default UserDashboard;
