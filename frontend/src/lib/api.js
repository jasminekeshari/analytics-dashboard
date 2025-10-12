// frontend/src/lib/api.js
const API_BASE_URL = 'http://localhost:4000';

// Helper function to make API calls with error handling
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// ============================================
// API FUNCTIONS
// ============================================

export const api = {
  // Data Sources
  getDataSources: () => fetchAPI('/datasources'),
  
  // Time Series (for line charts)
  getTimeSeries: (params) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/timeseries?${query}`);
  },
  
  // Categorical (for bar/pie charts)
  getCategorical: (params) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/categorical?${query}`);
  },
  
  // Table Data
  getTableData: (params) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/table?${query}`);
  },
  
  // KPI Data
  getKPI: (metric) => fetchAPI(`/kpi?metric=${metric}`),
  
  // Multi-KPI Data
  getMultiKPI: (metrics) => {
    const metricsStr = Array.isArray(metrics) ? metrics.join(',') : metrics;
    return fetchAPI(`/kpi/multi?metrics=${metricsStr}`);
  },
  
  // Dashboards CRUD
  getDashboards: () => fetchAPI('/dashboards'),
  
  getDashboard: (id) => fetchAPI(`/dashboards/${id}`),
  
  createDashboard: (dashboard) => 
    fetchAPI('/dashboards', {
      method: 'POST',
      body: JSON.stringify(dashboard),
    }),
  
  updateDashboard: (id, updates) =>
    fetchAPI(`/dashboards/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
  
  deleteDashboard: (id) =>
    fetchAPI(`/dashboards/${id}`, { method: 'DELETE' }),
};