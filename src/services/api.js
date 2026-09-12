

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://petro-vision-apis.runasp.net';

/**
 * Custom API Error to capture status, message, and response data
 */
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Authentication token storage helpers
 */
export const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem('authToken');
    } catch {
      return null;
    }
  },
  set: (token) => {
    try {
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (err) {
      console.error('Failed to set auth token:', err);
    }
  },
  clear: () => {
    try {
      localStorage.removeItem('authToken');
    } catch (err) {
      console.error('Failed to clear auth token:', err);
    }
  },
};

/**
 * Core HTTP request handler
 *
 * @param {string} endpoint - Relative path (e.g. '/api/v1/resource') or absolute URL
 * @param {RequestInit} [options={}] - Standard fetch options
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const { headers = {}, body, ...customConfig } = options;

  const url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
    ? endpoint
    : `${API_BASE_URL.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;

  const defaultHeaders = {
    Accept: 'application/json',
  };

  // Attach auth token if present and not explicitly provided in headers
  const token = tokenStorage.get();
  if (token && !headers.Authorization && !headers.authorization) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // Set Content-Type for JSON objects, leave untouched for FormData or raw bodies
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  if (body && !isFormData && typeof body === 'object') {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config = {
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: body && !isFormData && typeof body === 'object' ? JSON.stringify(body) : body,
    ...customConfig,
  };

  try {
    const response = await fetch(url, config);

    // 204 No Content
    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage =
        (isJson && (data?.message || data?.error || data?.title)) ||
        response.statusText ||
        'An API error occurred';

      throw new ApiError(errorMessage, response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network request failed', 0, null);
  }
}

/**
 * Convenience methods for HTTP verbs
 */
export const api = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
  request,
  BASE_URL: API_BASE_URL,
};

export default api;
