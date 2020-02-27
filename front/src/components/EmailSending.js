var nodemailer = require('nodemailer');

var smtpPool=require('nodemailer-smtp-pool');

var smtpTransport=nodemailer.createTransport(smtpPool( {
    service:'Gmail',
    host:'localhost',
    port:'465',
    tls:{
        rejectUnauthorize:false
    },
    auth:{
        user:'duddn311@gmail.com',
        pass:'kjb1611^^'
    },
    maxConnections:5,
    maxMessages:10
}) );

var mailOpt={
    from:'duddn311@gmail.com',
    to:'101ehd1205gh@naver.com',
    subject:'AutoEver 비밀번호 찾기',
    html:'<h1>이메일 인증 테스트</h1>'
}


smtpTransport.sendMail(mailOpt, function(err, res) {
    if( err ) {
        console.log(err);
    }else{
        console.log('Message send :'+ res);
    }

    smtpTransport.close();
})
