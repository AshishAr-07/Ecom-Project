import React from 'react'
import Layout from './components/Layouts/Layout';
import LoginForm from './auth/LoginForm';

function About() {
  return (
    <Layout title="About - Ecommerce App" >
      <div>Hello from About Page</div>
      <LoginForm/>
    </Layout>
  )
}

export default About;