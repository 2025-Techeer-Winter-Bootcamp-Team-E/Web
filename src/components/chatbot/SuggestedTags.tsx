interface SuggestedTagsProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

const SuggestedTags = ({ tags, onTagClick }: SuggestedTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className="border border-gray-200 bg-white px-3 py-1.5 text-xs font-light text-gray-600 transition-all hover:border-black hover:text-black"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default SuggestedTags;
