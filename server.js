const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Mock data (replace with database in production)
let providers = [
  { id: 1, name: 'Restaurant A', lat: 51.505, lng: -0.09, availableFood: ['Pizza', 'Pasta'] },
  { id: 2, name: 'Cafe B', lat: 51.51, lng: -0.1, availableFood: ['Sandwiches', 'Salads'] },
];

let requests = [
  { id: 1, collectorName: 'Collector A', items: ['Pizza', 'Pasta'], status: 'Pending' },
  { id: 2, collectorName: 'Collector B', items: ['Sandwiches'], status: 'Approved' },
];

// API routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'collector' && password === 'collect123') {
    res.json({ success: true, userType: 'collector' });
  } else if (username === 'provider' && password === 'provide123') {
    res.json({ success: true, userType: 'provider' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/providers', (req, res) => {
  res.json(providers);
});

app.get('/api/requests', (req, res) => {
  res.json(requests);
});

app.post('/api/requests', (req, res) => {
  const { collectorName, items } = req.body;
  const newRequest = {
    id: requests.length + 1,
    collectorName,
    items,
    status: 'Pending'
  };
  requests.push(newRequest);
  res.status(201).json(newRequest);
});

app.put('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const request = requests.find(r => r.id === parseInt(id));
  if (request) {
    request.status = status;
    res.json(request);
  } else {
    res.status(404).json({ message: 'Request not found' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});