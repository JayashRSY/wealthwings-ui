import { useRef, useState } from "react";
import { validateImage } from "../../configs/fileValidations";
import { updateUser } from "../../api/userApi";
import { Edit, User, Mail, Lock, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-lg mx-auto relative">
        
        <Card className="border border-border shadow-lg overflow-hidden">
          <CardHeader className="pb-4 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
            <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Profile
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
              
              <div className="flex justify-center">
                <div
                  className="relative group w-32 h-32 cursor-pointer rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary/40 transition-all duration-300"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imgLoader ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <div className="loader border-t-transparent border-solid border-primary border-4 rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                  ) : (
                    <img
                      src={formData?.profilePicture || user?.profilePicture || "https://via.placeholder.com/150"}
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Edit className="text-primary h-6 w-6" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      defaultValue={formData.name}
                      placeholder="Your name"
                      className="pl-10"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={formData.email}
                      placeholder="email@example.com"
                      className="pl-10"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="New password"
                      className="pl-10"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90"
              >
                Update Profile
              </Button>
            </form>
            
            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
