import { Card } from 'semantic-ui-react';

// function mapProductsToItems(products) uses an arr method to set the data to the corresponding properties
// the href is necessary for viewing indiv product detail pages

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map(product => ({
      header: product.name,
      image: product.image,
      meta: `$${product.price}`,
      color: 'olive',
      fluid: true,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }))
  }
  return <Card.Group stackable itemsPerRow="1" centered items={mapProductsToItems(products)}  />;
}

export default ProductList;