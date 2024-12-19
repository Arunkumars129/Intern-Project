import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import SubcriptionPage from "./Pages/SubcriptionPage";
import MainPage from "./Pages/MainPage";
import SubmissionPage from "./Pages/SubmissionPage";
import Navbar from "./Components/Navbar";
import RootLayout from "./Components/RootLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/price", element: <SubcriptionPage /> },
      // {path:"/daseboard",element:<MainPage/>}
      {
        path: "/daseboard",
        element: <ProtectedRoute />,
        children: [{ path: "/daseboard", element: <MainPage /> }],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/create", element: <RegistrationPage /> },
  { path: "/Success", element: <SubmissionPage /> },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
