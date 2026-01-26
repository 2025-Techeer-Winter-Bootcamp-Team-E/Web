import MyTokenBalance from '@/components/myPage/token/MyTokenBalance';
import TokenChargeForm from '@/components/myPage/token/TokenChargeForm';
import useTokenChargeMutation from '@/hooks/mutations/useTokenChargeMutation';
import useTokenBalanceQuery from '@/hooks/queries/useTokenBalanceQuery';
import { useState } from 'react';
import { toast } from 'react-toastify';

const TokenChargePage = () => {
  const { data: tokenBalance } = useTokenBalanceQuery();
  const currentToken = tokenBalance?.current_tokens ?? 0;

  const { mutate: chargeToken } = useTokenChargeMutation();
  const [selectedTokenAmount, setSelectedTokenAmount] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const handleCharge = () => {
    if (!selectedTokenAmount || !selectedPaymentMethod) return;

    chargeToken(
      { recharge_token: selectedTokenAmount },
      {
        onSuccess: () => {
          toast.success('토큰 충전이 완료되었습니다!');
          setSelectedTokenAmount(null);
          setSelectedPaymentMethod(null);
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-200 overflow-hidden rounded-4xl border border-black/3 bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
      <MyTokenBalance currentToken={currentToken} />
      <TokenChargeForm
        selectedTokenAmount={selectedTokenAmount}
        selectedPaymentMethod={selectedPaymentMethod}
        onSelectToken={setSelectedTokenAmount}
        onSelectPaymentMethod={setSelectedPaymentMethod}
        onCharge={handleCharge}
      />
    </div>
  );
};

export default TokenChargePage;
