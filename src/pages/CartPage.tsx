import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import Checkbox from '@/components/cartPage/Checkbox';
import PriceSummaryCard from '@/components/cartPage/PriceSummaryCard';
import useCartQuery from '@/hooks/queries/useCartQuery';
import { useCartSelection } from '@/hooks/useCartSelectioin';
import { useCartSummary } from '@/hooks/useCartSummary';
import CartItemWrapper from '@/components/cartPage/CartItemWrapper';
import useTokenBalanceQuery from '@/hooks/queries/useTokenBalanceQuery';
import { toast } from 'react-toastify';

const CartPage = () => {
  const navigate = useNavigate();
  const { data } = useCartQuery();
  const cartItems = data || [];
  const itemIds = cartItems.map((item) => item.cart_item_id);

  const { selectedItems, toggleItem, toggleAll, removeItem, allSelected } =
    useCartSelection(itemIds);

  const { total } = useCartSummary(cartItems, selectedItems);

  const { data: tokenData } = useTokenBalanceQuery();
  const availableTokens = tokenData?.current_tokens ?? 0;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-sm text-gray-500">{cartItems.length} items in your cart</p>
        </div>

        <div className="flex flex-col items-start gap-10 lg:flex-row">
          <div className="w-full lg:flex-1">
            <div className="mb-4 flex items-center rounded-xl bg-gray-50 px-4 py-3">
              <Checkbox
                checked={allSelected}
                onChange={toggleAll}
                label={`Select All (${selectedItems.length}/${cartItems.length})`}
              />
            </div>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItemWrapper
                  key={item.cart_item_id}
                  item={item}
                  isSelected={selectedItems.includes(item.cart_item_id)}
                  onToggle={() => toggleItem(item.cart_item_id)}
                  onRemoveSuccess={() => removeItem(item.cart_item_id)}
                />
              ))}
            </div>
          </div>
          <div className="w-full lg:sticky lg:top-20 lg:w-96">
            <PriceSummaryCard
              availableTokens={availableTokens}
              total={total}
              selectedItemsCount={selectedItems.length}
              onCheckout={() => {
                if (selectedItems.length === 0) return toast('상품을 선택해주세요.');
                navigate(PATH.CHECKOUT, { state: { mode: 'cart', selectedItems } });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
