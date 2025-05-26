import React from 'react'
import Layout from '../../components/Layouts/Layout'
import RegisterForm from '../../auth/Register'

export default function page() {
  return (
    <>
    <Layout title="Register">
      <RegisterForm/>
    </Layout>
    </>
  )
}
