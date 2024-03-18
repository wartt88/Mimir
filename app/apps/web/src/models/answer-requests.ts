interface ResponseModel {
    value: boolean,
}

export async function verifyAnswer(expected: string, actual: string): Promise<boolean> {

    if (!actual) {
        return false;
    }

    if (expected.toLowerCase() === actual.toLowerCase()) {
        return true;
    }

    const formData = new FormData();
    formData.append("expected", expected);
    formData.append("actual", actual);

    const response: ResponseModel = await fetch(`http://vps.kizyow.me:5000/verify/`, {
        method: "POST",
        body: formData
    }).then(r => {
        return r.json()
    }).catch(err => {
        console.error(err);
    }) as ResponseModel

    return response.value;

}