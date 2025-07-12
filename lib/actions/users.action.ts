import { User } from "../schemas/UserSchema";

export const getUsersByNameOrEmail = async (
  keyword: string,
  currentUserId: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const users = await User.find({
      _id: { $ne: currentUserId }, // exclude current user
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
    });

    if (users.length === 0) {
      return {
        success: false,
        error: "No users found with this name or email",
      };
    }

    return { success: true, data: users };
  } catch (error: any) {
    console.error("Error in getUsersByNameOrEmail:", error);
    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
};
