# Code Scanning Checklist

## Authentication
- [ ] Passwords hashed with bcrypt/argon2 (not MD5/SHA1)
- [ ] Session tokens are cryptographically random
- [ ] Sessions expire and can be invalidated
- [ ] Password reset tokens are single-use and expire
- [ ] Rate limiting on login attempts
- [ ] MFA available for sensitive accounts

## Authorization
- [ ] Every endpoint checks permissions
- [ ] No reliance on client-side auth checks only
- [ ] Resource ownership verified (not just "is logged in")
- [ ] Admin functions properly protected
- [ ] No privilege escalation paths

## Input Validation
- [ ] All user input validated server-side
- [ ] File uploads: type, size, name sanitized
- [ ] No direct SQL string concatenation
- [ ] Command injection prevented (no shell interpolation)
- [ ] Path traversal blocked (../ in file paths)

## Output Encoding
- [ ] HTML output escaped by default
- [ ] JSON responses properly encoded
- [ ] URLs encoded when building dynamically
- [ ] No sensitive data in error messages

## Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] HTTPS enforced (HSTS header)
- [ ] Cookies: HttpOnly, Secure, SameSite flags
- [ ] No secrets in code/logs/error messages
- [ ] PII handling complies with regulations

## API Security
- [ ] Authentication required on all endpoints
- [ ] Rate limiting implemented
- [ ] Input size limits enforced
- [ ] CORS properly configured (not *)
- [ ] GraphQL: depth/complexity limits
