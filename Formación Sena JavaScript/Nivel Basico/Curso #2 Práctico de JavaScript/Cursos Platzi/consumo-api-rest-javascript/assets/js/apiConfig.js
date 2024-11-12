// apiConfig.js

export const API_KEY = "live_CstxJOGFFgI3OM9sszMAqm3GxKye3UgQMNBAstyJPbmDCpeZiRwvs3YOj30diY8f";
export const API_BASE_URL = "https://api.thecatapi.com/V1";
export const API_LIMIT = 3;

export const ENDPOINTS = {
    RANDOM: `${API_BASE_URL}/images/search?limit=${API_LIMIT}&api_key=${API_KEY}`,
    FAVOURITE: `${API_BASE_URL}/favourites?limit=${API_LIMIT}&api_key=${API_KEY}`
};
