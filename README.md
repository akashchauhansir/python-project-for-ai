# Python Developer Toolkit

> A full-stack Python portfolio project featuring a REST API-backed Task Manager web app, a CLI web scraper, a CSV data analysis tool, and a cryptographically secure password generator — demonstrating end-to-end software development skills across web, data, and security domains.

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-black?logo=flask)](https://flask.palletsprojects.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()
[![Code Style](https://img.shields.io/badge/Code%20Style-PEP8-blue)](https://peps.python.org/pep-0008/)

---

## Overview

This project is a collection of four independent, production-mindful Python tools built to demonstrate practical software engineering skills:

- **Task Manager Web App** — a Flask-based web application with a RESTful API and a dynamic frontend
- **Web Scraper** — a CLI tool for fetching and extracting structured data from any public webpage
- **CSV Analyser** — a data analysis utility that produces clean statistical reports from CSV files
- **Password Generator** — a cryptographically secure password generator with a built-in strength checker

Each tool is self-contained, CLI-accessible (where applicable), follows Python best practices, and is designed to reflect real-world development patterns rather than tutorial-level code.

---

## Key Features

**Task Manager**
- RESTful API with `GET`, `POST`, and `PATCH` endpoints for task management
- Server-side rendering via Jinja2 templates with a responsive, clean UI
- Asynchronous frontend using the Fetch API — no page reloads required
- Keyboard shortcut support (Enter to submit) for improved UX

**Web Scraper**
- Extracts page title, headings (`h1`–`h3`), and hyperlinks from any URL
- Accepts CLI arguments for target URL and optional JSON output
- Sets a custom `User-Agent` header; handles HTTP errors and timeouts gracefully
- Outputs timestamped, structured JSON for downstream processing

**CSV Analyser**
- Generates an overview report: shape, dtypes, missing values, numeric statistics, and top value counts
- Supports custom delimiters (CSV, TSV, pipe-separated)
- Saves formatted plaintext reports to disk via `--output`
- Uses `pandas` and `tabulate` for clean, readable tabular output

**Password Generator**
- Uses Python's `secrets` module (CSPRNG) — not `random` — for cryptographic security
- Fully configurable: length, character sets, bulk generation count
- Built-in strength checker with scored feedback (0–5) and actionable tips
- Cross-platform clipboard copy (macOS/Windows) with graceful fallback

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.10+, Flask 3.0 |
| Frontend | HTML5, CSS3, Vanilla JavaScript (Fetch API) |
| Templating | Jinja2 |
| Data Analysis | pandas, tabulate |
| Web Scraping | requests, BeautifulSoup4 |
| Security | Python `secrets` (CSPRNG), `re` |
| CLI | `argparse` (stdlib) |

---

## System Architecture

```
python-developer-toolkit/
│
├── task_manager/                   # Flask web application
│   ├── app.py                      # Flask routes & REST API
│   ├── requirements.txt            # Python dependencies
│   ├── templates/
│   │   └── index.html              # Jinja2 HTML template
│   └── static/
│       ├── css/style.css           # Responsive stylesheet
│       └── js/main.js              # Async JS (Fetch API)
│
└── tools/                          # Standalone CLI utilities
    ├── web_scraper.py              # Web scraping tool
    ├── csv_analyser.py             # CSV statistical report tool
    └── password_generator.py       # Secure password generator
```

**Request Flow — Task Manager**

```
Browser  →  Flask Route  →  In-memory Task Store  →  JSON Response
   ↑                                                        |
   └────────────────  Fetch API (async) ───────────────────┘
```

---

## Installation & Setup

### Prerequisites

- Python 3.10 or higher
- `pip` package manager

### 1. Clone the repository

```bash
git clone https://github.com/your-username/python-developer-toolkit.git
cd python-developer-toolkit
```

### 2. Create and activate a virtual environment (recommended)

```bash
python -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 3. Install dependencies

```bash
# For the Task Manager web app
pip install -r task_manager/requirements.txt

# For the CLI tools
pip install requests beautifulsoup4 pandas tabulate
```

---

## Usage

### Task Manager Web App

```bash
cd task_manager
python app.py
```

Open your browser and visit: [http://localhost:5000](http://localhost:5000)

**API Endpoints**

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Retrieve all tasks |
| `POST` | `/api/tasks` | Create a new task (JSON body: `{"title": "..."}`) |
| `PATCH` | `/api/tasks/<id>` | Toggle a task's done status |

```bash
# Example: Add a task via curl
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write unit tests"}'
```

---

### Web Scraper

```bash
# Scrape the default URL (example.com)
python tools/web_scraper.py

# Scrape a custom URL and save results to JSON
python tools/web_scraper.py --url https://news.ycombinator.com --output results.json
```

**Sample Output**

```
📄 Title   : Hacker News
🕒 Scraped : 2026-05-13T10:22:01Z

📌 Headings:
  [h1] Hacker News

🔗 Links (first 20):
  • Hacker News                              → https://news.ycombinator.com
  • ...
```

---

### CSV Analyser

```bash
# Analyse a CSV file and print report to terminal
python tools/csv_analyser.py data.csv

# Save the report to a text file
python tools/csv_analyser.py data.csv --output report.txt

# Use a custom delimiter (e.g., TSV)
python tools/csv_analyser.py data.tsv --sep $'\t'
```

**Sample Output**

```
────────────────────────────────────────────────────────────
  📊 OVERVIEW
────────────────────────────────────────────────────────────
  Rows    : 1,000
  Columns : 8
```

---

### Password Generator

```bash
# Generate a single 16-character password (default)
python tools/password_generator.py

# Generate 5 passwords of length 24
python tools/password_generator.py --length 24 --count 5

# Generate without symbols
python tools/password_generator.py --no-symbols

# Check the strength of an existing password
python tools/password_generator.py --check "MyP@ssw0rd123"
```

**Sample Output**

```
🔑 Generating 3 password(s) — length 16

   1. gT#9vLqX!mR2oYsK   ✅ Very Strong
   2. Bn@4xWpJ&cQ7eZdF   ✅ Very Strong
   3. Kj$8nMvT!rY3iPwH   ✅ Very Strong
```

---

## Challenges & Solutions

**Challenge: Cryptographic security vs. convenience in password generation**
The Python `random` module is not suitable for security-sensitive operations. Replaced it with `secrets.choice()` (backed by the OS CSPRNG) while still using `random.shuffle()` only for ordering required characters — a deliberate, documented trade-off that maintains unpredictability where it matters.

**Challenge: Ensuring all character types appear in generated passwords**
A naive random selection could produce passwords missing digits or symbols by chance, weakening them. Solved by pre-selecting one character from each required set, appending the rest from the full pool, then shuffling — guaranteeing policy compliance without reducing entropy.

**Challenge: Frontend task state staying in sync without a page reload**
Toggling task status required updating both the server and the DOM without a full refresh. Solved with the Fetch API using async `PATCH` requests; the UI updates only on a successful server response, keeping the client and server in sync.

**Challenge: Making the CSV report readable for any dataset shape**
Different datasets have wildly different column types and sizes. Used `pandas` type detection to conditionally render numeric statistics, categorical value counts, and missing data reports — skipping sections that don't apply rather than printing empty tables.

---

## Skills Demonstrated

- **REST API design** — versioned endpoints, correct HTTP methods and status codes (`201 Created`, `404 Not Found`)
- **Full-stack development** — Flask backend + HTML/CSS/JS frontend with async communication
- **Python best practices** — type hints, docstrings, `dataclass` usage, `argparse` CLI design
- **Data engineering fundamentals** — `pandas` for data loading, aggregation, missing value analysis
- **Web scraping** — `requests` + `BeautifulSoup4`, custom headers, error handling, structured JSON output
- **Security awareness** — choosing `secrets` over `random`, understanding CSPRNG vs PRNG
- **CLI design** — consistent `argparse` interfaces with sensible defaults and help text
- **Separation of concerns** — modular file structure separating routes, templates, static assets, and tools
- **Cross-platform compatibility** — OS detection for clipboard functionality with graceful fallback

---

## Screenshots / Demo

> **Add screenshots here before publishing to GitHub.**

| Task Manager UI | Password Strength Check |
|---|---|
| `[screenshot: task_manager_ui.png]` | `[screenshot: password_check_output.png]` |

| CSV Report Output | Web Scraper JSON |
|---|---|
| `[screenshot: csv_report.png]` | `[screenshot: scraper_json.png]` |

---

## Future Improvements

- [ ] **Persistent storage** — replace the in-memory task list with a SQLite or PostgreSQL database using SQLAlchemy
- [ ] **User authentication** — add session-based or JWT authentication to the Task Manager API
- [ ] **Task Manager API v2** — add `DELETE` endpoint, due dates, priority levels, and filtering
- [ ] **Unit and integration tests** — add `pytest` coverage for Flask routes and all CLI tools
- [ ] **Web scraper enhancements** — support JavaScript-rendered pages via Playwright or Selenium
- [ ] **Docker support** — containerise the Task Manager with a `Dockerfile` and `docker-compose.yml`
- [ ] **CSV Analyser export** — add HTML/PDF report export using `Jinja2` or `reportlab`
- [ ] **CI/CD pipeline** — add a GitHub Actions workflow for linting (`flake8`) and testing on push

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add: your feature description'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [PEP 8](https://peps.python.org/pep-0008/) style guidelines and include docstrings for new functions.

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project with attribution.

---

*Built with Python · Designed for learning and portfolio use*
