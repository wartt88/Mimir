import * as React from "react";

interface EmailWelcomeProps {
  firstName: string;
}

export default function EmailWelcome({
  firstName,
}:EmailWelcomeProps): JSX.Element{
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  );
}
