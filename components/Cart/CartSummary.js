import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import { Divider, Segment, Button } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0)
  const [stripeAmount, setStripeAmount] = React.useState(0)
  const [isCartEmpty, setCartEmpty] = React.useState(false)

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <StripeCheckout
          name="Inspirit"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.image : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_51H8HBjGcWa9dT7icftQZtHZjQke40yb0G8JdYIvbZkmEaJWtvwRxUqDhvq8BP6SwZj3NKVzievd4BGLgxA3Nx2cA00iE0HFSMH"
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button
            icon="shopping bag"
            disabled={isCartEmpty || success}
            color="green"
            floated="right"
            content="Checkout"
          />
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
