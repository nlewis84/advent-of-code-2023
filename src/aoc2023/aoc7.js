const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Constants
// The rank is the order of the hand, with the lowest rank being the worst hand (high card with a 2 high) and the highest rank being the best hand (five of a kind with an A high)
const CARD_ORDER = "23456789TJQKA";
const PART_2_CARD_ORDER = "J23456789TQKA";
const HAND_ORDER = [
  "five of a kind",
  "four of a kind",
  "full house",
  "three of a kind",
  "two pair",
  "one pair",
  "high card",
];

// Helper functions
function parseInput(input) {
  // Input: string; ex: "72A4T 765\nAAA83 684"
  // Output: array of objects; [ { hand: 72A4T, bid: 765 }, { hand: AAA83, bid: 684 } ]
  const hands = input.split("\n");
  const parsedHands = hands.map((hand) => {
    const [handString, bid] = hand.split(" ");
    return { hand: handString, bid: parseInt(bid) };
  });

  return parsedHands;
}

function determineType(hands) {
  // Input: array of objects; [ { hand: 72A4T, bid: 765 }, { hand: AAA83, bid: 684 } ]
  // Output: array of objects; [ { hand: 72A4T, bid: 765, type: "high card", highCard: "A" }, { hand: AAA83, bid: 684, type: "three of a kind", highCard: "A" } ]

  return hands.map((handObject) => {
    const hand = handObject.hand;
    const counts = {};

    // Count occurrences of each card
    for (let card of hand) {
      counts[card] = (counts[card] || 0) + 1;
    }

    // Sort cards by count and card value
    const sortedCards = Object.entries(counts).sort((a, b) => {
      if (b[1] === a[1]) {
        return CARD_ORDER.indexOf(b[0]) - CARD_ORDER.indexOf(a[0]);
      }
      return b[1] - a[1];
    });

    const handType = determineHandType(sortedCards);
    const highCard = sortedCards[0][0]; // The highest card based on the sort

    // Return the new hand object
    return {
      ...handObject,
      type: handType,
      highCard: highCard,
    };
  });
}

function part2DetermineType(hands) {
  // Input: array of objects; [ { hand: 72A4T, bid: 765 }, { hand: AAA83, bid: 684 } ]
  // Output: array of objects; [ { hand: 72A4T, bid: 765, type: "high card", highCard: "A" }, { hand: AAA83, bid: 684, type: "three of a kind", highCard: "A" } ]
  return hands.map((handObject) => {
    const hand = handObject.hand;
    const counts = {};

    // Count occurrences of each card
    for (let card of hand) {
      counts[card] = (counts[card] || 0) + 1;
    }

    let handType, highCard;

    if (hand.includes("J")) {
      // Determine the best hand type with J as a wildcard
      ({ handType, highCard } = determineBestHandWithJoker(counts));
    } else {
      // Sort cards by count and card value for hands without J
      const sortedCards = Object.entries(counts).sort((a, b) => {
        if (b[1] === a[1]) {
          return (
            PART_2_CARD_ORDER.indexOf(b[0]) - PART_2_CARD_ORDER.indexOf(a[0])
          );
        }
        return b[1] - a[1];
      });

      handType = determineHandType(sortedCards);
      highCard = sortedCards[0][0];
    }

    // Return the new hand object for both cases
    return {
      ...handObject,
      type: handType,
      highCard: highCard,
    };
  });
}

function determineBestHandWithJoker(counts) {
  const numberOfJokers = counts["J"] || 0;
  delete counts["J"]; // Remove Jokers for calculation

  // Special handling when the hand consists entirely of Jokers
  if (Object.keys(counts).length === 0 && numberOfJokers > 0) {
    return { handType: "five of a kind", highCard: "J" };
  }
  let highCard = determineHighCard(counts); // Find the highest card excluding Jokers

  // Start checking from the best hand type downwards
  for (let type of HAND_ORDER) {
    if (canFormHandType(type, counts, numberOfJokers)) {
      return { handType: type, highCard: highCard };
    }
  }

  // If no hand type is formed, return the lowest possible hand with the high card found
  return { handType: "high card", highCard: highCard };
}

function determineHighCard(counts) {
  // Correctly iterate from the highest card to the lowest
  for (let i = PART_2_CARD_ORDER.length - 1; i >= 0; i--) {
    let card = PART_2_CARD_ORDER[i];
    if (counts[card]) {
      return card;
    }
  }
  return "1"; // Default to '1' if no other card is found
}

