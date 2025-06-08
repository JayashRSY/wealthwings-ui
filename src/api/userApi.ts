import axiosInstance from "@/lib/api/axiosInstance";

export const getUsers = async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
};

export const getUser = async (id: string) => {
    const response = await axiosInstance.get(`/users/:${id}`);
    return response.data;
};

export const updateUser = async (id: string, payload: {
    name?: string;
    email?: string;
    profilePicture?: string;
    role?: string;
    password?: string;
}) => {
    const response = await axiosInstance.put(`/users/:${id}`, payload);
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await axiosInstance.delete(`/users/:${id}`);
    return response.data;
};
