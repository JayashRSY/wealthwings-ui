// Define the CreditCard type at the top of the file
export interface CreditCard {
    id: string;
    name: string;
    bank: string;
    type: string;
    rewards: {
      [key: string]: number;
      default: number;
    };
    annualFee: number;
    benefits: string[];
    imageUrl: string;
  }
  
  // Constants for platform options
  export const PLATFORMS = [
      "Amazon",
      "Flipkart",
      "Myntra",
      "Ajio",
      "Tata Cliq",
      "Nykaa",
      "Meesho",
      "Zomato",
      "Swiggy",
      "Dineout",
      "EazyDiner",
      "Offline Restaurant",
      "Offline Merchant (POS)",
      "Grocery Store",
      "Kirana Store",
      "Petrol Pump",
      "Utility Bill Payment",
      "UPI",
      "Paytm",
      "PhonePe",
      "Google Pay",
      "Amazon Pay",
      "Credit Card Bill Payment",
      "IRCTC",
      "MakeMyTrip",
      "Yatra",
      "Goibibo",
      "Uber",
      "Ola",
      "RedBus",
      "Airlines (IndiGo, Air India, etc.)",
      "Netflix",
      "Prime Video",
      "Hotstar",
      "BookMyShow",
      "Spotify",
      "YouTube Premium",
      "PharmEasy",
      "1mg",
      "Practo",
      "Apollo",
      "Offline Pharmacy",
      "Gym Membership",
      "Other"
    ];
    
    // Constants for category options
    export const CATEGORIES = [
      "Groceries",
      "Electronics",
      "Food & Dining",
      "Travel & Transport",
      "Fashion & Apparel",
      "Fuel",
      "Utilities & Bills",
      "Health & Wellness",
      "Entertainment & Subscriptions",
      "Education",
      "Rent & Housing",
      "EMI/Loan Payments",
      "Miscellaneous / Others"
    ];
    
    // Sample credit cards data
  export const CREDIT_CARDS: CreditCard[] = [
  // HDFC Cards
  {
    id: "hdfc-diners-club-black",
    name: "Diners Club Black",
    bank: "HDFC",
    type: "Diners Club",
    rewards: { "Amazon": 0.03, "Airlines": 0.05, "Restaurants": 0.05, default: 0.03 },
    annualFee: 10000,
    benefits: ["Airport Lounge Access", "Milestone Benefits", "Golf Privileges"],
    imageUrl: "https://www.hdfcbank.com/content/.../DCB"
  },
  {
    id: "hdfc-infinia",
    name: "Infinia",
    bank: "HDFC",
    type: "Visa Infinite",
    rewards: { "Airlines": 0.05, "Restaurants": 0.05, default: 0.03 },
    annualFee: 10000,
    benefits: ["Airport Lounge Access", "Concierge Services", "Golf Privileges"],
    imageUrl: "https://www.hdfcbank.com/content/.../Infinia.jpg"
  },
  {
    id: "hdfc-regalia",
    name: "Regalia",
    bank: "HDFC",
    type: "Visa Signature",
    rewards: { "Travel": 0.04, "Dining": 0.04, default: 0.02 },
    annualFee: 2500,
    benefits: ["Airport Lounge Access", "Travel Concierge"],
    imageUrl: "https://www.hdfcbank.com/content/.../Regalia.jpg"
  },
  {
    id: "hdfc-millennia",
    name: "Millennia",
    bank: "HDFC",
    type: "Visa",
    rewards: { "Amazon": 0.05, "Flipkart": 0.05, "Dining": 0.02, default: 0.01 },
    annualFee: 1000,
    benefits: ["Cashback Offers", "Online Shopping Benefits"],
    imageUrl: "https://www.hdfcbank.com/content/.../Millennia.jpg"
  },
  {
    id: "hdfc-moneyback",
    name: "MoneyBack",
    bank: "HDFC",
    type: "Visa",
    rewards: { "Online Spend": 0.02, default: 0.01 },
    annualFee: 500,
    benefits: ["Reward Points", "Fuel Surcharge Waiver"],
    imageUrl: "https://www.hdfcbank.com/content/.../Moneyback.jpg"
  },

  // ICICI Cards
  {
    id: "icici-amazon-pay",
    name: "Amazon Pay ICICI",
    bank: "ICICI",
    type: "Visa",
    rewards: { "Amazon": 0.05, "Dining": 0.02, default: 0.01 },
    annualFee: 0,
    benefits: ["Amazon Vouchers", "No-cost EMI"],
    imageUrl: "https://www.icicibank.com/.../amazon-pay.jpg"
  },
  {
    id: "icici-coral",
    name: "Coral",
    bank: "ICICI",
    type: "Visa",
    rewards: { "Movies": 0.05, "Dining": 0.02, default: 0.01 },
    annualFee: 500,
    benefits: ["Buy 1 Get 1 Movie Tickets", "Airport Lounge Access"],
    imageUrl: "https://www.icicibank.com/.../coral.jpg"
  },
  {
    id: "icici-rubyx",
    name: "Rubyx",
    bank: "ICICI",
    type: "Visa",
    rewards: { "Travel": 0.04, "Dining": 0.02, default: 0.01 },
    annualFee: 3000,
    benefits: ["Lounge Access", "Movie Benefits"],
    imageUrl: "https://www.icicibank.com/.../rubix.jpg"
  },
  {
    id: "icici-sapphiro",
    name: "Sapphiro",
    bank: "ICICI",
    type: "Visa",
    rewards: { "Travel": 0.05, "Dining": 0.03, default: 0.01 },
    annualFee: 6500,
    benefits: ["Lounge Access", "Golf Privileges"],
    imageUrl: "https://www.icicibank.com/.../sapphiro.jpg"
  },

  // SBI Cards
  {
    id: "sbi-elite",
    name: "Elite",
    bank: "SBI",
    type: "Visa Signature",
    rewards: { "Utility Bill Payment": 0.05, "Dining": 0.02, default: 0.01 },
    annualFee: 4999,
    benefits: ["Milestone Benefits", "Movie Ticket Discounts"],
    imageUrl: "https://www.sbicard.com/.../elite.png"
  },
  {
    id: "sbi-simplyclick",
    name: "SimplyCLICK",
    bank: "SBI",
    type: "Visa",
    rewards: { "Amazon": 0.015, "Online Spend": 0.015, default: 0.01 },
    annualFee: 499,
    benefits: ["E-Voucher Rewards", "Milestone Benefits"],
    imageUrl: "https://www.sbicard.com/.../simplyclick.png"
  },
  {
    id: "sbi-simplysave",
    name: "SimplySAVE",
    bank: "SBI",
    type: "Visa",
    rewards: { "Groceries": 0.025, "Movies": 0.025, default: 0.01 },
    annualFee: 499,
    benefits: ["Reward Points on Daily Spend"],
    imageUrl: "https://www.sbicard.com/.../simplysave.png"
  },
  {
    id: "sbi-prime",
    name: "PRIME",
    bank: "SBI",
    type: "Visa",
    rewards: { "Dining": 0.025, "Groceries": 0.025, default: 0.01 },
    annualFee: 2999,
    benefits: ["Airport Lounge Access", "Movie Benefits"],
    imageUrl: "https://www.sbicard.com/.../prime.png"
  },

  // Axis Bank Cards
  {
    id: "axis-flipkart",
    name: "Flipkart Axis Bank",
    bank: "Axis",
    type: "Visa",
    rewards: { "Flipkart": 0.05, "Myntra": 0.04, "Groceries": 0.04, default: 0.01 },
    annualFee: 500,
    benefits: ["Flipkart Vouchers", "Welcome Benefits"],
    imageUrl: "https://www.axisbank.com/.../flipkart.jpg"
  },
  {
    id: "axis-ace",
    name: "ACE Credit Card",
    bank: "Axis",
    type: "Visa",
    rewards: { "Google Pay": 0.05, "Bill Payments": 0.05, default: 0.02 },
    annualFee: 499,
    benefits: ["Cashback on Google Pay", "Dining Offers"],
    imageUrl: "https://www.axisbank.com/.../ace.jpg"
  },
  {
    id: "axis-magnus",
    name: "Magnus",
    bank: "Axis",
    type: "Visa Infinite",
    rewards: { "Travel": 0.05, "Dining": 0.03, default: 0.02 },
    annualFee: 10000,
    benefits: ["Airport Lounge", "Luxury Hotel Benefits"],
    imageUrl: "https://www.axisbank.com/.../magnus.jpg"
  },

  // American Express
  {
    id: "amex-platinum",
    name: "Platinum Card",
    bank: "American Express",
    type: "Amex",
    rewards: { "Airlines": 0.05, "Hotels": 0.05, default: 0.01 },
    annualFee: 60000,
    benefits: ["Airport Lounge Access", "Hotel Status", "Global Dining Program"],
    imageUrl: "https://icm.aexp-static.com/.../Platinum.png"
  },
  {
    id: "amex-gold",
    name: "Gold Charge Card",
    bank: "American Express",
    type: "Amex",
    rewards: { "Groceries": 0.04, "Dining": 0.04, default: 0.01 },
    annualFee: 4500,
    benefits: ["Reward Points", "Dining Benefits"],
    imageUrl: "https://icm.aexp-static.com/.../Gold.png"
  },

  // Fintech & New-gen
  {
    id: "onecard",
    name: "OneCard",
    bank: "FPL Technologies",
    type: "Visa Signature",
    rewards: { default: 0.015 },
    annualFee: 0,
    benefits: ["No Foreign Transaction Fees", "Metal Card Design"],
    imageUrl: "https://getonecard.app/images/metalCards/cyan_front.png"
  },
  {
    id: "slice-super-card",
    name: "Slice Super Card",
    bank: "Slice",
    type: "Visa",
    rewards: { default: 0.02 },
    annualFee: 0,
    benefits: ["Instant EMI", "Cashback Offers"],
    imageUrl: "https://myslice.io/card.png"
  },
  {
    id: "uni-card",
    name: "Uni Pay 1/3rd Card",
    bank: "Uni",
    type: "Visa",
    rewards: { default: 0.01 },
    annualFee: 0,
    benefits: ["Split Payments", "Cashback Offers"],
    imageUrl: "https://uni-assets/card.png"
  },

  // (…and continue till 50 with Kotak, IndusInd, Yes Bank, Standard Chartered, HSBC, RBL, etc.)
];
