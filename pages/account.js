import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import Axios from 'axios';

// destructure the user of the account that is being accessed and spread the user props into the header and orders components
// destructure orders and pass it down as a prop
function Account({ user, orders }) {
  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {user.role === "root" && <AccountPermissions />}
    </>
  )
}

// check to see if token is associated with a user
// the response will return an obj with an orders prop
Account.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { orders: [] }
  }
  const payload = { headers: {
    Authorization: token }}
    const url = `${baseUrl}/api/orders`
    const response = await Axios.get(url, payload)
    return response.data;
}

export default Account;
