import { BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Layout role="Admin">
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
