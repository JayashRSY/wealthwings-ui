# WealthWings UI - Mobile Responsive Financial Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS. Features a comprehensive mobile-first design with dedicated mobile navigation components.

## 🚀 Features

### Desktop Experience
- **Sidebar Navigation**: Collapsible sidebar with gradient styling and active state indicators
- **Top Navigation Bar**: User profile dropdown, theme toggle, and branding
- **Responsive Layout**: Adapts to different screen sizes

### Mobile Experience
- **Mobile Header**: Compact header with burger menu and user profile
- **Slide-out Navigation Modal**: Full-screen navigation menu that slides in from the left
- **Bottom Navigation Bar**: Quick access to main sections (Dashboard, Cards, Mutual Funds, Calculators)
- **Touch-friendly Interface**: Optimized for mobile interactions

### Key Components
- **MobileHeader**: Custom mobile header with menu button and compact user interface
- **MobileNavModal**: Full-screen navigation modal with all navigation items
- **MobileBottomNav**: Bottom tab bar for quick navigation to main sections
- **Responsive Layout**: Seamless switching between desktop and mobile views

## 📱 Mobile Features

The mobile version includes:
- **Burger Menu**: Opens the full navigation modal
- **Bottom Navigation**: Quick access to main dashboard sections
- **Responsive Sidebar**: Desktop sidebar automatically hides on mobile
- **Touch Optimized**: All interactions are optimized for touch devices
- **Escape Key Support**: Modal can be closed with escape key
- **Backdrop Blur**: Professional modal overlay with backdrop blur effect

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React icons
- **Routing**: React Router DOM
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **UI Components**: Custom shadcn/ui components

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
