import { useState, useEffect } from 'react';
import { Command, Keyboard, Search, Zap, Monitor, Layers } from 'lucide-react';
import { ShortcutAssistant } from '../components/ShortcutAssistant';

const Index = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Space to open assistant
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        setIsAssistantOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Interface */}
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Command className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Shortcut Assistant
            </h1>
          </div>

          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Lightning-fast keyboard shortcut search for Windows and Linux applications.
            <br />
            Never forget a shortcut again.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="result-item p-6 rounded-xl text-center">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Search</h3>
              <p className="text-sm text-muted-foreground">
                Fuzzy search through thousands of shortcuts with intelligent matching
              </p>
            </div>

            <div className="result-item p-6 rounded-xl text-center">
              <div className="p-3 bg-accent/10 rounded-lg w-fit mx-auto mb-4">
                <Monitor className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Multi-Platform</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive shortcuts for Windows and Linux applications
              </p>
            </div>

            <div className="result-item p-6 rounded-xl text-center">
              <div className="p-3 bg-success/10 rounded-lg w-fit mx-auto mb-4">
                <Layers className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Smart Fallback</h3>
              <p className="text-sm text-muted-foreground">
                Web search integration for missing shortcuts with developer alerts
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 glow-effect"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5" />
                Open Shortcut Assistant
              </div>
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Keyboard className="w-4 h-4" />
              <span>Or press</span>
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-muted rounded text-xs">Ctrl</span>
                <span>+</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">Space</span>
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-6">Try searching for:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'VSCode terminal',
                'Chrome devtools',
                'Windows task manager',
                'Git commit',
                'IntelliJ run'
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setIsAssistantOpen(true)}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shortcut Assistant Modal */}
      <ShortcutAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};

export default Index;
