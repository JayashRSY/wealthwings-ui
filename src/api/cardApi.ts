import axiosInstance from "@/lib/api/axiosInstance";

export const recommendCard = async (transactionDetails: {
  amount: number;
  platform: string;
  category: string;
  transactionMode: string;
  cards: string[];
}) => {
  const response = await axiosInstance.post(
    "/cards/recommend",
    transactionDetails
  );
  return response.data;
};

/**
 * Sends a credit card statement file to the backend for data extraction.
 * @param formData - FormData containing the uploaded file.
 * @returns Extracted statement data from the backend.
 */
export const uploadStatement = async (formData: FormData) => {
  const response = await axiosInstance.post("/cards/upload-statement", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 10 * 60 * 1000, // 10 minutes in milliseconds
  });
  return response.data;
};

export const getCardStatements = async () => {
  const response = await axiosInstance.get("/cards/statements");
  return response.data;
};
