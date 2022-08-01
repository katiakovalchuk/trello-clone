import Router from "./routes";
import {ModalContextProvider} from "./context/modalContext";

import './App.scss';

function App() {
  return (
    <ModalContextProvider>
      <Router />
    </ModalContextProvider>
  );
}

export default App;
