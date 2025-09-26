import { Search, Loader2 } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearching?: boolean;
}

export function SearchInput({ value, onChange, placeholder, isSearching }: SearchInputProps) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        {isSearching ? (
          <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
        ) : (
          <Search className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input w-full pl-10 pr-4 py-3 rounded-lg text-base font-mono focus:glow-effect"
        autoFocus
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}