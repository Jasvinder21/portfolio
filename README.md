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
Visit https://portfolio-5lda.onrender.com/


