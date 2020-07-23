const baseUrl = 
    process.env.NODE_ENV === "production" 
    ? 'https://evening-citadel-47188.herokuapp.com/'
    : 'http://localhost:3000';

export default baseUrl;