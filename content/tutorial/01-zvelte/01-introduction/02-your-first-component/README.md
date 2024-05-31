---
title: Your first component
---

In Zvelte, an application is composed from one or more _components_. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a `.twig` file. The `App.twig` file, open in the code editor to the right, is a simple component.

## Adding data

A component that just renders some static markup isn't very interesting. Let's add some data.

First, a `name` property to the props of this component:

```js
/// file: App.js
export default function({ props }) {
    +++props.name = 'zvelte';+++
}
```

Then, we can refer to `name` in the markup:

```zvelte
/// file: App.twig
<h1>Hello +++{{ name }}+++!</h1>
```

Inside the curly braces, we can put any twig expression we want. Try changing `name` to `name|upper` for a shoutier greeting.

```zvelte
/// file: App.twig
<h1>Hello {{ name+++|upper+++ }}!</h1>
```
