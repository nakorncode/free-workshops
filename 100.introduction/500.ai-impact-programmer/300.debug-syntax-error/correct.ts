import { Product, Order, Customer } from './types.ts';

class InventoryManagement {
  private products: Product[] = [];

  constructor() {
    this.initializeInventory();
  }

  private initializeInventory() {
    this.products.push({ name: 'Laptop', price: 999.99, stock: 50 });
    this.products.push({ name: 'Smartphone', price: 499.99, stock: 100 });
    this.products.push({ name: 'Headphones', price: 79.99, stock: 200 });
  }

  public getProduct(name: string): Product | undefined {
    return this.products.find(product => product.name === name);
  }

  public updateStock(name: string, quantity: number): void {
    const product = this.getProduct(name);
    if (product) {
      product.stock += quantity;
    }
  }
}

class OrderProcessing {
  private orders: Order[] = [];

  constructor() {
    this.orders = [];
  }

  public createOrder(customer: Customer, products: Product[]): string {
    const orderId = `ORD-${Date.now()}`;
    const total = products.reduce((sum, product) => sum + product.price, 0);

    const newOrder: Order = {
      id: orderId,
      customer: customer,
      products: products,
      total: total,
      status: 'Pending'
    };

    this.orders.push(newOrder);
    return orderId;
  }

  public updateOrderStatus(orderId: string, newStatus: string): void {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = newStatus;
    }
  }
}

class CustomerManagement {
  private customers: Customer[] = [];

  public addCustomer(name: string, email: string): void {
    const customer: Customer = { name, email };
    this.customers.push(customer);
  }

  public getCustomer(email: string): Customer | undefined {
    return this.customers.find(customer => customer.email === email);
  }
}

function main() {
  const inventoryManager = new InventoryManagement();
  const orderProcessor = new OrderProcessing();
  const customerManager = new CustomerManagement();

  customerManager.addCustomer('John Doe', 'john@example.com');

  const laptop = inventoryManager.getProduct('Laptop');
  const smartphone = inventoryManager.getProduct('Smartphone');

  if (laptop && smartphone) {
    const products = [laptop, smartphone];
    const customer = customerManager.getCustomer('john@example.com');

    if (customer) {
      const orderId = orderProcessor.createOrder(customer, products);
      console.log(`Order created with ID: ${orderId}`);

      inventoryManager.updateStock('Laptop', -1);
      inventoryManager.updateStock('Smartphone', -1);

      orderProcessor.updateOrderStatus(orderId, 'Completed');
    }
  }
}

main();
