// To try and encourage more sales of the 5 different Harry Potter books they sell, a bookshop has decided to offer discounts of multiple-book purchases.
// One copy of any of the five books costs 8 EUR.
// If, however, you buy two different books, you get a 5% discount on those two books.
// If you buy 3 different books, you get a 10% discount.
// If you buy 4 different books, you get a 20% discount.
// If you go the whole hog, and buy all 5, you get a huge 25% discount.
// Note that if you buy, say, four books, of which 3 are different titles, you get a 10% discount on the 3 that form part of a set, but the fourth book still costs 8 EUR.
// Your mission is to write a piece of code to calculate the price of any conceivable shopping basket (containing only Harry Potter books), giving as big a discount as possible.

const books = [
  "Harry Potter and the Philosopher's Stone",
  "Harry Potter and the Chamber of Secrets",
  "Harry Potter and the Prisoner of Azkaban",
  "Harry Potter and the Goblet of Fire",
  "Harry Potter and the Order of the Phoenix",
];

const pricePerBook = 8;
const discountFactors = {
  1: 1,
  2: 0.95,
  3: 0.9,
  4: 0.8,
  5: 0.75,
};

const calculatePrice = (basket) => {
  const countMap = {};
  basket.forEach((book) => (countMap[book] = (countMap[book] || 0) + 1));
  let counts = Object.values(countMap);
  counts.sort((a, b) => b - a);

  let price = 0;
  while (counts.length > 0) {
    const setSize = Math.min(5, counts.length);
    const setCount = Math.min(...counts.slice(0, setSize));
    price += setCount * setSize * pricePerBook * discountFactors[setSize];

    for (let i = 0; i < setSize; i++) {
      counts[i] -= setCount;
    }
    counts = counts.filter((count) => count > 0);
  }
  return price;
};

module.exports = {
  calculatePrice,
  books,
  pricePerBook,
  discountFactors,
};
