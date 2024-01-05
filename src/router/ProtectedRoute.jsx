import React from 'react';
import Page404 from '../components/Page404/Page404';

const ProtectedRoute = ({ children }) => {

	if (!localStorage.getItem("token")) {
		return <Page404 />
	}

	return children;
}

export default ProtectedRoute;
