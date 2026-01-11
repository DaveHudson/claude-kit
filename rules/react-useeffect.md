# React useEffect Best Practices

Effects are an **escape hatch** from React. They let you synchronize with external systems. If there is no external system involved, you shouldn't need an Effect.

## When Effects ARE Needed

- Synchronizing with non-React widgets or browser APIs
- Managing subscriptions to external data stores
- Implementing analytics or logging tied to component rendering
- Data fetching operations with proper cleanup

## When to Avoid Effects

1. **Data transformation** - Calculate during render, not in Effect
2. **Event responses** - Handle in event handlers, not Effects
3. **Derived values** - Compute inline: `const fullName = firstName + ' ' + lastName`
4. **State sequencing** - Calculate all state changes in the event handler

## Quick Reference

| Need | Solution |
|------|----------|
| Value from props/state | Calculate during render |
| Expensive calculation | `useMemo` |
| Reset state on prop change | `key` prop |
| Respond to user action | Event handler |
| Sync with external system | `useEffect` with cleanup |
| Subscribe to external store | `useSyncExternalStore` |
| Share state between components | Lift state up |
| Fetch data | Custom hook with cleanup / framework |

---

## Better Alternatives

### 1. Calculate During Render

```tsx
// GOOD: Derived value
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  const fullName = firstName + ' ' + lastName; // Just compute it
}
```

### 2. useMemo for Expensive Calculations

```tsx
function TodoList({ todos, filter }) {
  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter]
  );
}
```

### 3. Key Prop to Reset State

```tsx
// Different userId = fresh component instance
<Profile userId={userId} key={userId} />
```

### 4. Event Handlers for User Actions

```tsx
function ProductPage({ product, addToCart }) {
  function handleBuyClick() {
    addToCart(product);
    showNotification(`Added ${product.name}!`);
  }
}
```

### 5. useSyncExternalStore for External Stores

```tsx
function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,
    () => true
  );
}
```

---

## Anti-Patterns to Avoid

### 1. Redundant State for Derived Values

```tsx
// BAD
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);

// GOOD
const fullName = firstName + ' ' + lastName;
```

### 2. Filtering Data in Effect

```tsx
// BAD
useEffect(() => {
  setVisibleTodos(getFilteredTodos(todos, filter));
}, [todos, filter]);

// GOOD
const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
```

### 3. Resetting State on Prop Change

```tsx
// BAD
useEffect(() => {
  setComment('');
}, [userId]);

// GOOD: Use key prop on parent
<Profile userId={userId} key={userId} />
```

### 4. Event Logic in Effect

```tsx
// BAD: Fires on page refresh if condition is already true
useEffect(() => {
  if (product.isInCart) showNotification(`Added!`);
}, [product]);

// GOOD: In event handler
function handleBuyClick() {
  addToCart(product);
  showNotification(`Added!`);
}
```

### 5. Chains of Effects

```tsx
// BAD: Effects triggering each other
useEffect(() => { if (card?.gold) setGoldCardCount(c => c + 1); }, [card]);
useEffect(() => { if (goldCardCount > 3) setRound(r => r + 1); }, [goldCardCount]);

// GOOD: Calculate in event handler
function handlePlaceCard(nextCard) {
  setCard(nextCard);
  if (nextCard.gold && goldCardCount >= 3) {
    setGoldCardCount(0);
    setRound(round + 1);
  }
}
```

### 6. Fetching Without Cleanup (Race Condition)

```tsx
// BAD: Race condition
useEffect(() => {
  fetchResults(query).then(setResults);
}, [query]);

// GOOD: Cleanup ignores stale responses
useEffect(() => {
  let ignore = false;
  fetchResults(query).then(json => {
    if (!ignore) setResults(json);
  });
  return () => { ignore = true; };
}, [query]);
```

### 7. App Initialization in Effect

```tsx
// BAD: Runs twice in dev
useEffect(() => {
  checkAuthToken();
}, []);

// GOOD: Module-level guard
let didInit = false;
useEffect(() => {
  if (!didInit) {
    didInit = true;
    checkAuthToken();
  }
}, []);
```
