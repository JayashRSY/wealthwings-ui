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
      {
        id: "hdfc-diners-club-black",
        name: "Diners Club Black",
        bank: "HDFC",
        type: "Diners Club",
        rewards: {
          "Amazon": 0.03,
          "Airlines (IndiGo, Air India, etc.)": 0.05,
          "Offline Restaurant": 0.05,
          default: 0.03
        },
        annualFee: 10000,
        benefits: ["Airport Lounge Access", "Milestone Benefits", "Golf Privileges"],
        imageUrl: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/a3b92e3d-6fa1-499f-b898-754e072aef48/Personal/Pay/Cards/Credit-Card/Credit-Card-New/HDFC-Bank-Diners-Club-Black-Credit/DCB"
      },
      {
        id: "hdfc-infinia",
        name: "Infinia",
        bank: "HDFC",
        type: "Visa Infinite",
        rewards: {
          "Airlines (IndiGo, Air India, etc.)": 0.05,
          "Offline Restaurant": 0.05,
          default: 0.03
        },
        annualFee: 10000,
        benefits: ["Airport Lounge Access", "Concierge Services", "Golf Privileges"],
        imageUrl: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/ed2cd0e5-315a-4e92-9bb6-b35595179ecc/Common/Header/Images/HDFC_Bank_Infinia_Credit_Card.jpg"
      },
      {
        id: "amex-platinum",
        name: "Platinum Card",
        bank: "American Express",
        type: "Amex",
        rewards: {
          "Airlines (IndiGo, Air India, etc.)": 0.05,
          "Hotels": 0.05,
          default: 0.01
        },
        annualFee: 60000,
        benefits: ["Airport Lounge Access", "Hotel Status", "Global Dining Program"],
        imageUrl: "https://icm.aexp-static.com/Internet/internationalcardshop/en_in/images/cards/Platinum_Card.png"
      },
      {
        id: "sbi-elite",
        name: "SBI Elite",
        bank: "SBI",
        type: "Visa Signature",
        rewards: {
          "Utility Bill Payment": 0.05,
          "Offline Merchant (POS)": 0.02,
          default: 0.01
        },
        annualFee: 4999,
        benefits: ["Milestone Benefits", "Movie Ticket Discounts"],
        imageUrl: "https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/travel-cards/elite-card/elite-card.png?v=2.6"
      },
      {
        id: "icici-amazon-pay",
        name: "Amazon Pay ICICI",
        bank: "ICICI",
        type: "Visa",
        rewards: {
          "Amazon": 0.05,
          "Utility Bill Payment": 0.02,
          "Food & Dining": 0.02,
          default: 0.01
        },
        annualFee: 0,
        benefits: ["Amazon Vouchers", "No-cost EMI"],
        imageUrl: "https://www.icicibank.com/content/dam/icicibank/managed-assets/images/credit-card/amazon-pay-credit-card-L2-466x292.jpg"
      },
      {
        id: "axis-flipkart",
        name: "Flipkart Axis Bank",
        bank: "Axis",
        type: "Visa",
        rewards: {
          "Flipkart": 0.05,
          "Myntra": 0.04,
          "Grocery Store": 0.04,
          default: 0.01
        },
        annualFee: 500,
        benefits: ["Flipkart Vouchers", "Welcome Benefits"],
        imageUrl: "https://www.axisbank.com/images/default-source/default-album/axis-bank-flipkart-credit-card.jpg"
      },
      {
        id: "onecard",
        name: "OneCard",
        bank: "FPL Technologies",
        type: "Visa Signature",
        rewards: {
          default: 0.015
        },
        annualFee: 0,
        benefits: ["No Foreign Transaction Fees", "Movie & Dining Offers"],
        imageUrl: "https://getonecard.app/images/metalCards/cyan_front.png"
      },
      {
        id: "citi-premiermiles",
        name: "PremierMiles",
        bank: "Citibank",
        type: "Mastercard World",
        rewards: {
          "Airlines (IndiGo, Air India, etc.)": 0.04,
          "Travel & Transport": 0.04,
          default: 0.01
        },
        annualFee: 3000,
        benefits: ["Air Miles Transfer", "Travel Insurance"],
        imageUrl: "https://www.citibank.co.in/credit-cards/images/premiermiles-card-big.png"
      }
    ];