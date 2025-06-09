// components/GoogleLoginButton.tsx
import { useAuth } from '@/hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const { googleLogin } = useAuth();
  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;

    try {
      await googleLogin(idToken);
    } catch (err: any) {
      console.error("Google login failed:", err.response?.data || err.message);
    }
  };

  const handleError = () => {
    console.error('Google login failed');
  };

  return (
    <div className="flex justify-center w-full">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleLoginButton;
