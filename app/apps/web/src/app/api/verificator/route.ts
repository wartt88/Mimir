import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const reqData = await req.formData();

    const resData = await fetch(`http://extractor:5000/verify/`, {
        method: "POST",
        body: reqData,
    }).then(response => response.json()
    ).then(data => {
        return data;
    }).catch((err) => {
        console.error(err);
    });

    return NextResponse.json({resData}, {status: 201}); // learn whats a header

}


