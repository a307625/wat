export default {
  jwt: {
    jwtSecret: 'secretkey',//process.env.JWT_SECRET,
    jwtTokenExpiresIn: '5 days',
    emailTokenExpiresIn: '1 days'
  }
}
