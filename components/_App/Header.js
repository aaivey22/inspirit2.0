import { Menu, Icon, Container, Image } from 'semantic-ui-react';
import Link from 'next/link';


// if user = true => show accnt and logout links wrapped in fragments <></> (because multiple components cannot be returned inside of a conditional)
// else is false => show login and signup links
function Header() {
  const user = false;
  return (
    <Menu secondary fluid id="menu" inverted>
      <Container text>
        <Link href="/" >
          <Menu.Item header>
            <Image 
            size="medium"
            src="/static/logo_transparent.png"
            style={{ marginRight: '1em' }}
            />
          </Menu.Item>
        </Link>

        <Link href="/cart" >
          <Menu.Item header>
            <Icon
            name="shopping bag" 
            size="large"
            />
            Shopping Bag
          </Menu.Item>
        </Link>

        {user && <Link href="/create" >
          <Menu.Item header>
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
              <Menu.Item header>
                <Icon
                name="user" 
                size="large"
                />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item header>
              <Icon
              name="sign out" 
              size="large"
              />
              Logout
            </Menu.Item>
          </>
          ) : (
          <>
            <Link href="/login" >
              <Menu.Item header>
                <Icon
                name="sign in" 
                size="large"
                />
                Login
              </Menu.Item>
            </Link>

            <Link href="/signup" >
              <Menu.Item header>
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
