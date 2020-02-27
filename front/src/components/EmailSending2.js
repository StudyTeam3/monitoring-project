import nodemailer from 'nodemailer';
 
const sendMail = async (to, subject, html) => {
    const
    googleTransport = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: '{{ user account adress }}',
            clientId: '{{ CLIENT_ID }}',
            clientSecret: '{{ CLIENT_SECRET }}',
            refreshToken: '{{ REFRESH_TOKEN }}',
            accessToken: '{{ access token }}',
            expires: 3600
        }
    }),
    mailOptions = {
        from: 'SeemsPyo <eunsatio@gmail.com>',
        to,
        subject :'AutoEver 비밀번호 찾기',
        html: '<h1>이메일 인증 테스트</h1>'
    }
 
    try {
        await googleTransport.sendMail(mailOptions);
 
        googleTransport.close();
        console.log(`mail have sent to ${ to }`);
    } catch (error) {
        console.error(error);
    }
}
 
sendMail('eunsatio@gmail.com', 'Test Mail', '<p>Awsome! nodemailer do the trick!</p>');