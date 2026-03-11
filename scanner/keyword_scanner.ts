export function keywordScan(code: string, patterns: any) {

    const issues = []

    for (const keyword of patterns.dangerous_keywords) {

        if (code.includes(keyword)) {

            issues.push({
                type: "keyword",
                keyword
            })

        }

    }

    return issues

}