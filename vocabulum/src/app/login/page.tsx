import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
      <LoginForm />
    </div>
  );
}
