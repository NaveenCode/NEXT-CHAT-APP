import { loginUser } from "@/lib/actions/loginUer";
import { dbConnect } from "@/lib/db";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  // console.log("body", body);
  return loginUser(body);
}
