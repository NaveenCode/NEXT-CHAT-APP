import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // use env for security

export const generateUserToken = (id: string) => {
  try {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "90d" });
    return token;
  } catch (error) {
    console.error("JWT generation failed:", error);
    return null;
  }
};
