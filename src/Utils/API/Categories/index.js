import axios from "axios";
import { API_URL, options } from "../index";

export const getCategory = (id) => {
	const url = `${API_URL}/categories/${id}`;
	return axios.get(url, { headers: options });
};

export const statusUpdate = (id, body) => {
	const url = `${API_URL}/categories/${id}/status`;
	return axios.put(url, body, {
		headers: options,
	});
};

export const categoryDelete = (id) => {
	const url = `${API_URL}/categories/${id}`;
	return axios.delete(url, {
		headers: options,
	});
};

export const createCategory = (body) => {
	const url = `${API_URL}/categories`;
	return axios.post(url, body, {
		headers: options,
	});
};

export const editCategory = (id, body) => {
	const url = `${API_URL}/categories/${id}`;
	return axios.put(url, body, { headers: options });
};

export const getSubCategory = (websiteId, categoryId) => {
	const url = `${API_URL}/websites/${websiteId}/category/${categoryId}`;
	return axios.get(url, { headers: options });
};

