export const imageCdn = "https://ocdemchudinh.hgdigital.vn";

export function cdnImage(path: string): string {
  return `${imageCdn}/${path.replace(/^\//, "")}`;
}
