import mongoose from 'mongoose';

const cartCollection = "carts";

const cartSchema = mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: Number
            }
        ],
        default: []
    }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;