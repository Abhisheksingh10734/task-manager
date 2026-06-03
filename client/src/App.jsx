import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <>
      <Toaster position="top-right" />
      {/* <Login /> */}
      <Signup />
    </>
  )
}

export default App