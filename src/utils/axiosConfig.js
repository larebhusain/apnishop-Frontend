// import axios from "axios";
// import { toast } from "react-hot-toast";

// // Create axios instance
// const axiosInstance = axios.create({
//   baseURL: "/api/v1",
// });

// // Request interceptor to add token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("auth");
//     if (token) {
//       try {
//         const parsedToken = JSON.parse(token);
//         if (parsedToken.token) {
//           config.headers.Authorization = `${parsedToken.token}`;
//         }
//       } catch (e) {
//         config.headers.Authorization = token;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token expiration
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       const message = error.response?.data?.message || "";
      
//       if (message.includes("expired") || error.response?.data?.expired) {
//         // Clear localStorage
//         localStorage.removeItem("auth");
//         localStorage.removeItem("cart");
        
//         // Show message
//         toast.error("Session expired. Please login again.");
        
//         // Redirect to login page after 2 seconds
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 2000);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;