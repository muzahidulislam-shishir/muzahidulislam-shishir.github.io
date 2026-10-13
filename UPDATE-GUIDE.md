# Portfolio Update Guide (Banglish)

Ei file ta tomar maintenance guide. Prottek bar portfolio update korar age ekbar pore nio.

---

## 1. Folder structure

```
/
├── index.html                   ← main portfolio (shob section ekhane)
├── assets/
│   ├── css/style.css            ← portfolio er design
│   ├── js/script.js             ← navbar, cursor, clock preview
│   ├── images/
│   │   ├── profile.webp         ← hero photo (150KB)
│   │   ├── og-image.jpg         ← WhatsApp/LinkedIn/Facebook preview (1200x630)
│   │   └── projects/            ← project thumbnails (1200x750 JPG)
│   └── Muzahidul_Islam_CV.pdf   ← CV
├── nova-market/ ... digital-clock/   ← prottek project alada folder
├── _templates/                  ← notun project er jonno template (GitHub Pages e publish hoy na)
├── robots.txt, sitemap.xml      ← Google SEO
└── README.md, UPDATE-GUIDE.md
```

**Golden rule:** Project folder er naam kokhono change koro na. Naam bodlale live link ar GitHub link vengge jabe.

---

## 2. Deploy korar niyom (khub important)

1. Zip extract koro.
2. GitHub repo (`muzahidulislam-shishir.github.io`) te sob file upload/commit koro.
3. **Repo theke `alfa-omega-security/` folder DELETE koro na.** Oi folder ta ei zip e nai (ami tomar source paini), kintu portfolio card ta oke link kore. Tomar current repo te jeta ache seta rekhe dao.
4. Purano `project-1`, `project-2` ... folder thakle ar lagbe na, kintu live site e kono jaygay link na thakle delete kore dite paro.
5. Purano `assets/profile.png`, `assets/Transparent.png`, `assets/profile.jpg` repo theke delete koro (bhari file, ar kono kaje lage na).
6. 1-2 minute por live site e Ctrl+Shift+R diye test koro.

---

## 3. Kon jinis kothay change korbe

| Ki change korbe | Kothay | Section id / class |
|---|---|---|
| Naam, role, intro line | `index.html` | `#home` (hero) |
| About text, stats card | `index.html` | `#about`, `.stats-grid` |
| Skills | `index.html` | `#skills` |
| Job experience | `index.html` | `#experience` |
| Education | `index.html` | `#education` |
| Projects | `index.html` | `#projects` |
| Phone, email, location | `index.html` | `#contact` |
| Colors, fonts, spacing | `assets/css/style.css` | `:root { ... }` variables |
| CV | `assets/Muzahidul_Islam_CV.pdf` | same naam e replace koro |
| Social preview | `assets/images/og-image.jpg` | 1200x630 rakho |

Tip: VS Code e `Ctrl+F` diye section id (jemon `id="projects"`) khuje nao.

---

## 4. Notun project add korar 5 step

1. `_templates/project-starter/` copy kore root e rakho, naam dao lowercase-with-dashes (jemon `weather-app`).
2. Project baniye feller, thumbnail baniye `assets/images/projects/` e rakho (1200x750, JPG, 100KB er niche).
3. `_templates/project-card.html` er block copy kore `index.html` er `<div class="row g-4">` er sheshe paste koro. `FOLDER`, `THUMB`, title, description bodlao.
4. Stats card e "Featured Projects" number (`<h3>06</h3>`) +1 koro.
5. `sitemap.xml` e notun URL add koro.

Best order: shobcheye strong project sobar upore rakho (recruiter shurur 2 ta dekhe).

---

## 5. Image niyom

- Photo: **WebP** use koro, 200KB er niche.
- Project thumbnail: 1200x750 JPG, 100KB er niche.
- Kono PNG 300KB er beshi hole compress koro (squoosh.app free).
- Prottek `<img>` e `alt`, `width`, `height` dao. Hero chhara baki image e `loading="lazy"`.

---

## 6. Publish korar age checklist

- [ ] Phone/email/CV update ache
- [ ] Prottek Live Demo link click kore dekhechi
- [ ] Prottek GitHub link click kore dekhechi
- [ ] Mobile e (Chrome → F12 → phone icon) dekhechi
- [ ] Spelling check
- [ ] Concept project e company er real info/phone number nai (ba permission ache)
- [ ] LinkedIn/WhatsApp e link share kore preview check korechi

---

## 7. Roadmap (priority onujayi)

**Ekhon (1-2 din)**
1. Ei zip deploy koro, link check koro.
2. `alfa-omega-security` folder repo te ache confirm koro.
3. LinkedIn headline: "Frontend Developer | HTML, CSS, JavaScript, Bootstrap" ar portfolio link dao.

**Ei mashe**
4. **Nova Market upgrade:** cart drawer, quantity +/-, remove item, `localStorage` e cart save.
5. Prottek project er README te screenshot + features list + "what I learned".
6. Skills section e percentage bar er jaygay "ki ki baniyechi" dekhao (percentage subjective).

**Porer 2-3 mash**
7. **API project:** weather app ba movie search (`fetch`, loading state, error handling). Portfolio e ekhon eta nai, eta shobcheye boro gap.
8. Git shekho properly: branch, commit message, pull request.
9. React shuru koro, ekta small project React e banao.
10. Google Lighthouse (Chrome F12 → Lighthouse) run koro, 90+ target koro.

---

## 8. Ami ki ki change korechi (changelog)

- Zip er notun version (Probashi, Nova Market) + live site er project (Alfa Omega Security) merge korechi, 6 ta project.
- Project order: strongest age (Nova Market, Liberation War Archive).
- Prottek project card ekei format e, notun card add kora shohoj.
- `4+ Years Professional Experience` → `4+ Years in Professional Roles` (frontend experience bole bhul na bujhe).
- Featured Projects count 04/05 → 06.
- Broken GitHub link fix: Liberation War Archive card `project-1` folder e jeto, ekhon `liberation-war-archive`.
- Nova Market e Live Demo button add (age shudhu GitHub chilo).
- Concept project gulo e `CONCEPT` tag, note ta update.
- Hero image: 1.8MB PNG → 150KB WebP. Duita bhari PNG (1.8MB + 2MB) remove.
- Notun `og-image.jpg` (1200x630), `twitter:card` large image, canonical link.
- Liberation War Archive image: 2.4MB → 1.5MB (WebP).
- Duplicate nova-market/assets folder remove.
- `Git & GitHub` skill chip add.
- `robots.txt`, `sitemap.xml`, `_templates/`, README, ei guide add.

---

## 9. Tomar confirm korte hobe

1. **"4+ years"**: tumi nijei dekho label ta tomar jonno thik kina.
2. **Probashi project:** code e real phone number ar email ache. Eta jodi real client er, permission nao. Jodi concept hoy, placeholder diye replace koro.
3. **Alfa Omega Security:** thumbnail ar card ache, kintu source folder zip e chilo na.
