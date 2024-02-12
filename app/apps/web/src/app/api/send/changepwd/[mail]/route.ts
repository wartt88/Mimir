import { Resend } from "resend";
import EmailResetPwd from "../../../../../components/ui/mails/email-changepwd";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request,{params}:{params:{mail:string}}) {
  const {mail} = params;
  const url = process.env.NEXTAUTH_URL;
  try {
    if(mail && url){
      const data = await resend.emails.send({
        from: "mimir.systeme@kizyow.me",
        to: mail,
        subject: "Reset Password",
        react: EmailResetPwd({ mail, token:"azertyuiop",urlBase:url}),
      });
      console.log("email envoyé");
      return Response.json(data);
    }
    return Response.json({ text:"pas de mail"});
  } catch (error) {
    return Response.json({ error });
  }
}
