import user from '../models/userseric'

export const msgStrategy={
  ['actived']:
    ()=>{
      const msg = {}
      msg.status = 200
      msg.message = "This e-mail has been registered"
      msg.data = "此信箱已被註冊並開通"
      return msg
    }
  ,
  ['resend']:
    ()=>{
      const msg = {}
      msg.status = 200
      msg.message = "Resend Authentication email"
      msg.data = "認證信已重寄,請至信箱讀取認證信以開通帳號"
      return msg
    }
  ,
  ['passwordErr']:
    ()=>{
      const msg = {}
      msg.status = 200
      msg.message = "password error"
      msg.data = "密碼錯誤"
      return msg
    }
  ,
  ['noUser']:
    ()=>{
      const msg = {}
      msg.status = 200
      msg.message = "No user"
      msg.data = "無此使用者"
      return msg
    }
}



export const isUserUniqueSignUp = (userInfo)=>{
  return new Promise((resolve, reject)=>{
      user.findOne(userInfo, (err, result)=>{
      if(err) {
        reject(err)
      }else {
        resolve(result)
      }
    })
  })
}

export const isUser = (userInfo)=>{
  return new Promise((resolve, reject)=>{
      user.find(userInfo, (err, result)=>{
      if(err) {
        reject(err)
      }else {
        resolve(result)
      }
    })
  })
}

export const isUserPassword = async (users, password1)=>{
  let result
  for (var i = 0; i < users.length; i++) {
    const check = await users[i].validatePassword(password1)
    if (check){
      result = users[i]
    }
  }
  return(result)
}
