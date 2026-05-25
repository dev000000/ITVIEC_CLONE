import { useRoutes } from "react-router-dom";
import { routes } from "@/routes";

function AllRouter() {
  const element = useRoutes(routes);
  return <>{element}</>;
}

export default AllRouter;