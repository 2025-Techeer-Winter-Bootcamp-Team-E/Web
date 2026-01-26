interface SuggestedTagsProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

const SuggestedTags = ({ tags, onTagClick }: SuggestedTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={`${tag}`}
          onClick={() => onTagClick(tag)}
          className="rounded-full border border-gray-200/60 bg-white/50 px-4 py-2 text-xs font-normal text-gray-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black hover:text-white hover:shadow-lg"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
export default SuggestedTags;
