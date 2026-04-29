// // services/paymentService.js
// import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7178/api';

// export const paymentService = {
//   async initializePayment(paymentData) {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await axios.post(
//         `${API_BASE_URL}/Payment/initialize`,
//         {
//           amount: paymentData.amount,
//           callbackUrl: paymentData.callbackUrl,
//           description: paymentData.description,
//           realEstateId: paymentData.realEstateId
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Payment initialization error:', error);
//       throw error;
//     }
//   },

//   async verifyPayment(paymentId, authority, status) {
//     try {
//       const token = localStorage.getItem('auht_token');
//       const response = await axios.get(
//         `${API_BASE_URL}/Payment/verify-callback`,
//         {
//           params: {
//             paymentId,
//             authority,
//             status
//           },
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Payment verification error:', error);
//       throw error;
//     }
//   }
// };
// services/paymentService.js
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