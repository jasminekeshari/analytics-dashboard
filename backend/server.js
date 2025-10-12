// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Middleware: Add artificial latency and random errors (10% chance)
app.use((req, res, next) => {
  const delay = 200 + Math.random() * 400; // 200-600ms delay
  setTimeout(() => {
    if (Math.random() < 0.1) {
      return res.status(500).json({ error: 'Mock server error - please retry' });
    }
    next();
  }, delay);
});

// ============================================
// ENDPOINTS
// ============================================

// 1. Data Sources
app.get('/datasources', (req, res) => {
  res.json([
    { id: 'sales', type: 'timeseries', label: 'Sales (₹)' },
    { id: 'sessions', type: 'timeseries', label: 'Sessions' },
    { id: 'orders', type: 'table', label: 'Orders' },
    { id: 'users', type: 'table', label: 'Users' },
    { id: 'mixByStatus', type: 'categorical', label: 'Order Status Mix' },
    { id: 'topProducts', type: 'categorical', label: 'Top Products' }
  ]);
});

// 2. Time Series Data (for line charts)
app.get('/timeseries', (req, res) => {
  const { source = 'sales', from, to, granularity = 'day' } = req.query;
  
  // Generate 30 days of mock data
  const points = Array.from({ length: 30 }, (_, i) => {
    const base = source === 'sales' ? 120000 : 800;
    const trend = Math.sin(i / 5) * base * 0.08;
    const randomness = (Math.random() - 0.5) * base * 0.05;
    const v = Math.round(base + trend + randomness);
    
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const t = date.toISOString().slice(0, 10);
    
    return { t, v };
  });
  
  res.json({
    meta: { source, unit: source === 'sales' ? 'INR' : '' },
    points
  });
});

// 3. Categorical Data (for bar/pie charts)
app.get('/categorical', (req, res) => {
  const { source = 'topProducts', limit = 5 } = req.query;
  
  if (source === 'topProducts') {
    const allProducts = [
      { key: 'ETF-SPY', label: 'SPY', value: 532000 },
      { key: 'ETF-BND', label: 'BND', value: 221000 },
      { key: 'ETF-GLD', label: 'GLD', value: 184000 },
      { key: 'ETF-EFA', label: 'EFA', value: 99000 },
      { key: 'ETF-EEM', label: 'EEM', value: 87000 }
    ];
    return res.json({ items: allProducts.slice(0, Number(limit)), unit: 'INR' });
  }
  
  if (source === 'mixByStatus') {
    return res.json({
      items: [
        { key: 'paid', label: 'Paid', value: 62 },
        { key: 'pending', label: 'Pending', value: 21 },
        { key: 'failed', label: 'Failed', value: 17 }
      ],
      unit: '%'
    });
  }
  
  res.json({ items: [], unit: '' });
});

// 4. Table Data (orders and users)
app.get('/table', (req, res) => {
  const { source = 'orders', page = 1, size = 10, status, role } = req.query;
  const total = 123;
  
  const rows = Array.from({ length: Number(size) }, (_, i) => {
    const idx = (Number(page) - 1) * Number(size) + i + 1;
    
    if (source === 'orders') {
      const orderStatus = ['paid', 'pending', 'failed'][idx % 3];
      if (status && orderStatus !== status) return null;
      
      return {
        id: `ORD-${10000 + idx}`,
        customer: ['R. Sharma', 'A. Gupta', 'P. Verma', 'S. Khan'][idx % 4],
        total: Math.round(5000 + Math.random() * 15000),
        currency: 'INR',
        status: orderStatus,
        createdAt: new Date(Date.now() - idx * 3600000).toISOString()
      };
    }
    
    // Users table
    const userRole = ['advisor', 'user', 'admin'][idx % 3];
    if (role && userRole !== role) return null;
    
    return {
      id: `USR-${1000 + idx}`,
      name: ['A. Gupta', 'D. Mehta', 'K. Rao', 'N. Roy'][idx % 4],
      role: userRole,
      status: ['active', 'invited', 'suspended'][idx % 3],
      createdAt: new Date(Date.now() - idx * 86400000).toISOString()
    };
  }).filter(Boolean);
  
  const columns = source === 'orders'
    ? [
        { key: 'id', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'total', label: 'Total' },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Created' }
      ]
    : [
        { key: 'id', label: 'User ID' },
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Created' }
      ];
  
  res.json({ rows, total, columns });
});

