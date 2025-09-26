interface MissingShortcutAlert {
  timestamp: string;
  query: string;
  status: 'Not in DB';
  app?: string;
}

class DeveloperAlert {
  private alerts: MissingShortcutAlert[] = [];

  logMissingShortcut(query: string): void {
    // Extract potential app name from query
    const potentialApp = this.extractAppName(query);
    
    const alert: MissingShortcutAlert = {
      timestamp: new Date().toISOString(),
      query,
      status: 'Not in DB',
      app: potentialApp
    };

    this.alerts.push(alert);
    
    // Log to console (in real app, this would be sent to backend)
    console.warn(
      `[MISSING SHORTCUT ALERT: App=${potentialApp || 'Unknown'}, Query="${query}", Status=Not in DB]`
    );

    // In production, you would send this to your backend API
    this.sendAlertToBackend(alert);
  }

  private extractAppName(query: string): string | undefined {
    const words = query.toLowerCase().split(/\s+/);
    const knownApps = [
      'vscode', 'chrome', 'firefox', 'windows', 'linux', 'git', 
      'intellij', 'sublime', 'atom', 'vim', 'emacs', 'photoshop',
      'illustrator', 'blender', 'unity', 'unreal', 'docker',
      'kubernetes', 'slack', 'discord', 'teams', 'zoom'
    ];

    for (const word of words) {
      if (knownApps.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }

    // Try to guess from first word if it looks like an app name
    const firstWord = words[0];
    if (firstWord && firstWord.length > 2 && !['the', 'and', 'for', 'how', 'open', 'close'].includes(firstWord)) {
      return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    }

    return undefined;
  }

  private async sendAlertToBackend(alert: MissingShortcutAlert): Promise<void> {
    try {
      // In a real application, you would send this to your backend
      // await fetch('/api/missing-shortcuts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(alert)
      // });
      
      // For now, just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log('Alert sent to backend:', alert);
    } catch (error) {
      console.error('Failed to send alert to backend:', error);
    }
  }

  getAlerts(): MissingShortcutAlert[] {
    return [...this.alerts];
  }

  clearAlerts(): void {
    this.alerts = [];
  }
}

export const developerAlert = new DeveloperAlert();