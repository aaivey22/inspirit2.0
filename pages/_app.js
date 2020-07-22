import App from "next/app";
import Layout from '../components/_App/Layout';

// pages/_app provides access to every page component.
// This allows us pass down data and is useful for authenticating users and passing their data from page to page.
class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Layout>
        <Component />
      </Layout>
    )
  }
}

export default MyApp;
