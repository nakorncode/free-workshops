export interface Product {
  name: string;
  price: number;
  stock: number;
}

// Define the Customer type
export interface Customer {
  name: string;
  email: string;
}

// Define the Order type
export interface Order {
  id: string;
  customer: Customer;
  products: Product[];
  total: number;
  status: string;
}
