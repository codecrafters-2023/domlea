import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// ======Admin routes =====
import AdminRoute from './Admin/components/AdminRoute';
import AdminPanel from './Admin/pages/AdminPanel/AdminPanel';

// ======User routes =====
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/Forgot-password/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import './App.css';
import About from './pages/About';
import Contact from './pages/Contact';
import AddDomainPage from './Admin/pages/AddDomain';
import Domain from './Admin/pages/Domains/Domains';
import EditDomain from './Admin/pages/EditDomain';
import { AnimatePresence } from 'framer-motion';
import DomainList from './pages/Domains';
import DomainSearch from './pages/DomainSearch';
import DomainDetails from './pages/DomainDetails';


function App() {
  return (
    <AnimatePresence>
      <Router>
        <AuthProvider>
          {/* <Header /> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* ===============User Routes============*/}

            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/domainList" element={<DomainList />} />
            <Route path="/domainsearch" element={<DomainSearch />} />
            <Route path="/:domainName" element={<DomainDetails />} />
            {/* </Route> */}

            {/* ============Admin Routes=============== */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/addDomain" element={<AddDomainPage />} />
              <Route path="/domains" element={<Domain />} />
              <Route path="/editDomain/:id" element={<EditDomain />} />
            </Route>
          </Routes>
          <ToastContainer />
          {/* <Footer /> */}
        </AuthProvider>
      </Router>
    </AnimatePresence>
  );
}

export default App;