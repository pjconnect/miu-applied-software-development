import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {Home} from "./pages/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
];

export default AppRoutes;
