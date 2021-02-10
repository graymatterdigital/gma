# Gridsome Starter algrid

Algrid is a simple starter for creating blogs using Gridsome.

![capture](./README.gif)

## Features

- Algolia
- Infinite Scroll
- Draft Posts
- Tag Page
- Content from markdown.
- Stylesheet build using Stylus.
- Vuex

## Installation

```
git clone https://github.com/gollowars/gridsome-starter-algrid.git
cd algrid
yarn install
```

## Setup Algolia

add a credential file to a .env file

```
// DEVELOPING: .env.development
// BUILDING: .env.production

GRIDSOME_ALGOLIA_APP_ID=XXXXXXXX
GRIDSOME_ALGOLIA_INDEX_NAME=XXXXXXXX
GRIDSOME_ALGOLIA_SEARCH_KEY=XXXXXXXX
ALGOLIA_ADMIN_KEY=XXXXXXXX
```

algrid use [gridsome-plugin-algolia](https://gridsome.org/plugins/gridsome-plugin-algolia)

## Setup blog

you can add a site information into `./data/config.yml`.

## Start developing

```
yarn dev
```
