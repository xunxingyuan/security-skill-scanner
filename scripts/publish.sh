#!/usr/bin/env bash

set -e

# Extract version from package.json
VERSION=$(node -e "const fs=require('fs'); console.log(JSON.parse(fs.readFileSync('package.json')).version)")

echo "====================================================="
echo "  🚀 Publishing OpenClaw Security Suite v$VERSION"
echo "====================================================="

echo "🔍 Running static type check..."
npx tsc --noEmit

echo "🧪 Running verification tests..."
npx tsx test/verify.ts

echo "📦 Syncing to ClawHub..."
clawhub publish . \
  --slug openclaw-security-suite \
  --name "OpenClaw Security Suite" \
  --version "$VERSION" \
  --changelog "Release version $VERSION" \
  --tags security,scanner,code-review

echo "====================================================="
echo "  ✅ Successfully published version v$VERSION !"
echo "====================================================="
