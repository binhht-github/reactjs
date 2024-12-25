import axios from 'axios';
import React from 'react';
import { APP_BASE_URL } from '../api/config';

function AuthenRest() {
    return (
        <div>

        </div>
    );
}

export default AuthenRest;



const API_KEY = "AIzaSyCiWabei03b1hMn_S_Nm4DRmzwkdDo-7eQ";

export const signUp = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );
        return response.data; // Includes idToken, refreshToken, etc.
    } catch (error: any) {
        throw error.response.data.error;
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );
        return response.data; // Includes idToken, refreshToken, etc.
    } catch (error: any) {
        throw error.response.data.error;
    }
};














export const saveUserData = async (uid: string, token: string, data: any) => {
    try {
        await axios.put(`${APP_BASE_URL}/users/${uid}.json`, data);
        console.log("Data saved successfully");
    } catch (error: any) {
        throw new Error("Failed to save data: " + error.message);
    }
};


export const getUserData = async (uid: string, token: string) => {
    try {
        const response = await axios.get(`${APP_BASE_URL}/users/${uid}.json?auth=${token}`);
        return response.data; // Returns user data
    } catch (error: any) {
        throw new Error("Failed to fetch data: " + error.message);
    }
};



