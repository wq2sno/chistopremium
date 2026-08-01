import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты — ЧИСТО",
  description: "Три автомойки ЧИСТО в городе. Работаем ежедневно с 08:00 до 23:00.",
};

const branches = [
  {
    number: "01",
    name: "ЧИСТО. Центр",
    address: "ул. Тверская, 18",
    landmark: "Въезд со стороны Настасьинского переулка",
    phone: "+7 (495) 120-10-10",
    phoneHref: "+74951201010",
    position: "contacts-map-point-center",
  },
  {
    number: "02",
    name: "ЧИСТО. Сити",
    address: "Пресненская наб., 8с1",
    landmark: "Паркинг «Город Столиц», уровень −1",
    phone: "+7 (495) 120-20-20",
    phoneHref: "+74951202020",
    position: "contacts-map-point-city",
  },
  {
    number: "03",
    name: "ЧИСТО. Юг",
    address: "Варшавское ш., 132А",
    landmark: "Отдельный въезд после АЗС",
    phone: "+7 (495) 120-30-30",
    phoneHref: "+74951203030",
    position: "contacts-map-point-south",
  },
] as const;

function InnerHeader() {
  return (
    <header className="inner-header">
      <Link className="inner-logo" href="/" aria-label="ЧИСТО — на главную">
        ЧИСТО<span className="inner-logo-dot">.</span>
      </Link>
      <nav className="inner-nav" aria-label="Основная навигация">
        <Link className="inner-nav-link" href="/services">
          Услуги
        </Link>
        <Link className="inner-nav-link" href="/#works">
          Работы
        </Link>
        <Link className="inner-nav-link" href="/contacts" aria-current="page">
          Контакты
        </Link>
      </nav>
      <Link className="inner-header-cta" href="/#booking">
        Записаться
      </Link>
    </header>
  );
}

export default function ContactsPage() {
  return (
    <main className="inner-page contacts-page">
      <InnerHeader />

      <section className="inner-hero contacts-hero" aria-labelledby="contacts-title">
        <p className="inner-eyebrow">Контакты / Москва</p>
        <h1 className="inner-title" id="contacts-title">
          Всегда рядом.<br />
          <span className="inner-title-accent">Всегда ЧИСТО.</span>
        </h1>
        <div className="contacts-hero-meta">
          <p className="inner-intro">
            Выберите удобный филиал и забронируйте свободное время. Работаем каждый
            день — без выходных и перерывов.
          </p>
          <div className="contacts-hours" aria-label="Режим работы">
            <span className="contacts-hours-label">Ежедневно</span>
            <strong className="contacts-hours-value">08:00—23:00</strong>
          </div>
        </div>
      </section>

      <section className="contacts-layout" aria-label="Филиалы ЧИСТО">
        <div className="contacts-list">
          {branches.map((branch) => (
            <article className="contacts-card" key={branch.number}>
              <div className="contacts-card-heading">
                <span className="contacts-number">{branch.number}</span>
                <span className="contacts-open"><span aria-hidden="true">●</span> Открыто сегодня</span>
              </div>
              <h2 className="contacts-name">{branch.name}</h2>
              <address className="contacts-address">
                <strong>{branch.address}</strong>
                <span>{branch.landmark}</span>
              </address>
              <div className="contacts-actions">
                <a className="contacts-phone" href={`tel:${branch.phoneHref}`}>
                  {branch.phone}
                </a>
                <a className="contacts-messenger" href={`https://wa.me/${branch.phoneHref.slice(1)}`}>
                  WhatsApp <span aria-hidden="true">↗</span>
                </a>
                <a className="contacts-messenger" href="https://t.me/chisto_auto">
                  Telegram <span aria-hidden="true">↗</span>
                </a>
              </div>
              <Link className="contacts-book" href="/#booking">
                Записаться в этот филиал <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="contacts-map" role="img" aria-label="Схема расположения трёх филиалов ЧИСТО в Москве">
          <span className="contacts-map-label">Москва / схема филиалов</span>
          <span className="contacts-map-road contacts-map-road-one" aria-hidden="true" />
          <span className="contacts-map-road contacts-map-road-two" aria-hidden="true" />
          <span className="contacts-map-road contacts-map-road-three" aria-hidden="true" />
          <span className="contacts-map-river" aria-hidden="true" />
          <span className="contacts-map-ring" aria-hidden="true" />
          {branches.map((branch) => (
            <span className={`contacts-map-point ${branch.position}`} key={branch.number} aria-hidden="true">
              <span className="contacts-map-pin">{branch.number}</span>
              <span className="contacts-map-name">{branch.name.replace("ЧИСТО. ", "")}</span>
            </span>
          ))}
          <span className="contacts-map-caption">Не карта. Ориентируйтесь по адресу при построении маршрута.</span>
        </div>
      </section>

      <section className="contacts-support" aria-labelledby="support-title">
        <div>
          <p className="inner-eyebrow">Нужна помощь?</p>
          <h2 className="contacts-support-title" id="support-title">
            Подберём услугу<br />и удобное время.
          </h2>
        </div>
        <div className="contacts-support-links">
          <a className="contacts-support-phone" href="tel:+74951200000">+7 (495) 120-00-00</a>
          <p>Единая линия · 08:00—23:00</p>
          <Link className="inner-primary-cta" href="/#booking">
            Онлайн-запись <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
