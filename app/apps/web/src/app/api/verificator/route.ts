import { NextResponse } from "next/server";

interface ResponseModel {
  value: boolean;
}
export async function POST(req: Request): Promise<Response> {
  const reqData = await req.formData();

  const resData: ResponseModel = (await fetch(`http://extractor:5000/verify/`, {
    method: "POST",
    body: reqData,
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    })) as ResponseModel;

  return NextResponse.json({ resData }, { status: 201 }); // learn whats a header
}
