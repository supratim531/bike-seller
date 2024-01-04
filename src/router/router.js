import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import AddBike from "../components/main/AddBike";
import AdminLogin from "../components/main/AdminLogin";
import Products from "../pages/Products";
import SpeceficProduct from "../pages/SpeceficProduct";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />}>
				<Route path="/" element={<Products />} />
				<Route path="/admin-login" element={<AdminLogin />} />
				<Route path="/add-bike" element={<AddBike />} />
				<Route path="specefic/:id" element={<SpeceficProduct />} />
			</Route>
		</>
	)
);

export default router;
