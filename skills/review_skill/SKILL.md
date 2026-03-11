---
name: security-review
description: AI-powered code review that uses an LLM to detect malicious behavior patterns like data exfiltration, credential leaks, and system modification.
version: 0.2.0
tags:
  - security
  - ai-review
  - code-review
requirements:
  binaries:
    - node
  environment: []
input_schema:
  type: object
  properties:
    file:
      type: string
      description: Absolute path to the file to review
  required:
    - file
---

# Security Review Skill

Use an LLM to perform deep semantic analysis of skill code, detecting malicious behavior that static analysis might miss.

## When to Use

Use this skill when:
- Static scan (`security-scan`) passes but you want deeper analysis
- Code contains complex logic that may hide malicious intent
- You need human-readable risk assessment with reasoning

## What It Detects

The AI reviewer checks for:
- **Data exfiltration**: code that sends sensitive data to external endpoints
- **Shell execution**: hidden or obfuscated shell command execution
- **Credential leaks**: accessing or transmitting secrets, tokens, API keys
- **System modification**: unauthorized file system changes, permission modifications

## Usage

```
Review the file at /path/to/file.ts for malicious behavior.
```

## Output Format

Returns a JSON object from the LLM:

```json
{
  "risk_level": "high",
  "reason": "Code reads AWS credentials from environment and sends them to an external URL via fetch."
}
```

## Notes

- This skill requires an LLM context (`ctx.llm`) to be available at runtime
- Results are probabilistic — use alongside `security-scan` for best coverage
- Review time depends on code length and LLM response latency
