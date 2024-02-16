import * as React from "react";


interface EmailResetPwdProps {
  mail: string;
  token:string;
  urlBase:string
}

export default function EmailResetPwd({
  mail,
  token,
  urlBase,
}:EmailResetPwdProps): JSX.Element{
  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-around",
      backgroundColor:"#F6F6F6",
      padding:"2vh",
      width:"95%",
      minHeight:"50vh",
      gap:"2vh"
      }}>
      <img style={{alignSelf:"center", marginBottom:"2vh"}} src={`${urlBase}/mimir.svg`} alt="mimir"/>
      <hr style={{border:"#adadad 0.5px solid", width:"85%", alignSelf:"center"}}/>
      <h1>Reset Your Password</h1>
      <p>Hi {mail} !</p>
      <p>Someone recently requested a password change for your MIMIR account. If this was you, you can set a new password here:</p>
      <a style={{borderRadius:"10px", backgroundColor:"rgb(0, 133, 216)", color:"white", padding:"5px 20px", alignSelf:"center"}} href={`${urlBase}/reset/${token}`} rel="noopener noreferrer" target="_blank">click here</a>
      <p>If you don&apos;t want to change your password or didn&apos;t request this, just ignore and delete this message.</p>
      <p>To keep your account secure, please don&apos;t forward this email to anyone. </p>
      <p>Happy Day!</p>
    </div>
  );
}

