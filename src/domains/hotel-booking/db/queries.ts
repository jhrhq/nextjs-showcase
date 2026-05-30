import connectDB from "@/domains/hotel-booking/config/database";
import Property from "@/domains/hotel-booking/models/Property";

async function getAllProperties(page: number, pageSize: number, search: string) {
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  const titlePattern = new RegExp(search, "i");

  const query = {
    $or: [{ title: titlePattern }],
  };

  if (search) {
    const total = await Property.countDocuments(query);
    const allProperties = await Property.find(query).skip(skip).limit(pageSize);
    return { allProperties, total };
  } else {
    const allProperties = await Property.find().skip(skip).limit(pageSize);
    return { allProperties, total };
  }
  // const searchResult = convertToSerializableObject(searches)
}
async function getSelectedPropertyDetails(propertyId: string) {
  await connectDB();
  const selectedProperty = await Property.findById(propertyId).lean();
  return selectedProperty;
}

export { getAllProperties, getSelectedPropertyDetails };
