import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import { parseCookies } from 'nookies';

// destructure the user of the account that is being accessed and spread the user props into the header and orders components
function Account({ user }) {
  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders {...user} />
    </>
  )
}

Account.getInitialProps = async ctx => {
  
}

export default Account;
