from flask import Flask, render_template, url_for, make_response, request
from datetime import datetime, timedelta
import logging
from functools import wraps

app = Flask(__name__)

app.logger.setLevel(logging.DEBUG)
handler = logging.FileHandler('app.log', encoding='utf-8')
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

app.logger.addHandler(handler)

def log_access(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        app.logger.info(f"IP : {request.remote_addr}, Path : {request.path}")
        return f(*args, **kwargs)
    return decorated_function


@app.route('/')
@log_access
def home_page():
    return render_template('index.html')

@app.route('/credits')
@log_access
def credits_page():
    return render_template('credits.html')

@app.route('/links')
@log_access
def links_page():
    return render_template('links.html')

    
@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    pages = []
    ten_days_ago = (datetime.now() - timedelta(days=5)).date().isoformat()

    static_urls = [
        ('home_page', 'daily', '1.0'),
        ('credits_page', 'monthly', '0.5'),
        ('links_page', 'monthly', '0.5'),
        ('robots_txt', 'yearly', '0.1'),
        ('sitemap', 'weekly', '0.8'),
    ]

    for url in static_urls:
        pages.append({
            'loc': url_for(url[0], _external=True),
            'lastmod': ten_days_ago,
            'changefreq': url[1],
            'priority': url[2]
        })

    sitemap_xml = render_template('sitemap_template.xml', pages=pages)
    response = make_response(sitemap_xml)
    response.headers["Content-Type"] = "application/xml"

    return response


@app.route('/robots.txt')
def robots_txt():
    response = make_response(
        "User-agent: *\nSitemap: " + url_for('sitemap', _external=True)
    )
    response.headers["Content-Type"] = "text/plain"
    return response


if __name__ == '__main__':
    app.run(debug=True)
