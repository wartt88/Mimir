import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const reqData = await req.formData();

    if (process.env.OLLAMA_ENABLED) {
        const resData = await fetch(`http://extractor:5000/upload/`, {
            method: "POST",
            body: reqData,
        }).then(response => response.json()
        ).then(data => {
            return data;
        }).catch((err) => {
            console.error(err);
        });
        return NextResponse.json({ok: true, resData: resData}, {status: 201}); // learn whats a header

    }

    return NextResponse.json({ok: false}, {status: 201}); // learn whats a header

}


