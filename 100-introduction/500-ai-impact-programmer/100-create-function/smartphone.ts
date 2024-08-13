interface Product {
  title: string
  cost: number
  tags: string[]
}

const products: Product[] = [
  { title: "iPhone 15 Pro", cost: 999, tags: ["ios", "5g", "flagship", "waterproof", "wireless-charging", "amoled"] },
  { title: "Samsung Galaxy S23 Ultra", cost: 1199, tags: ["android", "5g", "flagship", "waterproof", "wireless-charging", "amoled"] },
  { title: "Google Pixel 8 Pro", cost: 899, tags: ["android", "5g", "flagship", "waterproof", "wireless-charging"] },
  { title: "OnePlus 11", cost: 799, tags: ["android", "5g", "flagship", "wireless-charging", "amoled"] },
  { title: "Xiaomi Mi 13", cost: 749, tags: ["android", "5g", "flagship", "wireless-charging", "amoled"] },
  { title: "Sony Xperia 1 V", cost: 1099, tags: ["android", "5g", "flagship", "waterproof", "wireless-charging", "amoled"] },
  { title: "iPhone SE (2024)", cost: 499, tags: ["ios", "4g", "budget"] },
  { title: "Samsung Galaxy A54", cost: 450, tags: ["android", "5g", "budget", "waterproof"] },
  { title: "Google Pixel 7a", cost: 499, tags: ["android", "5g", "budget", "wireless-charging"] },
  { title: "OnePlus Nord N200", cost: 299, tags: ["android", "5g", "budget"] },
  { title: "Xiaomi Redmi Note 12", cost: 350, tags: ["android", "4g", "budget"] },
  { title: "Samsung Galaxy Z Fold 5", cost: 1799, tags: ["android", "5g", "flagship", "wireless-charging", "amoled"] },
  { title: "iPhone 15", cost: 799, tags: ["ios", "5g", "flagship", "waterproof", "wireless-charging", "amoled"] },
  { title: "Google Pixel 7 Pro", cost: 899, tags: ["android", "5g", "flagship", "waterproof", "wireless-charging", "amoled"] },
  { title: "Samsung Galaxy A34", cost: 399, tags: ["android", "5g", "budget", "waterproof"] },
  { title: "iPhone 14 Pro", cost: 999, tags: ["ios", "5g", "flagship", "waterproof", "wireless-charging", "amoled"] },
  { title: "Xiaomi Poco X5 Pro", cost: 399, tags: ["android", "5g", "budget", "amoled"] },
  { title: "OnePlus 10T", cost: 649, tags: ["android", "5g", "flagship", "wireless-charging"] },
  { title: "Sony Xperia 5 IV", cost: 999, tags: ["android", "5g", "flagship", "waterproof", "wireless-charging", "amoled"] },
  { title: "iPhone 14", cost: 699, tags: ["ios", "5g", "flagship", "waterproof", "wireless-charging"] },
  { title: "Samsung Galaxy Z Flip 5", cost: 999, tags: ["android", "5g", "flagship", "wireless-charging", "amoled"] },
  { title: "Google Pixel 6", cost: 599, tags: ["android", "5g", "flagship", "wireless-charging"] },
  { title: "Xiaomi Mi 12 Lite", cost: 399, tags: ["android", "5g", "budget"] },
  { title: "OnePlus Nord 2T", cost: 499, tags: ["android", "5g", "budget", "wireless-charging"] },
  { title: "Samsung Galaxy A74", cost: 549, tags: ["android", "5g", "budget", "waterproof"] },
  { title: "iPhone 13 Mini", cost: 699, tags: ["ios", "5g", "flagship", "waterproof", "wireless-charging"] },
  { title: "Xiaomi Redmi K40", cost: 499, tags: ["android", "5g", "budget"] },
  { title: "Samsung Galaxy M54", cost: 399, tags: ["android", "5g", "budget", "waterproof"] },
  { title: "Google Pixel 6a", cost: 449, tags: ["android", "5g", "budget"] },
  { title: "iPhone 14 Plus", cost: 799, tags: ["ios", "5g", "flagship", "waterproof", "wireless-charging"] },
  { title: "OnePlus Ace Pro", cost: 649, tags: ["android", "5g", "flagship", "wireless-charging"] },
  { title: "Sony Xperia 10 IV", cost: 499, tags: ["android", "5g", "budget", "waterproof"] },
  { title: "Xiaomi Poco F4", cost: 549, tags: ["android", "5g", "flagship", "amoled"] }
];

function tagCounts(products: Product[]): { [tag: string]: number } {
  const counts: { [tag: string]: number } = {};

  products.forEach(product => {
    product.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  return counts;
}

const counts = tagCounts(products);

console.log(counts);
