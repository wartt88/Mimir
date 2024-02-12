import * as React from "react";
import "./email.css";


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
    <div className="mail">
      <img src={`${urlBase}/mimir.svg`} alt="mimir"/>
      <hr/>
      <h1>Reset Your Password</h1>
      <p>Hi {mail} !</p>
      <p>Someone recently requested a password change for your MIMIR account. If this was you, you can set a new password here:</p>
      <a href={`${urlBase}/reset/${token}`} rel="noopener noreferrer" target="_blank">click here</a>
      <p>If you don&apos;t want to change your password or didn&apos;t request this, just ignore and delete this message.</p>
      <p>To keep your account secure, please don&apos;t forward this email to anyone. </p>
      <p>Happy Day!</p>
    </div>
  );
}

