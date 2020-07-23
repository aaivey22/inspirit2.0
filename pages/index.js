import React from 'react';
import Axios from 'axios';
import ProductList from '../components/Index/ProductList';
import baseUrl from '../utils/baseUrl';

function Home({ products }) {
  // console.log(products);
  // React.useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts() {
  //   const url = 'http://localhost:3000/api/products';
  //   const response = await Axios.get(url);
  //   console.log(response.data);
  // }

  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
    // Receive the data and put it in a variable, this is possible with async funcs
    // Async returns a promise and resolves it with await
    // This method receives data and add it to the Home component props
    // Fetch data on server and return response data as an obj
    // This obj is merged with existing props (will not overwrite)

  // const url = 'http://localhost:3000/api/products';
  const url = `${baseUrl}/api/products`;
  const response = await Axios.get(url);
  return { products: response.data }
};

export default Home;
