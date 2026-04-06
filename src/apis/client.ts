import axios from "axios";

// Single API Gateway URL - NO environment variables needed!
const API_GATEWAY_URL = '/api';

// Main authentication service client
export const client = axios.create({
    baseURL: `${API_GATEWAY_URL}/auth`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Room service client
export const roomServiceClient = axios.create({
    baseURL: `${API_GATEWAY_URL}/room`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Booking service client
export const bookingServiceClient = axios.create({
    baseURL: `${API_GATEWAY_URL}/booking`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Posts service client
export const postsServiceClient = axios.create({
    baseURL: `${API_GATEWAY_URL}/post`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Wallet service client
export const walletServiceClient = axios.create({
    baseURL: `${API_GATEWAY_URL}/wallet`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging (optional)
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