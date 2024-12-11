import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
      <Home />
    </>
  );
}

export default App;
