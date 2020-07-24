import React from 'react';
import { Form, Input, TextArea, Header, Button, Icon, Message, Image } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT ={
    name: "",
    price: "",
    image: "",
    description: ""
}

function CreateProduct() {

  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [imagePreview, setImagePreview] = React.useState('')
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean
      (el));
      isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);
  
  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct(prevState => ({ ...prevState, image: files[0] }));
      setImagePreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  async function handleImageUpload() {
    const data = new FormData()
    data.append('file', product.image)
    data.append('upload_preset', 'inspiritMedia')
    data.append('cloud_name', 'iveycloud')
    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const image = response.data.url
    return image;
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true)
      setError('')
      const image = await handleImageUpload()
      const url = `${baseUrl}/api/product`
      const { name, price, description } = product;
      const payload = { name, price, description, image };
      const response = await axios.post(url, payload);
      // console.log({response})
      setProduct(INITIAL_PRODUCT)
      setSuccess(true)
    } catch(error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
        <Message 
        error
        header="Oops!"
        content={error}
        />
        <Message 
        success
        icon="check"
        header="Success!"
        content="You product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="image"
            label="Image"
            type="file"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
  
          <Image src={imagePreview} rounded centered size="small" />

          <Form.Field
            control={TextArea}
            name="description"
            label="Description"
            placeholder="description"
            value={product.description}
            onChange={handleChange}
          />
          <Form.Field
            control={Button}
            disabled={disabled || loading}
            color="blue"
            icon="pencil alternate"
            cotent="Submit"
            type="submit"
          />

      </Form>
    </>
  )
};

export default CreateProduct;
