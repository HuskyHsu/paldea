import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="m-8">
      <Outlet />
    </div>
  );
}

export default Main;
