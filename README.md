# Shopping Cart App

Welcome! This is a modern, production-ready shopping cart built with React, TypeScript, and CSS Modules. Whether you're here to learn, review, or deploy, this project is designed to be easy to run, extend, and maintain.

---

## Why This Project?

I built this app to demonstrate how a real-world e-commerce cart should be structured: clean code, scalable state management, responsive design, and a premium UI—all with a focus on developer experience. If you want to see best practices in action, you're in the right place!

---

## Features at a Glance

- **Live product data** from [FakeStore API](https://fakestoreapi.com/products)
- Add/remove items, update quantities, and see your cart update instantly
- Looks great on any device—desktop, tablet, or mobile
- All styles in CSS Modules for maintainability (no inline styles or global CSS)
- All user-facing text in one place for easy updates or localization
- State managed with React Context (no Redux needed!)
- Fully tested with Jest and React Testing Library

---

## Project Structure (What’s Where?)

```
shopping-cart-app/
├── public/           # Static files and the HTML template
├── src/
│   ├── components/   # Buttons, cards, header, etc.
│   ├── context/      # CartContext for global cart state
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Main app pages (like ProductList)
│   ├── types/        # TypeScript types
│   ├── utils/        # Helper functions
│   ├── tests/        # All tests live here
│   └── App.tsx       # App entry point
├── package.json      # Project metadata and scripts
├── tsconfig.json     # TypeScript config
└── README.md         # You’re reading it!
```

---

## Prerequisites

- Node.js (v16+ recommended)
- npm (v8+)

---

## Getting Started

1. **Clone this repo:**
   ```sh
   git clone <your-repo-url>
   cd shopping-cart-app
   ```
2. **Install dependencies:**
   ```sh
   npm install --legacy-peer-deps
   ```
   _(Tip: The `--legacy-peer-deps` flag helps avoid dependency conflicts in some environments.)_

---

## Running Locally

Start the app in development mode:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You’ll see the product list and can start adding items to your cart right away.

---

## Testing

To run all tests:

```sh
npm test
```

For a coverage report (see what’s tested and what’s not):

```sh
npm test -- --coverage
```

_Tests cover product fetching, cart logic, and UI rendering._

---

## Production Build

To create an optimized build for deployment:

```sh
npm run build
```

This will generate a `build/` folder with everything you need to deploy.

---

## Deploying to Netlify

Deploying is a breeze! Here’s how:

1. **Push your code to GitHub/GitLab/Bitbucket.**
2. **Connect your repo to Netlify.**
3. **Set these build settings:**
   - Build command: `npm run build`
   - Publish directory: `build`
4. **(Optional, but recommended for client-side routing):**
   - Add a file called `_redirects` in the `public/` folder with this line:
     ```
     /*    /index.html   200
     ```
   - This ensures your app’s routes work on refresh.
5. **Deploy!** Netlify will handle the rest. Once live, visit your site and try out the cart.

---

## Contributing & Feedback

Found a bug? Have an idea? Open an issue or PR! I’m always happy to connect with other devs.

---

## License

MIT—free to use, modify, and share.

---

Thanks for checking out this project! If you have questions or want to chat about React, TypeScript, or web dev in general, feel free to reach out.
