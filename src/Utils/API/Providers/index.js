import axios from "axios";
import { API_URL, options } from "../index";



export const updateProviders = (id, body) => {
    const url = `${API_URL}/providers/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

export const deleteProviderAPI = (id) => {
    const url = `${API_URL}/providers/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

  export const createProviderAPI = (body) => {
    const url = `${API_URL}/providers`;
    return axios.post (url, body, {
      headers: options,
    });
  };

  export const getProviderAPI = (id) => {
    const url = `${API_URL}/providers/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getContactsProviderAPI = (id) => {
    const url = `${API_URL}/operators/${id}/contacts`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getSocialProviderAPI = (id) => {
    const url = `${API_URL}/socialmedia/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getNotyfyChannelAPI = () => {
    const url = `${API_URL}/vouchers/getConfirmChannels`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getSendVoucherFromAPI = () => {
    const url = `${API_URL}/websites`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const updateProviderAPI = (id, body) => {
    const url = `${API_URL}/providers/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };
  export const updateSocialProviderAPI = (id, body) => {
    const url = `${API_URL}/socialmedia/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const getAssetsAPI = (id) => {
    const url = `${API_URL}/assets/provider/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };


// Operational Info Request

export const getCancellationPolicyAPI = (id) => {
  const url = `${API_URL}/operational-info/policies/cancellation/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const getChangePolicyAPI = (id) => {
  const url = `${API_URL}/operational-info/policies/change/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const getNoShowPolicyAPI = (id) => {
  const url = `${API_URL}/operational-info/policies/noshow/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const getLastMinuteAPI = (id) => {
  const url = `${API_URL}/operational-info/policies/last-minute/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const getHolidaysAPI = (id) => {
  const url = `${API_URL}/operational-info/holidays/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const getCancelledOptionsAPI = () => {
  const url = `${API_URL}/operational-info/policies/cancellation-instructions`;
  return axios.get (url, {
    headers: options,
  });
};
export const getActionOptionsAPI = () => {
  const url = `${API_URL}/operational-info/policies/cancellation-actions`;
  return axios.get (url, {
    headers: options,
  });
};
export const getBaseOnOptionsAPI = () => {
  const url = `${API_URL}/operational-info/policies/based-on`;
  return axios.get (url, {
    headers: options,
  });
};
export const getPaymentOptionsAPI = () => {
  const url = `${API_URL}/operational-info/policies/noshow-payment-options`;
  return axios.get (url, {
    headers: options,
  });
};
export const getApplytoOptionsAPI = () => {
  const url = `${API_URL}/operational-info/policies/apply-to`;
  return axios.get (url, {
    headers: options,
  });
};
export const getNoticeOptionsAPI = () => {
  const url = `${API_URL}/operational-info/policies/notice-options`;
  return axios.get (url, {
    headers: options,
  });
};
export const getHolidayOptionsAPI = () => {
  const url = `${API_URL}/operational-info/holidays/day-list`;
  return axios.get (url, {
    headers: options,
  });
};
export const getOfficeStatusOptionsAPI = () => {
  const url = `${API_URL}/operational-info/holidays/office-status`;
  return axios.get (url, {
    headers: options,
  });
};
export const getTourStatusOptionsAPI = () => {
  const url = `${API_URL}/operational-info/holidays/tour-status`;
  return axios.get (url, {
    headers: options,
  });
};
export const getPolicyToEditAPI = (id) => {
  const url = `${API_URL}/operational-info/policy/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const getHolidayToEditAPI = (id) => {
  const url = `${API_URL}/operational-info/holiday/${id}`;
  return axios.get (url, {
    headers: options,
  });
};
export const updateHoliday = (id, body) => {
  const url = `${API_URL}/operational-info/holidays/${id}`;
  return axios.put (url, body, {
    headers: options,
  });
};
export const createCancellationPolicy = (body) => {
  const url = `${API_URL}/operational-info/policies/cancellation`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const updateCancellationPolicy = (id, body) => {
  const url = `${API_URL}/operational-info/policies/cancellation/${id}`;
  return axios.put (url, body, {
    headers: options,
  });
};
export const createChangePolicy = (body) => {
  const url = `${API_URL}/operational-info/policies/change`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const createNoShowPolicy = (body) => {
  const url = `${API_URL}/operational-info/policies/noshow`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const createLastMinutePolicy = (body) => {
  const url = `${API_URL}/operational-info/policies/last-minute`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const createHolidayPolicy = (body) => {
  const url = `${API_URL}/operational-info/holidays`;
  return axios.post (url, body, {
    headers: options,
  });
};
export const deletePolicyAPI = (id) => {
  const url = `${API_URL}/operational-info/policies/${id}`;
  return axios.delete (url, {
    headers: options,
  });
};
export const deleteHolidayAPI = (id) => {
  const url = `${API_URL}/operational-info/holidays/${id}`;
  return axios.delete (url, {
    headers: options,
  });
};