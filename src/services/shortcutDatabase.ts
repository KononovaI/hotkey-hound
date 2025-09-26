export interface ShortcutEntry {
  app: string;
  action: string;
  windows: string;
  linux: string;
  tags: string[];
}

// Mock database of keyboard shortcuts
const shortcuts: ShortcutEntry[] = [
  // VS Code
  {
    app: 'VSCode',
    action: 'Open integrated terminal',
    windows: 'Ctrl+`',
    linux: 'Ctrl+Shift+`',
    tags: ['vscode', 'terminal', 'open', 'integrated']
  },
  {
    app: 'VSCode',
    action: 'Command palette',
    windows: 'Ctrl+Shift+P',
    linux: 'Ctrl+Shift+P',
    tags: ['vscode', 'command', 'palette']
  },
  {
    app: 'VSCode',
    action: 'Quick file open',
    windows: 'Ctrl+P',
    linux: 'Ctrl+P',
    tags: ['vscode', 'file', 'open', 'quick']
  },
  {
    app: 'VSCode',
    action: 'Find in files',
    windows: 'Ctrl+Shift+F',
    linux: 'Ctrl+Shift+F',
    tags: ['vscode', 'find', 'search', 'files']
  },
  {
    app: 'VSCode',
    action: 'Toggle sidebar',
    windows: 'Ctrl+B',
    linux: 'Ctrl+B',
    tags: ['vscode', 'sidebar', 'toggle', 'hide', 'show']
  },

  // Chrome/Firefox
  {
    app: 'Chrome',
    action: 'New tab',
    windows: 'Ctrl+T',
    linux: 'Ctrl+T',
    tags: ['chrome', 'browser', 'tab', 'new']
  },
  {
    app: 'Chrome',
    action: 'Developer tools',
    windows: 'F12',
    linux: 'F12',
    tags: ['chrome', 'developer', 'tools', 'devtools', 'inspect']
  },
  {
    app: 'Chrome',
    action: 'Incognito window',
    windows: 'Ctrl+Shift+N',
    linux: 'Ctrl+Shift+N',
    tags: ['chrome', 'incognito', 'private', 'window']
  },

  // Windows System
  {
    app: 'Windows',
    action: 'Task manager',
    windows: 'Ctrl+Shift+Esc',
    linux: 'Search in web',
    tags: ['windows', 'task', 'manager', 'system']
  },
  {
    app: 'Windows',
    action: 'Run dialog',
    windows: 'Win+R',
    linux: 'Search in web',
    tags: ['windows', 'run', 'dialog', 'execute']
  },
  {
    app: 'Windows',
    action: 'Lock screen',
    windows: 'Win+L',
    linux: 'Search in web',
    tags: ['windows', 'lock', 'screen', 'security']
  },

  // Linux System
  {
    app: 'Linux',
    action: 'Open terminal',
    windows: 'Search in web',
    linux: 'Ctrl+Alt+T',
    tags: ['linux', 'terminal', 'open', 'shell']
  },
  {
    app: 'Linux',
    action: 'System monitor',
    windows: 'Search in web',
    linux: 'Ctrl+Shift+Esc',
    tags: ['linux', 'system', 'monitor', 'htop']
  },

  // Git
  {
    app: 'Git',
    action: 'Commit with message',
    windows: 'git commit -m "message"',
    linux: 'git commit -m "message"',
    tags: ['git', 'commit', 'message', 'version', 'control']
  },
  {
    app: 'Git',
    action: 'Push to origin',
    windows: 'git push origin main',
    linux: 'git push origin main',
    tags: ['git', 'push', 'origin', 'remote']
  },

  // IntelliJ IDEA
  {
    app: 'IntelliJ',
    action: 'Find everywhere',
    windows: 'Shift+Shift',
    linux: 'Shift+Shift',
    tags: ['intellij', 'idea', 'find', 'search', 'everywhere']
  },
  {
    app: 'IntelliJ',
    action: 'Run current file',
    windows: 'Ctrl+Shift+F10',
    linux: 'Ctrl+Shift+F10',
    tags: ['intellij', 'run', 'execute', 'current', 'file']
  },

  // Sublime Text
  {
    app: 'Sublime',
    action: 'Go to line',
    windows: 'Ctrl+G',
    linux: 'Ctrl+G',
    tags: ['sublime', 'text', 'go', 'line', 'navigate']
  },
  {
    app: 'Sublime',
    action: 'Multiple cursors',
    windows: 'Ctrl+D',
    linux: 'Ctrl+D',
    tags: ['sublime', 'text', 'multiple', 'cursors', 'select']
  }
];

class ShortcutDatabase {
  private shortcuts: ShortcutEntry[] = shortcuts;

  search(query: string): ShortcutEntry[] {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase().trim();
    const words = lowerQuery.split(/\s+/);

    return this.shortcuts
      .map(shortcut => {
        let score = 0;
        const searchableText = [
          shortcut.app,
          shortcut.action,
          ...shortcut.tags
        ].join(' ').toLowerCase();

        // Exact app name match gets highest score
        if (shortcut.app.toLowerCase() === lowerQuery) {
          score += 100;
        }

        // Partial app name match
        if (shortcut.app.toLowerCase().includes(lowerQuery)) {
          score += 50;
        }

        // Action contains the query
        if (shortcut.action.toLowerCase().includes(lowerQuery)) {
          score += 30;
        }

        // Count word matches
        words.forEach(word => {
          if (searchableText.includes(word)) {
            score += 10;
          }
        });

        // Fuzzy matching for common patterns
        if (this.fuzzyMatch(lowerQuery, searchableText)) {
          score += 5;
        }

        return { shortcut, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.shortcut)
      .slice(0, 10); // Limit results
  }

  private fuzzyMatch(query: string, text: string): boolean {
    let queryIndex = 0;
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === query.length;
  }

  addShortcut(shortcut: ShortcutEntry): void {
    this.shortcuts.push(shortcut);
  }

  getAllShortcuts(): ShortcutEntry[] {
    return [...this.shortcuts];
  }
}

export const shortcutDatabase = new ShortcutDatabase();