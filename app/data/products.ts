export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge: string;
  vegetarian: boolean;
  spicy: boolean;
  available: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "چلوکباب کوبیده",
    category: "kebab",
    price: 350000,
    image: "/images/koobideh.webp",
    description: "دو سیخ کباب کوبیده همراه برنج ایرانی، کره و گوجه کبابی.",
    badge: "🔥 پرفروش",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 2,
    name: "چلوکباب برگ",
    category: "kebab",
    price: 520000,
    image: "/images/barg.webp",
    description: "کباب برگ گوسفندی ممتاز همراه برنج زعفرانی.",
    badge: "⭐ ویژه",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 3,
    name: "جوجه کباب زعفرانی",
    category: "kebab",
    price: 310000,
    image: "/images/joojeh.webp",
    description: "جوجه کباب مزه‌دار شده با زعفران ایرانی.",
    badge: "",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 4,
    name: "کباب بختیاری",
    category: "kebab",
    price: 470000,
    image: "/images/bakhtiari.webp",
    description: "ترکیب فیله مرغ و گوشت گوسفندی.",
    badge: "🔥 محبوب",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 5,
    name: "شیشلیک مخصوص",
    category: "kebab",
    price: 640000,
    image: "/images/shishlik.webp",
    description: "شیشلیک گوسفندی کباب شده با سس مخصوص.",
    badge: "👨‍🍳 پیشنهاد سرآشپز",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 6,
    name: "خورشت قورمه سبزی",
    category: "stew",
    price: 270000,
    image: "/images/ghormeh.webp",
    description: "خورشت قورمه سبزی اصیل همراه برنج ایرانی.",
    badge: "🔥 پرفروش",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 7,
    name: "خورشت فسنجان",
    category: "stew",
    price: 295000,
    image: "/images/fesenjan.webp",
    description: "فسنجان با گردوی تازه و رب انار.",
    badge: "⭐ ویژه",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 8,
    name: "خورشت قیمه",
    category: "stew",
    price: 260000,
    image: "/images/gheymeh.webp",
    description: "خورشت قیمه با سیب‌زمینی خلالی.",
    badge: "",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 9,
    name: "خورشت کرفس",
    category: "stew",
    price: 275000,
    image: "/images/karafs.webp",
    description: "خورشت کرفس تازه با گوشت گوسفندی.",
    badge: "",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 10,
    name: "خورشت بادمجان",
    category: "stew",
    price: 285000,
    image: "/images/bademjan.webp",
    description: "خورشت بادمجان با گوشت و گوجه تازه.",
    badge: "",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 11,
    name: "زرشک پلو با مرغ",
    category: "rice",
    price: 320000,
    image: "/images/zereshk.webp",
    description: "مرغ زعفرانی همراه زرشک و برنج ایرانی.",
    badge: "🔥 پرفروش",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 12,
    name: "باقالی پلو با ماهیچه",
    category: "rice",
    price: 610000,
    image: "/images/baghali.webp",
    description: "ماهیچه گوسفندی همراه باقالی پلو.",
    badge: "👨‍🍳 پیشنهاد سرآشپز",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 13,
    name: "لوبیا پلو",
    category: "rice",
    price: 280000,
    image: "/images/lobia.webp",
    description: "لوبیا پلو با گوشت و ادویه مخصوص.",
    badge: "",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 14,
    name: "آلبالو پلو",
    category: "rice",
    price: 340000,
    image: "/images/albaloo.webp",
    description: "آلبالو پلو با مرغ زعفرانی.",
    badge: "⭐ ویژه",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 15,
    name: "سبزی پلو با ماهی",
    category: "rice",
    price: 420000,
    image: "/images/sabzi.webp",
    description: "سبزی پلو همراه ماهی سرخ شده.",
    badge: "",
    vegetarian: false,
    spicy: false,
    available: true
  },
  {
    id: 16,
    name: "سالاد شیرازی",
    category: "appetizer",
    price: 85000,
    image: "/images/shirazi.webp",
    description: "سالاد شیرازی تازه با آبلیمو.",
    badge: "🌱 گیاهی",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 17,
    name: "ماست و خیار",
    category: "appetizer",
    price: 75000,
    image: "/images/mast.webp",
    description: "ماست محلی همراه خیار و نعناع.",
    badge: "🌱 گیاهی",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 18,
    name: "کشک بادمجان",
    category: "appetizer",
    price: 145000,
    image: "/images/kashk.webp",
    description: "کشک بادمجان سنتی با نعناع داغ.",
    badge: "⭐ ویژه",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 19,
    name: "میرزا قاسمی",
    category: "appetizer",
    price: 155000,
    image: "/images/mirza.webp",
    description: "میرزا قاسمی اصیل شمالی.",
    badge: "🔥 محبوب",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 20,
    name: "زیتون پرورده",
    category: "appetizer",
    price: 110000,
    image: "/images/zeytoon.webp",
    description: "زیتون پرورده گیلانی.",
    badge: "",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 21,
    name: "دوغ محلی",
    category: "drink",
    price: 55000,
    image: "/images/doogh.webp",
    description: "دوغ سنتی گازدار با نعناع.",
    badge: "🔥 پرفروش",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 22,
    name: "شربت زعفران",
    category: "drink",
    price: 65000,
    image: "/images/sharbat-zaferan.webp",
    description: "شربت زعفران، گلاب و یخ.",
    badge: "⭐ ویژه",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 23,
    name: "شربت خاکشیر",
    category: "drink",
    price: 60000,
    image: "/images/khakshir.webp",
    description: "شربت خنک خاکشیر با آبلیمو.",
    badge: "",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 24,
    name: "شربت بهارنارنج",
    category: "drink",
    price: 70000,
    image: "/images/baharanarenj.webp",
    description: "شربت بهارنارنج طبیعی.",
    badge: "",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 25,
    name: "چای ایرانی",
    category: "drink",
    price: 50000,
    image: "/images/chai.webp",
    description: "چای ایرانی تازه‌دم همراه نبات.",
    badge: "☕ سنتی",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 26,
    name: "خورشت ماست",
    category: "dessert",
    price: 95000,
    image: "/images/khoreshmast.webp",
    description: "خورشت ماست با خلال بادام و دارچین.",
    badge: "🌸 سنتی",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 27,
    name: "فالوده شیرازی",
    category: "dessert",
    price: 120000,
    image: "/images/faloodeh.webp",
    description: "فالوده شیرازی با آبلیمو.",
    badge: "🔥 محبوب",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 28,
    name: "بستنی سنتی زعفرانی",
    category: "dessert",
    price: 135000,
    image: "/images/bastani.webp",
    description: "بستنی سنتی با زعفران و پسته.",
    badge: "⭐ ویژه",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 29,
    name: "رنگینک",
    category: "dessert",
    price: 110000,
    image: "/images/ranginak.webp",
    description: "رنگینک خرما با گردو.",
    badge: "",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 30,
    name: "باقلوا یزدی",
    category: "dessert",
    price: 125000,
    image: "/images/baklava.webp",
    description: "باقلوا یزدی با پسته و شربت.",
    badge: "",
    vegetarian: true,
    spicy: false,
    available: true
  },
  {
    id: 31,
    name: "چلوکباب سلطانی شبستان",
    category: "special",
    price: 890000,
    image: "/images/special.webp",
    description: "ترکیب یک سیخ کباب برگ، یک سیخ کوبیده، برنج ایرانی، گوجه کبابی، کره محلی و مخلفات ویژه.",
    badge: "👑 ویژه سرآشپز",
    vegetarian: false,
    spicy: false,
    available: true
  }
];