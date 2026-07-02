from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)


# ── helper ────────────────────────────────────────────────────────────────────
def load_projects():
    """Load projects from data/projects.json, return empty list if file missing."""
    path = os.path.join(os.path.dirname(__file__), 'data', 'projects.json')
    if not os.path.exists(path):
        return {"projects": []}          # graceful fallback
    with open(path, 'r') as f:
        return json.load(f)


# ── routes ────────────────────────────────────────────────────────────────────

# FIX 1: added the missing @app.route('/') home route
@app.route('/')
@app.route('/home')
def index():
    projects_data = load_projects()          # FIX 2: moved OUT of load_projects()
    return render_template('index.html', projects=projects_data['projects'])


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/projects')
def projects():
    projects_data = load_projects()
    return render_template('projects.html', projects=projects_data['projects'])


@app.route('/experience')
def experience():
    return render_template('experience.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name    = request.form.get('name', '').strip()
        email   = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()

        # Basic validation
        if not name or not email or not message:
            return jsonify({'success': False, 'error': 'All fields are required.'}), 400

        # TODO: send email / store message here
        print(f"[Contact] From: {name} <{email}> — {message}")
        return jsonify({'success': True, 'message': 'Thanks! I will get back to you soon.'})

    return render_template('contact.html')


@app.route('/blog')
def blog():
    posts = [
        {
            "title":   "The Rise of Large Language Models",
            "date":    "October 1, 2023",
            "author":  "AI Enthusiast",
            "summary": "A brief overview of LLMs and their impact on data science and beyond.",
            "tags":    ["LLM", "AI", "NLP"],
            "image":   "/static/images/blog1.jpg",
            "url":     "#",
        },
        {
            "title":   "Data Visualization Best Practices",
            "date":    "September 15, 2023",
            "author":  "Data Viz Guru",
            "summary": "Tips and tricks for creating effective and insightful data visualizations.",
            "tags":    ["Data Visualization", "Tableau", "Plotly"],
            "image":   "/static/images/blog2.jpg",
            "url":     "#",
        },
    ]
    return render_template('blog.html', posts=posts)


# ── entry point ───────────────────────────────────────────────────────────────
if __name__ == '__main__':
    try:
        app.run(debug=True, use_reloader=False)
    except (ImportError, TypeError, OSError) as e:
        print(f"Warning: {type(e).__name__} — running in safe mode.")
        app.run(debug=False, use_reloader=False)