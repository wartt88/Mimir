import { Resend } from "resend";
import EmailTemplate from "../../../../components/ui/mails/email-templates";
import { useSearchParams } from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const params = useSearchParams();
  const mail: string = params.get("mail") || "";
  try {
    const data = await resend.emails.send({
      from: "mimir.systeme@kizyow.me",
      to: mail,
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    console.log("email envoyé");
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
