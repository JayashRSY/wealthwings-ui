import axiosInstance from "@/lib/api/axiosInstance";

export const getUsers = async () => {
    const response = await axiosInstance.get('/user');
    return response.data;
};

export const getUser = async (id: string) => {
    const response = await axiosInstance.get(`/user/:${id}`);
    return response.data;
};

export const updateUser = async (id: string, payload: {
    name?: string;
    email?: string;
    profilePicture?: string;
    role?: string;
    password?: string;
}) => {
    const response = await axiosInstance.put(`/user/:${id}`, payload);
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await axiosInstance.delete(`/user/:${id}`);
    return response.data;
};
