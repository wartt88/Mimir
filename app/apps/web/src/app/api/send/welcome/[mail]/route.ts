import { Resend } from "resend";
import uniqueString from "unique-string";
import connectDB from "../../../../utils/db";
import type { UserInterface } from "../../../../../models/user";
import User from "../../../../../models/user";
import EmailWelcome from "../../../../../components/ui/mails/email-welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PUT(
  request: Request,
  res: { params: { mail: string } }
): Promise<Response> {
  const token = uniqueString();
  const {
    params: { mail },
  } = res;
  const url = process.env.NEXTAUTH_URL;
  try {
    if (mail && url) {
      // envoie du mail avec token
      const data = await resend.emails.send({
        from: "mimir.systeme@kizyow.me",
        to: mail,
        subject: "Welcome",
        react: EmailWelcome({ mail, token: `${mail}-${token}`, urlBase: url }),
      });
      console.log("email envoyé");

      // mise a jour de la bdd avec token
      await connectDB();
      const user: UserInterface | null = await User.findOne({ email: mail });
      if (user) {
        user.tmpToken = token;
        await User.findOneAndUpdate({ email: mail }, user);
      }

      return Response.json(data);
    }
    return Response.json({ text: "pas de mail" });
  } catch (error) {
    return Response.json({ error });
  }
}
