
const API_BASE_URL = 'https://localhost:7178/api';

export const paymentService = {
  async initializePayment(paymentData) {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/Payment/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  },

  async verifyPayment(paymentId, authority, status) {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/Payment/verify-callback?paymentId=${paymentId}&authority=${authority}&status=${status}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }
};