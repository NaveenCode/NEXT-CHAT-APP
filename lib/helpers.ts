import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // use env for security

export const generateUserToken = (id: string) => {
  try {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "3d" });
    return token;
  } catch (error) {
    console.error("JWT generation failed:", error);
    return null;
  }
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    console.log("decoded", decoded);

    return { success: true, data: decoded };
  } catch (error: any) {
    return { success: false, error: error.message || "Invalid token" };
  }
};
