import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="m-8">
      header
      <Outlet />
    </div>
  );
}

export default Main;
