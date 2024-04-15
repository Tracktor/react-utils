#  Tracktor React Utils 

[![npm version](https://badge.fury.io/js/@tracktor%2Freact-utils.svg)](https://badge.fury.io/js/@tracktor%2Freact-utils)

**A React utils library**

- [Installation](#Installation)
- [Usage](#Usage)
- [Hook](#Hook)
- [Utils](#Utils)
- [Convention](#Convention)

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
`isArray()`  
`isObject()`  
`isRef()`  
`isBoolean()`  
`isNumber()`  
`isString()`  
`isFunction()`  
`removeObjectProperty()`  


### Adapter
`addressToString()`  
`formatCreditCardNumber()`  
`getInitials()`  
`priceAdapter()`

## Convention

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Versioning](https://semver.org)
- [Conventional Commits](https://www.conventionalcommits.org)
