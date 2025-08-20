#!/usr/bin/env python3
import os, urllib.request, time

BASE = os.path.dirname(os.path.dirname(__file__))
ASSETS = os.path.join(BASE, "assets", "catalog")
os.makedirs(ASSETS, exist_ok=True)

SKU_QUERIES = {
  "BR-101": "bricks+stack+construction",
  "BR-102": "bricks+stack+construction",
  "BL-201": "aerated+concrete+blocks+pallet",
  "CM-301": "cement+bags+warehouse",
  "SD-302": "sand+pile+construction+site",
  "RK-303": "gravel+pile+construction",
  "RC-401": "concrete+slab+hollow+core",
  "RC-402": "aerated+concrete+blocks+pallet",
  "RF-501": "corrugated+metal+roof+sheet",
  "RF-502": "metal+roof+tiles+roofing",
  "IN-503": "mineral+wool+insulation+package",
  "FN-601": "cement+mix+bags+construction",
  "FN-602": "cement+bags+warehouse",
  "FN-603": "cement+mix+bags+construction"
}

def fetch(sku, query):
    url = f"https://source.unsplash.com/1200x800/?{query}"
    dest = os.path.join(ASSETS, f"{sku}.jpg")
    try:
        print(f"Downloading for {sku} from {url}")
        urllib.request.urlretrieve(url, dest)
        time.sleep(0.4)
    except Exception as e:
        print("Failed:", e)

def main():
    for sku, q in SKU_QUERIES.items():
        fetch(sku, q)
    print("\nDone. Photos saved to assets/catalog/*.jpg")

if __name__ == "__main__":
    main()
