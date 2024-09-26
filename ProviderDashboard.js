import React, { useEffect, useState } from 'react';

const ProviderDashboard = ({ onRequestApproved }) => {
  const [requests, setRequests] = useState([]);
  const [availableFood, setAvailableFood] = useState([]);

  useEffect(() => {
    // Fetch requests and available food data from API
    // This is a mock implementation
    setRequests([
      { id: 1, collectorName: 'Collector A', items: ['Pizza', 'Pasta'], status: 'Pending' },
      { id: 2, collectorName: 'Collector B', items: ['Sandwiches'], status: 'Approved' },
    ]);
    setAvailableFood([
      { id: 1, name: 'Pizza', quantity: 5 },
      { id: 2, name: 'Pasta', quantity: 3 },
      { id: 3, name: 'Sandwiches', quantity: 10 },
    ]);
  }, []);

  const handleUpdateRequest = (id, newStatus) => {
    const updatedRequest = requests.find(req => req.id === id);
    if (newStatus === 'Approved' && onRequestApproved) {
      onRequestApproved(updatedRequest); // Notify collector of the approved request
    }
    
    // Update request status logic here
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const handleUpdateFood = (id, newQuantity) => {
    // Update food quantity logic here
    setAvailableFood(availableFood.map(food => 
      food.id === id ? { ...food, quantity: newQuantity } : food
    ));
  };

  return (
    <div className="provider-dashboard">
      <h2>Provider Dashboard</h2>
      <div className="requests-section">
        <h3>Incoming Requests</h3>
        <ul>
          {requests.map(request => (
            <li key={request.id}>
              {request.collectorName} - {request.items.join(', ')} - {request.status}
              {request.status === 'Pending' && (
                <>
                  <button onClick={() => handleUpdateRequest(request.id, 'Approved')}>Approve</button>
                  <button onClick={() => handleUpdateRequest(request.id, 'Rejected')}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="available-food-section">
        <h3>Available Food</h3>
        <ul>
          {availableFood.map(food => (
            <li key={food.id}>
              {food.name} - Quantity: {food.quantity}
              <button onClick={() => handleUpdateFood(food.id, food.quantity + 1)}>+</button>
              <button onClick={() => handleUpdateFood(food.id, Math.max(0, food.quantity - 1))}>-</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProviderDashboard;
