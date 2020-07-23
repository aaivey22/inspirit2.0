import { Menu, Icon, Container, Image } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { handleLogout } from '../../utils/auth';

// NProgress displays/hides the loading progress of a new page
// This happens by hooking parts of the lifecycle during a route change from one to the other
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();


// if user = true => show accnt and logout links wrapped in fragments <></> (because multiple components cannot be returned inside of a conditional)
// else is false => show login and signup links
function Header({ user }) {
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;
  console.log(user);

  // returns true if route matches the router.pathname
  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Menu secondary stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/" >
          <Menu.Item header active={isActive("/")}>
            <Image 
            size="medium"
            src="/static/logo_transparent.png"
            style={{ marginRight: '1em' }}
            />
          </Menu.Item>
        </Link>

        <Link href="/cart" >
          <Menu.Item header active={isActive("/cart")}>
            <Icon
            name="shopping bag" 
            size="large"
            />
            Shopping Bag
          </Menu.Item>
        </Link>

        {isRootOrAdmin && <Link href="/create" >
          <Menu.Item header active={isActive("/create")}>
            <Icon
            name="plus" 
            size="large"
            />
            Inventory
          </Menu.Item>
        </Link>}
        {user ? (
          <>
            <Link href="/account" >
              <Menu.Item header active={isActive("/account")}>
                <Icon
                name="user" 
                size="large"
                />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item onClick={handleLogout} header>
              <Icon
              name="sign out" 
              size="large"
              />
              Logout
            </Menu.Item>
          </>
          ) : (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive("/login")}>
                <Icon
                name="sign in" 
                size="large"
                />
                Login
              </Menu.Item>
            </Link>

            <Link href="/signup" >
              <Menu.Item header active={isActive("/signup")}>
                <Icon
                name="sign in" 
                size="large"
                />
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  )
}

export default Header;
