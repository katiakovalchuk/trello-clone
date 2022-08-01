import {Route, Routes} from "react-router-dom";
import Boards from "./components/Boards";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Boards />}/>
      <Route path="/boards/:id" element={""} />
      <Route path="*" element={"Not found"} />
    </Routes>
  )
}

export default Router;
