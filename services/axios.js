import axios from "axios";
const urlBase = "https://reqres.in/api/login";
export default async function axiosFetch(user) {
  try {
    const response = await axios({
      url: urlBase,
      method: "POST",
      data: user,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
