# Testing Patterns

## Semantic Queries (Preferred)

```typescript
// GOOD - semantic queries
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText("Email");
screen.getByText("Welcome");
screen.getByPlaceholderText("Search...");

// BAD - implementation details
document.querySelector(".submit-btn");
screen.getByTestId("submit-button");
```

## Async Operations

```typescript
it("loads data", async () => {
  render(<DataComponent />);

  // Wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  expect(screen.getByText("Data loaded")).toBeInTheDocument();
});
```

## Mocking

```typescript
// Mock a module
vi.mock("./api", () => ({
  fetchUser: vi.fn(() => Promise.resolve({ name: "Test" })),
}));

// Mock a function
const handleSubmit = vi.fn();
render(<Form onSubmit={handleSubmit} />);

// Verify calls
expect(handleSubmit).toHaveBeenCalledWith({ email: "test@example.com" });
```

## User Events

```typescript
const user = userEvent.setup();

// Click
await user.click(screen.getByRole("button"));

// Type
await user.type(screen.getByRole("textbox"), "Hello");

// Clear and type
await user.clear(screen.getByRole("textbox"));
await user.type(screen.getByRole("textbox"), "New value");

// Select
await user.selectOptions(screen.getByRole("combobox"), "option1");
```

## Query Priority

1. **Accessible** - getByRole, getByLabelText, getByPlaceholderText, getByText
2. **Semantic** - getByAltText, getByTitle
3. **Test ID** - getByTestId (last resort)
