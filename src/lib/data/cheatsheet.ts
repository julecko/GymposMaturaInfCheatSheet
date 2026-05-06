// ============================================================
// PYTHON CHEATSHEET DATA
// Edit this file to add/remove/update topics and entries.
// ============================================================

export type Entry = {
    id: string;
    name: string;        // Short display name
    syntax: string;      // Short syntax hint
    brief: string;       // One-liner for quick reference
    description: string; // Longer explanation for detail view
    example: string;     // Code example
    category: string;    // Category key
    tags?: string[];     // Optional extra tags
};

export type Category = {
    key: string;
    label: string;
    icon: string;
    color: string; // CSS var name e.g. 'accent-blue'
};

// ============================================================
// CATEGORIES  (display order: as listed here)
// ============================================================
export const categories: Category[] = [
    { key: 'basics', label: 'Základy', icon: '⚡', color: 'accent-yellow' },
    { key: 'control', label: 'Riadenie toku', icon: '🔀', color: 'accent-yellow' },
    { key: 'tkinter', label: 'tkinter', icon: '🖼️', color: 'accent-red' },
    { key: 'tkcanvas', label: 'tkinter Canvas', icon: '🎨', color: 'accent-purple' },
    { key: 'strings', label: 'Reťazce', icon: '✏️', color: 'accent-cyan' },
    { key: 'lists', label: 'Zoznamy', icon: '📋', color: 'accent-green' },
    { key: 'tuples', label: 'Ntice', icon: '🔒', color: 'accent-purple' },
    { key: 'dicts', label: 'Slovníky', icon: '📖', color: 'accent-red' },
    { key: 'functions', label: 'Funkcie', icon: '🧩', color: 'accent-blue' },
    { key: 'files', label: 'Súbory', icon: '💾', color: 'accent-green' },
    { key: 'random', label: 'random', icon: '🎲', color: 'accent-purple' },
    { key: 'mathmod', label: 'math', icon: '√', color: 'accent-cyan' },
];

