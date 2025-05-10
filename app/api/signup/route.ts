import { registerUser } from "@/lib/actions/registerUser";
import { dbConnect } from "@/lib/db";
export async function POST(req: Request) {
  await dbConnect();

  // console.log("data", await req.json());
  const body = await req.json();
  // console.log("data", body);

  return registerUser(body);
}
