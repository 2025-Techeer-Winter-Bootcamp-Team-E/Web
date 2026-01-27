import { PATH } from '@/routes/path';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="flex items-center justify-center bg-[#f5f5f7] px-4 py-20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome</h1>
          <p className="mt-2 text-xl text-gray-500">쇼핑을 계속하려면 로그인해 주세요</p>
        </div>
        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="이메일"
              placeholder="이메일 주소를 입력하세요"
            />

            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
            />
            <Button type="submit" disabled={loading} fullWidth size="lg">
              {loading ? '로그인 중...' : '로그인'}{' '}
            </Button>
          </form>
        </Card>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            아직 계정이 없으신가요?&nbsp;&nbsp;&nbsp;
            <Link
              to={PATH.SIGNUP}
              className="font-medium text-(--color-gradient-purple) hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
