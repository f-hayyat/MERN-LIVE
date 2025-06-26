import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
	const { user } = useSelector((state) => state.auth);

	if (!user || (role && user.role !== role)) {
		// If role is specified but user doesn't have required role
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;
