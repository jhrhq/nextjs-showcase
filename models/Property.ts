import { model, models, Schema } from "mongoose";

const PropertySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false, // make it true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  square_feet: {
    type: Number,
    required: true,
  },
  amenities: [
    {
      type: String,
    },
  ],
  rates: {
    nightly: String,
    weekly: String,
    monthly: String,
  },
  seller_info: {
    type: String,
    email: String,
    phone: String,
  },
  images: [
    {
      type: String,
    },
  ],
  is_Featured: {
    type: Boolean,
    default: true,
  },
});

const Property = models.properties || model("properties", PropertySchema);

export default Property;
