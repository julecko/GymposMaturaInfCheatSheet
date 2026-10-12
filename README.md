# 🐍 Python Maturita Cheatsheet

SvelteKit + SCSS cheatsheet pre maturantov gymnázia — Python.

## Inštalácia

```bash
# Nainštaluj závislosti (ak ešte nie sú)
npm install

# Pridaj SCSS preprocessor (ak chýba)
npm install -D sass

# Spusti dev server
npm run dev
```

## Štruktúra projektu

```
src/
├── lib/
│   ├── data/
│   │   └── cheatsheet.ts   ← ✏️  EDITUJ TOTO — všetky témy, kategórie a príklady
│   ├── stores/
│   │   └── theme.ts         ← prepínanie svetlej/tmavej témy
│   └── styles/
│       ├── _variables.scss  ← ✏️  farby, fonty, spacing
│       └── global.scss      ← base štýly, CSS custom properties
└── routes/
    ├── +layout.svelte       ← koreňový layout
    └── +page.svelte         ← hlavná stránka (UI logika + lokálne SCSS)
```

## Ako upravovať obsah

### Pridanie novej kategórie
V `src/lib/data/cheatsheet.ts` do poľa `categories` pridaj:
```ts
{ key: 'nova', label: 'Nová kategória', icon: '🆕', color: 'accent-green' }
```

### Pridanie nového príkazu
Do poľa `entries` pridaj objekt:
```ts
{
  id: 'unikatne-id',
  name: 'Názov príkazu',
  syntax: 'syntaxový hint',
  brief: 'Krátky popis jednou vetou.',
  description: 'Dlhší popis čo príkaz robí, kedy ho použiť atď.',
  example: `# ukážkový kód
print("ahoj")`,
  category: 'basics',   // musí zodpovedať key z categories
  tags: ['voliteľné', 'tagy'],
}
```

### Zmena farieb / fontov
Uprav `src/lib/styles/_variables.scss`.

## Funkcie
- ⚡ **Rýchly prehľad** — klikateľné karty so skrytým rozbalením
- 📚 **Detailný prehľad** — všetky popisy a príklady naraz
- 🔍 **Vyhľadávanie** — filtruje podľa názvu, syntaxe, popisu
- 🏷️ **Kategórie** — filter podľa témy
- 🌙 **Svetlá / tmavá téma** — uložená v localStorage
- 📱 **Responzívny** — funguje na mobile aj PC
