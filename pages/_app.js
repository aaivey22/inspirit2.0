import App from "next/app";
import Layout from '../components/_App/Layout';

// pages/_app provides access to every page component.
// This allows us pass down data and is useful for authenticating users and passing their data from page to page.
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps: pageProps };
  }

  render() {
    const { Component, pageProps  } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

// ... spread obj operator spreads in all obj props
export default MyApp;
