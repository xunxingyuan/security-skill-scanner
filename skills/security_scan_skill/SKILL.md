name: security-skill-scanner
description: Static security scan for OpenClaw skill code. Detects blocked module imports, dangerous function calls, sensitive file access, and suspicious patterns.
version: 0.2.0
tags:
  - security
  - scanner
  - static-analysis
requirements:
  binaries:
    - node
  environment: []
input_schema:
  type: object
  properties:
    path:
      type: string
      description: Absolute path to the skill directory to scan
  required:
    - path
---

# Security Scan Skill

Perform a static security analysis on a skill directory to detect potentially malicious code before execution.

## When to Use

Use this skill when:
- A new skill is being installed and needs security verification
- You want to audit existing skills for dangerous patterns
- Code review is required before deploying a skill to production

## What It Checks

### AST-Level Analysis (via Babel)
- **Blocked module imports**: `child_process`, `cluster`
- **Blocked function calls**: `exec`, `spawn`, `execSync`

### Keyword Matching
- Dangerous keywords: `eval(`, `Function(`, `__proto__`, `process.env`, etc.
- Sensitive file access: `/etc/passwd`, `/etc/shadow`, `/.ssh`, `/.env`
- Suspicious URLs: `169.254.169.254`, `metadata.google.internal`

### Regex Pattern Detection
- Shell piping patterns: `curl ... | bash`, `wget ... | sh`
- Cloud metadata probing: `curl ...169.254.169.254`

## Usage

```
Scan the skill at /path/to/skill for security issues.
```

## Output Format

Returns a JSON object:

```json
{
  "safe": false,
  "results": [
    {
      "file": "index.ts",
      "issues": [
        { "type": "blocked_module", "module": "child_process" },
        { "type": "keyword", "keyword": "eval(" }
      ]
    }
  ]
}
```

- `safe: true` means no issues were found
- Each issue includes a `type` and the specific match
