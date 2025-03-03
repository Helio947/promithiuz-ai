// Simple analytics service to track user interactions
// In a production app, this would connect to a real analytics provider

type EventData = Record<string, any>;

class Analytics {
  private static instance: Analytics;
  private initialized: boolean = false;
  private userId: string | null = null;
  private debugMode: boolean = false;

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public init(config: { debug?: boolean } = {}): void {
    if (this.initialized) return;
    
    this.debugMode = config.debug || false;
    
    // Load user ID from localStorage if available
    this.userId = localStorage.getItem('analyticsUserId');
    
    // Generate a random user ID if not available
    if (!this.userId) {
      this.userId = `user_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('analyticsUserId', this.userId);
    }
    
    this.initialized = true;
    this.log('Analytics initialized');
  }

  public identify(userId: string, traits: Record<string, any> = {}): void {
    this.userId = userId;
    localStorage.setItem('analyticsUserId', userId);
    this.log('User identified', { userId, traits });
  }

  public trackPageView(path: string): void {
    this.trackEvent('page_view', { path });
  }

  public trackEvent(eventName: string, eventData: EventData = {}): void {
    if (!this.initialized) {
      this.init();
    }

    const event = {
      eventName,
      userId: this.userId,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      data: eventData
    };

    // In a real implementation, you would send this to your analytics backend
    this.log('Event tracked', event);

    // For demo purposes, we're just storing events in localStorage
    this.storeEvent(event);
  }

  private storeEvent(event: any): void {
    const events = this.getStoredEvents();
    events.push(event);
    
    // Keep only the last 100 events to prevent localStorage from getting too large
    if (events.length > 100) {
      events.shift();
    }
    
    localStorage.setItem('analyticsEvents', JSON.stringify(events));
  }

  public getStoredEvents(): any[] {
    const eventsJson = localStorage.getItem('analyticsEvents');
    return eventsJson ? JSON.parse(eventsJson) : [];
  }

  private log(...args: any[]): void {
    if (this.debugMode) {
      console.log('📊 Analytics:', ...args);
    }
  }
}

export const analytics = Analytics.getInstance();

export default analytics;
