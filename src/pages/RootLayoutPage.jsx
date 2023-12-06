import { Outlet } from "react-router-dom";

const RootLayoutPage = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayoutPage;
