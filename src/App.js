import "./App.css";
import "./style/general.css";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer className="toast-container"
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
      />
      < AppRoutes />
    </div>
  );
}

export default App;
