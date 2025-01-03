import Property from "@/models/Property";

async function getAllProperties() {
  const allProperties = await Property.find().lean();
  return allProperties;
}

export { getAllProperties };
