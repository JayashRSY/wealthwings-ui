import axiosInstance from "@/lib/api/axiosInstance";

/**
 * Uploads a bank statement file to the backend for data extraction.
 * @param formData - FormData containing the uploaded file.
 * @returns Extracted statement data from the backend.
 */
export const uploadBankStatement = async (formData: FormData) => {
  const response = await axiosInstance.post("/banks/upload-statement", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 10 * 60 * 1000, // 10 minutes in milliseconds
  });
  return response.data;
};