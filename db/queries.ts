import Property from "@/models/Property";

async function getAllProperties(page, pageSize) {
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const allProperties = await Property.find().skip(skip).limit(pageSize);
  return { allProperties, total };
}

export { getAllProperties };
