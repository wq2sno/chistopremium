import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Услуги и цены — ЧИСТО",
  description:
    "Три программы ухода за автомобилем: от бережной мойки до комплексного детейлинга.",
};

const services = [
  {
    number: "01",
    name: "Бережная мойка",
    price: "1 500 ₽",
    lead: "Чистый автомобиль без спешки и риска для покрытия.",
    features: [
      "Двухфазная мойка кузова",
      "Ручная сушка микрофиброй",
      "Очистка дисков и шин",
      "Влажная уборка салона",
      "Чернение резины",
    ],
    note: "≈ 45 минут",
  },
  {
    number: "02",
    name: "Премиум-уход",
    price: "3 000 ₽",
    lead: "Глубокое очищение, блеск кузова и свежесть в каждой детали.",
    features: [
      "Всё из программы «Бережная мойка»",
      "Трёхфазная мойка кузова",
      "Защитный кварцевый состав",
      "Детальная уборка салона",
      "Очистка стёкол и пластика",
      "Премиальный аромат на выбор",
    ],
    note: "≈ 90 минут",
    featured: true,
  },
  {
    number: "03",
    name: "Люкс-детейлинг",
    price: "5 000 ₽",
    lead: "Максимум внимания: автомобиль выглядит как в день выдачи.",
    features: [
      "Всё из программы «Премиум-уход»",
      "Деконтаминация кузова",
      "Ручная полировка блеска",
      "Консервация кожи и пластика",
      "Очистка труднодоступных зон",
      "Антидождь на переднюю полусферу",
      "Фотоотчёт о выполненной работе",
    ],
    note: "≈ 2,5 часа",
  },
] as const;

function InnerHeader() {
  return (
    <header className="inner-header">
      <Link className="inner-logo" href="/" aria-label="ЧИСТО — на главную">
        ЧИСТО<span className="inner-logo-dot">.</span>
      </Link>
      <nav className="inner-nav" aria-label="Основная навигация">
        <Link className="inner-nav-link" href="/services" aria-current="page">
          Услуги
        </Link>
        <Link className="inner-nav-link" href="/#works">
          Работы
        </Link>
        <Link className="inner-nav-link" href="/contacts">
          Контакты
        </Link>
      </nav>
      <Link className="inner-header-cta" href="/#booking">
        Записаться
      </Link>
    </header>
  );
}

export default function ServicesPage() {
  return (
    <main className="inner-page service-page">
      <InnerHeader />

      <section className="inner-hero service-hero" aria-labelledby="services-title">
        <p className="inner-eyebrow">Услуги / 01—03</p>
        <h1 className="inner-title" id="services-title">
          Уход, который<br />
          <span className="inner-title-accent">видно сразу.</span>
        </h1>
        <p className="inner-intro">
          Мы не делим автомобили на простые и сложные. Для каждого — безопасная
          химия, чистый инструмент и внимание к мелочам.
        </p>
      </section>

      <section className="service-grid" aria-label="Пакеты услуг">
        {services.map((service) => (
          <article
            className={`service-card${"featured" in service && service.featured ? " service-card-featured" : ""}`}
            key={service.number}
          >
            <div className="service-card-topline">
              <span className="service-number">{service.number}</span>
              {"featured" in service && service.featured && (
                <span className="service-badge">Выбор клиентов</span>
              )}
              <span className="service-duration">{service.note}</span>
            </div>
            <h2 className="service-name">{service.name}</h2>
            <p className="service-lead">{service.lead}</p>
            <p className="service-price">
              {service.price} <span className="service-price-note">/ легковой авто</span>
            </p>
            <ul className="service-features">
              {service.features.map((feature) => (
                <li className="service-feature" key={feature}>
                  <span className="service-check" aria-hidden="true">↗</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link className="service-cta" href="/#booking">
              Выбрать программу <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </section>

      <aside className="service-disclaimer">
        <span className="service-disclaimer-mark" aria-hidden="true">*</span>
        <p>
          Цена фиксирована для легковых автомобилей. Для кроссоверов и крупных
          внедорожников итоговую стоимость подтвердит администратор до начала работ.
        </p>
      </aside>

      <section className="inner-bottom-cta" aria-labelledby="service-cta-title">
        <p className="inner-eyebrow">Ваш автомобиль готов к обновлению</p>
        <h2 className="inner-bottom-title" id="service-cta-title">
          Выберите время.<br />Остальное — за нами.
        </h2>
        <Link className="inner-primary-cta" href="/#booking">
          Посмотреть свободные окна <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
