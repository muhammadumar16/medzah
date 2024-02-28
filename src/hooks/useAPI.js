import { useState } from "react";
import { toast } from "react-toastify";

const useAPI = (apiFunc) => {
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);
    return response;
  };

  return { request, loading };
};

export default useAPI;
