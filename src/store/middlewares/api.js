import { apiCallBegan, apiCallSuccess, apiCallFailed } from "store/actions/api";
import ApiClient from "api/ApiClient";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { method, url, data, onStart, onSuccess, onError } = action.payload;

    next(action);

    if (onStart) dispatch({ type: onStart });

    try {
      const result = await ApiClient.any({ method, url, data });
      dispatch(apiCallSuccess(result.data));

      if (onSuccess) dispatch({ type: onSuccess, payload: result.data });
    } catch (error) {
      dispatch(apiCallFailed(error.message));

      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
