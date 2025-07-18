"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import usePostData from "@/hooks/usePostData";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";
import Loader from "../reusableComponents/Loader";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  pic: null,
};

const Signup = () => {
  const [formData, setFormData] = useState<ISignUpFormData>(emptyForm);

  console.log("formData", formData);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [imageUploading, setImageUplading] = useState<boolean>(false);
  const { postData, data, loading, error } = usePostData("/api/signup");
  const router = useRouter();

  const validationForm = (): boolean => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      setErrors("All fields except image are required.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrors("Passwords do not match.");
      return false;
    }
    setErrors(null);
    return true;
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validationForm()) return;
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      pic: formData.pic, // You may need to handle file upload separately
    };

    const result = await postData(payload);
    console.log("result", result);

    if (result) {
      toast("signup successful", {});
      router.push("/chat");
      console.log("Server response:", result);
    }
  };

  return (
    <div className="flex flex-col  max-w-md mx-auto">
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <CustomInput
          label="Name"
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
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
        <CustomInput
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          showToggle
          showPassword={showConfirmPassword}
          togglePasswordVisibility={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        />

        <ImageUpload
          fileName={formData.pic?.name}
          setFormData={setFormData}
          setImageUplading={setImageUplading}
        />
        {errors && (
          <div className="text-red-600 font-medium text-sm">{errors}</div>
        )}
        {error && (
          <div className="text-red-600 font-medium text-sm">{error}</div>
        )}
        <button
          className="bg-blue-600 w-full text-white py-3 rounded-xl"
          type="submit"
        >
          {loading || imageUploading ? <Loader /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
