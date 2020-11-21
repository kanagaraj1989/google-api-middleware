module.exports = {
  api: {
    port: process.env.SERVER_PORT || 8080
  },
  auth: {
    secretKey: process.env.AUTH_SECRECT_KEY || 'social_app_salt'
  }
}
