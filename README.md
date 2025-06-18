# @tracktor/react-utils

[![npm version](https://badge.fury.io/js/@tracktor%2Freact-utils.svg)](https://badge.fury.io/js/@tracktor%2Freact-utils)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> A comprehensive collection of modern React utilities and custom hooks to accelerate your development workflow.

## 📦 Installation

```bash
# npm
npm install @tracktor/react-utils

# yarn
yarn add @tracktor/react-utils

# pnpm
pnpm add @tracktor/react-utils
```

## 🚀 Quick Start

```typescript
import { useInputState, capitalize, phoneNumberAdapter } from '@tracktor/react-utils';

function App() {
  const [email, onEmailChange] = useInputState('');
  const [phone, onPhoneChange] = useInputState('');

  return (
    <form>
      <input 
        type="email" 
        value={email} 
        onChange={onEmailChange}
        placeholder={capitalize('email address')}
      />
      <input 
        type="tel" 
        value={phoneNumberAdapter(phone)} 
        onChange={onPhoneChange}
        placeholder="Phone number"
      />
    </form>
  );
}
```

## 📚 API Documentation

### 🎣 Hooks

#### `useLocalStorage(key, initialValue?, options?)`
Manages data persistence in localStorage with automatic synchronization.

```typescript
const [user, setUser, removeUser] = useLocalStorage('user', { name: '', email: '' });

// With custom options
const [data, setData] = useLocalStorage('data', [], {
  serializer: JSON.stringify,
  deserializer: JSON.parse
});
```

**Parameters:**
- `key`: localStorage key
- `initialValue`: Initial value (optional)
- `options`: Serialization options (optional)

**Returns:** `[value, setValue, removeValue]`

---

#### `useInputState(initialValue)`
Simplifies input state management with automatic event handling.

```typescript
const [name, onNameChange] = useInputState('');
const [isChecked, onCheckChange] = useInputState(false);

<input type="text" value={name} onChange={onNameChange} />
<input type="checkbox" checked={isChecked} onChange={onCheckChange} />
```

---

#### `useDebounce(value, delayOrOptions)`
Delays execution of a value to prevent excessive calls.

```typescript
// Simple usage
const debouncedSearchTerm = useDebounce(searchTerm, 500);

// With callback
const debouncedValue = useDebounce(inputValue, {
  delay: 300,
  onDebounce: (value) => console.log('Debounced:', value)
});
```

---

#### `useToggle(initialState?)`
Manages boolean state with toggle functionality.

```typescript
const [isOpen, toggle, setIsOpen] = useToggle(false);

<button onClick={toggle}>
  {isOpen ? 'Close' : 'Open'}
</button>
```

---

#### `useWindowSize()`
Tracks window dimensions in real-time.

```typescript
const { width, height } = useWindowSize();

return (
  <div>
    Size: {width}x{height}
  </div>
);
```

---

#### `useInView(ref, options?)`
Detects if an element is visible in the viewport.

```typescript
const ref = useRef(null);
const isInView = useInView(ref, {
  threshold: 0.5,
  triggerOnce: true
});

<div ref={ref}>
  {isInView ? 'Visible!' : 'Not visible'}
</div>
```

---

#### `useDocumentTitle(title)`
Manages document title declaratively.

```typescript
const { setTitle, title } = useDocumentTitle('My App');

// Change title dynamically
setTitle('New Page');
```

---

#### `useEventListener(eventName, handler, element?, options?)`
Adds event listeners with automatic cleanup.

```typescript
const buttonRef = useRef(null);

useEventListener('click', () => console.log('Clicked!'), buttonRef);
useEventListener('keydown', handleKeyDown); // window by default
```

---

#### `useScript(src, options?)`
Loads external scripts declaratively.

```typescript
const status = useScript('https://example.com/script.js', {
  position: 'body-end',
  enable: true
});

// status: 'idle' | 'loading' | 'ready' | 'error'
```

---

#### `useIntersectionObserver(elementRef, options)`
Advanced intersection observer hook for complex visibility detection.

```typescript
const elementRef = useRef(null);
const entry = useIntersectionObserver(elementRef, {
  threshold: 0.1,
  freezeOnceVisible: true
});

const isVisible = entry?.isIntersecting;
```

---

#### `useIsMounted()`
Returns a function to check if component is still mounted.

```typescript
const isMounted = useIsMounted();

useEffect(() => {
  fetchData().then(data => {
    if (isMounted()) {
      setData(data);
    }
  });
}, []);
```

---

#### `useEventCallback(fn)`
Ensures callback stability while maintaining current references.

```typescript
const handleClick = useEventCallback((id) => {
  // This callback is stable but has access to current state
  onItemClick(id, currentState);
});
```

### 🛠️ Utilities

#### Type Validation

```typescript
import { isArray, isObject, isString, isNumber, isBoolean, isFunction, isRef } from '@tracktor/react-utils';

if (isArray(data)) {
  // TypeScript knows data is an array
  console.log(data.length);
}

if (isObject(value)) {
  // TypeScript knows value is an object
  console.log(Object.keys(value));
}
```

#### Object Manipulation

```typescript
import { removeObjectProperty, isDeepEqualObject } from '@tracktor/react-utils';

// Remove property without mutation
const newObj = removeObjectProperty(originalObj, 'propertyToRemove');

// Deep comparison of objects
const areEqual = isDeepEqualObject(obj1, obj2);
```

#### String Manipulation

```typescript
import { capitalize, capitalizeWords } from '@tracktor/react-utils';

capitalize('hello world');     // "Hello world"
capitalizeWords('hello world'); // "Hello World"
```

#### Number Conversion

```typescript
import { toNumberOrZero } from '@tracktor/react-utils';

toNumberOrZero('42');    // 42
toNumberOrZero('abc');   // 0
toNumberOrZero(null);    // 0
toNumberOrZero(true);    // 0 (booleans return 0)
```

### 🔄 Adapters

#### `phoneNumberAdapter(phoneNumber, options?)`
Formats phone numbers according to international standards.

```typescript
// Supported formats
phoneNumberAdapter('0123456789');              // "01 23 45 67 89" (France)
phoneNumberAdapter('441234567890');            // "1234 567 890" (UK)
phoneNumberAdapter('1234567890');              // "(123) 456-7890" (US)

// With international prefix
phoneNumberAdapter('33123456789', { addPrefix: true });  // "+33 01 23 45 67 89"

// Custom separator
phoneNumberAdapter('0123456789', { separator: '-' });    // "01-23-45-67-89"
```

**Supported Countries:**
| Code | Country | Format |
|------|---------|--------|
| 33 | France | 01 23 45 67 89 |
| 44 | United Kingdom | 1234 567 890 |
| 49 | Germany | 0151 234 56789 |
| 34 | Spain | 987 654 321 |
| 1 | United States | (123) 456-7890 |

---

#### `priceAdapter(value, options?)`
Formats prices according to locales and currencies.

```typescript
priceAdapter(1000);                           // "1 000 €"
priceAdapter(1000.50);                        // "1 000,50 €"
priceAdapter(500, { local: 'en-US' });       // "€500"
priceAdapter('-');                            // "-€"
priceAdapter(null);                           // "0 €"
```

**Options:**
- `local`: Locale string (default: 'fr-FR')
- `currency`: Currency code (default: 'EUR')
- `style`: Number format style (default: 'currency')

---

#### `formatCreditCardNumber(number, maxLength?)`
Formats credit card numbers with proper spacing.

```typescript
formatCreditCardNumber('1234567890123456');   // "1234 5678 9012 3456"
formatCreditCardNumber('1234567890123456', 15); // "1234 5678 9012 3"
formatCreditCardNumber(1234567890123456);     // "1234 5678 9012 3456"
```

---

#### `addressToString(address)`
Converts an address object to a formatted string.

```typescript
const address = {
  streetNumber: 82,
  route: 'Chemin de cafon 2',
  postalCode: '83720',
  city: 'Trans en provence',
  country: 'France'
};

addressToString(address); // "82 Chemin de cafon 2, 83720 Trans en provence, France"

// Partial addresses work too
addressToString({ city: 'Paris', country: 'France' }); // "Paris, France"
```

---

#### `getInitials(name, capitalize?)`
Extracts initials from a name.

```typescript
// With first and last name
getInitials({ firstName: 'John', lastName: 'Doe' });        // "JD"

// With full name
getInitials({ fullName: 'John Doe Smith' });               // "JD"

// With forced capitalization
getInitials({ firstName: 'john', lastName: 'doe' }, true); // "JD"
getInitials({ firstName: 'john', lastName: 'doe' }, false); // "jd"
```

## 🎨 Usage Examples

### Complete Contact Form

```typescript
import React from 'react';
import {
  useInputState,
  useToggle,
  phoneNumberAdapter,
  capitalize,
  formatCreditCardNumber
} from '@tracktor/react-utils';

function ContactForm() {
  const [name, onNameChange] = useInputState('');
  const [email, onEmailChange] = useInputState('');
  const [phone, onPhoneChange] = useInputState('');
  const [cardNumber, onCardChange] = useInputState('');
  const [acceptTerms, toggleTerms] = useToggle(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: capitalize(name),
      email,
      phone: phoneNumberAdapter(phone, { addPrefix: true }),
      cardNumber: formatCreditCardNumber(cardNumber)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Full name"
        value={name}
        onChange={onNameChange}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
      />
      
      <input
        type="tel"
        placeholder="Phone"
        value={phoneNumberAdapter(phone)}
        onChange={onPhoneChange}
      />
      
      <input
        placeholder="Card number"
        value={formatCreditCardNumber(cardNumber)}
        onChange={onCardChange}
        maxLength={19}
      />
      
      <label>
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={toggleTerms}
        />
        I accept the terms
      </label>
      
      <button type="submit" disabled={!acceptTerms}>
        Submit
      </button>
    </form>
  );
}
```

### Search Hook with Debounce

```typescript
import React, { useEffect, useState } from 'react';
import { useDebounce, useInputState } from '@tracktor/react-utils';

function SearchComponent() {
  const [query, onQueryChange] = useInputState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, {
    delay: 300,
    onDebounce: () => setLoading(true)
  });

  useEffect(() => {
    if (debouncedQuery) {
      // Simulate API call
      fetch(`/api/search?q=${debouncedQuery}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
        });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        placeholder="Search..."
        value={query}
        onChange={onQueryChange}
      />
      
      {loading && <div>Searching...</div>}
      
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Visibility Detection

