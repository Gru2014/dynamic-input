import { Tag } from "../types/Tag";

interface TagElementProps {
  element: string | Tag;
  onRemove: (id: number) => void;
}

const TagElement: React.FC<TagElementProps> = ({ element, onRemove }) => {
  if (typeof element === "string") {
    return <span className="text-gray-700 px-1 text-sm">{element}</span>;
  }

  return (
    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full m-1 flex items-center text-sm">
      {element.label}
      <button
        onClick={() => onRemove(element.id)}
        className="ml-2 w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-white hover:bg-red-600 focus:outline-none"
      >
        <span className="text-xs">×</span>
      </button>
    </span>
  );
};

export default TagElement;