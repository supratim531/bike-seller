import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import SpeceficProduct from "../pages/SpeceficProduct";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />}>
				<Route path="/" element={<Products />} />
				<Route path="specefic/:id" element={<SpeceficProduct />} />
			</Route>
		</>
	)
);

export default router;
