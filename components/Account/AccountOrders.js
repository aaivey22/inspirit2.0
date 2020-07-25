import { Header, Accordion, Label, Segment, Icon, Button, List, Image} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import formatDate from '../../utils/formatDate';



function AccountOrders({ orders }) {
  const router = useRouter()

  function mapOrdersToPanels(orders) {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label basic content={formatDate(order.createdAt)} />
      },
      content: {
        content: (
          <>
            <List.Header as ="h3">
              Total: ${order.total}
              <Label
                content={order.email}
                icon="mail outline"
                color="brown"
                basic
                horizontal
                style={{ marginLeft: '1em' }}
              />
            </List.Header>
            <List>
              {order.products.map(p => (
                <List.Item>
                  <Image avatar src={p.product.image} />
                  <List.Content>
              <List.Header>{p.product.name}</List.Header>
              <List.Description>
                {p.quantity} x ${p.product.price}
              </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label tag color="green" size="small">
                      {p.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }))
  }

  return <>
      <Header as="h2">
        <Icon name="list" />
        Purchase History
      </Header>
      {orders.length === 0 ? (
        <Segment
        textAlign="center">
          <Header icon>
            <Icon name="x" />
            No purchase history
          </Header>
          <div>
            <Button onClick={() => router.push('/')} color="green">
              View Products
            </Button>
          </div>
        </Segment>
        ) : (
        <Accordion 
          fluidstyled
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
  </>
}

export default AccountOrders;
