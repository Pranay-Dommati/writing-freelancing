const dev = {
  API_URL: "http://localhost:8000/api"
};

const prod = {
  API_URL: process.env.REACT_APP_API_URL || "https://api.getwritingdone.com/api"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;