import axios from "axios";

export const authenticateUser = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/clients/login",
      { email, password }
    );
    return response.data;
    
  } catch (error) {
    console.log("No se pudo authenticar:", error)
  }
};
