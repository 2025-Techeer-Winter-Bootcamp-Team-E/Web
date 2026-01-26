import type { AgreementsState } from '@/components/auth/AgreementSection';
import AgreementSection from '@/components/auth/AgreementSection';
import useSignUpMutation from '@/hooks/mutations/useSignUpMutation';
import { PATH } from '@/routes/path';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const signUpMutation = useSignUpMutation();

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

    if (!formData.email) newErrors.email = 'Please enter your email';
    if (!formData.nickname) newErrors.nickname = 'Please enter your nickname';
    if (!formData.name) newErrors.name = 'Please enter your name';
    if (!formData.phone) newErrors.phone = 'Please enter your phone number';

    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!agreements.age14 || !agreements.service || !agreements.privacy) {
      alert('Please agree to the required terms.');
      return;
    }

    signUpMutation.mutate(
      {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        name: formData.name,
        phone: formData.phone,
      },
      {
        onSuccess: () => {
          navigate(PATH.LOGIN);
        },
        onError: (error) => {
          console.error(error);
          alert(error.message || 'Sign up failed.');
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#f5f5f7] px-4 py-24">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            <span className="text-2xl font-bold text-gray-900">Compare</span>
            <span className="bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] bg-clip-text text-2xl font-bold text-transparent">
              AI
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Create Account</h1>
          <p className="mt-2 text-sm text-gray-500">Join us for a smarter shopping experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Card padding="lg">
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nickname"
                  placeholder="Nickname"
                  value={formData.nickname}
                  onChange={handleInputChange('nickname')}
                  error={errors.nickname}
                />
                <Input
                  label="Name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={errors.name}
                />
              </div>

              <Input
                label="Phone"
                type="tel"
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={errors.phone}
              />

              <Input
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={formData.passwordConfirm}
                onChange={handleInputChange('passwordConfirm')}
                error={errors.passwordConfirm}
              />
            </div>
          </Card>

          <AgreementSection agreements={agreements} onAgreementsChange={setAgreements} />

          <Button type="submit" fullWidth size="lg">
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to={PATH.LOGIN}
              className="font-medium text-[var(--color-gradient-purple)] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
