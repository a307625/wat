export default {
  watSender: 'EricHong@via.com.tw',
  watConfig: {
    host: 'email.via.com.tw',
    port: 587,
    auth: {
      user: 'EricHong',//process.env.VIA_USERNAME,
      pass: '@Hsnu1123'//process.env.VIA_PASSWORD
    },
    logger: true,
    debug: true
  },
  registerMailTemplate: {
    //X-Google-Original-From
    //from: 'joybee210@gmail.com',
    //to: 'joychen@via.com.tw',
    subject: 'Hello subject',
    text: 'Click here to activate your account: http://www.google.com.tw', // plaintext body
    html: '<h1><a href="www.google.com.tw">Click here to activate your account</a></h1>'
  }
}
