import React from 'react';
import Axios from 'axios'; //http library


function Home() {
  // performs a sideEffect hook by making a request to an external api
    React.useEffect(() => {
    getProducts();
  }, []);

  // we receive the data and put it in a variable, this is possible with async funcs
  // async returns a promise and resolves it with await
  async function getProducts() {
    const url = 'http://localhost:3000/api/products';
    const response = await Axios.get(url);
    console.log(response.data);
  }

  return <>home</>;
}

export default Home;
