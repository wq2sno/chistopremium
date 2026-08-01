"use client";

import { useState } from "react";
import Link from "next/link";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" href="/" aria-label="ЧИСТО — на главную">ЧИСТО<span>премиальная автомойка</span></Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span /><span /><span /><b className="sr-only">Меню</b></button>
        <nav id="main-nav" className={open ? "nav open" : "nav"} aria-label="Основная навигация">
          <Link href="/#services" onClick={() => setOpen(false)}>Услуги</Link>
          <Link href="/#works" onClick={() => setOpen(false)}>Работы</Link>
          <Link href="/#locations" onClick={() => setOpen(false)}>Филиалы</Link>
          <Link href="/contacts" onClick={() => setOpen(false)}>Контакты</Link>
        </nav>
        <div className="header-contact"><a href="tel:+74951200010">+7 (495) 120-00-10</a><Link className="header-cta" href="/#booking">Записаться</Link></div>
      </div>
    </header>
  );
}
