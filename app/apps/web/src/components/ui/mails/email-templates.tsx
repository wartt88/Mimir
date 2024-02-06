import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export default function EmailTemplate({
  firstName,
}:EmailTemplateProps): JSX.Element{
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  );
}
