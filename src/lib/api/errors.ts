import { NextResponse } from "next/server";

import { getEmailConfigError } from "@/lib/env-server";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function validationError() {
  return jsonError("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường.", 400);
}

export function emailNotConfiguredError() {
  return jsonError(getEmailConfigError(), 503);
}

export function serverError() {
  return jsonError(
    "Không gửi được yêu cầu. Vui lòng thử lại sau hoặc gọi hotline.",
    500,
  );
}
