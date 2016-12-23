import user from '../models/userseric'


export const isUserUniqueSignIn = (email)=>{
return new Promise((resolve, reject)=>{
      user.findOne({ email }, (err, result)=>{
        console.log("emailemailemailemail")
        console.log(email)
      if(err) {
        reject(err)
      }else {
        console.log("result")
        console.log(result)
        resolve(result)
      }
    })
  })
}
