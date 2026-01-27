import { useState } from 'react';
import AgreementSection, { type AgreementsState } from '@/components/auth/AgreementSection';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { PATH } from '@/routes/path';

type SignupFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  name: string;
  phone: string;
};

type FormErrors = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  name: string;
  phone: string;
};

type SignupFormProps = {
  onSubmit: (data: {
    email: string;
    password: string;
    nickname: string;
    name: string;
    phone: string;
  }) => void;
  loading?: boolean;
};

const SignupForm = ({ onSubmit, loading }: SignupFormProps) => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    name: '',
    phone: '',
  });

  const [agreements, setAgreements] = useState<AgreementsState>({
    all: false,
    age14: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    name: '',
    phone: '',
  });

  const handleInputChange =
    (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const validateForm = () => {
    const newErrors: FormErrors = {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      name: '',
      phone: '',
    };

    if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
    if (!formData.nickname) newErrors.nickname = '닉네임을 입력해주세요.';
    if (!formData.name) newErrors.name = '이름을 입력해주세요.';
    if (!formData.phone) newErrors.phone = '전화번호를 입력해주세요.';

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!agreements.age14 || !agreements.service || !agreements.privacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    onSubmit({
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      name: formData.name,
      phone: formData.phone,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Card padding="lg">
          <div className="space-y-4">
            <Input
              label="이메일"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="닉네임"
                value={formData.nickname}
                onChange={handleInputChange('nickname')}
                error={errors.nickname}
              />
              <Input
                label="이름"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={errors.name}
              />
            </div>

            <Input
              label="전화번호"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={errors.phone}
            />

            <Input
              label="비밀번호"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
            />

            <Input
              label="비밀번호 확인"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleInputChange('passwordConfirm')}
              error={errors.passwordConfirm}
            />
          </div>
        </Card>

        <AgreementSection agreements={agreements} onAgreementsChange={setAgreements} />

        <Button disabled={loading} type="submit" fullWidth size="lg">
          {loading ? '가입 처리 중...' : '가입하기'}
        </Button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          이미 계정이 있으신가요? &nbsp;&nbsp;
          <Link
            to={PATH.LOGIN}
            className="font-medium text-(--color-gradient-purple) hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
