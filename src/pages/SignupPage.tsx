import SignupForm from '@/components/auth/SignUpForm';
import useSignUpMutation from '@/hooks/mutations/useSignUpMutation';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSignUpMutation();

  const handleSignup = (data: {
    email: string;
    password: string;
    nickname: string;
    name: string;
    phone: string;
  }) => {
    mutate(data, {
      onSuccess: () => {
        navigate(PATH.LOGIN);
      },
      onError: () => {
        alert('회원가입에 실패했습니다.');
      },
    });
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#f5f5f7] px-4 py-24">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">회원가입</h1>
          <p className="mt-2 text-sm text-gray-500">스마트한 쇼핑 경험을 지금 시작해보세요.</p>
        </div>
        <SignupForm onSubmit={handleSignup} loading={isPending} />
      </div>
    </div>
  );
};

export default SignupPage;
