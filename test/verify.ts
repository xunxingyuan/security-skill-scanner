import fs from "fs"
import path from "path"
import url from "url"
import { scanSkill } from "../scanner/skill_scanner.js"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const policy = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../config/policy.json"), "utf8")
)

const patterns = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../config/malicious_patterns.json"), "utf8")
)

console.log("=" .repeat(60))
console.log("  OpenClaw Security Scanner — Verification")
console.log("=" .repeat(60))

// Test 1: Malicious skill
console.log("\n🔴 Test 1: Scanning malicious skill...")
const malicious = scanSkill(
    path.join(__dirname, "fixtures/malicious_skill"),
    policy,
    patterns
)
console.log(`   Safe: ${malicious.safe}`)
for (const r of malicious.results) {
    console.log(`\n   📄 ${r.file}`)
    for (const issue of r.issues) {
        if (issue.type === "blocked_module") {
            console.log(`      ❌ Blocked module: ${issue.module}`)
        } else if (issue.type === "blocked_function") {
            console.log(`      ❌ Blocked function: ${issue.function}`)
        } else if (issue.type === "keyword") {
            console.log(`      ⚠️  Dangerous keyword: ${issue.keyword}`)
        } else if (issue.type === "sensitive_file") {
            console.log(`      🔒 Sensitive file access: ${issue.file}`)
        } else if (issue.type === "suspicious_url") {
            console.log(`      🌐 Suspicious URL: ${issue.url}`)
        } else if (issue.type === "suspicious_pattern") {
            console.log(`      🔍 Suspicious pattern: ${issue.pattern}`)
        }
    }
}

// Test 2: Safe skill
console.log("\n\n🟢 Test 2: Scanning safe skill...")
const safe = scanSkill(
    path.join(__dirname, "fixtures/safe_skill"),
    policy,
    patterns
)
console.log(`   Safe: ${safe.safe}`)
if (safe.results.length === 0) {
    console.log("   ✅ No issues found")
}

// Summary
console.log("\n" + "=" .repeat(60))
const totalIssues = malicious.results.reduce((sum: number, r: any) => sum + r.issues.length, 0)
console.log(`  Results: malicious=${totalIssues} issues found, safe=clean`)
const passed = !malicious.safe && safe.safe
console.log(`  Verdict: ${passed ? "✅ ALL TESTS PASSED" : "❌ TESTS FAILED"}`)
console.log("=" .repeat(60))
