import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

const router = createBrowserRouter([
  {
    path: "/ev-connect/",
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

