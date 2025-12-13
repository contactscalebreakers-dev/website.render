# How to Add Product Listings and Portfolio Images

1. Place all your product and portfolio images (WebP format) in the `client/public` folder.
   - Example: `client/public/designer-toy.webp`

2. Edit the JSON files in `client/public/data/`:
   - `products.json` for product listings
   - `portfolio.json` for portfolio items

3. Each entry should include at least:
   - `id`: Unique string or number
   - `name` or `title`: Display name
   - `description`: Short description
   - `price` (for products): Number (no $ sign)
   - `image`: Filename of the image (e.g. `designer-toy.webp`)
   - `category` (for products): e.g. "toys", "art"
   - `year` (for portfolio): e.g. 2025

4. Example `products.json` entry:
```
[
  {
    "id": "1",
    "name": "Hand-Painted Designer Toy",
    "description": "Unique, hand-painted collectible toy. Each piece is one-of-a-kind.",
    "price": 120,
    "image": "designer-toy.webp",
    "category": "toys"
  }
]
```

5. Example `portfolio.json` entry:
```
[
  {
    "id": "1",
    "title": "Urban Mural Project",
    "description": "Large-scale mural created for a Brisbane community center.",
    "image": "urban-mural.webp",
    "year": 2025
  }
]
```

6. To display new items, just update the JSON and upload the image—no code changes needed!

7. In your React components, map over the JSON to render listings and images.

---

For questions or help, contact the developer or see the README in this folder.