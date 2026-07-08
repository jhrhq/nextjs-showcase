import Property, { IPropertyDocument } from "@/domains/hotel-booking/models/Property.model";

type PaginatedProperties = {
  allProperties: IPropertyDocument[];
  total: number;
};

async function getAllProperties(
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
): Promise<PaginatedProperties> {
  const skip = (page - 1) * pageSize;

  const query = search ? { $or: [{ title: new RegExp(search, "i") }] } : {};

  const total = await Property.countDocuments(query);
  const allProperties = await Property.find(query).skip(skip).limit(pageSize).lean<IPropertyDocument[]>();

  return { allProperties, total };
}

async function getSelectedPropertyDetails(propertyId: string): Promise<IPropertyDocument | null> {
  return Property.findById(propertyId).lean<IPropertyDocument>();
}

export { getAllProperties, getSelectedPropertyDetails };
