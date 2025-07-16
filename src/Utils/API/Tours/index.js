import axios from "axios";
import { API_URL, options } from "../index";

//trigger update
export const triggerUpdate = () => {
  const url = `${API_URL}/tours/updatePivotTables`;
  return axios.get (url, {
    headers: options,
  });
};

// bulk products update
export const bulkUpdate = (id, body) => {
  const url = `${API_URL}/prices/${id}/bulk-update`;
  return axios.put (url, body, {
    headers: options,
  });
};

//bulk tours prices
export const bulkToursGet = (body) => {
  const url = `${API_URL}/filters/prices/bulk-get`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const bulkToursPut = (body) => {
  const url = `${API_URL}/filters/prices/bulk-update`;
  return axios.put (url, body, {
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
  export const statusUpdateAddon = (id, body) => {
    const url = `${API_URL}/addons/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };
  export const statusUpdateRelated = (id, body) => {
    const url = `${API_URL}/booking-way/tours/${id}/status`;
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
  export const copyTourAPI = (id) => {
    const url = `${API_URL}/tours/duplicate/${id}`;
    return axios.post (url, null, {
      headers: options,
    });
  };
  export const getTourAPI = (id) => {
    const url = `${API_URL}/tours/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getToursFiltered = (body) => {
    const url = `${API_URL}/filters/tours/params`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const getTourNameFiltered = (body) => {
    const url = `${API_URL}/filters/tours/name-link`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const createTourAPI = (body) => {
    const url = `${API_URL}/tours`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const putCopyTourAPI = (id, body) => {
    const url = `${API_URL}/tours/${id}`;
    return axios.put (url, body, {
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
  export const postPendingPublishAPI = (id) => {
    const url = `${API_URL}/setup/update-html?key=hsvlrwvoisfbsbñ&tour_id=${id}`;
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
  export const getVouchersTemplatesAPI = () => {
    const url = `${API_URL}/vouchers/templates`;
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
  export const toursWebsite = (id) => {
    const url = `${API_URL}/websites/${id}/tours`;
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

  export const typeRelatedTourSelect = () => {
    const url = `${API_URL}/booking-way/types`;
    return axios.get (url, {
      headers: options,
    });
  };
  
  export const postRelatedFilterByName = (body) => {
    const url = `${API_URL}/booking-way/tours/name-link`;
    return axios.post (url, body, {
      headers: options,
    });
  };

  export const postRelatedAdvanceFilter = (body) => {
    const url = `${API_URL}/booking-way/tours/params`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const postAddRelated = (body) => {
    const url = `${API_URL}/booking-way/add`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const deleteRelated = (current, related) => {
    const url = `${API_URL}/booking-way/remove-all/${current}/${related}`;
    return axios.delete (url, {
      headers: options,
    });
  };
  export const editRelatedType = (id,data) => {
    const url = `${API_URL}/booking-way/tours/${id}/type`;
    return axios.put (url, data, {
      headers: options,
    });
  };


  export const putSettingsAPI = (id, body) => {
    const url = `${API_URL}/tours/${id}/settings`;
    return axios.put (url, body, {
      headers: options,
    });
  };

// payments

export const paymentsIndexGet = (id) => {
  const url = `${API_URL}/payments/tab/payments/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsTaxGet = () => {
  const url = `${API_URL}/payments/tab/taxes`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsGratuiteGet = () => {
  const url = `${API_URL}/payments/tab/gratuities`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsGratuiteTypeGet = () => {
  const url = `${API_URL}/payments/tab/gratuites-types`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsBaseOnGet = () => {
  const url = `${API_URL}/payments/tab/based-on`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsApplyGet = () => {
  const url = `${API_URL}/payments/tab/apply`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentstypeGet = () => {
  const url = `${API_URL}/payments/tab/payment-type`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsOptionsGet = () => {
  const url = `${API_URL}/payments/tab/payment-options`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsPaidByGet = () => {
  const url = `${API_URL}/payments/tab/paid-by`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsMethodGet = () => {
  const url = `${API_URL}/payments/tab/methods`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsDueGet = () => {
  const url = `${API_URL}/payments/tab/due`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsWhenGet = () => {
  const url = `${API_URL}/payments/tab/when`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsEventGet = () => {
  const url = `${API_URL}/payments/tab/event`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsTaxesBaseOnGet = () => {
  const url = `${API_URL}/payments/tab/payment-taxes`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsCommissionBaseOnGet = () => {
  const url = `${API_URL}/payments/tab/payment-commissions`;
  return axios.get (url, {
    headers: options,
  });
};
export const paymentsCommissionApplyGet = () => {
  const url = `${API_URL}/payments/tab/payment-commissions-apply`;
  return axios.get (url, {
    headers: options,
  });
};

export const postPaymentsAPI = (body) => {
  const url = `${API_URL}/payments`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const postPaymentsNewAPI = (body) => {
  const url = `${API_URL}/payments/tab/new`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const putPaymentsAPI = (id,body) => {
  const url = `${API_URL}/payments/${id}`;
  return axios.put (url, body, {
    headers: options,
  });
};
export const deletePaymentsAPI = (id) => {
  const url = `${API_URL}/payments/${id}`;
  return axios.delete (url, {
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
export const getRelatedTourAPI = (data) => {
  const url = `${API_URL}/booking-way/tours/list`;
  return axios.post (url,data, {
    headers: options,
  });
};
export const priorityRelatedAPI = (data) => {
  const url = `${API_URL}/booking-way/tours/change-priority`;
  return axios.post (url,data, {
    headers: options,
  });
};
export const deleteRelatedAPI = (id) => {
  const url = `${API_URL}/booking-way/remove/${id}`;
  return axios.delete (url, {
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

export const putPriceRangesAPI = (tour_id, body) => {
  const url = `${API_URL}/tours/${tour_id}/rangePrices/status`;
  return axios.put (url,body, {
    headers: options,
  });
};

export const getActiveRelatedAsset = (id) => {
  const url = `${API_URL}/asset-provider-tour/tour/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const getOtherRelatedAsset = (id) => {
  const url = `${API_URL}/asset-provider-tour/other/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const assingAssetAPI = (body) => {
  const url = `${API_URL}/asset-provider-tour/assign`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const removeAssetAPI = (body) => {
  const url = `${API_URL}/asset-provider-tour/remove`;
  return axios.post (url, body, {
    headers: options,
  });
};


//pricing options select

export const getPricingOptionsAPI = (id) => {
  const url = `${API_URL}/pricingOptions/addons/${id}/items`;
  return axios.get (url, {
    headers: options,
  });
};
export const getApplyOptionsAPI = () => {
  const url = `${API_URL}/addons/list/appliesTo`;
  return axios.get (url, {
    headers: options,
  });
};
export const getPricingOptions2API = (id) => {
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
