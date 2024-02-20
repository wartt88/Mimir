import * as React from "react";

interface EmailWelcomeProps {
  mail: string;
  token: string;
  urlBase: string;
}

export default function EmailWelcome({
  mail,
  token,
  urlBase,
}: EmailWelcomeProps): JSX.Element {
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
      <img style={{alignSelf:"center", marginBottom:"2vh"}} src={`${urlBase}/mimir.svg`} alt="mimir" />
      <hr style={{border:"#adadad 0.5px solid", width:"85%", alignSelf:"center"}}/>
      <h1>Confirm Your Email Address</h1>
      <p>Hello {mail} !</p>
      <p>
        We&apos;re excited to have you onboard at MIMIR. We hope you enjoy your
        journey with us. If you have any questions or need assistance, feel free
        to reach out. <br/>Please, tap the button below to confirm your email
        address.
      </p>
      <a
        href={`${urlBase}/login/${token}`}
        rel="noopener noreferrer"
        style={{borderRadius:"10px", backgroundColor:"rgb(0, 133, 216)", color:"white", padding:"5px 20px", alignSelf:"center"}}
        target="_blank"
      >
        get started
      </a>
      <div>
        <p style={{color:"grey", fontWeight:"300"}}>
          If that doesn&apos;t work, copy and paste the folliwing link in your
          browser :
        </p>
        <p style={{color:"rgb(0, 133, 216)", textDecoration:"underline", userSelect:"text"}}>{`${urlBase}/reset/${token}`}</p>
      </div>
      <p>
        If you didn&apos;t create an account with Mimir, you can safely delete
        this email.
      </p>
      <p>
        Cheers,
        <br />
        The MIMIR Team
      </p>
    </div>
  );
}