// ============================================================
// ENTRIES
// ============================================================
export const entries: Entry[] = [

    // ── BASICS ──────────────────────────────────────────────
    {
        id: 'var-assign',
        name: 'Premenná',
        syntax: 'meno = hodnota',
        brief: 'Priradí hodnotu premenne.',
        description: 'Premenné sa vytvárajú priradením hodnoty. Python je dynamicky typovaný — typ sa určí automaticky. Názov musí začínať písmenom alebo _, nesmie obsahovať medzery.',
        example: `x = 10
meno = "Anna"
pi = 3.14
je_pravda = True
prazdna = None`,
        category: 'basics',
        tags: ['int', 'str', 'float', 'bool'],
    },
    {
        id: 'data-types',
        name: 'Dátové typy',
        syntax: 'int, float, str, bool, None',
        brief: 'Základné typy: číslo, desatinné, reťazec, logický, prázdny.',
        description: 'Python má niekoľko zabudovaných typov. Typ zistíš pomocou type(). Konverzia medzi typmi: int(), float(), str(), bool().',
        example: `cislo = 42            # int
desatinne = 3.14      # float
text = "ahoj"         # str
pravda = True         # bool
nic = None            # NoneType

print(type(cislo))    # <class 'int'>
print(int("7"))       # 7
print(str(3.14))      # "3.14"
print(float(5))       # 5.0`,
        category: 'basics',
    },
    {
        id: 'print',
        name: 'Výpis (print)',
        syntax: 'print(hodnota, ...)',
        brief: 'Vypíše hodnotu na obrazovku.',
        description: 'print() môže prijať viacero argumentov oddelených čiarkou. sep= nastaví oddeľovač (default medzera), end= nastaví zakončenie (default \\n). f-string umožňuje vkladanie premenných priamo do reťazca.',
        example: `print("Ahoj svet!")
print("x =", 42)
print("a", "b", "c", sep="-")   # a-b-c
print("bez nového riadku", end="")

meno = "Julo"
vek = 17
print(f"Volám sa {meno} a mám {vek} rokov.")`,
        category: 'basics',
    },
    {
        id: 'input',
        name: 'Vstup (input)',
        syntax: 'premenna = input("prompt")',
        brief: 'Načíta text od používateľa.',
        description: 'input() vždy vracia reťazec (str). Ak chceš číslo, musíš konvertovať pomocou int() alebo float().',
        example: `meno = input("Zadaj meno: ")
print("Ahoj,", meno)

vek = int(input("Zadaj vek: "))
print("Máš", vek, "rokov")

vyska = float(input("Zadaj výšku v metroch: "))`,
        category: 'basics',
    },
    {
        id: 'math-ops',
        name: 'Matematické operácie',
        syntax: '+ - * / // % **',
        brief: 'Základné aritmetické operátory.',
        description: '/ je delenie s desatinnými číslami, // je celočíselné delenie, % je zvyšok po delení, ** je umocnenie. Poradie operácií: ** > * / // % > + -',
        example: `a, b = 10, 3
print(a + b)    # 13  — sčítanie
print(a - b)    # 7   — odčítanie
print(a * b)    # 30  — násobenie
print(a / b)    # 3.333...  — delenie
print(a // b)   # 3   — celočíselné delenie
print(a % b)    # 1   — zvyšok
print(a ** b)   # 1000  — umocnenie (10³)`,
        category: 'basics',
    },
    {
        id: 'comparison',
        name: 'Porovnávacie operátory',
        syntax: '== != < > <= >=',
        brief: 'Porovnajú dve hodnoty, vrátia True/False.',
        description: 'Vrátia boolean (True alebo False). Môžeš reťaziť: 0 < x < 10. Logické operátory: and, or, not.',
        example: `x = 5
print(x == 5)   # True
print(x != 3)   # True
print(x > 10)   # False
print(x <= 5)   # True

# Logické operátory
print(x > 0 and x < 10)   # True
print(x < 0 or x == 5)    # True
print(not (x == 5))        # False
print(1 < x < 10)          # True  (reťazenie)`,
        category: 'basics',
    },

    // ── CONTROL FLOW ─────────────────────────────────────
    {
        id: 'if-else',
        name: 'Podmienky (if/elif/else)',
        syntax: 'if podmienka:\n  ...\nelif:\n  ...\nelse:\n  ...',
        brief: 'Vykoná blok kódu len keď je podmienka pravdivá.',
        description: 'Odsadenie (4 medzery alebo 1 tab) definuje blok. elif môže byť ľubovoľný počet. else je voliteľné. Podmienka môže byť akýkoľvek výraz vyhodnotený na bool.',
        example: `vek = int(input("Vek: "))

if vek < 0:
    print("Neplatný vek")
elif vek < 18:
    print("Neplnoletý")
elif vek < 65:
    print("Dospelý")
else:
    print("Senior")

# Jednoriadkový ternárny výraz
status = "plnoletý" if vek >= 18 else "neplnoletý"`,
        category: 'control',
    },
    {
        id: 'for-loop',
        name: 'For cyklus',
        syntax: 'for prvok in iterable:\n  ...',
        brief: 'Prechádza cez prvky kolekcie alebo rozsah.',
        description: 'range(n) generuje 0..n-1. range(a,b) generuje a..b-1. range(a,b,krok) generuje s krokom. break zastaví cyklus, continue preskočí iteráciu. enumerate() vracia index aj hodnotu.',
        example: `# Prechod zoznamom
ovocie = ["jablko", "hruška", "slivka"]
for item in ovocie:
    print(item)

# Rozsah čísel
for i in range(5):       # 0,1,2,3,4
    print(i)

for i in range(1, 6):    # 1,2,3,4,5
    print(i)

for i in range(0, 10, 2):  # 0,2,4,6,8
    print(i)

# enumerate — index + hodnota
for i, val in enumerate(ovocie):
    print(f"{i}: {val}")`,
        category: 'control',
    },
    {
        id: 'while-loop',
        name: 'While cyklus',
        syntax: 'while podmienka:\n  ...',
        brief: 'Opakuje blok kým je podmienka pravdivá.',
        description: 'Ak podmienka nikdy nie je False, cyklus beží donekonečna (infinite loop). break ukončí cyklus, continue preskočí na ďalšiu iteráciu. Typické použitie: čakanie na vstup, počítadlo.',
        example: `# Základný while
pocitadlo = 0
while pocitadlo < 5:
    print(pocitadlo)
    pocitadlo += 1   # rovnaké ako pocitadlo = pocitadlo + 1

# Čakanie na správny vstup
while True:
    vstup = input("Zadaj 'koniec': ")
    if vstup == "koniec":
        break
    print("Skús znova...")

# continue — preskočí párne čísla
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue
    print(i)   # vypíše len nepárne`,
        category: 'control',
    },

    // ── TKINTER ──────────────────────────────────────────
    {
        id: 'tk-window',
        name: 'Tkinter — okno (Tk)',
        syntax: 'okno = tk.Tk()',
        brief: 'Vytvorí hlavné okno aplikácie.',
        description: 'tk.Tk() vytvorí koreňové okno. mainloop() spustí event loop — bez neho sa okno hneď zavrie. title() nastaví nadpis, geometry() veľkosť a pozíciu okna.',
        example: `import tkinter as tk

okno = tk.Tk()
okno.title("Moja aplikácia")
okno.geometry("400x300")      # šírka x výška
okno.resizable(False, False)  # zakáže zmenu veľkosti

# ... sem prídu widgety ...

okno.mainloop()  # MUSÍ byť na konci`,
        category: 'tkinter',
    },
    {
        id: 'tk-label',
        name: 'Tkinter — Label',
        syntax: 'tk.Label(parent, text="...")',
        brief: 'Zobrazí text alebo obrázok.',
        description: 'Label zobrazuje statický text. font nastaví písmo. fg/bg nastaví farby. pack() alebo grid() umiestni widget do okna.',
        example: `import tkinter as tk
okno = tk.Tk()

nadpis = tk.Label(
    okno,
    text="Ahoj svet!",
    font=("Arial", 20, "bold"),
    fg="white",
    bg="navy"
)
nadpis.pack(pady=10)

info = tk.Label(okno, text="Python je super")
info.pack()

okno.mainloop()`,
        category: 'tkinter',
    },
    {
        id: 'tk-button',
        name: 'Tkinter — Button',
        syntax: 'tk.Button(parent, text="...", command=fn)',
        brief: 'Klikateľné tlačidlo vykonávajúce funkciu.',
        description: 'command= prijíma referenciu na funkciu (bez zátvoriek!). Ak chceš odovzdať argumenty, použi lambda. state=tk.DISABLED deaktivuje tlačidlo.',
        example: `import tkinter as tk

def po_kliknutí():
    print("Kliknuté!")
    btn.config(text="Stlačené!", state=tk.DISABLED)

okno = tk.Tk()

btn = tk.Button(
    okno,
    text="Klikni ma",
    font=("Arial", 14),
    bg="#4CAF50",
    fg="white",
    command=po_kliknutí
)
btn.pack(pady=20)

# Lambda s argumentom
tk.Button(okno, text="Pozdrav",
    command=lambda: print("Ahoj!")).pack()

okno.mainloop()`,
        category: 'tkinter',
    },
    {
        id: 'tk-entry',
        name: 'Tkinter — Entry (vstup)',
        syntax: 'tk.Entry(parent)',
        brief: 'Jednoriadkové textové pole pre vstup.',
        description: 'get() vracia aktuálny text. delete(0, tk.END) vymaže obsah. insert(0, "text") vloží text. StringVar() prepojí hodnotu s premennou.',
        example: `import tkinter as tk

def zobraz():
    hodnota = vstup.get()
    print(f"Zadal si: {hodnota}")
    vstup.delete(0, tk.END)  # vyčistí pole

okno = tk.Tk()

vstup = tk.Entry(okno, font=("Arial", 14), width=20)
vstup.pack(pady=10)

tk.Button(okno, text="OK", command=zobraz).pack()

okno.mainloop()`,
        category: 'tkinter',
    },
    {
        id: 'tk-pack-grid',
        name: 'Tkinter — pack & grid',
        syntax: 'widget.pack() | widget.grid(row=r, column=c)',
        brief: 'Umiestni widget do rodiča — pack alebo grid.',
        description: 'pack() ukladá widgety za sebou (side=tk.LEFT/RIGHT/TOP/BOTTOM). grid() umiestňuje do mriežky podľa riadku a stĺpca. padx/pady pridávajú vonkajší okraj, ipadx/ipady vnútorný.',
        example: `import tkinter as tk
okno = tk.Tk()

# --- PACK ---
tk.Label(okno, text="Vrch").pack(side=tk.TOP, pady=5)
tk.Label(okno, text="Ľavo").pack(side=tk.LEFT, padx=10)
tk.Label(okno, text="Pravo").pack(side=tk.RIGHT, padx=10)

okno2 = tk.Tk()
# --- GRID ---
for r in range(3):
    for c in range(3):
        tk.Button(okno2, text=f"[{r},{c}]",
                  width=6).grid(row=r, column=c, padx=2, pady=2)

okno.mainloop()`,
        category: 'tkinter',
    },
    {
        id: 'tk-colors',
        name: 'Tkinter — farby',
        syntax: 'fill="red"  fill="#FF5733"',
        brief: 'Farby názvom alebo hex kódom.',
        description: 'Tkinter akceptuje pomenované farby aj hex kódy (#RRGGBB). Základné: "white", "black", "red", "green", "blue", "yellow", "orange", "purple", "gray". fg= farba textu, bg= pozadie, fill= výplň, outline= obrys.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=300, height=200, bg="#1a1a2e")
platno.pack()

farby = ["#e94560", "#0f3460", "#16213e", "#f5a623",
         "lightblue", "salmon", "lime", "violet"]

for i, f in enumerate(farby):
    x = (i % 4) * 70 + 35
    y = (i // 4) * 80 + 50
    platno.create_oval(x-30, y-30, x+30, y+30, fill=f)

okno.mainloop()`,
        category: 'tkinter',
    },

    // ── TKINTER CANVAS ───────────────────────────────────
    {
        id: 'tkc-canvas-create',
        name: 'Canvas — vytvorenie',
        syntax: 'platno = tk.Canvas(parent, width=w, height=h)',
        brief: 'Vytvorí plátno na kreslenie tvarov a grafiky.',
        description: 'Canvas je widget pre 2D grafiku. width a height určujú rozmery. bg nastaví farbu pozadia. Každý nakreslený objekt (tvar, text) dostane unikátne číselné ID, cez ktoré ho môžeš neskôr meniť, posúvať alebo mazať.',
        example: `import tkinter as tk

okno = tk.Tk()
okno.title("Moje plátno")

platno = tk.Canvas(
    okno,
    width=500,
    height=400,
    bg="white"
)
platno.pack()

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['Canvas', 'widget', 'kreslenie'],
    },
    {
        id: 'tkc-rectangle',
        name: 'Canvas — obdĺžnik',
        syntax: 'platno.create_rectangle(x1, y1, x2, y2)',
        brief: 'Nakreslí obdĺžnik od (x1,y1) po (x2,y2).',
        description: '(x1, y1) je ľavý horný roh, (x2, y2) je pravý dolný roh. fill= farba výplne, outline= farba obrysu, width= hrúbka čiary obrysu. Vracia ID objektu.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Jednoduchý obdĺžnik
platno.create_rectangle(50, 50, 200, 150,
    fill="lightblue",
    outline="navy",
    width=3)

# Štvorec bez výplne (len obrys)
platno.create_rectangle(250, 50, 350, 150,
    fill="",
    outline="red",
    width=2)

# Zaoblené rohy (dash vzor)
platno.create_rectangle(50, 180, 350, 260,
    fill="lightyellow",
    outline="orange",
    dash=(8, 4))   # čiarkovaný obrys

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['rectangle', 'tvar', 'fill', 'outline'],
    },
    {
        id: 'tkc-oval',
        name: 'Canvas — kruh / elipsa',
        syntax: 'platno.create_oval(x1, y1, x2, y2)',
        brief: 'Nakreslí elipsu do ohraničujúceho obdĺžnika (x1,y1)-(x2,y2).',
        description: 'Pre kruh nastav rovnakú šírku a výšku ohraničujúceho obdĺžnika. Stred kruhu s polomerom r na pozícii (cx, cy): create_oval(cx-r, cy-r, cx+r, cy+r). fill= výplň, outline= obrys.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Elipsa
platno.create_oval(20, 20, 200, 120,
    fill="salmon", outline="darkred", width=2)

# Kruh — rovnaká šírka aj výška
cx, cy, r = 300, 80, 60
platno.create_oval(cx-r, cy-r, cx+r, cy+r,
    fill="lightgreen", outline="green", width=2)

# Kruh bez výplne
platno.create_oval(150, 160, 250, 260,
    fill="", outline="purple", width=3)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['oval', 'circle', 'kruh', 'elipsa'],
    },
    {
        id: 'tkc-line',
        name: 'Canvas — čiara',
        syntax: 'platno.create_line(x1, y1, x2, y2, ...)',
        brief: 'Nakreslí čiaru (alebo lomenu čiaru) cez dané body.',
        description: 'Môžeš zadať ľubovoľný počet bodov — čiara prechádza všetkými. fill= farba, width= hrúbka. dash=(d,m) vytvorí čiarkovanú čiaru (d = dĺžka čiarky, m = medzera). arrow=tk.LAST/FIRST/BOTH pridá šípku.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Jednoduchá čiara
platno.create_line(20, 20, 380, 20, fill="black", width=2)

# Čiarkovaná čiara
platno.create_line(20, 60, 380, 60,
    fill="gray", width=1, dash=(10, 5))

# Lomená čiara cez viac bodov
platno.create_line(20, 100, 100, 200, 200, 100, 300, 200, 380, 100,
    fill="blue", width=3)

# Šípka
platno.create_line(50, 260, 350, 260,
    fill="red", width=2, arrow=tk.LAST)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['line', 'čiara', 'arrow', 'dash'],
    },
    {
        id: 'tkc-polygon',
        name: 'Canvas — mnohouholník',
        syntax: 'platno.create_polygon(x1,y1, x2,y2, x3,y3, ...)',
        brief: 'Nakreslí vyplnený mnohouholník cez zadané body.',
        description: 'Zadáš ľubovoľný počet vrcholov ako súradnicové páry. Tvar sa automaticky uzavrie. fill= výplň, outline= obrys. smooth=True zaoblí hrany (Bezier krivka).',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Trojuholník
platno.create_polygon(
    200, 30,   # vrchol
    50,  270,  # ľavý dolný
    350, 270,  # pravý dolný
    fill="lightblue", outline="navy", width=2
)

# Hviezda (5 cípov)
import math
cx, cy, R, r = 300, 150, 60, 25
body = []
for i in range(10):
    uhol = math.radians(i * 36 - 90)
    polomer = R if i % 2 == 0 else r
    body.append(cx + polomer * math.cos(uhol))
    body.append(cy + polomer * math.sin(uhol))
platno.create_polygon(body, fill="gold", outline="orange", width=2)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['polygon', 'mnohouholník', 'trojuholník', 'smooth'],
    },
    {
        id: 'tkc-text',
        name: 'Canvas — text',
        syntax: 'platno.create_text(x, y, text="...")',
        brief: 'Vypíše text na plátno na pozíciu (x, y).',
        description: 'anchor= určuje, ktorý bod textu sa umiestni na (x,y): "center" (default), "nw", "n", "ne", "w", "e", "sw", "s", "se". font= nastaví písmo. fill= farba. Vracia ID — obsah môžeš meniť cez itemconfig(id, text="nový text").',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Stredový text
platno.create_text(200, 50,
    text="Ahoj Canvas!",
    font=("Arial", 22, "bold"),
    fill="navy")

# Text zarovnaný vľavo hore
platno.create_text(10, 100,
    text="Ľavý roh",
    font=("Courier", 14),
    anchor="nw",
    fill="darkgreen")

# Uložíme ID a neskôr zmeníme text
id_skore = platno.create_text(200, 200,
    text="Skóre: 0",
    font=("Arial", 18),
    fill="red")

# Zmena textu pomocou itemconfig
platno.itemconfig(id_skore, text="Skóre: 42")

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['text', 'font', 'anchor', 'itemconfig'],
    },
    {
        id: 'tkc-image',
        name: 'Canvas — obrázok',
        syntax: 'platno.create_image(x, y, image=img)',
        brief: 'Zobrazí obrázok na plátne na pozícii (x, y).',
        description: 'Obrázok musíš načítať ako PhotoImage (PNG, GIF) alebo cez Pillow (PIL). Referenciu na objekt musíš uložiť do premennej — Python ho inak zmaže z pamäte (garbage collection). anchor= funguje rovnako ako pri texte.',
        example: `import tkinter as tk

okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Načítanie PNG obrázka (tkinter nativne podporuje PNG a GIF)
img = tk.PhotoImage(file="obrazok.png")

# DÔLEŽITÉ: uložiť referenciu, inak sa obrázok zmaže!
platno.img = img

# Zobrazenie — zarovnaný na stred bodu (200, 150)
platno.create_image(200, 150, image=img, anchor="center")

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['image', 'PhotoImage', 'obrázok'],
    },
    {
        id: 'tkc-itemconfig',
        name: 'Canvas — zmena vlastností (itemconfig)',
        syntax: 'platno.itemconfig(id, fill="...", text="...")',
        brief: 'Zmení vlastnosti existujúceho objektu na plátne.',
        description: 'itemconfig() mení akúkoľvek vlastnosť objektu (fill, outline, width, text, font, ...) bez toho, aby si ho musel zmazať a znovu nakresliť. Prvý argument je ID objektu alebo tag. Výborne sa hodí na animácie a interaktívne zmeny.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=300, height=200, bg="white")
platno.pack()

kruh = platno.create_oval(100, 50, 200, 150, fill="red")
nadpis = platno.create_text(150, 170, text="červená", font=("Arial",14))

def zmen():
    platno.itemconfig(kruh, fill="blue", outline="darkblue", width=3)
    platno.itemconfig(nadpis, text="modrá", fill="blue")

tk.Button(okno, text="Zmeň farbu", command=zmen).pack(pady=5)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['itemconfig', 'zmena', 'fill', 'text'],
    },
    {
        id: 'tkc-move-coords',
        name: 'Canvas — posúvanie (move & coords)',
        syntax: 'platno.move(id, dx, dy)\nplatno.coords(id, x1,y1,x2,y2)',
        brief: 'Posúva objekt o (dx,dy) alebo nastaví nové súradnice.',
        description: 'move(id, dx, dy) posunie objekt relatívne o dx pixelov doprava a dy pixelov nadol. coords(id) bez ďalších argumentov vráti aktuálne súradnice objektu ako zoznam. coords(id, x1, y1, x2, y2) nastaví nové absolútne súradnice.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

lopta = platno.create_oval(50, 130, 90, 170, fill="red")

def posun_pravo():
    platno.move(lopta, 20, 0)   # posunie o 20px vpravo

def posun_hore():
    platno.move(lopta, 0, -20)  # posunie o 20px hore

def reset():
    platno.coords(lopta, 50, 130, 90, 170)  # vráti na štart

# Zisti aktuálne súradnice
print(platno.coords(lopta))  # [50.0, 130.0, 90.0, 170.0]

tk.Button(okno, text="→", command=posun_pravo).pack(side=tk.LEFT)
tk.Button(okno, text="↑", command=posun_hore).pack(side=tk.LEFT)
tk.Button(okno, text="Reset", command=reset).pack(side=tk.LEFT)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['move', 'coords', 'posúvanie', 'súradnice'],
    },
    {
        id: 'tkc-bbox',
        name: 'Canvas — bbox (ohraničujúci obdĺžnik)',
        syntax: 'platno.bbox(id_alebo_tag)',
        brief: 'Vracia (x1,y1,x2,y2) ohraničujúceho obdĺžnika objektu.',
        description: 'bbox() (bounding box) vráti súradnice najmenšieho obdĺžnika, ktorý obaľuje daný objekt (alebo skupinu tagovaných objektov). Vracia tuple (x1, y1, x2, y2). Hodí sa na detekciu kolízií, centrovanie textu, alebo zistenie rozmerov nakreslených prvkov. bbox("all") vráti ohraničenie všetkých objektov.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Nakreslíme text — nevieme vopred jeho šírku
id_text = platno.create_text(200, 100,
    text="Dynamický text!", font=("Arial", 20, "bold"), fill="navy")

# Zistíme rozmery textu cez bbox
x1, y1, x2, y2 = platno.bbox(id_text)
sirka = x2 - x1
vyska = y2 - y1
print(f"Šírka: {sirka}, Výška: {vyska}")

# Nakreslíme obdĺžnik presne okolo textu (padding 5px)
platno.create_rectangle(x1-5, y1-5, x2+5, y2+5,
    outline="red", width=2)

# bbox("all") — ohraničenie všetkých objektov
print(platno.bbox("all"))

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['bbox', 'bounding box', 'kolízia', 'rozmery'],
    },
    {
        id: 'tkc-delete',
        name: 'Canvas — mazanie (delete)',
        syntax: 'platno.delete(id_alebo_tag)',
        brief: 'Zmaže objekt alebo skupinu objektov podľa ID alebo tagu.',
        description: 'delete(id) zmaže konkrétny objekt. delete("tag") zmaže všetky objekty s daným tagom. delete("all") zmaže všetko na plátne. Tagy priraďuješ pri tvorbe objektu cez tags="nazov" alebo pomocou addtag_withtag().',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Objekty s tagmi
id1 = platno.create_rectangle(30, 30, 130, 130,
    fill="blue", tags="modre")
id2 = platno.create_oval(150, 30, 250, 130,
    fill="blue", tags="modre")
id3 = platno.create_rectangle(270, 30, 370, 130,
    fill="red", tags="cervene")

def zmaz_modre():
    platno.delete("modre")     # zmaže oba modré tvary

def zmaz_jeden():
    platno.delete(id3)         # zmaže len červený obdĺžnik

def zmaz_vsetko():
    platno.delete("all")       # vyčistí celé plátno

tk.Button(okno, text="Zmaž modré", command=zmaz_modre).pack(side=tk.LEFT, padx=5)
tk.Button(okno, text="Zmaž červený", command=zmaz_jeden).pack(side=tk.LEFT, padx=5)
tk.Button(okno, text="Zmaž všetko", command=zmaz_vsetko).pack(side=tk.LEFT, padx=5)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['delete', 'tags', 'mazanie', 'all'],
    },
    {
        id: 'tkc-tags',
        name: 'Canvas — tagy',
        syntax: 'tags="nazov"  |  platno.addtag_withtag(...)',
        brief: 'Tagy zoskupujú objekty pre hromadné operácie.',
        description: 'Tag je reťazcový štítok, ktorý môžeš priradiť jednému alebo viacerým objektom. Jeden objekt môže mať viacero tagov. Tagy fungujú ako skupiny — delete, itemconfig, move atď. môžu pracovať s celou skupinou naraz. find_withtag("tag") vráti IDs všetkých objektov s daným tagom.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=250, bg="white")
platno.pack()

# Viacero tagov na jeden objekt
platno.create_oval(50, 50, 150, 150,
    fill="red", tags=("kruhy", "cervene"))
platno.create_oval(200, 50, 300, 150,
    fill="blue", tags=("kruhy", "modre"))
platno.create_rectangle(50, 170, 150, 230,
    fill="red", tags=("stvorce", "cervene"))

# Zisti všetky objekty s tagom
ids = platno.find_withtag("cervene")
print(f"Červené objekty: {ids}")

# Zmena celej skupiny
def zmen_kruhy():
    platno.itemconfig("kruhy", outline="gold", width=4)

def zmaz_cervene():
    platno.delete("cervene")

tk.Button(okno, text="Orámuj kruhy", command=zmen_kruhy).pack(side=tk.LEFT, padx=5)
tk.Button(okno, text="Zmaž červené", command=zmaz_cervene).pack(side=tk.LEFT, padx=5)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['tags', 'skupiny', 'find_withtag', 'addtag'],
    },
    {
        id: 'tkc-after',
        name: 'Canvas — animácia (after)',
        syntax: 'okno.after(ms, funkcia)',
        brief: 'Zavolá funkciu po uplynutí ms milisekúnd — základ animácií.',
        description: 'after(ms, fn) naplánuje zavolanie fn po ms milisekundách. Ak vo fn zavoláš after() znovu, vznikne nepretržitá animácia (herná slučka). after_cancel(id) animáciu zastaví. 1000 ms = 1 sekunda. Pre plynulú animáciu 60 fps použi ~16 ms.',
        example: `import tkinter as tk

okno = tk.Tk()
okno.title("Animácia loptiček")
platno = tk.Canvas(okno, width=400, height=300, bg="black")
platno.pack()

# Stav loptiček
x, y = 30, 150
dx, dy = 5, 3   # rýchlosť

lopta = platno.create_oval(x-15, y-15, x+15, y+15,
    fill="orange", outline="")

def animuj():
    global x, y, dx, dy

    # Odrazenie od stien
    if x + 15 >= 400 or x - 15 <= 0:
        dx = -dx
    if y + 15 >= 300 or y - 15 <= 0:
        dy = -dy

    x += dx
    y += dy

    platno.coords(lopta, x-15, y-15, x+15, y+15)
    okno.after(16, animuj)   # ~60 fps

animuj()   # spustenie
okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['after', 'animácia', 'pohyb', 'herná slučka'],
    },
    {
        id: 'tkc-bind',
        name: 'Canvas — udalosti (bind)',
        syntax: 'platno.bind("<Event>", handler)',
        brief: 'Reaguje na kliknutia myšou, pohyb a klávesy.',
        description: 'bind() prepojí udalosť s funkciou. Handler dostane objekt event so súradnicami (event.x, event.y) a ďalšími údajmi. Časté udalosti: "<Button-1>" — ľavé kliknutie, "<B1-Motion>" — ťahanie, "<Motion>" — pohyb myšou, "<KeyPress-Return>" — Enter.',
        example: `import tkinter as tk
okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=300, bg="white")
platno.pack()

# Kliknutie — nakreslí kruh
def klik(event):
    r = 15
    platno.create_oval(
        event.x - r, event.y - r,
        event.x + r, event.y + r,
        fill="royalblue", outline=""
    )

# Ťahanie — kreslí čiaru
posledna = [None, None]

def zacni_tahanie(event):
    posledna[0], posledna[1] = event.x, event.y

def tahanie(event):
    platno.create_line(
        posledna[0], posledna[1],
        event.x, event.y,
        fill="red", width=3
    )
    posledna[0], posledna[1] = event.x, event.y

platno.bind("<Button-1>", klik)
platno.bind("<ButtonPress-1>", zacni_tahanie)
platno.bind("<B1-Motion>", tahanie)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['bind', 'event', 'kliknutie', 'myš', 'klávesnica'],
    },
    {
        id: 'tkc-animation-stop',
        name: 'Canvas — zastavenie animácie (after_cancel)',
        syntax: 'id = okno.after(...)\nokno.after_cancel(id)',
        brief: 'Uloží ID naplánovaného volania a animáciu zastaví.',
        description: 'after() vracia ID naplánovaného volania. Ak ho uložíš do premennej, môžeš animáciu kedykoľvek zastaviť pomocou after_cancel(id). Toto sa hodí na tlačidlá Štart/Stop alebo detekciu konca hry.',
        example: `import tkinter as tk

okno = tk.Tk()
platno = tk.Canvas(okno, width=400, height=100, bg="white")
platno.pack()

x = [10]
obj = platno.create_oval(0, 30, 40, 70, fill="tomato")
after_id = [None]

def pohni():
    x[0] += 3
    if x[0] > 360:
        x[0] = 10
    platno.coords(obj, x[0], 30, x[0]+40, 70)
    after_id[0] = okno.after(20, pohni)

def stlac_start():
    if after_id[0] is None:   # nespustená
        pohni()

def stlac_stop():
    if after_id[0]:
        okno.after_cancel(after_id[0])
        after_id[0] = None

frame = tk.Frame(okno)
frame.pack(pady=5)
tk.Button(frame, text="▶ Štart", command=stlac_start).pack(side=tk.LEFT, padx=5)
tk.Button(frame, text="■ Stop",  command=stlac_stop).pack(side=tk.LEFT, padx=5)

okno.mainloop()`,
        category: 'tkcanvas',
        tags: ['after_cancel', 'stop', 'animácia', 'štart'],
    },

    // ── STRINGS ────────────────────────────────────────────
    {
        id: 'string-basics',
        name: 'Reťazce',
        syntax: '"text"  \'text\'  f"..."',
        brief: 'Textové hodnoty, indexovanie, krájanie.',
        description: 'Reťazec je postupnosť znakov. Indexovanie začína od 0. Záporné indexy počítajú od konca. Krájanie (slicing): text[začiatok:koniec:krok].',
        example: `s = "Python"
print(s[0])        # P
print(s[-1])       # n
print(s[1:4])      # yth
print(s[::-1])     # nohtyP  (obrátenie)
print(len(s))      # 6

# Metódy reťazcov
print(s.upper())        # PYTHON
print(s.lower())        # python
print(s.replace("P","J"))  # Jython
print("  medzery  ".strip())  # "medzery"
print(",".join(["a","b","c"]))  # a,b,c
print("a,b,c".split(","))       # ['a','b','c']`,
        category: 'strings',
    },
    {
        id: 'string-comprehension',
        name: 'String comprehension',
        syntax: '"".join(výraz for x in iterable)',
        brief: 'Kompaktné generovanie reťazca z iného iterovateľného objektu.',
        description: 'Na generovanie reťazcov sa používa join() kombinovaný s generátorovým výrazom (podobný list comprehension, ale bez hranatých zátvoriek). Môžeš tiež použiť list comprehension a potom join(). Hodí sa na filtrovanie znakov, zmenu veľkosti alebo transformáciu textu.',
        example: `# Preveď každý znak na veľké písmeno
text = "python"
velke = "".join(z.upper() for z in text)
print(velke)   # PYTHON

# Ponechaj len písmená (odfiltruj medzery a čísla)
veta = "H3ll0 W0rld!"
len_pismena = "".join(z for z in veta if z.isalpha())
print(len_pismena)  # HllWrld

# Pridaj pomlčku medzi každý znak
pomlcky = "-".join(z for z in "ahoj")
print(pomlcky)  # a-h-o-j

# Ekvivalent cez list comprehension + join
cifry = "".join([str(i) for i in range(10)])
print(cifry)   # 0123456789`,
        category: 'strings',
        tags: ['join', 'generator', 'filter', 'comprehension'],
    },

    // ── LISTS ────────────────────────────────────────────
    {
        id: 'list-basics',
        name: 'Zoznamy (list)',
        syntax: 'zoznam = [prvok1, prvok2, ...]',
        brief: 'Meniteľná usporiadaná kolekcia prvkov.',
        description: 'Zoznam môže obsahovať ľubovoľné typy. Indexovanie od 0. Záporné indexy: -1 je posledný. Zoznamy sú meniteľné (mutable) — môžeš pridávať, mazať, meniť prvky.',
        example: `farby = ["červená", "zelená", "modrá"]
print(farby[0])      # červená
print(farby[-1])     # modrá
print(farby[1:3])    # ['zelená', 'modrá']

farby.append("žltá")     # pridá na koniec
farby.insert(1, "biela") # vloží na index 1
farby.remove("zelená")   # odstráni prvý výskyt
posledna = farby.pop()   # odstráni a vráti posledný
print(len(farby))        # počet prvkov
farby.sort()             # zoradí vzostupne
print(sorted(farby))     # zoradená kópia, originál nezmenený`,
        category: 'lists',
    },
    {
        id: 'list-comprehension',
        name: 'List comprehension',
        syntax: '[výraz for x in iterable if podmienka]',
        brief: 'Kompaktný spôsob vytvorenia zoznamu.',
        description: 'List comprehension je pythonic spôsob generovania zoznamov. Môže obsahovať podmienku na filtrovanie. Čitateľnejší a rýchlejší ako for cyklus s append().',
        example: `# Základné
ctverce = [x**2 for x in range(6)]
# [0, 1, 4, 9, 16, 25]

# S podmienkou
parne = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# Transformácia
mena = ["anna", "bob", "clara"]
velke = [m.upper() for m in mena]
# ['ANNA', 'BOB', 'CLARA']`,
        category: 'lists',
    },

    // ── TUPLES ────────────────────────────────────────────
    {
        id: 'tuple-basics',
        name: 'Ntice (tuple)',
        syntax: 'ntica = (prvok1, prvok2, ...)',
        brief: 'Nemeniteľná usporiadaná kolekcia.',
        description: 'Tuple je ako list, ale nemeniteľný (immutable). Rýchlejší ako list. Vhodný na skupiny súvisiacich hodnôt (napr. súradnice). Jedna hodnota: (hodnota,) — musí mať čiarku.',
        example: `bod = (10, 20)
print(bod[0])   # 10
print(bod[1])   # 20

# Unpacking
x, y = bod
print(x, y)     # 10 20

# Nemôžeš meniť
# bod[0] = 99   # TypeError!

# Tuple s jedným prvkom
singleton = (42,)   # MUSÍ mať čiarku

# Funkcia vráti viac hodnôt ako tuple
def min_max(zoznam):
    return min(zoznam), max(zoznam)

mi, ma = min_max([3, 1, 4, 1, 5, 9])
print(mi, ma)   # 1 9`,
        category: 'tuples',
    },
    {
        id: 'tuple-comprehension',
        name: 'Tuple comprehension',
        syntax: 'tuple(výraz for x in iterable)',
        brief: 'Generuje tuple z iterovateľného objektu pomocou tuple().',
        description: 'Python nemá priamu syntax pre tuple comprehension — okrúhle zátvorky s výrazom vytvoria generátor, nie tuple. Preto obaľ generátorový výraz do tuple(). Alternatívne môžeš urobiť list comprehension a skonvertovať ho.',
        example: `# Základné — tuple štorcov
stvorce = tuple(x**2 for x in range(6))
print(stvorce)   # (0, 1, 4, 9, 16, 25)

# S podmienkou — len párne
parne = tuple(x for x in range(10) if x % 2 == 0)
print(parne)   # (0, 2, 4, 6, 8)

# POZOR: samotné okrúhle zátvory = generátor, NIE tuple!
gen = (x**2 for x in range(6))
print(type(gen))      # <class 'generator'>
print(type(stvorce))  # <class 'tuple'>

# Konverzia z listu
zo_listu = tuple([x * 3 for x in range(5)])
print(zo_listu)   # (0, 3, 6, 9, 12)`,
        category: 'tuples',
        tags: ['comprehension', 'generator', 'tuple', 'konverzia'],
    },

    // ── DICTS ────────────────────────────────────────────
    {
        id: 'dict-basics',
        name: 'Slovníky (dict)',
        syntax: 'slovnik = {kluč: hodnota, ...}',
        brief: 'Kolekcia párov kľúč–hodnota.',
        description: 'Kľúče musia byť nemeniteľné (str, int, tuple). Hodnoty môžu byť čokoľvek. Prístup cez kľúč. get() vráti None (alebo default) ak kľúč neexistuje — bezpečnejšie ako [].',
        example: `student = {
    "meno": "Julo",
    "vek": 17,
    "trieda": "4A"
}

print(student["meno"])          # Julo
print(student.get("skola", "?"))  # ? (kľúč neexistuje)

student["vek"] = 18             # zmena
student["mesto"] = "Košice"     # nový kľúč

# Iterácia
for kluc, hodnota in student.items():
    print(f"{kluc}: {hodnota}")

print(list(student.keys()))     # zoznam kľúčov
print(list(student.values()))   # zoznam hodnôt
print("meno" in student)        # True — kontrola kľúča

trieda = student.pop("trieda")  # odstráni klúč a vráti hodnotu
del student["meno"]           # zmazanie kľúča`,
        category: 'dicts',
    },
    {
        id: 'dict-comprehension',
        name: 'Dict comprehension',
        syntax: '{kľúč: hodnota for x in iterable if podmienka}',
        brief: 'Kompaktné vytvorenie slovníka z iterovateľného objektu.',
        description: 'Dict comprehension je pythonic spôsob na rýchle vytvorenie slovníka. Kľúče musia byť unikátne a nemeniteľné. Môže obsahovať podmienku na filtrovanie. Hodí sa na inverziu slovníka, transformáciu hodnôt alebo filtrovanie párov.',
        example: `# Čísla a ich štvorce
stvorce = {x: x**2 for x in range(6)}
print(stvorce)   # {0:0, 1:1, 2:4, 3:9, 4:16, 5:25}

# S podmienkou — len párne kľúče
parne = {x: x**2 for x in range(10) if x % 2 == 0}
print(parne)   # {0:0, 2:4, 4:16, 6:36, 8:64}

# Inverzia slovníka (prehodí kľúče a hodnoty)
original = {"a": 1, "b": 2, "c": 3}
invertovany = {v: k for k, v in original.items()}
print(invertovany)   # {1:'a', 2:'b', 3:'c'}

# Transformácia hodnôt — mená na veľké písmená
mena = {"jan": 17, "eva": 16, "bob": 18}
velke = {m.upper(): v for m, v in mena.items()}
print(velke)   # {'JAN':17, 'EVA':16, 'BOB':18}`,
        category: 'dicts',
        tags: ['comprehension', 'inverzia', 'transformácia', 'filtrovanie'],
    },

    // ── FUNCTIONS ─────────────────────────────────────────
    {
        id: 'def-function',
        name: 'Definícia funkcie',
        syntax: 'def nazov(param1, param2):\n  ...',
        brief: 'Definuje znovupoužiteľný blok kódu.',
        description: 'Funkcia sa definuje kľúčovým slovom def. Parametre sú voliteľné. return vracia hodnotu (bez neho vracia None). Funkcia musí byť definovaná pred prvým volaním.',
        example: `def pozdrav(meno):
    print(f"Ahoj, {meno}!")

pozdrav("Julo")   # Ahoj, Julo!

# S návratovou hodnotou
def sucet(a, b):
    return a + b

vysledok = sucet(3, 4)
print(vysledok)   # 7

# Defaultné hodnoty parametrov
def mocnina(zaklad, exponent=2):
    return zaklad ** exponent

print(mocnina(5))     # 25
print(mocnina(2, 10)) # 1024`,
        category: 'functions',
    },
    {
        id: 'docstring',
        name: 'Popis funkcie (docstring)',
        syntax: '"""Popis funkcie"""',
        brief: 'Dokumentačný reťazec popisuje čo funkcia robí.',
        description: 'Docstring sa píše hneď po riadku def ako prvý výraz funkcie, uzatvorený do trojitých úvodzoviek. Popisuje čo funkcia robí, parametre a návratovú hodnotu. Dostupný cez help() alebo __doc__.',
        example: `def vypocitaj_priemer(zoznam_cisel):
    """
    Vypočíta aritmetický priemer zo zoznamu čísel.

    Parametre:
        zoznam_cisel (list): Zoznam číselných hodnôt.

    Vracia:
        float: Aritmetický priemer.
    """
    sucet = sum(zoznam_cisel)
    pocet = len(zoznam_cisel)
    return sucet / pocet

print(vypocitaj_priemer([1, 2, 3, 4, 5]))  # 3.0
help(vypocitaj_priemer)  # zobrazí docstring`,
        category: 'functions',
    },
    {
        id: 'scope',
        name: 'Rozsah premenných',
        syntax: 'global premenna',
        brief: 'Lokálne premenné existujú len vo funkcii.',
        description: 'Premenná definovaná vo funkcii je lokálna — mimo funkcie neexistuje. Globálne premenné sú dostupné všade, ale na ich zmenu vo funkcii treba kľúčové slovo global.',
        example: `pocitadlo = 0   # globálna

def pridaj():
    global pocitadlo
    pocitadlo += 1

pridaj()
pridaj()
print(pocitadlo)   # 2

def bez_global():
    x = 99      # lokálna, zanikne po skončení funkcie

bez_global()
# print(x)   # NameError — x neexistuje tu`,
        category: 'functions',
    },

    // ── FILES ────────────────────────────────────────────
    {
        id: 'file-read',
        name: 'Čítanie súboru',
        syntax: 'with open("subor.txt", "r") as f:\n  ...',
        brief: 'Otvorí súbor na čítanie a automaticky ho zatvorí.',
        description: 'with open() automaticky zatvorí súbor. "r" = čítanie, "w" = zápis (prepíše), "a" = pripájanie, "x" = vytvorenie (chyba ak existuje). encoding="utf-8" pre diakritiku.',
        example: `# Celý súbor naraz
with open("data.txt", "r", encoding="utf-8") as f:
    obsah = f.read()
    print(obsah)

# Riadok po riadku
with open("data.txt", "r", encoding="utf-8") as f:
    for riadok in f:
        print(riadok.strip())  # strip() odstráni \\n

# Zoznam riadkov
with open("data.txt", "r", encoding="utf-8") as f:
    riadky = f.readlines()
    print(riadky[0])   # prvý riadok`,
        category: 'files',
    },
    {
        id: 'file-write',
        name: 'Zápis do súboru',
        syntax: 'with open("subor.txt", "w") as f:\n  f.write(...)',
        brief: 'Zapíše text do súboru ("w" prepíše, "a" pridá).',
        description: '"w" vytvorí alebo prepíše súbor. "a" pridá na koniec existujúceho súboru. write() nepridáva nový riadok automaticky — musíš pridať \\n. writelines() zapíše zoznam reťazcov.',
        example: `# Zápis (prepíše ak existuje)
with open("vystup.txt", "w", encoding="utf-8") as f:
    f.write("Prvý riadok\\n")
    f.write("Druhý riadok\\n")

# Pripájanie
with open("vystup.txt", "a", encoding="utf-8") as f:
    f.write("Tretí riadok\\n")

# Zápis zoznamu
riadky = ["jedna\\n", "dva\\n", "tri\\n"]
with open("vystup.txt", "w", encoding="utf-8") as f:
    f.writelines(riadky)`,
        category: 'files',
    },

    // ── RANDOM ────────────────────────────────────────────
    {
        id: 'random-randint',
        name: 'random.randint',
        syntax: 'random.randint(a, b)',
        brief: 'Náhodné celé číslo od a po b vrátane.',
        description: 'Vracia náhodné celé číslo N také, že a ≤ N ≤ b. Obe hranice sú zahrnuté (inkluzívne). Treba importovať modul random.',
        example: `import random

hod_kockou = random.randint(1, 6)
print(hod_kockou)   # napr. 4

# Náhodné číslo od 0 po 100
x = random.randint(0, 100)

# V cykle — 5 hodov kockou
for _ in range(5):
    print(random.randint(1, 6))`,
        category: 'random',
    },
    {
        id: 'random-randrange',
        name: 'random.randrange',
        syntax: 'random.randrange(start, stop, step)',
        brief: 'Náhodný prvok z range(start, stop, step).',
        description: 'Funguje ako range() ale vracia náhodný prvok. stop nie je zahrnuté (exkluzívne), na rozdiel od randint. step je voliteľný.',
        example: `import random

# Náhodné párne číslo 0..8
parne = random.randrange(0, 10, 2)
print(parne)   # 0, 2, 4, 6 alebo 8

# Ekvivalent randint(0, 9)
x = random.randrange(0, 10)   # 0..9

# Náhodný násobok 5 od 0 po 50
nasobok = random.randrange(0, 51, 5)`,
        category: 'random',
    },
    {
        id: 'random-choice',
        name: 'random.choice',
        syntax: 'random.choice(zoznam)',
        brief: 'Náhodný prvok zo zoznamu alebo reťazca.',
        description: 'Vyberie jeden náhodný prvok z neprázdnej sekvencie (list, tuple, str). Ak je sekvencia prázdna, vyvolá IndexError.',
        example: `import random

farby = ["červená", "modrá", "zelená", "žltá"]
vyber = random.choice(farby)
print(vyber)   # napr. "modrá"

# Z reťazca
pismeno = random.choice("ABCDEFG")
print(pismeno)  # napr. "D"

# Náhodná karta
karty = ["A", "2", "3", "J", "Q", "K"]
karta = random.choice(karty)`,
        category: 'random',
    },

    // ── MATH MODULE ──────────────────────────────────────
    {
        id: 'math-sqrt',
        name: 'math.sqrt',
        syntax: 'math.sqrt(x)',
        brief: 'Vracia druhú odmocninu z x.',
        description: 'Vracia float. x musí byť ≥ 0, inak ValueError. Alternatíva: x ** 0.5 (ale math.sqrt je presnejší a rýchlejší).',
        example: `import math

print(math.sqrt(25))    # 5.0
print(math.sqrt(2))     # 1.4142135623730951
print(math.sqrt(0))     # 0.0

# Dĺžka prepony (Pytagorova veta)
a, b = 3, 4
c = math.sqrt(a**2 + b**2)
print(c)   # 5.0`,
        category: 'mathmod',
    },
    {
        id: 'math-pow',
        name: 'math.pow',
        syntax: 'math.pow(x, y)',
        brief: 'Vracia x na y-tú (float verzia).',
        description: 'Vždy vracia float, na rozdiel od operátora ** ktorý vracia int ak oba operandy sú int. Pre celé čísla zvyčajne používame ** priamo.',
        example: `import math

print(math.pow(2, 10))   # 1024.0
print(math.pow(3, 3))    # 27.0
print(math.pow(9, 0.5))  # 3.0  (odmocnina)

# Porovnanie
print(2 ** 10)           # 1024  (int)
print(math.pow(2, 10))   # 1024.0  (float)`,
        category: 'mathmod',
    },
];