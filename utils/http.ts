import axios from 'axios';

const ApiToken = process.env.NEXT_PUBLIC_API_TOKEN;
const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const http = axios.create({
  baseURL: ApiUrl,
  params: {
    token: ApiToken
  }
})
