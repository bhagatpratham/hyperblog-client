/* eslint-disable no-unused-vars */

import { Client, Account } from "appwrite";
import axios from "axios";

const client = new Client();
client
  .setEndpoint("http://localhost/v1") // Replace this
  .setProject("64831c1e5a23511db75b"); // Replace this

const account = new Account(client);

const promise = account.create("[USER_ID]", "email@example.com", "");

const registerUser = async (email, password) => {
  try {
    const response = await client.account.create(email, password);
    // Handle successful registration
  } catch (error) {
    // Handle error
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await client.account.createSession(email, password);
    // Save the session ID/token for future API calls
    axios.defaults.headers.common["X-Appwrite-Session"] = response.sessionId;
    // Handle successful login
  } catch (error) {
    // Handle error
  }
};

const logoutUser = async () => {
  try {
    await client.account.deleteSession("current");
    // Remove the session ID/token from the request headers
    delete axios.defaults.headers.common["X-Appwrite-Session"];
    // Handle successful logout
  } catch (error) {
    // Handle error
  }
};

export { registerUser, loginUser, logoutUser };
