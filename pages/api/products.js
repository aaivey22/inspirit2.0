import products from '../../static/products.json'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
   const products = await Product.find()
   res.status(200).json(products)
    // console.log(req.method)
};

// the res obj returns meta info (status codes)
// data will be returned to the client if successful via the json method