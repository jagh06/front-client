import { baseURL } from "@/baseUrl";
import axios from "axios";

export const authenticateUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${baseURL}api/clients/login`,
      { email, password }
    );
    return response.data;
    
  } catch (error) {
    console.log("No se pudo authenticar:", error)
  }
};

export const verifyKeyAndEmail= async (email, password) => {
  try {
    const response = await axios.post(
      `${baseURL}api/clients/login`,
      { email, password }
    );
    return response.data;
    
  } catch (error) {
    console.log("No se pudo authenticar:", error)
  }
};


