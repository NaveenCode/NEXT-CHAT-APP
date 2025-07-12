"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import usePostData from "@/hooks/usePostData";
import Loader from "../reusableComponents/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type LoginFormType = {
  email: string;
  password: string;
};
const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const { postData, data, loading, error } = usePostData("/api/login");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = (): Boolean => {
    const { email, password } = formData;
    if (!email || !password) {
      setErrors("All fields except image are required.");
      return false;
    }
    return true;
  };
  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const res = await postData(formData);

    if (res) {
      toast.success("Login Successful!", {
        description: "Welcome back!",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo clicked"),
        },
      });
      router.push("/chat");
    }

    console.log("res", res);
  };

  const handleGetCredentails = () => {
    setFormData((prev) => ({
      ...prev,
      email: "guest@gmail.com",
      password: "guest",
    }));
  };

  console.log("logindata", data);

  return (
    <div className="flex flex-col  max-w-md mx-auto space-y-4">
      <form onSubmit={handleLoginFormSubmit} className="space-y-4">
        <CustomInput
          label="Email Address"
          type="email"
          placeholder="Enter Your Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          showToggle
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
        />
        {errors && (
          <div className="text-red-600 font-medium text-sm">{errors}</div>
        )}
        {error && (
          <div className="text-red-600 font-medium text-sm">{error}</div>
        )}
        <button
          className="bg-blue-600 w-full text-white py-3 rounded-xl cursor-pointer"
          type="submit"
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
      <button
        className="bg-red-500 w-full text-white py-3 rounded-xl cursor-pointer"
        onClick={() => handleGetCredentails()}
      >
        Get Guest User Credentials
      </button>
    </div>
  );
};

export default Login;
