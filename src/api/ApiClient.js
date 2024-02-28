import { create } from "apisauce";

const ApiClient = create({
  baseURL: process.env.REACT_APP_API_URL,
});

ApiClient.addRequestTransform((req) => {
  console.log("Request => ", req);
  const user = JSON.parse(localStorage.getItem("loggedUserInfo"));
  console.log("User Token => ", user?.loginToken);

  if (user) req.headers["authorization"] = `${user?.loginToken}`;
});

export default ApiClient;
