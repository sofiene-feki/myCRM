import React, { lazy, Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import CrmAppbar from "./components/appbar";
import Admin from "./pages/admin";
import ContractCreate from "./pages/admin/contractCreate";
import Quality from "./pages/quality";
import Sav from "./pages/sav";
import WelcomeCall from "./pages/welcome-call";
import ContractDetails from "./pages/admin/contractDetails";
import UserProvider from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import RequireAuth from "./protectedRoutes/RequireAuth";
import Auth from "./pages/auth/Auth";
import ContractUpdate from "./pages/admin/contractUpdate";
import Stat from "./pages/admin/stat";
import Users from "./pages/admin/users";
import Kavkom from "./pages/admin/testKavkom";
import DataFactory from "./pages/admin/dataFactory";
import "./App.css";

const Login = lazy(() => import("./pages/login"));

function App() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),

    [darkMode]
  );

  return (
    <Suspense>
      <ThemeProvider theme={darkTheme}>
        <CrmAppbar dark={darkMode} />
        <UserProvider>
          <ToastContainer autoClose={700} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Auth />} />

            <Route
              element={
                <RequireAuth allowedRoles={["admin", "sav", "superviseur"]} />
              }
            >
              <Route path="/sav" element={<Sav />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={["admin", "quality", "superviseur"]}
                />
              }
            >
              <Route path="/quality" element={<Quality />} />
            </Route>
            <Route
              element={
                <RequireAuth allowedRoles={["admin", "wc", "superviseur"]} />
              }
            >
              <Route path="/wc" element={<WelcomeCall />} />
            </Route>
            <Route
              element={<RequireAuth allowedRoles={["admin", "superviseur"]} />}
            >
              <Route path="/admin" element={<Admin />} />
              <Route path="/DataFactory" element={<DataFactory />} />

              <Route
                path="/dataFactory/:tableName"
                element={<ContractCreate />}
              />
              <Route path="/admin/stats" element={<Stat />} />
              <Route
                path="contract-update/:slug/:energie"
                element={<ContractUpdate />}
              />
              <Route path="/admin/users" element={<Users />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    "admin",
                    "quality",
                    "wc",
                    "sav",
                    "backOffice",
                    "superviseur",
                  ]}
                />
              }
            >
              <Route
                path="contract-details/:slug/:energie"
                element={<ContractDetails />}
              />
            </Route>
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
