interface ResponseModel {
  value: boolean;
}

export async function verifyAnswer(
  expected: string,
  actual: string
): Promise<boolean> {
  if (!actual) {
    return false;
  }

  if (expected.toLowerCase() === actual.toLowerCase()) {
    return true;
  }

  const formData = new FormData();
  formData.append("expected", expected);
  formData.append("actual", actual);

  const response: ResponseModel = (await fetch(`/api/verificator/`, {
    method: "POST",
    body: formData,
  })
    .then((r) => {
      return r.json();
    })
    .catch((err) => {
      console.error(err);
    })) as ResponseModel;

  if (typeof response !== "undefined") {
    return response.value;
  }
  return false;
}
