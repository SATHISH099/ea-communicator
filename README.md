# Communicator

## Installation (Quick Start)
- Install NodeJS(pnpm) if not installed by following [this guide](https://github.com/nvm-sh/nvm#install--update-script).
```bash
$ npm i -g pnpm
$ pnpm install
```
## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

#### Copy .env from the .env.example && Please add all the env variable in .env.example as well
```bash
cp .env.example .env
```

#### Nuxi Command generate for components, composable, layouts, middleware, pages

Generate Components, Composable, Layouts, Middleware

```bash
pnpm nuxi add [components, layouts, composable, middleware, page] [names]
```

### Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

### Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
