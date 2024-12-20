"use server";

import { createUser, findUserByCredentials } from "@/db/queries";

/* async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
} */

async function performRegister(formData) {
  try {
    const result = await createUser(formData);
    console.log(result);
    // return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);
    return found;
  } catch (error) {
    throw error;
  }
}

export { performLogin, performRegister };
