#  Tracktor React Utils 

**A React utils library**

- [Installation](#Installation)
- [Usage](#Usage)
- [Hook](#Hook)
- [Utils](#Utils)
- [Convention](#Convention)

## Features

- 📦 **[React](https://fr.reactjs.org)** - v18+ with Hooks
- ⚡️ **[Vite](https://vitejs.dev)** - Next Generation Frontend Tooling
- 📐 **[ESLint](https://eslint.org)** - Code analyzer
- 🚀 **[Vitest](https://vitest.dev)** - A Vite native unit test framework. It's fast!
- 🛠️ **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro)** - React DOM testing
  utilities
- 🐶 **[Husky](https://typicode.github.io/husky)** - Modern native git hooks made easy

## Installation

```console
yarn add @tracktor/react-utils
```

## Usage

```typescript jsx
import { useInputState } from "@tracktor/react-utils";

const App = () => {
  const [value, onChange] = useInputState("");

  return (<input type="text" value={value} onChange={onChange}/>);
}
```

## Hook
`useLocalStorage()`  
`useIsMounted()`  
`useIntersectionObserver()`  
`useDebounce()`  
`useToggle()`  
`useScript()`  
`useInputState()`  
`useIsomorphicLayoutEffect()`  
`useDocumentTitle()`  
`useWindowSize()`  
`useEventListener()`

## Utils
`isObject()`  
`isRef()`  
`isBoolean()`  
`isNumber()`  
`isString()`  
`isFunction()`  
`removeObjectProperty()`


## Convention

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Versioning](https://semver.org)
- [Conventional Commits](https://www.conventionalcommits.org)
