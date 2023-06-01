import { v4 as uuidv4 } from 'uuid';

type Item = {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
};

type User = {
  id: string;
  name: string;
  age: number;
  cart: Item[];
};

function createUser(name: string, age: number): User {
  const id = uuidv4();
  const cart: Item[] = [];
  return {
    id,
    name,
    age,
    cart
  };
}

function createItem(name: string, price: number, description: string): Item {
  const id = uuidv4();
  return {
    id,
    name,
    price,
    description,
    quantity: 0
  };
}

function addToCart(item: Item, user: User): void {
  const existingItem = user.cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newItem = { ...item, quantity: 1 };
    user.cart.push(newItem);
  }
}

function removeFromCart(item: Item, user: User): void {
  user.cart = user.cart.filter((cartItem) => cartItem.id !== item.id);
}

function removeQuantityFromCart(item: Item, quantity: number, user: User): void {
  const existingItem = user.cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    if (existingItem.quantity <= quantity) {
      removeFromCart(existingItem, user);
    } else {
      existingItem.quantity -= quantity;
    }
  }
}

function cartTotal(user: User): number {
  let total = 0;
  for (const item of user.cart) {
    total += item.price * item.quantity;
  }
  return total;
}

function printCart(user: User): void {
  console.log('User Cart:');
  for (const item of user.cart) {
    console.log(`- ${item.name} (${item.price}$) - Quantity: ${item.quantity}`);
  }
}

const user = createUser('William T', 26);

const itemA = createItem('1887', 14, 'A bubbly mineral water');
const itemB = createItem('Lions Mane', 12, 'A strange yet, tasty white mushroom');
const itemC = createItem('Grapefruit', 4, 'A bittersweet citrus');

addToCart(itemA, user);
console.log('User Cart after adding Item A:');
printCart(user);
console.log('Total:', cartTotal(user));

addToCart(itemB, user);
addToCart(itemB, user);
addToCart(itemB, user);
console.log('User Cart after adding 3 Item B:');
printCart(user);
console.log('Total:', cartTotal(user));

addToCart(itemC, user);
addToCart(itemC, user);
addToCart(itemC, user);
console.log('User Cart after adding 3 Item C:');
printCart(user);
console.log('Total:', cartTotal(user));

removeFromCart(itemB, user);
console.log('User Cart after removing all Item B:');
printCart(user);
console.log('Total:', cartTotal(user));

removeQuantityFromCart(itemC, 2, user);
console.log('User Cart after removing 2 Item C:');
printCart(user);
console.log('Total:', cartTotal(user));
