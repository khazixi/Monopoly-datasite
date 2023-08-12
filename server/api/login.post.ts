import { z } from "zod";
import { auth } from "../util/lucia";

const userSchema = z.object({
  username: z.string().min(8).max(32),
  password: z.string().min(8).max(32),
});

export default defineEventHandler(async (event) => {
  const bodyData = await readBody(event);
  const parseResult = userSchema.safeParse(bodyData);
  if (!parseResult.success) {
    throw createError({
      status: 404,
      message: parseResult.error.message,
    });
  }

  const { username, password } = parseResult.data;

  try {
    const user = await auth.useKey(
      "username",
      username.toLowerCase(),
      password,
    );
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(event);
    authRequest.setSession(session);
    return sendRedirect(event, "/");
  } catch (e) {
    // TODO: Clean Up the Error Handling Later
    if (e instanceof Error) {
      throw createError({
        message: e.message,
        statusCode: 400,
      });
    }
  }
});
