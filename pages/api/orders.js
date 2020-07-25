import Order from '../../models/Order';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb()

// endpoint to get user orders data and is stored in the const orders variable
// the try{} will get the user id which is associated with the order
// the populate method is used to retrieve the product data
export default async (req, res) => {
    try {
        const { userId } = jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        const orders = await Order.find({ user: userId }).
        populate({
            path: "products.product",
            model: "Product"
        })
        res.status(200).json({ orders })
    }   catch (error) {
        console.error(error)
        res.status(403).send("Please login again")
    }
}