function canFormHandType(type, counts, numberOfJokers) {
  switch (type) {
    case "five of a kind":
      return Object.values(counts).some(
        (count) => count + numberOfJokers === 5
      );
    case "four of a kind":
      return Object.values(counts).some((count) => count + numberOfJokers >= 4);
    case "full house":
      let threeOfAKindCard = null;
      let threeOfAKindCount = 0;

      // First, find a three of a kind
      for (let card in counts) {
        if (counts[card] + numberOfJokers >= 3) {
          threeOfAKindCard = card;
          threeOfAKindCount = counts[card];
          break;
        }
      }

      if (threeOfAKindCard) {
        // Calculate the remaining Jokers after forming three of a kind
        let remainingJokers = numberOfJokers - (3 - threeOfAKindCount);

        // Check for a pair with the remaining cards
        for (let card in counts) {
          if (
            card !== threeOfAKindCard &&
            counts[card] + remainingJokers >= 2
          ) {
            return true;
          }
        }

        // If no other pair exists, check if Jokers alone can form a pair
        if (remainingJokers >= 2) {
          return true;
        }
      }

      return false;

    case "three of a kind":
      return Object.values(counts).some((count) => count + numberOfJokers >= 3);
    case "two pair":
      const pairsNeeded = 2 - numberOfJokers;
      const pairs = Object.values(counts).filter((count) => count >= 2).length;
      return pairs >= pairsNeeded;
    case "one pair":
      return Object.values(counts).some((count) => count + numberOfJokers >= 2);
    case "high card":
      return true; // A high card hand can always be formed.
    default:
      return false;
  }
}

function determineHandType(sortedCards) {
  const counts = sortedCards.map((entry) => entry[1]);

  if (counts[0] === 5) {
    return "five of a kind";
  } else if (counts[0] === 4) {
    return "four of a kind";
  } else if (counts[0] === 3 && counts[1] === 2) {
    return "full house";
  } else if (counts[0] === 3) {
    return "three of a kind";
  } else if (counts[0] === 2 && counts[1] === 2) {
    return "two pair";
  } else if (counts[0] === 2) {
    return "one pair";
  } else {
    return "high card";
  }
}

function determineRank(hands) {
  // Input: array of objects; [ { hand: 72A4T, bid: 765, type: "high card", highCard: "A" }, { hand: AAA83, bid: 684, type: "three of a kind", highCard: "A" } ]
  // Output: array of objects; [ { hand: 72A4T, bid: 765, type: "high card", highCard: "A", rank: 1 }, { hand: AAA83, bid: 684, type: "three of a kind", highCard: "A", rank: 2 } ]

  // Sort hands by type and then by individual card comparison
  const sortedHands = hands.sort((a, b) => {
    const typeDiff = HAND_ORDER.indexOf(a.type) - HAND_ORDER.indexOf(b.type);
    if (typeDiff !== 0) {
      return typeDiff;
    }
    // If types are the same, compare individual cards
    return compareCards(a.hand, b.hand);
  });

  const reversedSortedHands = sortedHands.reverse();

  // Flip the array so that the worst hand is first
  const rankedHands = reversedSortedHands.map((hand, index) => {
    return {
      ...hand,
      rank: index + 1,
    };
  });

  return rankedHands.reverse();
}

function compareCards(handA, handB) {
  // Input: two strings; ex: "72A4T", "AAA83"
  // Output: number; -1 if handA is better, 1 if handB is better, 0 if they are the same

  for (let i = 0; i < handA.length; i++) {
    const indexA = PART_2_CARD_ORDER.indexOf(handA[i]);
    const indexB = PART_2_CARD_ORDER.indexOf(handB[i]);

    if (indexA !== indexB) {
      return indexB - indexA;
    }
  }
  return 0; // Hands are identical
}

function calculateTotalWinnings(hands) {
  // Input: array of objects; [ { hand: 72A4T, bid: 765, type: "high card", highCard: "A", rank: 1 }, { hand: AAA83, bid: 684, type: "3", highCard: "A", rank: 2 } ]
  // Output: number; (765 + 1) + (684 + 2) = 1452
  return hands.reduce((total, hand) => {
    const handTotal = hand.bid * hand.rank;

    return total + handTotal;
  }, 0);
}

// Part 1
function part1(lines) {
  const parsedHands = parseInput(lines);
  const typedHands = determineType(parsedHands);
  const rankedHands = determineRank(typedHands);

  return calculateTotalWinnings(rankedHands);
}

// Part 2
function part2(lines) {
  const parsedHands = parseInput(lines);
  const typedHands = part2DetermineType(parsedHands);
  const rankedHands = determineRank(typedHands);

  return calculateTotalWinnings(rankedHands);
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  determineType,
  determineHandType,
  compareCards,
  determineRank,
  determineBestHandWithJoker,
  determineHighCard,
  canFormHandType,
  calculateTotalWinnings,
  part2DetermineType,
};
