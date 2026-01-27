import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCartItem } from '@/api/orders';
import { QUERY_KEY } from '@/constants/queryKey';
import { toast } from 'react-toastify';

const useCartItemPatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      patchCartItem(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CART });
    },
    onError: (error) => {
      console.error('장바구니 수정 실패:', error);
      toast.error('장바구니 수정/삭제에 실패했습니다');
    },
  });
};

export default useCartItemPatchMutation;
