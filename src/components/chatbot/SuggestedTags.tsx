import type { SearchPopularResDto } from '@/types/searchType';

interface SuggestedTagsProps {
  tags: SearchPopularResDto;
  onTagClick: (tag: string) => void;
}

const SuggestedTags = ({ tags, onTagClick }: SuggestedTagsProps) => {
  const terms = tags?.popular_terms || [];

  return (
    <div className="flex flex-wrap gap-2">
      {terms.map((tag) => (
        <button
          key={`${tag.rank}-${tag.term}`}
          onClick={() => onTagClick(tag.term)}
          className="rounded-full border border-gray-200/60 bg-white/50 px-4 py-2 text-xs font-normal text-gray-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black hover:text-white hover:shadow-lg"
        >
          {tag.term}
        </button>
      ))}
    </div>
  );
};
export default SuggestedTags;
