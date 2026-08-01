export type WashService = {
  id: "care" | "premium" | "luxury";
  name: string;
  price: number;
  duration: string;
  description: string;
  features: readonly string[];
};

export const washServices: readonly WashService[] = [
  {
    id: "care",
    name: "Бережная мойка",
    price: 1500,
    duration: "≈ 45 минут",
    description: "Чистый автомобиль без спешки и риска для покрытия.",
    features: [
      "Двухфазная мойка кузова",
      "Очистка дисков и арок",
      "Сушка турбовоздухом",
      "Влажная уборка салона",
    ],
  },
  {
    id: "premium",
    name: "Премиум-уход",
    price: 3000,
    duration: "≈ 90 минут",
    description: "Глубокая чистота салона и защищённый блеск кузова.",
    features: [
      "Всё из «Бережной мойки»",
      "Тщательная уборка и пылесос",
      "Кондиционер пластика и кожи",
      "Защитный кварцевый состав",
    ],
  },
  {
    id: "luxury",
    name: "Люкс-детейлинг",
    price: 5000,
    duration: "≈ 2,5 часа",
    description: "Максимум внимания к каждой поверхности автомобиля.",
    features: [
      "Всё из «Премиум-ухода»",
      "Детейлинг труднодоступных зон",
      "Очистка стёкол антидождём",
      "Твёрдый воск и чернение шин",
    ],
  },
] as const;

export const branches = [
  "ЧИСТО — Ходынка · Ходынский бульвар, 4",
  "ЧИСТО — Рублёвка · Рублёво-Успенское ш., 64Б",
  "ЧИСТО — ММДЦ · Пресненская набережная, 12",
] as const;

export const bookingTimes = Array.from({ length: 13 }, (_, index) => {
  const hour = index + 9;
  return `${String(hour).padStart(2, "0")}:00`;
});
