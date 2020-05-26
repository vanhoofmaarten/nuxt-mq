# nuxt-mq

[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-mq/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-mq)
[![npm](https://img.shields.io/npm/dt/nuxt-mq.svg?style=flat-square)](https://npmjs.com/package/nuxt-mq)
[![CircleCI](https://img.shields.io/circleci/project/github/vanhoofmaarten/nuxt-mq.svg?style=flat-square)](https://circleci.com/gh/vanhoofmaarten/nuxt-mq)
[![Codecov](https://img.shields.io/codecov/c/github/vanhoofmaarten/nuxt-mq.svg?style=flat-square)](https://codecov.io/gh/vanhoofmaarten/nuxt-mq)
[![Dependencies](https://david-dm.org/vanhoofmaarten/nuxt-mq/status.svg?style=flat-square)](https://david-dm.org/vanhoofmaarten/nuxt-mq)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

>

[📖 **Release Notes**](./CHANGELOG.md)

## Features

[vue-mq](https://github.com/AlexandreBonaventure/vue-mq) module for Nuxt.js.

## Setup

- Add `nuxt-mq` dependency using yarn or npm to your project
- Add `nuxt-mq` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        defaultBreakpoint: 'sm',
        breakpoints: {
          sm: 450,
          md: 1250,
          lg: Infinity
        }
      }
    ]
  ];
}
```

using top level options

```js
{
  modules: [
    ['nuxt-mq']
  ],

 'mq': {
    defaultBreakpoint: 'sm',
    breakpoints: {
      sm: 450,
      md: 1250,
      lg: Infinity,
    }
  }
}
```

## Usage

[Click here](https://github.com/AlexandreBonaventure/vue-mq) for all options and features of [vue-mq](https://github.com/AlexandreBonaventure/vue-mq).

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev` or with Node debugging on `npm run dev-debug`

## License

[MIT License](./LICENSE)

Copyright (c) [Maarten Van Hoof](https://mrtnvh.com)

## Credits

1. [vue-mq](https://github.com/AlexandreBonaventure/vue-mq) for providing the plugin.
2. [@nuxtjs](https://github.com/nuxt-community/analytics-module) for providing a excellent example on how to build a basic Nuxt.js module.
