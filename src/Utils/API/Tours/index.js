import axios from "axios";
import { API_URL, options } from "../index";



//general request
export const statusUpdateTour = (id, body) => {
    const url = `${API_URL}/tours/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const deleteTourAPI = (id) => {
    const url = `${API_URL}/tours/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };
  export const getTourAPI = (id) => {
    const url = `${API_URL}/tours/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const createTourAPI = (body) => {
    const url = `${API_URL}/tours`;
    return axios.post (url, body, {
      headers: options,
    });
  };



  //settings
  export const getTourSettingsAPI = (id) => {
    const url = `${API_URL}/tours/${id}/settings`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getSeasonsAPI = () => {
    const url = `${API_URL}/seasons`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getAvailableFromAPI = () => {
    const url = `${API_URL}/availableFrom`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const shoppingCartWebsite = (id) => {
    const url = `${API_URL}/websites/${id}/carts`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const providerWebsite = (id) => {
    const url = `${API_URL}/websites/${id}/providers`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const operatorWebsite = (id) => {
    const url = `${API_URL}/websites/${id}/operators`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const putSettingsAPI = (id, body) => {
    const url = `${API_URL}/tours/${id}/settings`;
    return axios.put (url, body, {
      headers: options,
    });
  };

//Pricing
export const getPricesPricingAPI = (id) => {
  const url = `${API_URL}/tours/${id}/prices`;
  return axios.get (url, {
    headers: options,
  });
};

export const getAddonsPricingAPI = (id) => {
  const url = `${API_URL}/tours/${id}/addons`;
  return axios.get (url, {
    headers: options,
  });
};

export const postPricesAPI = (body) => {
  const url = `${API_URL}/prices`;
  return axios.post (url,body, {
    headers: options,
  });
};

export const getPriceAPI = (id) => {
  const url = `${API_URL}/prices/${id}`;
  return axios.get (url, {
    headers: options,
  });
};

export const updatePriceAPI = (id, body) => {
  const url = `${API_URL}/prices/${id}`;
  return axios.put (url, body, {
    headers: options,
  });
};



//pricing options select

export const getPricingOptionsAPI = (id) => {
  const url = `${API_URL}/pricingOptions/${id}/items`;
  return axios.get (url, {
    headers: options,
  });
};
export const getPricingZoneOptionsAPI = (id, provider_id) => {
  const url = `${API_URL}/pricingOptions/${id}/items/${provider_id}`;
  return axios.get (url, {
    headers: options,
  });
};