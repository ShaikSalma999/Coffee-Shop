# Coffee app (React + Vite)

    npm install
    npm run dev

Flow: Onboarding > Home > Detail > (Buy Now) Cart/Order > Place order > live Delivery tracking.
The bottom nav works on Home: Home, Favorites, Cart (with item badge), Notifications.
Back arrows work; placing an order empties the cart and Back from tracking returns Home.

Styling: existing screens use plain CSS in src/styles. The order/tracking UI uses Tailwind
(prefix `tw-`, preflight disabled, see tailwind.config.js) so the two systems cannot clash.

    src/assets/images   photos cropped from your screens
    src/components      shared UI (icons, status bar, nav, cards)
    src/screens         the five screens
    src/styles          global / component / screen CSS
    src/data            product data
