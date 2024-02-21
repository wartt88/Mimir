import {hash} from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import connectDB from "../../utils/db";
import User from "../../../models/user";
import uniqueString from "unique-string";
import EmailWelcome from "../../../components/ui/mails/email-welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const token = uniqueString();
  const url = process.env.NEXTAUTH_URL;

  try {
    const { username, email, password } = (await req.json()) as {
      username: string;
      email: string;
      password: string;
    };
    const hashedPassword = await hash(password, 12);

    if (email && url) {
      // envoie du email avec token
      const data = await resend.emails.send({
        from: "mimir.systeme@kizyow.me",
        to: email,
        subject: "Welcome",
        react: EmailWelcome({
          mail: email,
          token: `${email}-${token}`,
          urlBase: url,
        }),
      });
      console.log(data);
    }
    
    await connectDB();
    await User.create({
      username,
      email,
      password: hashedPassword,
      checkEmail: false,
      tmpToken: token,
      sharedDecks: [],
    });
    //TODO pb ici bizarre

    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
