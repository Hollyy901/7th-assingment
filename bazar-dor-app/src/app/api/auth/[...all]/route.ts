
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const GET = async (request: Request) => {
  try {
    return await handler.GET(request);
  } catch (err) {
    console.error(">>> BETTER AUTH GET ERROR:", err);
    throw err;
  }
};

export const POST = async (request: Request) => {
  try {
    return await handler.POST(request);
  } catch (err) {
    console.error(">>> BETTER AUTH POST ERROR:", err);
    throw err;
  }
};