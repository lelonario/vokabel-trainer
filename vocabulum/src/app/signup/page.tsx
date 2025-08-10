import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>
      <SignUpForm />
    </div>
  );
}
