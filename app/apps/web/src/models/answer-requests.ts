import {act} from "react-dom/test-utils";
import {fa} from "@faker-js/faker";

interface ResponseModel {
    context: number[],
    created_at: Date,
    done: boolean,
    eval_duration: number,
    load_duration: number,
    model: string,
    prompt_eval_count: number,
    prompt_eval_duration: number,
    response: string,
    total_duration: number,
}

export async function verifyAnswer(expected: string, actual: string): Promise<boolean> {

    if(!actual){
        return false;
    }

    const prompt = `Réponse attendue : (${expected}). Réponse actuelle : (${actual}). Compare ces deux réponses et répond par oui ou non si elles sont identiques`
    console.log(prompt)

    const payload = {
        'model': 'vigogne_answer',
        prompt,
        'stream': false
    }

    const response: ResponseModel = await fetch(`http://vps.kizyow.me/ollama/api/generate`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    }).then(r => {
        return r.json()
    }).catch(err => {
        console.error(err);
    }) as ResponseModel

    const resp: string = response.response.toLowerCase().trim();

    console.log(resp)

    if (resp) {
        if (resp.includes("oui")) {
            return true;
        } else if (resp.includes("similaire")) {
            return true;
        } else if (resp.includes("non")) {
            return false;
        }
    }

    return false;


}