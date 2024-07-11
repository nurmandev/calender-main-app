import axios from "axios";

export const BASE_URL = 'https://proficient-calendar-app.onrender.com/api';

export const listGoogleEvent = async () => {
    try {
        const response = await axios.get('/api/google/list');
        return response.data;
    } catch (error) {
        return error;
    }
    }

export const login = async (username, password) => {
    try {
        console.log(username, password)
        const response = await axios.post(`${BASE_URL}/users/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error(error.response.data)
        return error;
    }
}

export const CreateEvent = async (token, event) => {
    // console.log("server event ",token)/
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.post(`${BASE_URL}/events`, event, config);
        console.log(response.data)
        console.log(response.status)
        return response.data;
    } catch (error) {
        console.error(error)
        return error;
    }
}

export const FetchEventsApi = async (token) => {
    console.log("token ",token)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.get(`${BASE_URL}/events`, config);
        console.log(response.status)
        return response.data;
    }
    catch (error) {
        console.error(error)
        return error;
    }
}
