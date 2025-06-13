import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 32,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 256,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