```typescript
import React, { useRef } from 'react';
import { useInView, useIntersectionObserver } from '@tracktor/react-utils';

function VisibilityExample() {
  const simpleRef = useRef(null);
  const advancedRef = useRef(null);
  
  // Simple visibility detection
  const isSimpleInView = useInView(simpleRef, {
    threshold: 0.5,
    triggerOnce: true
  });
  
  // Advanced intersection observer
  const entry = useIntersectionObserver(advancedRef, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '50px'
  });

  return (
    <div>
      <div ref={simpleRef} style={{ height: '100px', marginTop: '1000px' }}>
        {isSimpleInView ? '✅ Simple: Visible' : '❌ Simple: Hidden'}
      </div>
      
      <div ref={advancedRef} style={{ height: '100px', marginTop: '1000px' }}>
        Advanced: {entry?.intersectionRatio.toFixed(2) || 0}% visible
      </div>
    </div>
  );
}
```

## 🧪 Testing

The library is fully tested with Vitest. To run tests:

```bash
# Unit tests
yarn test

# Coverage report
yarn coverage

# Lint code
yarn lint
```

## 🛡️ TypeScript Support

All utilities and hooks are fully typed with TypeScript. Types are automatically inferred:

```typescript
const [count, setCount] = useLocalStorage('count', 0); // count is number
const [user, setUser] = useLocalStorage('user', { name: '', age: 0 }); // user is typed

// Type guards work perfectly
if (isArray(data)) {
  data.map(item => item); // TypeScript knows data is an array
}

if (isString(value)) {
  value.toUpperCase(); // TypeScript knows value is a string
}
```

