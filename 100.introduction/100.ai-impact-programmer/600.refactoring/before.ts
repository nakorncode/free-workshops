type ItemType = 'ELECTRONICS' | 'CLOTHING' | 'FOOD';

export class Item {
  public n: string;
  public p: number;
  public q: number;
  public t: ItemType;

  constructor(n: string, p: number, q: number, t: ItemType) {
    this.n = n;
    this.p = p;
    this.q = q;
    this.t = t;
  }
}

export class InventoryManager {
  private items: Item[] = [];

  public addItem(i: Item): void {
    this.items.push(i);
  }

  public removeItem(n: string): void {
    this.items = this.items.filter(i => i.n !== n);
  }

  public updateQuantity(n: string, q: number): void {
    const i = this.items.find(item => item.n === n);
    if (i) i.q = q;
  }

  public getTotalValue(): number {
    return this.items.reduce((total, i) => total + i.p * i.q, 0);
  }

  public getItemsByType(t: ItemType): Item[] {
    return this.items.filter(i => i.t === t);
  }

  public printInventory(): void {
    for (const i of this.items) {
      console.log(`${i.n} - Price: $${i.p}, Quantity: ${i.q}, Type: ${i.t}`);
    }
  }
}

export class Store {
  private im: InventoryManager;
  private d: number = 0;

  constructor() {
    this.im = new InventoryManager();
  }

  public a(i: Item): void {
    this.im.addItem(i);
  }

  public r(n: string): void {
    this.im.removeItem(n);
  }

  public u(n: string, q: number): void {
    this.im.updateQuantity(n, q);
  }

  public s(i: Item, q: number): void {
    if (i.q >= q) {
      i.q -= q;
      this.d += i.p * q;
      this.im.updateQuantity(i.n, i.q);
    }
  }

  public getDailyRevenue(): number {
    return this.d;
  }

  public p(): void {
    this.im.printInventory();
  }
}

// Usage
const s = new Store();
s.a(new Item('Laptop', 1000, 5, 'ELECTRONICS'));
s.a(new Item('T-shirt', 20, 100, 'CLOTHING'));
s.a(new Item('Apple', 0.5, 200, 'FOOD'));

s.p();

s.s(new Item('Laptop', 1000, 5, 'ELECTRONICS'), 2);
s.s(new Item('T-shirt', 20, 100, 'CLOTHING'), 10);

console.log(`Daily Revenue: $${s.getDailyRevenue()}`);
