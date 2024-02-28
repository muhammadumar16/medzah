import { Provider } from "react-redux";
import Router from "./Router/Router";
import configureStore from "store/configureStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store = configureStore();
let persistor = persistStore(store);
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