// 5. KPI Data (single metrics)
app.get('/kpi', (req, res) => {
  const { metric = 'todaySales' } = req.query;
  
  const kpiData = {
    todaySales: { 
      label: 'Sales (Today)', 
      value: 150000 + Math.round(Math.random() * 10000), 
      unit: 'INR', 
      delta: 0.1 - Math.random() * 0.2 
    },
    activeUsers: { 
      label: 'Active Users', 
      value: 1200 + Math.round(Math.random() * 800), 
      unit: '', 
      delta: 0.1 - Math.random() * 0.2 
    },
    ordersToday: {
      label: 'Orders (Today)',
      value: 200 + Math.round(Math.random() * 100),
      unit: '',
      delta: 0.05 - Math.random() * 0.15
    },
    convRate: {
      label: 'Conv. Rate',
      value: 2.5 + Math.random() * 1.5,
      unit: '%',
      delta: 0.1 - Math.random() * 0.3
    }
  };
  
  res.json(kpiData[metric] || { label: metric, value: 0, unit: '', delta: 0 });
});

// 6. Multi-KPI Data (for composite KPI widgets)
app.get('/kpi/multi', (req, res) => {
  const { metrics = 'todaySales,ordersToday,convRate' } = req.query;
  const metricList = metrics.split(',');
  
  const items = metricList.map(metric => {
    const kpiData = {
      todaySales: { 
        label: 'Sales (Today)', 
        value: 152300, 
        unit: 'INR', 
        delta: 0.12 
      },
      ordersToday: { 
        label: 'Orders (Today)', 
        value: 231, 
        unit: '', 
        delta: 0.06 
      },
      convRate: { 
        label: 'Conv. Rate', 
        value: 2.9, 
        unit: '%', 
        delta: 0.2 
      }
    };
    return kpiData[metric] || { label: metric, value: 0, unit: '', delta: 0 };
  });
  
  res.json({ items });
});

// 7. Dashboards (CRUD operations)
let dashboards = [
  {
    id: 'my-sales',
    name: 'My Sales',
    version: 1,
    layout: [
      {
        i: 'w1',
        x: 0,
        y: 0,
        w: 6,
        h: 4,
        widgetType: 'chart.timeseries',
        config: { title: 'Sales (30D)', source: 'sales', range: '30d', showAvg: true }
      },
      {
        i: 'w2',
        x: 6,
        y: 0,
        w: 6,
        h: 4,
        widgetType: 'chart.bar',
        config: { title: 'Top Products', source: 'topProducts', limit: 5 }
      },
      {
        i: 'w3',
        x: 0,
        y: 4,
        w: 3,
        h: 2,
        widgetType: 'kpi.simple',
        config: { metric: 'todaySales', precision: 0 }
      }
    ]
  }
];

app.get('/dashboards', (req, res) => {
  res.json(dashboards);
});

app.get('/dashboards/:id', (req, res) => {
  const dashboard = dashboards.find(d => d.id === req.params.id);
  if (!dashboard) return res.status(404).json({ error: 'Dashboard not found' });
  res.json(dashboard);
});

app.post('/dashboards', (req, res) => {
  const newDashboard = { ...req.body, id: req.body.id || `dashboard-${Date.now()}` };
  dashboards.push(newDashboard);
  res.status(201).json(newDashboard);
});

app.patch('/dashboards/:id', (req, res) => {
  const index = dashboards.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Dashboard not found' });
  
  dashboards[index] = { ...dashboards[index], ...req.body };
  res.json(dashboards[index]);
});

app.delete('/dashboards/:id', (req, res) => {
  const index = dashboards.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Dashboard not found' });
  
  dashboards.splice(index, 1);
  res.status(204).send();
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📊 Try: http://localhost:${PORT}/datasources`);
});