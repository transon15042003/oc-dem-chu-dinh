export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatField(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;color:#2a2118;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#4a4036;">${escapeHtml(value)}</td>
  </tr>`;
}

export function wrapEmailHtml(title: string, rows: string): string {
  return `<!DOCTYPE html>
<html lang="vi">
  <body style="margin:0;padding:24px;background:#faf7f2;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e8e0d6;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="padding:20px 24px;background:#d61f26;color:#ffffff;font-size:18px;font-weight:700;">
          ${escapeHtml(title)}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rows}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
