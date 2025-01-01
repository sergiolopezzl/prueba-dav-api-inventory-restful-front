/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      API: process.env.API,
      API_AUTH: process.env.API_AUTH,
      CLIENT_ID: process.env.CLIENT_ID,
      API_KEY: process.env.API_KEY,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      SHEETS: process.env.SHEETS,
      SHEETS_ID: process.env.SHEETS_ID,
      URL_MS_SHEETS: process.env.URL_MS_SHEETS,
      API_MS_SHEETS_KEY: process.env.API_MS_SHEETS_KEY
    },
  };
  
  import dotenv from 'dotenv';
  dotenv.config();
  
  export default nextConfig;
  