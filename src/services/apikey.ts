export function getApiKey(req: Request) {
  const auth = req.headers.get("Authorization");
  if (!auth) {
    return "";
  }

  return auth.replace("Bearer ", "");
}
