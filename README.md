# Portfolio — Jasvinder Singh

Flask portfolio site, ready for GitHub + Render.

## Project structure
```
.
├── app.py                 # Flask routes
├── requirements.txt
├── Procfile                # tells Render how to start the app
├── data/
│   └── projects.json       # data consumed by / and /projects routes
├── templates/
│   ├── index.html          # ⚠️ only this template was provided
│   ├── about.html          # add this — referenced by app.py, not included yet
│   ├── projects.html       # add this — referenced by app.py, not included yet
│   ├── experience.html      # add this — referenced by app.py, not included yet
│   ├── contact.html        # add this — referenced by app.py, not included yet
│   └── blog.html           # add this — referenced by app.py, not included yet
└── static/
    ├── css/
    │   └── style.css       # all CSS, pulled out of index.html's <style> block
    ├── js/
    │   └── script.js       # all JS, pulled out of index.html's <script> block
    └── images/              # add your image files here (referenced via url_for)
```

## Run locally
```bash
pip install -r requirements.txt
python app.py
```
Visit http://127.0.0.1:5000

## Deploy on Render
1. Push this folder to a GitHub repo.
2. On Render: **New → Web Service** → connect the repo.
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn app:app`
5. Deploy.

## Notes
- `index.html` now links to the external files instead of inlining CSS/JS:
  `{{ url_for('static', filename='css/style.css') }}` and
  `{{ url_for('static', filename='js/script.js') }}`.
- Any images referenced in `index.html` (e.g. `images/sql.png`) must be placed in
  `static/images/` for `url_for('static', filename='images/...')` to resolve.
- `about.html`, `projects.html`, `experience.html`, `contact.html`, and `blog.html`
  were not uploaded, so `app.py`'s routes for them will 500 until you add those
  template files to `templates/`.
