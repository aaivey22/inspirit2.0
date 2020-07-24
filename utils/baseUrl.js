const baseUrl = 
    process.env.NODE_ENV === "production" 
    ? 'https://git.heroku.com/evening-citadel-47188.git'
    : 'http://localhost:3000';

export default baseUrl;