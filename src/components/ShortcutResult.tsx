import { Monitor, ExternalLink, Copy } from 'lucide-react';
import { type ShortcutEntry } from '../services/shortcutDatabase';

interface ShortcutResultProps {
  result: ShortcutEntry;
  isSelected: boolean;
  onClick: () => void;
}

export function ShortcutResult({ result, isSelected, onClick }: ShortcutResultProps) {
  const handleCopyShortcut = (shortcut: string, platform: 'windows' | 'linux') => {
    if (shortcut !== 'Search in web') {
      navigator.clipboard.writeText(shortcut);
      // Could show toast notification here
      console.log(`Copied ${platform} shortcut: ${shortcut}`);
    }
  };

  const handleSearchWeb = (app: string, action: string) => {
    // In a real app, this would trigger the web search/AI query
    console.log(`Searching web for: ${app} ${action}`);
  };

  return (
    <div
      className={`result-item p-4 rounded-lg cursor-pointer ${
        isSelected ? 'selected' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left side - App and Action */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Monitor className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-semibold text-foreground truncate">
              {result.app}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {result.action}
          </p>
          
          {/* Platform shortcuts */}
          <div className="space-y-2">
            {/* Windows */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground w-16">Windows:</span>
              <div className="flex items-center gap-2">
                {result.windows === 'Search in web' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearchWeb(result.app, result.action);
                    }}
                    className="search-web-badge px-2 py-1 rounded text-xs font-mono flex items-center gap-1 hover:opacity-80 transition-opacity"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Search in web
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="shortcut-badge px-2 py-1 rounded text-xs font-mono">
                      {result.windows}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyShortcut(result.windows, 'windows');
                      }}
                      className="p-1 hover:bg-muted rounded opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Linux */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground w-16">Linux:</span>
              <div className="flex items-center gap-2">
                {result.linux === 'Search in web' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearchWeb(result.app, result.action);
                    }}
                    className="search-web-badge px-2 py-1 rounded text-xs font-mono flex items-center gap-1 hover:opacity-80 transition-opacity"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Search in web
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="shortcut-badge px-2 py-1 rounded text-xs font-mono">
                      {result.linux}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyShortcut(result.linux, 'linux');
                      }}
                      className="p-1 hover:bg-muted rounded opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}