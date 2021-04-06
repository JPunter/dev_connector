import axios from "axios";
import api from "../utils/api";
import { setAlert } from "./alert";

import {
	GET_PROFILE,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
} from "./types";

// Get current uses profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await api.get("/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const res = await api.post("/profile", formData);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

		if (!edit) {
			history.push("/dashboard");
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const res = await api.put("/profile/experience", formData);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Experience added.", "success"));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const res = await api.put("/profile/education", formData);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Education added.", "success"));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await api.delete(`/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Experience removed.", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await api.delete(`/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Education removed.", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete Account
export const deleteAccount = (id) => async (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			const res = await api.delete(`/profile`);

			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });

			dispatch(setAlert("Your account has been successfully deleted."));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	}
};
