import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IAuthFormProps } from "../../interfaces/IAuthFormProps";
import { IRegisterResponse } from "../../interfaces/IApiTypes";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { RootState } from "@/store";
import { register } from "@/api/authApi";
import { useAppSelector } from "@/hooks/useRedux";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [form, setForm] = useState<IAuthFormProps>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res: IRegisterResponse = await register(form.email, form.password);
      if (res.success) {
        toast.success(res.message);
        setForm({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/40">
      <div className="w-full max-w-md space-y-6 p-8 bg-background rounded-xl shadow-lg border border-border relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
        
        <div className="text-center relative">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Wealth Wings</h1>
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>

        <form className="space-y-5 relative" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleChange}
                className="pl-10"
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
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-primary" />
              Password must be at least 8 characters long
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full group" 
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : (
              <>
                Create account
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        {/* Social login can be added here if needed */}
        <GoogleLoginButton />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
