import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Users from   "./pages/Users";
import Records from "./pages/record";
import AddRecord from "./pages/addRecord";
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedRoute";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute allowedRoles={["admin"]}><Layout><Users /></Layout></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute><Layout><Records /></Layout></ProtectedRoute>} />
        <Route path="/add-record" element={<ProtectedRoute allowedRoles={["admin", "analyst"]}><Layout><AddRecord /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;