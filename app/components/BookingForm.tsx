"use client";

import { FormEvent, useMemo, useState } from "react";
import { bookingTimes, branches, washServices } from "@/app/lib/data";

type FormState = {
  name: string; phone: string; car: string; year: string; service: string;
  branch: string; date: string; time: string; comment: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;
type RequestState = { id: string; date: string; time: string };

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getNextDates() {
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);
    return {
      key: toDateKey(date),
      weekday: new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(date).replace(".", ""),
      day: new Intl.DateTimeFormat("ru-RU", { day: "numeric" }).format(date),
      month: new Intl.DateTimeFormat("ru-RU", { month: "short" }).format(date).replace(".", ""),
      isToday: index === 0,
    };
  });
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export function BookingForm() {
  const dates = useMemo(() => getNextDates(), []);
  const [form, setForm] = useState<FormState>(() => ({
    name: "", phone: "", car: "", year: "", service: "premium",
    branch: branches[0], date: getNextDates()[0]?.key ?? "", time: "", comment: "",
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const busyTimes = useMemo(
    () => bookingTimes.filter((_, index) => (index + form.date.charCodeAt(form.date.length - 1) + form.branch.length) % 6 === 0),
    [form.branch, form.date],
  );
  const availabilityLoading = false;
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  const selectedService = washServices.find((service) => service.id === form.service) ?? washServices[1];
  const selectedDate = dates.find((date) => date.key === form.date);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value, ...(["date", "branch"].includes(field) ? { time: "" } : {}) }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function validate() {
    const next: FormErrors = {};
    const currentYear = new Date().getFullYear();
    if (form.name.trim().length < 2) next.name = "Укажите имя";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Введите корректный телефон";
    if (form.car.trim().length < 2) next.car = "Напишите марку и модель";
    if (!/^\d{4}$/.test(form.year) || Number(form.year) < 1950 || Number(form.year) > currentYear + 1) next.year = `Год от 1950 до ${currentYear + 1}`;
    if (!form.time || busyTimes.includes(form.time)) next.time = "Выберите свободное время";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError("");
    window.setTimeout(() => {
      setRequestState({
        id: "portfolio-demo",
        date: form.date,
        time: form.time,
      });
      setIsSubmitting(false);
    }, 650);
  }

  if (requestState) {
    return (
      <section className="booking-success booking-success--confirmed" aria-live="polite">
        <span className="booking-success__icon" aria-hidden="true">✓</span>
        <p className="booking-eyebrow">Демонстрационная запись создана</p>
        <h3>Выбранный слот показан в интерфейсе</h3>
        <p className="booking-success__lead">
          В портфолио-версии данные никуда не отправляются и существуют только до обновления страницы.
        </p>
        <div className="booking-success__details"><strong>{selectedDate?.day} {selectedDate?.month} · {requestState.time}</strong><span>{form.branch}</span><span>{selectedService.name} · {formatPrice(selectedService.price)} ₽</span></div>
        <button className="booking-button booking-button--secondary" type="button" onClick={() => { setRequestState(null); setForm((current) => ({ ...current, time: "" })); }}>Создать другую заявку</button>
      </section>
    );
  }

  return (
    <form className="booking-form booking-form-v2" onSubmit={submit} noValidate>
      <section className="booking-stage">
        <header className="booking-stage-head"><span>01</span><div><p>Выберите уровень ухода</p><h3>Понятная цена без доплат</h3></div></header>
        <div className="booking-services" role="radiogroup" aria-label="Услуга">
          {washServices.map((service) => (
            <label className={`booking-service${form.service === service.id ? " booking-service--selected" : ""}`} key={service.id}>
              <input type="radio" name="service" value={service.id} checked={form.service === service.id} onChange={(event) => updateField("service", event.target.value)} />
              <span className="booking-service__top"><b>{service.name}</b><strong>{formatPrice(service.price)} ₽</strong></span>
              <span className="booking-service__duration">{service.duration}</span>
              <span className="booking-service__description">{service.description}</span>
              <span className="booking-service__features">{service.features.slice(0, 3).map((feature) => <span key={feature}>✓ {feature}</span>)}</span>
              <span className="booking-service__pick">{form.service === service.id ? "Выбрано" : "Выбрать"}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="booking-stage">
        <header className="booking-stage-head"><span>02</span><div><p>Автомобиль и контакты</p><h3>Кого и где будем ждать</h3></div></header>
        <div className="booking-fields">
          <Field label="Ваше имя" error={errors.name}><input value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="Александр" /></Field>
          <Field label="Телефон" error={errors.phone}><input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" inputMode="tel" placeholder="+7 999 000-00-00" /></Field>
          <Field label="Марка и модель" error={errors.car}><input value={form.car} onChange={(event) => updateField("car", event.target.value)} placeholder="Например, BMW M4" /></Field>
          <Field label="Год выпуска" error={errors.year}><input value={form.year} onChange={(event) => updateField("year", event.target.value.replace(/\D/g, ""))} inputMode="numeric" maxLength={4} placeholder="2024" /></Field>
          <label className="booking-field booking-field--wide"><span>Филиал</span><select value={form.branch} onChange={(event) => updateField("branch", event.target.value)}>{branches.map((branch) => <option key={branch}>{branch}</option>)}</select></label>
        </div>
      </section>

      <section className="booking-stage booking-stage--schedule">
        <header className="booking-stage-head"><span>03</span><div><p>Дата и время</p><h3>Нажмите на удобное окно</h3></div></header>
        <div className="booking-calendar-label"><b>Выберите дату</b><span>Ближайшие 14 дней</span></div>
        <div className="booking-dates" role="radiogroup" aria-label="Дата записи">
          {dates.map((date) => <label className={`booking-date${form.date === date.key ? " booking-date--selected" : ""}`} key={date.key}><input type="radio" name="date" checked={form.date === date.key} value={date.key} onChange={(event) => updateField("date", event.target.value)} /><span>{date.isToday ? "Сегодня" : date.weekday}</span><strong>{date.day}</strong><small>{date.month}</small></label>)}
        </div>
        <div className="booking-calendar-label booking-calendar-label--time"><b>Выберите время</b><span><i className="free-dot" /> свободно <i className="busy-dot" /> занято</span></div>
        <div className={`booking-times${availabilityLoading ? " booking-times--loading" : ""}`} role="radiogroup" aria-label="Время записи">
          {bookingTimes.map((time) => { const busy = busyTimes.includes(time); return <label className={`booking-time${form.time === time ? " booking-time--selected" : ""}${busy ? " booking-time--busy" : ""}`} key={time}><input type="radio" name="time" value={time} checked={form.time === time} disabled={busy || availabilityLoading} onChange={(event) => updateField("time", event.target.value)} /><span>{time}</span><small>{busy ? "занято" : "свободно"}</small></label>; })}
        </div>
        {errors.time && <p className="booking-error">{errors.time}</p>}
      </section>

      <section className="booking-stage booking-stage--submit">
        <label className="booking-field booking-field--wide"><span>Комментарий <em>необязательно</em></span><textarea rows={3} maxLength={500} value={form.comment} onChange={(event) => updateField("comment", event.target.value)} placeholder="Пожелания или важные детали" /></label>
        <div className="booking-summary"><div><span>{selectedService.name}</span><strong>{formatPrice(selectedService.price)} ₽</strong></div><p>{selectedDate?.day} {selectedDate?.month}{form.time ? ` · ${form.time}` : " · выберите время"}</p></div>
        {submitError && <p className="booking-error booking-error--submit" role="alert">{submitError}</p>}
        <button className="booking-button" type="submit" disabled={isSubmitting || availabilityLoading}>{isSubmitting ? "Создаём демо-запись…" : "Показать результат записи"}<span>↗</span></button>
        <p className="booking-privacy">Портфолио-демо: форма не использует API, не отправляет персональные данные и не создаёт настоящую бронь.</p>
      </section>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="booking-field"><span>{label}</span>{children}{error && <small className="booking-error">{error}</small>}</label>;
}

export default BookingForm;
