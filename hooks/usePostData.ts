import { useState } from "react";

const usePostData = <TResponse = any>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  console.log("errorerror", error);

  const postData = async (body: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        const message =
          errorResponse.error || errorResponse.message || "Failed to post data";
        throw new Error(message);
      }

      const result = await res.json();
      setData(result);
      return result;
    } catch (err: any) {
      console.error("POST error:", err.message);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { postData, data, loading, error };
};

export default usePostData;
