import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/store";
import { setTokens } from "./store/reducers/authReducer";
import HomePage from "./pages/homepage";
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import NotFoundPage from "./pages/errorPage";
import Layout from "./layouts/layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LazyComponent from './components/LazyComponent';
import ResetPasswordPage from './components/auth/resetPassword';
import ForgotPasswordPage from './components/auth/forgotPassword';
import AuthPage from './components/auth/authenticate';

import CreateForm from './components/forms/createform';
import GetAllForms from './components/forms/getallform';
import CreateContent from './components/content/createContent';
import GetAllContents from './components/content/getallContent';

const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));
const UserDashboard = React.lazy(() => import("./components/UserDashboard"));
const Profile = React.lazy(() => import("./components/user/profile"));
const EditUser = React.lazy(() => import("./components/user/editUser"));
const AllUsers = React.lazy(() => import("./components/user/alluser"));
const ChangePassword = React.lazy(() => import("./components/user/changePassword"));

function App() {
  const dispatch = useDispatch();
  const { role } = useAppSelector((state) => state.auth);

 useEffect(() => {
   const accessToken = localStorage.getItem("accessToken");
   const refreshToken = localStorage.getItem("refreshToken");
   const role = localStorage.getItem("role");
   const user = localStorage.getItem("user")
     ? JSON.parse(localStorage.getItem("user")!)
     : {};

   if (accessToken && refreshToken && role) {
     dispatch(setTokens({ accessToken, refreshToken, role, user }));
   }
 }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
            <Layout role={role} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <LazyComponent>
              {role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
            </LazyComponent>
          }
        />
        <Route
          path="profile"
          element={
            <LazyComponent>
              <Profile />
            </LazyComponent>
          }
        />
        <Route
          path="editUser"
          element={
            <LazyComponent>
              <EditUser />
            </LazyComponent>
          }
        />
        <Route
          path="users"
          element={
            <LazyComponent>
              <AllUsers />
            </LazyComponent>
          }
        />
        <Route
          path="changePassword"
          element={
            <LazyComponent>
              <ChangePassword />
            </LazyComponent>
          }
        />
         <Route path="/forms" element={<GetAllForms />} />
         <Route path="/forms/create" element={<CreateForm />} />
         <Route path="/forms/update/:id" element={<CreateForm />} />
         <Route path="/contents" element={<GetAllContents />} />
         <Route path="/contents/create" element={<CreateContent />} />
         <Route path="/contents/update/:id" element={<CreateContent />} />

      </Route>
     
    </Routes>
  );
}

export default App;
