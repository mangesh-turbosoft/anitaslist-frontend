import type { FaqCategory } from "@/types/legal";

/** Content pulled from https://anitaslist.com/pages/faqs (2026-09-17). Not in the Figma file — that section was lorem ipsum. */
export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        id: "buy-without-account",
        question: "Can I just buy a single product without creating an account?",
        answer: [
          "Yes — you can browse and buy without an account. Simply visit the product page and start shopping, or search for the product you want in the search bar.",
          "If you're logged in, click “Add to list” first, then choose “Buy now” to purchase directly.",
        ],
      },
      {
        id: "price-accuracy",
        question: "How accurate are the prices?",
        answer: [
          "Pricing and stock levels are synced from our vendors every day. Any change in price at the vendor's site will be reflected on our site within a day.",
        ],
      },
      {
        id: "account-required-for-lists",
        question: "Do I need to create an account to create a list?",
        answer: [
          "Yes — creating a list, registry or questionnaire requires an account. Browsing, watching videos and making a direct purchase all work without one, but wish lists need registration.",
        ],
      },
      {
        id: "cost-to-sign-up",
        question: "Do I have to pay when I sign up?",
        answer: ["No — Anita's List is free to use. There are no costs for you to create an account, a list or a registry."],
      },
      {
        id: "list-vs-registry",
        question: "Registry and List — what's the difference and how are they connected?",
        answer: [
          "Lists are private; registries are the public version you share with others. Your list gives a full overview of everything you want and need, whereas your registry only contains the items you choose to share.",
          "Anything purchased from either view updates both, so you always see an accurate picture.",
        ],
      },
      {
        id: "cant-find-product",
        question: "I cannot find the specific product I was looking for — what can I do now?",
        answer: ["Get in touch and let us know what you're after — we'll review it for possible addition to the site."],
      },
      {
        id: "natural-baby-shower-registry",
        question: "Can I create a Natural Baby Shower wish list as a registry on Anita's List?",
        answer: [
          "Yes — create a wish list, then convert it into a registry. If a product you want is missing, request it and we'll typically add it within 2–3 hours.",
        ],
      },
      {
        id: "returns",
        question: "Do you deal with returns?",
        answer: [
          "For items purchased directly from us, yes — please review our Return Policy. For items bought through a vendor listed on our site, you'll need to contact that vendor directly.",
        ],
      },
      {
        id: "buy-all-at-once",
        question: "Can I purchase all items in my list at once?",
        answer: [
          "Only if every item in the list is from the same vendor. Where a list spans several vendors, you'll need to check out with each one separately.",
        ],
      },
      {
        id: "buy-without-adding",
        question: "Can I just buy an item without adding it to the list?",
        answer: ["Yes — browse to the product, click “Add to list,” then choose “Buy now” for vendor options, or add it straight to your cart."],
      },
      {
        id: "switch-lists",
        question: "How do I switch between lists?",
        answer: [
          "You can have up to 4 active lists. On desktop, click the list you want to switch to. On mobile, look for the button at the bottom left labelled “List: [name]”.",
        ],
      },
      {
        id: "cant-create-list",
        question: "I can not create a list anymore — what do I do?",
        answer: [
          "You've reached the 4-list limit. Archive a list you're not using from “Manage my lists & registries” to free up space for a new one.",
        ],
      },
      {
        id: "product-not-listed-recommendation",
        question: "If a product is not on your site, does it mean Anita does not recommend it?",
        answer: [
          "Not necessarily — there's such a vast range of products available that it's simply impossible to include everything. Let us know and we'll happily consider adding it.",
        ],
      },
      {
        id: "missing-products-added",
        question: "There are some products I like that are not on the site — will they be added?",
        answer: ["Possibly. Let us know if you think any products are missing and we'll look into them and may include them."],
      },
      {
        id: "buy-button-not-working",
        question: "When I click on the “Buy” button, it does not do anything. Why?",
        answer: [
          "This is usually a browser issue — pop-ups may be disabled, or your browser's security settings are strict. Try enabling pop-ups for our site in your browser settings.",
        ],
      },
    ],
  },
  {
    id: "premium-services",
    title: "Premium services / private consultations",
    items: [
      {
        id: "book-consultation",
        question: "How can I book a one-to-one consultation with Anita?",
        answer: ["Visit the Premium Services page, select the type of consultation you'd like, and either pay online or wait for Anita to contact you to arrange an in-person session."],
      },
      {
        id: "what-happens-in-consultation",
        question: "What will we do in the one-to-one consultation?",
        answer: [
          "Anita will ask about your lifestyle and circumstances, then make personalised recommendations — covering pushchairs, car seats, furniture, feeding, bathing and other helpful services.",
        ],
      },
      {
        id: "outside-london",
        question: "I don't live in London — will I be able to book a one-to-one in-person consultation?",
        answer: [
          "Anita is happy to travel to see you at a location that suits you, but if you live outside London there may be travel expenses which you'll need to cover.",
        ],
      },
    ],
  },
  {
    id: "baby-registry",
    title: "Baby registry",
    items: [
      {
        id: "who-can-create-registry",
        question: "Who can create a baby registry?",
        answer: ["Anyone — whether you're expecting yourself or organising gifts for someone else, you can create a free registry."],
      },
      {
        id: "how-to-create-registry",
        question: "How do I create a registry?",
        answer: [
          "Every registry is a public version of a list. When creating a list, you can choose to turn it into a registry at the same time — or create the registry from an existing list afterwards.",
        ],
      },
      {
        id: "registry-cost",
        question: "What does it cost to run a registry?",
        answer: ["Nothing — our registry service is completely free, both for registry owners and for the people buying gifts."],
      },
      {
        id: "add-items-to-registry",
        question: "How do I add items to a registry?",
        answer: ["Add the items to your list first, then select “Add to registry” from within that list."],
      },
      {
        id: "change-registry-details",
        question: "How do I change my registry details?",
        answer: ["Go to your registry and click the “Edit” button at the top to change its title, message, image or address."],
      },
      {
        id: "own-password",
        question: "Can I create my own password for the registry?",
        answer: ["No — for security reasons we generate a unique, long passcode for every registry so we can be sure your account stays safe."],
      },
      {
        id: "change-after-sharing",
        question: "Can I change details on my registry once I have shared the link?",
        answer: [
          "Yes, though anyone you've already shared the link with may have seen the previous information. Note that items already marked as purchased can't be removed.",
        ],
      },
      {
        id: "what-products-in-registry",
        question: "What products can a registry include?",
        answer: ["Any curated product from the shop — hospital bag items, clothes, toys and more. If something you want isn't listed, get in touch."],
      },
      {
        id: "how-gifts-sent",
        question: "How are gifts sent?",
        answer: [
          "Gifts bought from a registry are typically sent directly to the recipient's address. Registry owners enter their delivery address once, and buyers use it automatically at checkout.",
        ],
      },
      {
        id: "who-can-buy-from-registry",
        question: "Who can buy from the registry?",
        answer: ["Friends, family and guests can all purchase items from your registry, making gift-giving easy and convenient."],
      },
      {
        id: "shipping-returns-registry",
        question: "What are the shipping and returns policies for the registry?",
        answer: [
          "These vary by retailer — Natural Baby Shower, Amazon and individual brands each have their own policies. For anything purchased directly from Anita's List, see our Shipping Policy.",
        ],
      },
      {
        id: "how-shared",
        question: "How can the registry be shared?",
        answer: ["Every registry gets a uniquely generated passcode as soon as it's created. Share that passcode with anyone you'd like to invite."],
      },
      {
        id: "multiple-registries",
        question: "Can I have more than one registry?",
        answer: ["Yes — up to 4 active lists, each of which can become its own registry for a different occasion or group."],
      },
    ],
  },
  {
    id: "invited-to-registry",
    title: "When you are invited to a registry",
    items: [
      {
        id: "find-invited-registry",
        question: "I have been sent an invitation link to a registry — how do I find it?",
        answer: ["Go to “Find a registry”, enter the passcode you were given, and you'll be taken straight to it. New users will need to create an account first."],
      },
      {
        id: "account-needed-to-buy",
        question: "Do I need to set up an account in order to buy off a registry?",
        answer: ["Yes — so that we can email you with updates on any items that are on hold for you."],
      },
      {
        id: "sent-to-another-store",
        question: "I have clicked to buy an item and it sent me to another store — what now?",
        answer: ["Complete the purchase on the vendor's site, using the delivery address shown at the top of the registry."],
      },
      {
        id: "purchased-at-vendor",
        question: "I have purchased a gift off the registry at a vendor's site — what now?",
        answer: [
          "Return to the registry and click “Mark as purchased” on that item. Select the quantity, enter your name, leave a gift message if you'd like, and let us know your relationship to the registry owner.",
        ],
      },
      {
        id: "marked-by-accident",
        question: "I have marked an item as purchased by accident — what do I do?",
        answer: ["Please contact the registry owner directly to let them know the item wasn't actually purchased — you can't revert this action yourself."],
      },
      {
        id: "wrong-address",
        question: "I entered the wrong delivery address by mistake — what do I do?",
        answer: ["Let the registry owner know so the gift can be rerouted, or contact the retailer directly to correct the address."],
      },
      {
        id: "come-back-later",
        question: "When I want to come back another time to buy the gift, can I do that?",
        answer: ["Yes — log back in and open “Invited to registries” in your account. You won't need to re-enter the passcode."],
      },
      {
        id: "item-disappeared",
        question: "I have marked an item on a registry as purchased and it disappeared from the list — is that normal?",
        answer: ["Yes — the item has moved into the “Purchased gifts” list, so it won't accidentally be bought a second time."],
      },
    ],
  },
];
