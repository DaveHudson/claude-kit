# Framework Vulnerabilities & Secure Patterns

## Common Vulnerabilities by Framework

### React/Next.js
- `dangerouslySetInnerHTML` without sanitization
- Exposing secrets in client bundle (NEXT_PUBLIC_*)
- Missing CSRF protection on mutations
- Server component data leaking to client

### Node.js/Express
- `eval()` or `Function()` with user input
- `child_process.exec()` with unsanitized input
- Missing helmet.js security headers
- Prototype pollution in object merging

### Database (SQL)
- String concatenation in queries
- Excessive permissions on db user
- No prepared statements/parameterized queries

### Database (NoSQL)
- Operator injection ($gt, $regex in MongoDB)
- No input type validation
- Over-permissive document access

---

## Secure Coding Patterns

### Input Validation
```typescript
// Use a validation library
import { z } from 'zod';

const UserInput = z.object({
  email: z.string().email(),
  age: z.number().int().positive().max(150),
});
```

### SQL Queries
```typescript
// Parameterized query - SAFE
db.query('SELECT * FROM users WHERE id = $1', [userId]);

// String concat - VULNERABLE
db.query(`SELECT * FROM users WHERE id = ${userId}`);
```

### Output Encoding
```typescript
// React auto-escapes - SAFE
<div>{userInput}</div>

// Manual HTML - VULNERABLE
<div dangerouslySetInnerHTML={{__html: userInput}} />
```
