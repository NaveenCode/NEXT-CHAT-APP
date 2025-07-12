import { getUsersByNameOrEmail } from "@/lib/actions/users.action";
import { dbConnect } from "@/lib/db";
import { verifyToken } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  console.log("new URL(req.urln", new URL(req.url));
  console.log("headers", req.headers);
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  console.log("token", token);

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  const decoded = verifyToken(token);
  console.log("decoded", decoded);

  if (!decoded.success || !decoded.data?.id) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }

  const userId = decoded.data.id;

  try {
    if (search) {
      const result = await getUsersByNameOrEmail(search, userId);

      if (!result.success) {
        return NextResponse.json(
          { success: false, message: result.error },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, data: result.data },
        { status: 200 }
      );
    }

    // No search param = don't return all users (require search)
    return NextResponse.json(
      { success: false, message: "Search term required" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("GET /api/users error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
