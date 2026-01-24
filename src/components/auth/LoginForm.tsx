import useLogInMutation from '@/hooks/mutations/useLogInMutation';
import { PATH } from '@/routes/path';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogInMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate(PATH.ROOT);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-32">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            <span className="text-2xl font-bold text-gray-900">Compare</span>
            <span className="bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] bg-clip-text text-2xl font-bold text-transparent">
              AI
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to continue shopping</p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
            />

            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
            />

            <Button type="submit" disabled={isPending} fullWidth size="lg">
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              to={PATH.SIGNUP}
              className="font-medium text-[var(--color-gradient-purple)] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
