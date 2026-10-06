import axios from "axios";
import { API_URL, options } from "../index";

const request = (method, path, body) => {
  const url = `${API_URL}/manager/${path}`;
  const config = { headers: options };
  if (method === "get") {
    return axios.get(url, config);
  }
  if (method === "put") {
    return axios.put(url, body, config);
  }
  return axios.post(url, body, config);
};

export const getPageUrlCatalogs = () => request("get", "page-urls/catalogs");

export const searchPageUrls = (url) =>
  request("get", `page-urls/search?url=${encodeURIComponent(url)}`);

export const createPageUrl = (body) => request("post", "page-urls", body);

export const getPricingTourTypes = () =>
  request("get", "pricing-option-details/tour-types");

export const getPricingOptions = (tourTypeId) =>
  request("get", `pricing-option-details/pricing-options?tour_type_id=${tourTypeId}`);

export const getPricingSkuCodes = () =>
  request("get", "pricing-option-details/sku-codes");

export const createPricingOptionDetail = (body) =>
  request("post", "pricing-option-details", body);

export const createCharterType = (body) => request("post", "charter-types", body);

export const createCharterTypeFishing = (body) =>
  request("post", "charter-types-fishing", body);

export const getAirportTransferForms = () => request("get", "airport-transfers");

export const getAirportTransferForm = (webCode, type) =>
  request("get", `airport-transfers/${encodeURIComponent(webCode)}/${encodeURIComponent(type)}`);

export const createAirportHotel = (webCode, type, body) =>
  request("post", `airport-transfers/${encodeURIComponent(webCode)}/${encodeURIComponent(type)}/hotels`, body);

export const updateAirportHotel = (webCode, type, id, body) =>
  request("put", `airport-transfers/${encodeURIComponent(webCode)}/${encodeURIComponent(type)}/hotels/${id}`, body);

export const createAirportAirline = (webCode, type, body) =>
  request("post", `airport-transfers/${encodeURIComponent(webCode)}/${encodeURIComponent(type)}/airlines`, body);

export const updateAirportAirline = (webCode, type, id, body) =>
  request("put", `airport-transfers/${encodeURIComponent(webCode)}/${encodeURIComponent(type)}/airlines/${id}`, body);

export const clearAirportCache = (webCode, type) =>
  request("post", `airport-transfers/${encodeURIComponent(webCode)}/${encodeURIComponent(type)}/clear-cache`, {});

export const searchRelatedTours = (q, excludeTourId) => {
  const params = new URLSearchParams();
  params.set("q", q);
  if (excludeTourId) {
    params.set("exclude_tour_id", String(excludeTourId));
  }
  return request("get", `related-tours/search?${params.toString()}`);
};

export const getRelatedTour = (tourId) => request("get", `related-tours/${tourId}`);

export const previewRelatedTours = (body) => request("post", "related-tours/preview", body);

export const saveRelatedTours = (body) => request("put", "related-tours", body);
