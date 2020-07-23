import React from 'react';
import { Divider, Segment, Button, Icon } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({ products }) {
  const [cartAmount, setCartAmount] = React.useState(0)
  const [stripeAmount, setStripeAmount] = React.useState(0)
  const [isCartEmpty, setIsCartEmpty] = React.useState(false)

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setIsCartEmpty(products.length === 0);
  }, [products]);
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <Button icon="cart"
        disabled={isCartEmpty}
        color="teal" floated="right"
        content="Checkout" />
      </Segment>
    </>
  )
}

export default CartSummary;
