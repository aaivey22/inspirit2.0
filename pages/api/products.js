// import products from '../../static/products.json'
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb()

export default async (req, res) => {
   const products = await Product.find()
   res.status(200).json(products)
    // console.log(req.method)
};
// shortid is generated when a new product is added to the collection and this is visible in the dev console.
// if the id is visible, then the db is connected
// the res obj returns meta info (status codes)
// data will be returned to the client if successful via the json method