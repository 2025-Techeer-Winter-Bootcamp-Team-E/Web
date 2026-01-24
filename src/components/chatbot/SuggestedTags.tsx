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
          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default SuggestedTags;
