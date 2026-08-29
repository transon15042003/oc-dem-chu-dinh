type SubmitFormResult =
  | { ok: true }
  | { ok: false; message: string };

type ApiErrorBody = {
  error?: string;
};

export async function submitForm(
  endpoint: string,
  data: unknown,
): Promise<SubmitFormResult> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { ok: true };
    }

    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    return {
      ok: false,
      message:
        body.error ??
        "Không gửi được yêu cầu. Vui lòng thử lại sau hoặc gọi hotline.",
    };
  } catch {
    return {
      ok: false,
      message: "Mất kết nối. Vui lòng kiểm tra mạng và thử lại.",
    };
  }
}
