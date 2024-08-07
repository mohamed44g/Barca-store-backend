import mongoose from "mongoose";

const tshirtsSchema = new mongoose.Schema({
  //   _id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //   },

  name: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

const tshirts = mongoose.model("T-shirts", tshirtsSchema);

export default tshirts;
