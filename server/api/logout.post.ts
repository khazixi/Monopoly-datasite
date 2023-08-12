import { auth } from "../util/lucia";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    throw createError({
      message: "Not Authenticated",
      status: 401,
    });
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(session);
  return sendRedirect(event, "/login");
});
