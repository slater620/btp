const nodemailer=require('nodemailer');

exports.mail=async function main(receiver,header,body) {
    let sender={
        user:"4gitfa@gmail.com",
        pass:"bonjour4gi"
    }
    let transporter=nodemailer.createTransport({
        // host:"smtp.ethereal.email",
        // port:465,
        // secure:false,
        service:'gmail',
        auth:{
            user:sender.user,
            pass:sender.pass
        }
    })
try{
    console.log("on essai d'envoyer a "+receiver)
    let info=await transporter.sendMail({
        from:'4gitfa@gmail.com',
        to:receiver,
        subject:header,
        text:body,
        html:"<b> "+body +"</b>"
    });
    console.log("Message sent: "+info.messageId);
    console.log("Preview URL: "+nodemailer.getTestMessageUrl(info))
}catch(e){
    console.log(e.message)
}
    
}
