import CartItemComponent from '@/components/cartPage/CartItemComponent';
import useCartItemPatchMutation from '@/hooks/mutations/useCartItemPatchMutation';
import type { CartItemEntity } from '@/types/ordersType';

interface CartItemWrapperProps {
  item: CartItemEntity;
  isSelected: boolean;
  onToggle: () => void;
}

const CartItemWrapper = ({ item, isSelected, onToggle }: CartItemWrapperProps) => {
  const { mutate } = useCartItemPatchMutation();

  const handleQuantityChange = (newQuantity: number) => {
    mutate({ cartItemId: item.cart_item_id, quantity: newQuantity });
  };

  const handleRemove = () => {
    if (!confirm('상품을 장바구니에서 삭제하시겠습니까?')) return;
    mutate({ cartItemId: item.cart_item_id, quantity: 0 });
  };

  return (
    <CartItemComponent
      item={item}
      isSelected={isSelected}
      onToggle={onToggle}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemove}
    />
  );
};

export default CartItemWrapper;
