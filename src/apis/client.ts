// src/apis/client.ts
import axios from "axios";

// Get environment variables with fallbacks for development
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/zedvye_one';
const ROOM_SERVICE_BASE_URL = process.env.REACT_APP_ROOM_SERVICE_URL || 'http://127.0.0.1:8002/room_service/';
const BOOKING_SERVICE_BASE_URL = process.env.REACT_APP_BOOKING_SERVICE_URL || 'http://127.0.0.1:8003/booking_service/booking/';
const POSTS_SERVICE_BASE_URL = process.env.REACT_APP_POSTS_SERVICE_URL || 'http://127.0.0.1:8080/api/v1/';

// Log which environment we're using (helpful for debugging)
console.log('Environment:', process.env.NODE_ENV);
console.log('API Base URL:', API_BASE_URL);

// Main authentication service client
export const client = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Room service client
export const roomServiceClient = axios.create({
    baseURL: ROOM_SERVICE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Booking service client
export const bookingServiceClient = axios.create({
    baseURL: BOOKING_SERVICE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Posts service client
export const postsServiceClient = axios.create({
    baseURL: POSTS_SERVICE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptors for logging (optional)
if (process.env.NODE_ENV === 'development') {
    client.interceptors.request.use(request => {
        console.log('Starting Request:', request.url);
        return request;
    });
    
    client.interceptors.response.use(response => {
        console.log('Response:', response.status);
        return response;
    });
}