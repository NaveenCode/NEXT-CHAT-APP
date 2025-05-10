import { generateUserToken } from "../helpers";
import { User } from "../schemas/UserSchema";

export async function registerUser(body: any) {
  console.log("body", body);

  const { name, email, password } = body;
  if (!name || !email || !password) {
    return Response.json({ error: "all fields are required" }, { status: 400 });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "User Email is already exist" },
        { status: 409 }
      );
    }
    // const hashedPassword=passwordHashing(password)
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      return Response.json(
        {
          message: "User created Successfully",
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          token: generateUserToken(user._id),
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("User Creation Filed", error.message);
    return Response.json(
      { error: "Internal Server Error", detail: error.message },
      { status: 500 }
    );
  }
}
