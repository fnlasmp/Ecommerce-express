import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = "products";

const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    stock: Number,
    category: String,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;