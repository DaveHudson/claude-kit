---
name: security-checklist
description: Security patterns and OWASP checklist. Auto-loads when handling auth, user input, API security, or reviewing code for vulnerabilities.
---

Security checklist for identifying vulnerabilities and ensuring secure coding practices.

For detailed checklists, see `checklist.md`. For framework-specific patterns, see `patterns.md`.

---

## OWASP Top 10

| Vulnerability | What to Look For |
|---------------|------------------|
| **Injection** | Unsanitized input in SQL, commands, templates |
| **Broken Auth** | Weak passwords, missing MFA, session issues |
| **Sensitive Data** | Unencrypted storage, exposed in logs/errors |
| **XXE** | XML parsing without disabling external entities |
| **Broken Access** | Missing auth checks, IDOR vulnerabilities |
| **Misconfig** | Debug mode, default creds, verbose errors |
| **XSS** | Unescaped output, dangerouslySetInnerHTML |
| **Insecure Deserial** | Untrusted data in deserialize functions |
| **Vulnerable Deps** | Outdated packages with known CVEs |
| **Insufficient Logging** | Missing audit trails, no alerting |

---

## Quick Scan Commands

```bash
# Check for secrets in code
grep -rE "(password|secret|api_key|token)\s*[:=]" --include="*.{ts,js,json,env}" .

# Find SQL injection risks
grep -rE "query\(.*\+.*\)|execute\(.*\+.*\)" --include="*.ts" .

# Check for dangerouslySetInnerHTML
grep -r "dangerouslySetInnerHTML" --include="*.tsx" .

# Audit packages
bun pm audit
```

---

## Security Mindset

- **Defense in depth** - Multiple layers, not single points
- **Least privilege** - Minimum access needed
- **Fail secure** - Errors should deny, not allow
- **Trust nothing** - Validate everything from outside
- **Keep secrets secret** - Never in code, logs, or errors
