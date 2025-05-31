import { useRef, useState } from "react";
import { validateImage } from "../../configs/fileValidations";
import { updateUser } from "../../api/userApi";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();
  const [imgLoader, setImgLoader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    profilePicture: user?.profilePicture || "",
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgLoader(true);
    const file = e.target.files?.[0];
    if (file) {
      const { success, message } = validateImage(file);
      if (!success) {
        toast.error(message);
        setImgLoader(false);
        return;
      }
      const fileName = new Date().getTime() + file.name;
      console.log("🚀 ~ file: Profile.tsx:45 ~ fileName:", fileName);
    }
    setImgLoader(false);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res: any = await updateUser("", formData);
      if (res.success) {
        toast.success(res.message);
        // Optionally, you can refresh user info here
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      toast("Account Deleted");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          className="relative group w-32 h-32 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileInputRef.current?.click()}
        >
          {imgLoader ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <div className="loader border-t-transparent border-solid border-white border-4 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          ) : (
            <img
              src={formData?.profilePicture || user?.profilePicture}
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-full"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 object-cover rounded-full">
            <Edit className="text-white text-2xl" />
          </div>
        </div>
        <input
          defaultValue={formData.name}
          type="text"
          name="name"
          placeholder="Name"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          required
        />
        <input
          defaultValue={formData.email}
          type="email"
          name="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleLogout} className="text-red-700 cursor-pointer">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Profile;
