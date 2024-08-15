export class EventManager {
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

export class UserInterface {
  private static initialized = false;  // Added static flag to track initialization

  constructor() {
    if (!UserInterface.initialized) {  // Check if setupEventListeners has been called
      this.setupEventListeners();
      UserInterface.initialized = true;  // Mark as initialized to prevent multiple setups
    }
  }

  private setupEventListeners(): void {
    EventManager.getInstance().addListener('update', () => {
      console.log('Updating UI...');
    });
  }
}

function simulateApp() {
  for (let i = 0; i < 1000; i++) {
    const ui = new UserInterface();
  }

  // Emit the 'update' event
  EventManager.getInstance().emit('update');
}

simulateApp();
