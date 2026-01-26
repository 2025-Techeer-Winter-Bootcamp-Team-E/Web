import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useShoppingResultMutation from '@/hooks/mutations/useShoppingResultMutation';
import { PATH } from '@/routes/path';
import { ComparisonTable, FeaturedProductCard } from '@/components/shoppingResearchResult';

interface LocationState {
  user_query: string;
  survey_contents: Array<{
    question_id: number;
    question: string;
    answer: string;
  }>;
  search_id: string;
}

const ShoppingResearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = location.state as LocationState | null;

  const searchIdFromUrl = searchParams.get('search_id');
  const userQueryFromUrl = searchParams.get('q');

  const { mutate, data } = useShoppingResultMutation();

  useEffect(() => {
    if (state?.search_id && state?.user_query && state?.survey_contents) {
      mutate({
        search_id: state.search_id,
        user_query: state.user_query,
        survey_contents: state.survey_contents,
      });
    }
    else if (searchIdFromUrl && userQueryFromUrl) {
      mutate({
        search_id: searchIdFromUrl,
        user_query: decodeURIComponent(userQueryFromUrl),
        survey_contents: [],       });
    }
    else {
      navigate(PATH.SHOPPING_RESEARCH);
    }
  }, [state, searchIdFromUrl, userQueryFromUrl, mutate, navigate]);

  const products = data?.product || [];
  const topProduct = products[0];
  const comparisonProducts = products.slice(1);

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12 pb-32">
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        <FeaturedProductCard product={topProduct} />
        {comparisonProducts.length > 0 && <ComparisonTable products={comparisonProducts} />}
      </div>
    </div>
  );
};

export default ShoppingResearchResultPage;
