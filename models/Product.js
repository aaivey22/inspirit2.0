import mongoose from 'mongoose'
import shortid from 'shortid'

const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true,
        default: shortid.generate()
    },
    options: {
        type: [String],
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)

// If the model already exists, it will be used
// Or it will be created