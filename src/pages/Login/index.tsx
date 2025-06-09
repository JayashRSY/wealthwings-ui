"use client";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IAuthFormProps } from "../../interfaces/IAuthFormProps";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight } from "lucide-react";
import ThemeButton from "@/components/layout/ThemeButton";
import { useAuth } from "@/hooks/useAuth";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const { user, login, loading, authError } = useAuth();
  const [form, setForm] = useState<IAuthFormProps>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(form);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md space-y-6 p-8 bg-background rounded-xl shadow-lg border border-border relative overflow-hidden">
        {/* Theme Button */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeButton />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
        <div className="text-center relative">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Wealth Wings
          </h1>
          <p className="text-muted-foreground mt-2">Login to your account</p>
        </div>
        <form className="space-y-5 relative" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
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
          </div>
          <Button
            type="submit"
            className="w-full group"
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? (
              "Logging in..."
            ) : (
              <>
                Login
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
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
