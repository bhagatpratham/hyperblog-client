/* eslint-disable no-unused-vars */
import { Client, Account, ID, Storage, Databases } from "appwrite";

// initialize SDK
const client = new Client();
client
  .setEndpoint("http://localhost/v1") 
  .setProject("64823d3930408fb9e797"); 

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
// const createAccount = account.create(
//   ID.unique(),
//   "bhagatpratham101@gmail.com",
//   "pra123156",
//   "pratham"
// );

// console.log(createAccount);
