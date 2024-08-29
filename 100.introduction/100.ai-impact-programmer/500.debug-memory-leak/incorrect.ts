class EventManager {
  private static instance: EventManager;
  private listeners: { [event: string]: (() => void)[] } = {};

  private constructor() { }

  static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  addListener(event: string, callback: () => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  removeListener(event: string, callback: () => void): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event: string): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback());
    }
  }
}

class UserInterface {
  private eventManager: EventManager;

  constructor() {
    this.eventManager = EventManager.getInstance();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Memory leak: This listener is added every time a new UserInterface is created
    this.eventManager.addListener('update', () => {
      console.log('Updating UI...');
      // Imagine complex UI update logic here
    });
  }

  // Missing method to remove the listener
}

function simulateApp() {
  for (let i = 0; i < 1000; i++) {
    // This creates multiple UserInterface instances, each adding a new listener
    const ui = new UserInterface();
  }

  // Trigger the event
  EventManager.getInstance().emit('update');
}

simulateApp();
