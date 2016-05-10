// var Nodemailer = require("nodemailer");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Mail = {};


var options = {
  host: "smtp.163.com", // 主机
  secure: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: "myqingxinguoyuan@163.com", // 账号
    pass: "liuyongpeng99" // 密码 这是连接邮箱的密码，另直接登录邮箱的密码是qingxinguoyuan
  }
};
 
// 设置邮件内容
var mailOptions = {
  from: "myqingxinguoyuan@163.com", // 发件地址
  to: '', // 收件列表
  subject: "清新果园密码重置", // 标题
  html: "<b>你好!</b> 您的密码重置为：" // html 内容
}
 
// 发送邮件
Mail.send = function(toEmail, pwd, res){
  var transporter = nodemailer.createTransport(smtpTransport(options))
  console.log("send email toEmail: " + toEmail + "------------>");
  mailOptions.to = toEmail;
  mailOptions.html = "<b>你好!</b> 您的密码重置为：" + pwd;
  transporter.sendMail(mailOptions, function(error, response){
    if(error){
      console.log("send email toEmail faile------------>");
      console.log(error)
      return res.json({success: false, err:error});
    }else{
      console.log("Message already sent");
      return res.json({status: 0, success: true, err:error, body: "success"});
    }
  });
}



module.exports = Mail;