import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <RoutesComponent />

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;