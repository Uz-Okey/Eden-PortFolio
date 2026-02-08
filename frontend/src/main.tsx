import './index.css'
import { createRoot } from "react-dom/client";
import { Toaster } from './components/ui/sonner';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./App/HomePage";
import MainLayout from './App/Layout/MainLayout';
import { Provider } from "react-redux";
import {store} from "./Redux/Store";
import LoginPage from './App/Auth/LoginPage';
import RegisterPage from './App/Auth/RegisterPage';
import PostPage from './App/pages/PostPage';
import ProtectRoute from './App/Auth/ProtectRoute';
const router = createBrowserRouter([
  {
    element: <MainLayout />,
     children: [{
      path: "/",
      element: <HomePage />

    },{
      path: "/LoginPage",
      element: <LoginPage />
    },{
      path: "/RegisterPage",
      element: <RegisterPage />
    },{
      path:"/PostPage",
      element: <ProtectRoute><PostPage/></ProtectRoute>
    }
  ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </Provider>
);
