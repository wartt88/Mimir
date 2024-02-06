import * as React from "react";

interface EmailResetPwdProps {
  firstName: string;
}

export default function EmailResetPwd({
  firstName,
}:EmailResetPwdProps): JSX.Element{
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  );
}
