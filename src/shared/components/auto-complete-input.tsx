interface Suggestion {
    display_name: string;
}

interface AutocompleteInputProps {
    placeholder: string;
    query: string;
    icon?: React.ReactNode;
    suggestions: Suggestion[];
    disabled?: boolean;
    onQueryChange: (value: string) => void;
    onSelectSuggestion: (place: Suggestion) => void;
}

export default function AutocompleteInput({
    placeholder,
    query,
    icon,
    suggestions,
    disabled,
    onQueryChange,
    onSelectSuggestion,
}: AutocompleteInputProps) {
    return (
        <div className="p-1 flex items-center justify-center relative">
            <span className="text-blue-500 text-sm">
                {icon && icon}
            </span>
            <input
                className={`${disabled ? 'bg-gray-100' : ''} w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                type="text"
                disabled={disabled}
                placeholder={placeholder}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
            />
            {suggestions.length > 0 && (
                <ul
                    className="absolute top-12 w-full bg-white border border-gray-300 shadow-lg z-50"
                >
                    {suggestions.map((place, index) => (
                        <li
                            key={index}
                            onClick={() => onSelectSuggestion(place)}
                            className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                        >
                            {place.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};