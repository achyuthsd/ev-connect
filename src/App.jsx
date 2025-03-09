import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Selection from './Selection';
import Booking from './Booking';
import Signup from './Signup';
import Help from './Help';

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <><Nav /><Home /><Footer /></>,
  // },
  {
    path: "/ev-connect",
    element: <><Nav /><Home /><Footer /></>,
  },
  {
    path: "/ev-connect/login",
    element: <><Nav /><Login /><Footer /></>,
  },
  {
    path: "/ev-connect/selection",
    element: <><Nav /><Selection /><Footer /></>,
  },
  {
    path: "/ev-connect/booking",
    element: <><Nav /><Booking /><Footer /></>,
  },
  {
    path: "/ev-connect/signup",
    element: <><Nav /><Signup /><Footer /></>,
  },
  {
    path: "/ev-connect/help",
    element: <><Nav /><Help /><Footer /></>,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

