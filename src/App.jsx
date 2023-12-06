import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import RootLayoutPage from "./pages/RootLayoutPage";
import NextPage from "./pages/NextPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayoutPage />}>
        <Route index element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/:id" element={<NextPage />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
