#!/usr/bin/env python3
"""Fix _routes.json to avoid overlapping rules and copy static assets."""
import json, shutil, os

# Fix _routes.json
routes_path = "dist/_routes.json"
with open(routes_path) as f:
    data = json.load(f)

excludes = set(data.get("exclude", []))

# Remove all cast entries (we'll add specific ones)
excludes = {e for e in excludes if not e.startswith("/cast")}

# Ensure critical static paths are excluded
for p in ["/_astro/*", "/_astro/", "/og-image.png", "/robots.txt", "/sitemap.xml"]:
    excludes.add(p)

# Remove overlapping rules
star_rules = {e for e in excludes if e.endswith("/*")}
final = set()
for e in excludes:
    prefix = e.rstrip("*")
    has_star = any(s.startswith(prefix) and s.endswith("/*") and s != e for s in excludes)
    if not has_star or e.endswith("/*"):
        final.add(e)

data["exclude"] = sorted(final)
with open(routes_path, "w") as f:
    json.dump(data, f, indent=2)

print(f"Routes exclude: {data['exclude']}")

# Copy cast images to dist
cast_src = "public/cast"
cast_dst = "dist/cast"
os.makedirs(cast_dst, exist_ok=True)
for fname in os.listdir(cast_src):
    if fname.endswith((".jpg", ".html", ".svg")):
        shutil.copy2(os.path.join(cast_src, fname), os.path.join(cast_dst, fname))
        print(f"Copied: cast/{fname}")
