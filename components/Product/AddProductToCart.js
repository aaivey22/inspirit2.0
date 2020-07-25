import React from 'react';
import { Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';
import cookie from 'js-cookie';

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter()

  React.useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  async function handleAddProductToCart() {
    try{
      setLoading(true)
      const url = `${baseUrl}/api/cart`
      const payload = { quantity, productId }
      const token = cookie.get('token')
      const headers = { headers: { Authorization: token }}
      await axios.put(url, payload, headers)
      setSuccess(true)
    } catch (error) {
      catchErrors(error, window.alert)
    } finally {
      setLoading(false)
    }
  }

  return (
  <Input
    type="number"
    min="1"
    placeholder="Quantity"
    value={quantity}
    onChange={e => setQuantity(Number(e.target.value))}
    action={
      user && success ? {
      color: 'green',
      content: "Item Added",
      icon: "shopping bag",
      disabled: true
      } :
      user ? {
      color: 'green',
      content: "Add to Cart",
      icon: "shopping bag",
      loading,
      disabled: loading,
      onClick: handleAddProductToCart
    } : {
      color: 'teal',
      content: "Sign Up To Purchase",
      icon: "signup",
      onClick: () => router.push('/signup')
    }
  }
  />
  );
}

export default AddProductToCart;
