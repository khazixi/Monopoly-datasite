import { z } from "zod";
import { auth } from "../util/lucia";

const userSchema = z.object({
  username: z.string().min(8).max(32),
  password: z.string().min(8).max(32),
});

export default defineEventHandler(async (event) => {
  const bodyData = await readBody<{
    username: string,
    password: string
  }>(event);
  const parseResult = userSchema.safeParse(bodyData);
  if (!parseResult.success) {
    throw createError({
      status: 404,
      message: parseResult.error.message,
    });
  }

  const { username, password } = parseResult.data;
  // const { username, password } = bodyData
  try {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password: password // hashed by Lucia
      },
      attributes: {
        username: username
      }
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });
    const authRequest = auth.handleRequest(event);
    authRequest.setSession(session);
    return sendRedirect(event, "/"); // redirect to profile page
  } catch (e) {
    throw createError({
      message: (e as Error).message,
      statusCode: 500
    });
  }
});
