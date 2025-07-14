import Brand from "../models/Brand";
import Category from "../models/Category";
import Coupon from "../models/Coupon";
import Rating from "../models/Rating";
import View from "../models/View";

export const insertFakeData = async () => {
  try {
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Coupon.deleteMany({});
    await Rating.deleteMany({});
    await View.deleteMany({});

    const categories = await Category.insertMany([
      { name: "Fashion" },
      { name: "Tech" },
      { name: "Food" },
      { name: "Travel" },
      { name: "Beauty" },
    ]);

    const brands = await Brand.insertMany([
      {
        name: "Nike",
        category: categories[0]._id,
        image:
          "https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjo1MDAwLCJoZWlnaHQiOjI4MTN9LCJyZXNpemUiOnsid2lkdGgiOjEwODB9fX0%3D&s=afbe0cd560c84186aca4bc973b1422489b75968347060e504aa6fa86a3c27891",
        website: "https://www.nike.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "nike",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 100,
      },
      {
        name: "Zara",
        category: categories[0]._id,
        image:
          "http://logomakerr.ai/blog/wp-content/uploads/2022/08/2019-to-Present-Zara-logo-design.jpg",
        website: "https://www.zara.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "zara",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 200,
      },
      {
        name: "Apple",
        category: categories[1]._id,
        image:
          "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.jpg",
        website: "https://www.apple.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "apple",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 1000,
      },
      {
        name: "Samsung",
        category: categories[1]._id,
        image:
          "https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$",
        website: "https://www.samsung.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "samsung",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 300,
      },
      {
        name: "McDonald's",
        category: categories[2]._id,
        image:
          "https://download.logo.wine/logo/McDonald's/McDonald's-Logo.wine.png",
        website: "https://www.mcdonalds.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "mcdonalds",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 400,
      },
      {
        name: "Domino's",
        category: categories[2]._id,
        image:
          "https://conceptstore.co.uk/wp-content/uploads/2015/04/dominos-logo4.jpg",
        website: "https://www.dominos.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "dominos",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 500,
      },
      {
        name: "Airbnb",
        category: categories[3]._id,
        image:
          "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Emblem.png",
        website: "https://www.airbnb.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "airbnb",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 600,
      },
      {
        name: "Emirates",
        category: categories[3]._id,
        image:
          "https://www.logo.wine/a/logo/Emirates_(airline)/Emirates_(airline)-Logo.wine.svg",
        website: "https://www.emirates.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "emirates",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 700,
      },
      {
        name: "Sephora",
        category: categories[4]._id,
        image:
          "https://penji.co/wp-content/uploads/2023/02/8.-Sephora.jpg.webp",
        website: "https://www.sephora.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "sephora",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 800,
      },
      {
        name: "L'Oreal",
        category: categories[4]._id,
        image:
          "https://logowik.com/content/uploads/images/loreal2662.logowik.com.webp",
        website: "https://www.loreal.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        slug: "loreal",
        more_about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        order: 900,
      },
    ]);

    const couponsData = [
      "10% OFF everything",
      "Free Shipping on orders above $50",
      "Flat $20 off on all products",
      "Buy 1 Get 1 Free",
      "Student Discount",
      "Summer Sale 2025",
      "BOGO on Accessories",
      "Exclusive App Discount",
      "New User Offer",
      "Festive Mega Sale",
      "15% Cashback",
      "Limited Time Deal",
      "Weekend Special",
      "20% off on 2+ items",
      "First Order Bonus",
      "Referral Bonus",
      "Flat $100 off",
      "Combo Offer",
      "Flash Sale",
      "Extra 5% with Wallet",
    ];

    const types = ["deal", "code"];

    const genRandomCode = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let code = "";
      for (let i = 0; i < 15; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      return code;
    };

    const coupons = couponsData.map((c, idx) => {
      return {
        brand: brands[Math.floor(Math.random() * brands.length)]._id,
        type: types[Math.floor(Math.random() * types.length)],
        title: c,
        verified: Math.random() < 0.75,
        price: Math.round(Math.random() * 100 + 1),
        terms_and_conditions: "Valid on select products. Limited time only.",
        code: genRandomCode(),
        order: (idx + 1) * 100,
      };
    });

    await Coupon.insertMany(coupons);

    console.log("Fake data inserted");
  } catch (err) {
    console.log(err);
  }
};
