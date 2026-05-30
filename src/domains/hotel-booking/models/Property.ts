import { type Model, model, models, type ObjectId, Schema } from "mongoose";

interface Location {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface PropertyModelDoc {
  _id?: ObjectId;
  name: string;
  owner: ObjectId;
  description: string;
  location: Location;
  beds: number;
  rooms: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  avgRating: number;
  numReviews: number;
  reviews: string[];
  images: string[];
  is_Featured: boolean;
  pricePerNight: number;
}

const PropertySchema = new Schema<PropertyModelDoc>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false, // make it true
  },
  name: {
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
  rooms: {
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
  pricePerNight: {
    type: Number,
    required: true,
  },
  seller_info: {
    name: String,
    email: String,
    phone: String,
  },
  thumbNailUrl: String,
  avgRating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default: [],
    },
  ],
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

export default Property as Model<PropertyModelDoc>;
