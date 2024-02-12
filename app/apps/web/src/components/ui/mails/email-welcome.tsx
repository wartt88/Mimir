import * as React from "react";
import "./email.css";

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
    <div className="mail">
      <img src={`${urlBase}/mimir.svg`} alt="mimir" />
      <hr/>
      <h1>Confirm Your Email Address</h1>
      <p>Hello {mail} !</p>
      <p>
        We&apos;re excited to have you onboard at MIMIR. We hope you enjoy your
        journey with us. If you have any questions or need assistance, feel free
        to reach out. <br/>Please, tap the button below to confirm your email
        address.
      </p>
      <a
        href={`${urlBase}/reset/${token}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        get started
      </a>
      <div>
        <p className="lightFont">
          If that doesn&apos;t work, copy and paste the folliwing link in your
          browser :
        </p>
        <p className="linkFont">{`${urlBase}/reset/${token}`}</p>
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
