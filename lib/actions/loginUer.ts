import bcrypt from "bcryptjs";
import { User } from "../schemas/UserSchema";
import { generateUserToken } from "../helpers";

export const loginUser = async (body: any) => {
  const { email, password } = body;
  if (!email || !password) {
    return Response.json(
      { error: "Please enter all the detils" },
      { status: 400 }
    );
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { error: "User not found with this email" },
        { status: 404 }
      );
    }
    // console.log("user", user);

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return Response.json({ error: "Password is wrong" }, { status: 401 });
    }
    return Response.json(
      {
        message: "Login Successfull",
        _id: user._id,
        email: user.email,
        password: user.password,
        token: generateUserToken(user._id),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("User login failed", error.message);
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
};
