import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import type { UserInterface } from "../../../../models/user";
import User from "../../../../models/user";
import connectDB from "../../../utils/db";

export async function PUT(request: Request): Promise<Response> {
  try {
    await connectDB();
    const newUser: UserInterface = (await request.json()) as UserInterface;
    //supprimer le token temporaire
    newUser.tmpToken = undefined;
    //mettre à jour le mot de passe
    newUser.password = await hash(newUser.password, 12);
    await User.findOneAndReplace({ email: newUser.email }, newUser);

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return Response.json({ error });
  }
}
