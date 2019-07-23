[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/lenconda/webpack-multiple-entries/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/lenconda/webpack-multiple-entries/pulls)

👏 A [Webpack](https://webpack.js.org/) multiple entries demo, powered by [React.js](https://reactjs.org/) (async loading router) and [TypeScript](https://www.typescriptlang.org/).

## Introduction

Webpack and React.js are dramatically increasing the development efficiency in front-end projects. However, most React.js + Webpack projects are Single Page Application(SPA)s, which are usually not very perfect for SEOs, history tracking and take more time on loading the first page than multiple pages applications.

For this purpose, this project will be introduced to reduce these issues. In this project, a route is a single Webpack entry of React.js, which will be built to route bundles and injected into HTML templates. Otherwise, React Router is also supported in specified single routes.

## Features

- Use Webpack 4 and a simplified configuration file
- Integrate with TypeScript
- Integrate with React Router v4

## Quick Start

**Clone the project**

```bash
$ git clone https://github.com/lenconda/webpack-multiple-entries.git
```

**Install dependencies**

A [Node.js](https://nodejs.org) and `npm` environment is **required**.

```bash
$ npm install
```

**Develop locally**

```bash
$ npm start
```

**Build for production**

```bash
$ npm run build
```

Production files will be generated at `<folder>/dist`

## Add a Page

- A route is corresponding to a static folder contains a index.html;
- The pages code are located in `<folder>/src`, in this folder, all folders will be compiled to static folders of the same name;
- A page folder **must** contains a `index.(ts|js|tsx|jsx)` file, which includes a `ReactDOM.render()` to render the entry into a HTML template;
- For example, if there is a `<folder>/src/page1` folder, Webpack will compile it to `<folder>/dist/page1/index.html`;
- The HTML template can be specified from `<folder>/templates`;
> Notice that the HTML files in this folder could be customized and specify in `<folder>/config/webpack.config.js`.

> Notice that `<folder>/src/index.tsx` will be compiled to the root `index.html`.

> Notice that the `webpack-dev-server` will not hot update when adding a new page or deleting an exsited page, so press Ctrl-C (Control-C on macOS and Super-C on Linux) to stop the server, and run `npm start` to start the server again.

## Contributing

1. Check for open issues, if there are not similar issue, open a fresh issue to start a discussion about a feature idea or a bug;
2. If it is a bug, write a script or throw an example to make reproduction;
3. Fork [this repository](https://github.com/lenconda/webpack-multiple-entries/) on GitHub to start making your changes to the **master** branch (or branch off of it);
4. Write a test which shows that the bug was fixed or that the feature works as expected;
5. Send a pull request and bug the maintainer until it gets merged and published.

This project exists thanks to all the people who contribute.

## License

[MIT](LICENSE)
