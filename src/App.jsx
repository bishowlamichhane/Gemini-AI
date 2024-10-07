import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import ContextProvider from "./context/Context";
const App = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <ContextProvider>
      <div className="container">
        <Sidebar isOpen={isOpen} setisOpen={setisOpen} />
        <Main />
      </div>
    </ContextProvider>
  );
};

export default App;
