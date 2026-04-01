# CV_project

A multilingual static CV website for **Sam Jessen**.

## What this project includes

- English, Danish, and Swedish website versions
- A shared **Download CV** button on every page
- Public certificate section
- Private recommendation-letter workflow by email request
- Dark mode toggle
- Docker support
- GitHub Pages support

## Repository info

- GitHub username: `23samjessen`
- Repository: `samjessen.github.io`
- Repository URL: `https://github.com/23samjessen/samjessen.github.io`
- Live site: `https://23samjessen.github.io/samjessen.github.io/`
- English page: `https://23samjessen.github.io/samjessen.github.io/`
- Danish page: `https://23samjessen.github.io/samjessen.github.io/da/`
- Swedish page: `https://23samjessen.github.io/samjessen.github.io/sv/`

> Note: the site uses the longer project URL because the repo is named `samjessen.github.io` while the GitHub username is `23samjessen`.

## Project structure

```text
CV_project/
├── index.html
├── motivation-letter.html
├── da/
│   ├── index.html
│   └── motivation-letter.html
├── sv/
│   ├── index.html
│   └── motivation-letter.html
├── assets/
│   ├── favicon.svg
│   ├── sam-jessen-cv.pdf
│   ├── sam-jessen-cv-en.pdf
│   ├── sam-jessen-cv-da.pdf
│   ├── sam-jessen-cv-sv.pdf
│   └── documents/
│       └── certificates/
├── src/
│   ├── css/
│   │   └── main.css
│   └── js/
│       ├── app.js
│       ├── models.js
│       ├── data/
│       │   └── site-data.js
│       └── renderers/
│           ├── cv-renderer.js
│           └── motivation-renderer.js
├── private/
│   └── recommendation/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── .gitignore
```

## Run locally

### Python

```bash
python3 -m http.server 8000
```

If `python3` does not work:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
http://localhost:8000/da/
http://localhost:8000/sv/
```

### Docker

```bash
docker compose up --build
```

Open:

```text
http://localhost:8080
http://localhost:8080/da/
http://localhost:8080/sv/
```

Stop Docker:

```bash
docker compose down
```

## Where to edit text and content

### Main website text

Edit:

```text
src/js/data/site-data.js
```

This controls:
- hero text
- contact details
- experience
- education
- skills
- languages
- documents section
- motivation-letter text

### Page shell and navigation

Edit:

```text
index.html
motivation-letter.html
da/index.html
da/motivation-letter.html
sv/index.html
sv/motivation-letter.html
```

### Styling and layout

Edit:

```text
src/css/main.css
```

### CV renderer logic

Edit:

```text
src/js/renderers/cv-renderer.js
```

### Motivation-letter renderer logic

Edit:

```text
src/js/renderers/motivation-renderer.js
```

## Downloadable CV file

All **Download CV** buttons use the same file:

```text
assets/sam-jessen-cv.pdf
```

If you want to replace the shared downloadable CV, keep the same filename and replace only that file.

## Certificates

Public certificate PDFs are here:

```text
assets/documents/certificates/
```

If you add or replace certificates, update the paths in:

```text
src/js/data/site-data.js
```

## Recommendation-letter workflow

The full recommendation letter is intentionally **not public**.

Public side:
- visitors see a short summary
- visitors can request access by email

Private side:
- you review the request manually
- you share the restricted Google Drive file manually after approval

Private local files:

```text
private/recommendation/google-drive-link.private.txt
private/recommendation/granted-access.private.csv
private/recommendation/README.md
```

## GitHub setup

### Fresh clean upload

Run inside the project folder:

```bash
rm -rf .git
git init
git branch -M main
git remote add origin https://github.com/23samjessen/samjessen.github.io.git
grep -RIn '<<<<<<<\|=======\|>>>>>>>' .
git add -A
git commit -m "Upload final clean CV project"
git push -u origin main --force
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push
```

### Normal update workflow later

```bash
git status
git add .
git commit -m "Describe your update"
git push
```

### Pull latest version

```bash
git pull origin main
```

### Check remote

```bash
git remote -v
```

### Force push if you need to replace the live version

```bash
git push -u origin main --force
```

## SSH setup

```bash
ls -al ~/.ssh
ssh-keygen -t ed25519 -C "23samjessen@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com
git remote set-url origin git@github.com:23samjessen/samjessen.github.io.git
git remote -v
```

## Useful reminders

- The language switcher changes the website language only.
- The **Download CV** button always downloads the same shared PDF file.
- The live site stays online even when VS Code is closed.
- Wait 1–3 minutes after each push, then refresh the page.
- Use a private/incognito window if the browser keeps showing an old cached version.
