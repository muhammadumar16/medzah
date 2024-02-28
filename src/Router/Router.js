import { useSelector } from "react-redux";
import AuthRouter from "./AuthRouter";
import PrivateRouter from "./PrivateRouter/index";

const Router = () => {
  const loggedUser = useSelector((state) => state.entities.users.loggedUser);
  return loggedUser ? <PrivateRouter /> : <AuthRouter />;
};

export default Router;
