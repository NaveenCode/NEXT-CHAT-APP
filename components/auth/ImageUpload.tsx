import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import usePostData from "@/hooks/usePostData";
import Swal from "sweetalert2";
interface IimageUpload {
  fileName: string | undefined;
  setFormData: React.Dispatch<React.SetStateAction<ISignUpFormData>>;
  setImageUplading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ImageUpload = ({
  fileName,
  setFormData,
  setImageUplading,
}: IimageUpload) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;

    if (!files || files.length === 0) {
      Swal.fire({
        title: "Failed To Upload Image",
        icon: "error",
      });
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append("file", files[0]);
    imageFormData.append("upload_preset", "nextchatapp"); // ✅ Your preset
    // DO NOT include cloud_name in formData

    try {
      setImageUplading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbobv7ulv/image/upload",
        {
          method: "POST",
          body: imageFormData,
        }
      );

      const data = await res.json();
      console.log("data", data);

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          pic: data.secure_url,
        }));
        setImageUplading(false);
      } else {
        Swal.fire({
          title: "Image Upload Failed",
          text: data?.error?.message || "Unknown error",
          icon: "error",
        });
        setImageUplading(false);
      }

      console.log("cloudinary data", data);
    } catch (err) {
      console.error("Upload failed", err);
      Swal.fire({
        title: "Error",
        text: "Upload failed. Please try again.",
        icon: "error",
      });
      setImageUplading(false);
    }
  };

  return (
    <CustomInput
      label="Upload Your Picture"
      type="file"
      name="pic"
      onChange={(e) => handleImageChange(e)}
      fileName={fileName}
    />
  );
};

export default ImageUpload;
