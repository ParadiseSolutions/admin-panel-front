import axios from "axios";
import { API_URL, options } from "../index";

//trigger update
export const triggerUpdate = () => {
  const url = `${API_URL}/tours/updatePivotTables`;
  return axios.get (url, {
    headers: options,
  });
};

  //general request
  export const statusUpdateTour = (id, body) => {
    const url = `${API_URL}/tours/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const statusUpdatePrice = (id, body) => {
    const url = `${API_URL}/prices/${id}/status`;
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
  export const putTourNameEditAPI = (id, body) => {
    const url = `${API_URL}/tours/${id}/name `;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const getLocationWebsitePI = (id) => {
    const url = `${API_URL}/websites/${id}/locations`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getCategoryWebsiteAPI = (id) => {
    const url = `${API_URL}/websites/${id}/categories`;
    return axios.get (url, {
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
    const url = `${API_URL}/seasons`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getAvailableAPI = () => {
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


//high seasons
export const getSeasonsListAPI = (id) => {
  const url = `${API_URL}/tours/${id}/seasons`;
  return axios.get (url, {
    headers: options,
  });
};
export const getSeasonsNameAPI = () => {
  const url = `${API_URL}/seasons`;
  return axios.get (url, {
    headers: options,
  });
};
export const getSeasonalityAPI = (tourID) => {
  const url = `${API_URL}/tours/${tourID}/scheduleDates`;
  return axios.get (url, {
    headers: options,
  });
};
export const postSeasonalityAPI = (tourID, body) => {
  const url = `${API_URL}/tours/${tourID}/seasonality`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const putSeasonalityAPI = (tourID, body) => {
  const url = `${API_URL}/tours/${tourID}/seasonality`;
  return axios.put (url, body, {
    headers: options,
  });
};

export const putSeasonalAPI = (tourID, body) => {
  const url = `${API_URL}/tours/${tourID}/scheduleDate`;
  return axios.put (url, body, {
    headers: options,
  });
};

export const statusSeasonalityAPI = (tourID, body) => {
  const url = `${API_URL}/tours/${tourID}/seasonality/status`;
  return axios.put (url,body, {
    headers: options,
  });
};
export const deleteSeasonalityAPI = (tourID, seasonID) => {
  const url = `${API_URL}/tours/${tourID}/seasonality/${seasonID}`;
  return axios.delete (url, {
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

export const deletePriceAPI = (id) => {
  const url = `${API_URL}/prices/${id}`;
  return axios.delete (url, {
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


//addons

export const postAddonsAPI = (body) => {
  const url = `${API_URL}/addons`;
  return axios.post (url,body, {
    headers: options,
  });
};


export const getAddonAPI = (id) => {
  const url = `${API_URL}/addons/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const putAddonAPI = (id, body) => {
  const url = `${API_URL}/addons/${id}`;
  return axios.put (url, body,{
    headers: options,
  });
};

export const deleteAddonAPI = (id) => {
  const url = `${API_URL}/addons/${id}`;
  return axios.delete (url, {
    headers: options,
  });
};



//URLs Tab

export const getURLsAPI = (id) => {
  const url = `${API_URL}/tours/${id}/tourUrls`;
  return axios.get (url, {
    headers: options,
  });
};
export const getURLTypeAPI = (id) => {
  const url = `${API_URL}/tours/${id}/urlTypes`;
  return axios.get (url, {
    headers: options,
  });
};
export const getURLAvailableFromAPI = (tourID, TypeID) => {
  const url = `${API_URL}/tours/${tourID}/urlType/${TypeID}/availablesFrom`;
  return axios.get (url, {
    headers: options,
  });
};
export const getPathAPI = (tourID, TypeID, locationID) => {
  const url = `${API_URL}/tours/${tourID}/urlType/${TypeID}/availablesFrom/${locationID}`;
  return axios.get (url, {
    headers: options,
  });
};


export const postURLAPI = (body) => {
  const url = `${API_URL}/tour_urls`
  return axios.post (url, body, {
    headers: options,
  });
};
export const updateURLAPI = (id, body) => {
  const url = `${API_URL}/tour_urls/${id}`
  return axios.put (url, body, {
    headers: options,
  });
};

export const deleteURL = (urlID) => {
  const url = `${API_URL}/tour_urls/${urlID}`
  return axios.delete (url, {
    headers: options,
  });
};
//schedules

export const getScheduleTimeAPI = (id) => {
  const url = `${API_URL}/tours/${id}/scheduleTimes`
  return axios.get (url, {
    headers: options,
  });
};

export const getScheduleDatesOverrideAPI = (id) => {
  const url = `${API_URL}/tours/${id}/scheduleDatesOverride`
  return axios.get (url, {
    headers: options,
  });
};

export const getScheduleTypesAPI = () => {
  const url = `${API_URL}/scheduletypes/times`
  return axios.get (url, {
    headers: options,
  });
};

export const postSchedule = (id, body) => {
  const url = `${API_URL}/tours/${id}/scheduleTime`
  return axios.post (url, body, {
    headers: options,
  });
};
export const putSchedule = (id, body) => {
  const url = `${API_URL}/tours/${id}/scheduleTime`
  return axios.put (url, body, {
    headers: options,
  });
};

export const getScheduleEditDataAPI = (tour_id, id) => {
  const url = `${API_URL}/tours/${tour_id}/scheduleTime/${id}`
  return axios.get (url, {
    headers: options,
  });
};

export const deleteSchedule = (Tourid, dateID) => {
  const url = `${API_URL}/tours/${Tourid}/scheduleTime/${dateID}`
  return axios.delete (url, {
    headers: options,
  });
};


// overrite dates
export const postOverriteDate = (id, body) => {
  const url = `${API_URL}/tours/${id}/scheduleDateOverride`
  return axios.post (url, body, {
    headers: options,
  });
};

export const putOverriteDate = (id, body) => {
  const url = `${API_URL}/tours/${id}/scheduleDateOverride`
  return axios.put (url, body, {
    headers: options,
  });
};


export const deleteOverriteDate = (Tourid, dateID) => {
  const url = `${API_URL}/tours/${Tourid}/scheduleDate/${dateID}`
  return axios.delete (url, {
    headers: options,
  });
};
