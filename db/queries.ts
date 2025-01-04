import Property from "@/models/Property";

async function getAllProperties(
  page: number,
  pageSize: number,
  search: string
) {
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

export { getAllProperties };
