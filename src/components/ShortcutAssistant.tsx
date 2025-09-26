import { useState, useEffect, useRef } from 'react';
import { Search, Command, Monitor, Layers } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { ShortcutResult } from './ShortcutResult';
import { shortcutDatabase, type ShortcutEntry } from '../services/shortcutDatabase';
import { developerAlert } from '../services/developerAlert';

interface ShortcutAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutAssistant({ isOpen, onClose }: ShortcutAssistantProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ShortcutEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      // Focus the container for keyboard navigation
      setTimeout(() => {
        containerRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay for realistic feel
    const searchTimeout = setTimeout(() => {
      const searchResults = shortcutDatabase.search(query);
      setResults(searchResults);
      setSelectedIndex(0);
      setIsSearching(false);

      // Generate developer alert if no results found
      if (searchResults.length === 0) {
        developerAlert.logMissingShortcut(query);
      }
    }, 150);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    }

    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      const selectedResult = results[selectedIndex];
      if (selectedResult) {
        // Could trigger copy to clipboard or other action here
        console.log('Selected shortcut:', selectedResult);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 launcher-overlay flex items-start justify-center pt-[15vh]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={containerRef}
        className="search-container w-full max-w-2xl mx-4 rounded-xl p-6 glow-effect"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Shortcut Assistant</span>
          </div>
          <div className="flex items-center gap-2 ml-auto text-xs text-muted-foreground">
            <Monitor className="w-3 h-3" />
            <span>Windows/Linux</span>
          </div>
        </div>

        {/* Search Input */}
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search shortcuts (e.g., 'VSCode terminal open')"
          isSearching={isSearching}
        />

        {/* Results */}
        {query.trim() && (
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <Layers className="w-4 h-4 mr-2 animate-pulse" />
                Searching shortcuts...
              </div>
            ) : results.length > 0 ? (
              results.map((result, index) => (
                <ShortcutResult
                  key={`${result.app}-${result.action}-${index}`}
                  result={result}
                  isSelected={index === selectedIndex}
                  onClick={() => setSelectedIndex(index)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <Search className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">No shortcuts found</p>
                <p className="text-xs text-muted-foreground">
                  Try searching with app name + action (e.g., "VSCode open terminal")
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-1 bg-muted rounded text-[10px]">Ctrl</span>
              <span>+</span>
              <span className="px-2 py-1 bg-muted rounded text-[10px]">Space</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}