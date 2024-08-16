type ItemType = 'ELECTRONICS' | 'CLOTHING' | 'FOOD';

// Refactored Item class: Renamed properties for clarity
export class Item {
  constructor(
    public name: string,          // Changed 'n' to 'name'
    public price: number,         // Changed 'p' to 'price'
    public quantity: number,      // Changed 'q' to 'quantity'
    public type: ItemType         // Changed 't' to 'type'
  ) { }
}

export class InventoryManager {
  private items: Item[] = [];     // Private field for items

  public addItem(item: Item): void {
    this.items.push(item);      // Added item to inventory
  }

  public removeItem(name: string): void {
    this.items = this.items.filter(item => item.name !== name);  // Removed item by name
  }

  public updateQuantity(name: string, quantity: number): void {
    const item = this.items.find(item => item.name === name);
    if (item) item.quantity = quantity;  // Updated quantity if item found
  }

  public getTotalValue(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0); // Calculated total value
  }

  public getItemsByType(type: ItemType): Item[] {
    return this.items.filter(item => item.type === type);  // Filtered items by type
  }

  public printInventory(): void {
    this.items.forEach(item =>
      console.log(`${item.name} - Price: $${item.price}, Quantity: ${item.quantity}, Type: ${item.type}`)  // Printed inventory details
    );
  }
}

export class Store {
  private inventoryManager = new InventoryManager();  // Renamed 'im' to 'inventoryManager'
  private dailyRevenue = 0;                          // Renamed 'd' to 'dailyRevenue'

  public addItem(item: Item): void {
    this.inventoryManager.addItem(item);  // Renamed 'a' to 'addItem'
  }

  public removeItem(name: string): void {
    this.inventoryManager.removeItem(name);  // Renamed 'r' to 'removeItem'
  }

  public updateItemQuantity(name: string, quantity: number): void {
    this.inventoryManager.updateQuantity(name, quantity);  // Renamed 'u' to 'updateItemQuantity'
  }

  public sellItem(item: Item, quantity: number): void {
    if (item.quantity >= quantity) {   // Check if enough quantity is available
      item.quantity -= quantity;    // Update quantity
      this.dailyRevenue += item.price * quantity;  // Update daily revenue
      this.inventoryManager.updateQuantity(item.name, item.quantity);  // Update quantity in inventory
    } else {
      console.log(`Not enough quantity for ${item.name}`);  // Handle insufficient quantity
    }
  }

  public getDailyRevenue(): number {
    return this.dailyRevenue;  // Renamed 'd' to 'dailyRevenue'
  }

  public printInventory(): void {
    this.inventoryManager.printInventory();  // Renamed 'p' to 'printInventory'
  }
}

// Usage
const store = new Store();
store.addItem(new Item('Laptop', 1000, 5, 'ELECTRONICS'));
store.addItem(new Item('T-shirt', 20, 100, 'CLOTHING'));
store.addItem(new Item('Apple', 0.5, 200, 'FOOD'));

store.printInventory();

store.sellItem(new Item('Laptop', 1000, 5, 'ELECTRONICS'), 2);  // Corrected to use existing item
store.sellItem(new Item('T-shirt', 20, 100, 'CLOTHING'), 10);  // Corrected to use existing item

console.log(`Daily Revenue: $${store.getDailyRevenue()}`);