## 📋 Requirements

- React ≥ 18.0.0
- React DOM ≥ 18.0.0
- TypeScript support included

## 🌟 Features

- ✅ **Fully typed** with TypeScript
- ✅ **Tree-shakeable** - Import only what you need
- ✅ **SSR compatible** - Works with Next.js, Gatsby, etc.
- ✅ **Lightweight** - Minimal bundle impact
- ✅ **Well tested** - Comprehensive test suite
- ✅ **Modern** - Uses latest React patterns
- ✅ **Performance focused** - Optimized hooks and utilities

## 🤝 Contributing

Contributions are welcome! Please check our [contributing guide](CONTRIBUTING.md).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 🏷️ Keywords

- React
- React Hooks
- Utilities
- TypeScript
- Performance
- Developer Experience
- Form Handling
- State Management

## 📞 Support

- 🐛 [Report a bug](https://github.com/Tracktor/react-utils/issues)
- 💡 [Request a feature](https://github.com/Tracktor/react-utils/issues)
- 📖 [Documentation](https://github.com/Tracktor/react-utils#readme)
- 💬 [Discussions](https://github.com/Tracktor/react-utils/discussions)

## 🚀 What's Next?

We're constantly improving! Upcoming features:
- 🔄 More form utilities
- 📱 Mobile-specific hooks
- 🎨 Animation helpers
- 📊 Data manipulation utilities

---

Built with ❤️ by [Mickaël Austoni](https://github.com/MickaelAustoni)
