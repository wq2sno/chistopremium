import { BookingForm } from "./components/BookingForm";
import { SiteHeader } from "./components/SiteHeader";
import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Бережная мойка",
    price: "1 500 ₽",
    time: "45–60 мин",
    copy: "Безопасно убираем городскую пыль, реагенты и дорожную плёнку без следов и разводов.",
    features: ["Двухфазная мойка кузова", "Чистка дисков и арок", "Сушка турбовоздухом", "Чернение шин"],
  },
  {
    number: "02",
    title: "Премиум-уход",
    price: "3 000 ₽",
    time: "90 мин",
    copy: "Полный уход с салоном и защитой кузова для автомобиля, который должен выглядеть безупречно.",
    features: ["Всё из бережной мойки", "Уборка салона и багажника", "Защитный кварцевый воск", "Антидождь на лобовое"],
    featured: true,
  },
  {
    number: "03",
    title: "Люкс-детейлинг",
    price: "5 000 ₽",
    time: "2,5–3 часа",
    copy: "Глубокая перезагрузка экстерьера и интерьера с ручной проработкой каждой детали.",
    features: ["Всё из премиум-ухода", "Деконтаминация кузова", "Детейлинг салона и пластика", "Керамический силант"],
  },
];

const works = [
  { title: "Детейлинг кузова", tag: "BMW M4", src: "/images/work-bmw-m4.jpg", pos: "center 66%", credit: "Rana Singh", source: "https://unsplash.com/photos/a-bmw-m4-gets-a-foamy-car-wash-tZ8y940O0wQ" },
  { title: "Защитное покрытие", tag: "Mercedes-AMG GT", src: "/images/work-mercedes-amg.jpg", pos: "center 58%", credit: "Meik Schneider", source: "https://unsplash.com/photos/yellow-mercedes-benz-coupe-on-asphalt-road-near-concrete-building-e9zSM8orIfA" },
  { title: "Комплексный уход", tag: "Porsche 911", src: "/images/work-porsche-911.jpg", pos: "center 52%", credit: "Lorenzo Hamers", source: "https://unsplash.com/photos/a-woman-washing-a-sports-car-in-a-garage-Rl4yJrEEeDU" },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy container">
          <p className="eyebrow">Премиальная автомойка · 3 филиала</p>
          <h1 id="hero-title"><span>Больше,</span><br />чем просто мойка</h1>
          <p className="hero-lead">Технологичный уход за автомобилем. Честная цена, фиксированное время и безупречный результат.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#booking">Выбрать услугу <span>↗</span></a>
            <a className="text-link" href="#works">Смотреть работы <span>↓</span></a>
          </div>
          <div className="hero-trust" aria-label="Преимущества">
            <span><b>01</b> Премиальная химия</span>
            <span><b>02</b> Детейлинг-эксперты</span>
            <span><b>03</b> Три удобных филиала</span>
          </div>
        </div>
        <div className="hero-image" role="img" aria-label="BMW M4 после премиальной мойки" />
        <div className="hero-shade" />
        <div className="tech-mark tech-mark-one" aria-hidden="true" />
        <div className="tech-mark tech-mark-two" aria-hidden="true" />
      </section>

      <section className="quick-strip" aria-label="Быстрая запись">
        <div className="container quick-strip-inner">
          <div><small>Автомобиль</small><strong>Укажите в форме</strong></div>
          <div><small>Услуга</small><strong>От 1 500 ₽</strong></div>
          <div><small>Локация</small><strong>3 филиала</strong></div>
          <div><small>Ближайшая запись</small><strong>Свободные слоты онлайн</strong></div>
          <a href="#booking" aria-label="Перейти к записи">→</a>
        </div>
      </section>

      <section className="section services" id="services" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <div><p className="eyebrow blue">Услуги и цены</p><h2 id="services-title">Выберите уровень ухода</h2></div>
            <p>Три понятных пакета без скрытых доплат. Для кроссоверов стоимость уточняется перед записью.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className={`service-card${service.featured ? " featured" : ""}`} key={service.title}>
                {service.featured && <span className="popular">Выбирают чаще</span>}
                <div className="service-top"><span>{service.number}</span><small>{service.time}</small></div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                <div className="service-bottom"><strong>{service.price}</strong><a href="#booking">Записаться <span>↗</span></a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process" aria-labelledby="process-title">
        <div className="container process-grid">
          <div className="process-visual">
            <Image src="/images/bmw-studio.png" alt="Чистый BMW M4 в студии" fill sizes="(max-width: 780px) 100vw, 52vw" />
            <div className="process-stat"><strong>4.9</strong><span>средняя оценка<br />по отзывам клиентов</span></div>
          </div>
          <div className="process-copy">
            <p className="eyebrow blue">Стандарт «ЧИСТО»</p>
            <h2 id="process-title">Никакой спешки.<br />Только точность.</h2>
            <p>Каждый автомобиль проходит последовательный контроль: от первичного осмотра до финальной проверки при правильном свете.</p>
            <ol>
              <li><span>01</span><div><b>Осматриваем</b><p>Фиксируем состояние и подбираем безопасный состав.</p></div></li>
              <li><span>02</span><div><b>Очищаем</b><p>Работаем сверху вниз отдельным инвентарём для каждой зоны.</p></div></li>
              <li><span>03</span><div><b>Защищаем</b><p>Наносим выбранное покрытие и проверяем результат.</p></div></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section works" id="works" aria-labelledby="works-title">
        <div className="container">
          <div className="section-head light">
            <div><p className="eyebrow">Примеры работ</p><h2 id="works-title">Результат говорит за нас</h2></div>
            <p>Наведите на карточку, чтобы увидеть детали работы.</p>
          </div>
          <div className="works-grid">
            {works.map((work, index) => (
              <article className="work-card" tabIndex={0} key={work.title}>
                <Image src={work.src} alt={`${work.title} — ${work.tag}`} fill sizes="(max-width: 780px) 100vw, 35vw" style={{ objectPosition: work.pos }} />
                <div className="work-no">0{index + 1}</div>
                <div className="work-info"><small>{work.tag}</small><h3>{work.title}</h3><span>Результат после ухода ↗</span><a className="work-credit" href={work.source} target="_blank" rel="noreferrer">Фото: {work.credit} / Unsplash</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reviews" aria-labelledby="reviews-title">
        <div className="container">
          <p className="eyebrow blue">Отзывы</p>
          <h2 id="reviews-title">К нам возвращаются</h2>
          <div className="review-grid">
            <blockquote><div className="stars">★★★★★</div><p>«Машина выглядит лучше, чем в день покупки. Отдельное спасибо за аккуратную работу с чёрным лаком — ни одного развода.»</p><footer><b>Алексей Морозов</b><span>BMW M4 · Премиум-уход</span></footer></blockquote>
            <blockquote><div className="stars">★★★★★</div><p>«Записалась через сайт, сразу увидела свободное время. Приехала — приняли без ожидания, цену не изменили.»</p><footer><b>Мария Волкова</b><span>Mercedes GLC · Бережная мойка</span></footer></blockquote>
            <blockquote><div className="stars">★★★★★</div><p>«Люкс действительно стоит своих денег. Салон и кузов проработали до мелочей, а покрытие держится уже второй месяц.»</p><footer><b>Илья Соколов</b><span>Porsche Cayenne · Люкс-детейлинг</span></footer></blockquote>
          </div>
        </div>
      </section>

      <section className="section locations" id="locations" aria-labelledby="locations-title">
        <div className="container">
          <div className="section-head"><div><p className="eyebrow blue">Мы рядом</p><h2 id="locations-title">Три филиала в Москве</h2></div><a className="text-link dark" href="/contacts">Все контакты ↗</a></div>
          <div className="location-grid">
            {[['Ходынка','Ходынский бульвар, 4'],['Рублёвка','Рублёво-Успенское ш., 64Б'],['ММДЦ','Пресненская набережная, 12']].map(([name,address],i)=><article key={name}><span>0{i+1}</span><div><h3>ЧИСТО — {name}</h3><p>{address}</p><small>Ежедневно 08:00–23:00</small></div><a href="#booking" aria-label={`Записаться в филиал ${name}`}>↗</a></article>)}
          </div>
        </div>
      </section>

      <section className="section booking-section" id="booking" aria-labelledby="booking-title">
        <div className="container booking-layout">
          <div className="booking-intro"><p className="eyebrow">Онлайн-запись</p><h2 id="booking-title">Выберите удобное время</h2><p>Показываем только свободные окна. После отправки время будет закреплено за вами.</p><div className="booking-note"><strong>Нужна помощь?</strong><a href="tel:+74951200010">+7 (495) 120-00-10</a><span>Ответим ежедневно с 08:00 до 23:00</span></div></div>
          <BookingForm />
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-top"><a className="logo light-logo" href="#">ЧИСТО<span>премиальная автомойка</span></a><p>Технологичный уход за автомобилем<br />в трёх точках Москвы.</p><nav aria-label="Навигация в подвале"><a href="#services">Услуги</a><a href="#works">Работы</a><a href="/contacts">Контакты</a><a href="#booking">Запись онлайн</a></nav></div>
        <div className="container footer-bottom"><span>© 2026 ЧИСТО</span><span>Политика конфиденциальности</span><a href="#">Наверх ↑</a></div>
      </footer>
    </main>
  );
}
