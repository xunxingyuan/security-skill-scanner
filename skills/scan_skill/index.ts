import fs from "fs"
import path from "path"

import { scanSkill } from "../../scanner/skill_scanner.js"

export default {

    id: "security.scan_skill",

    description: "Scan skill for malicious code",

    input_schema: {
        type: "object",
        properties: {
            path: { type: "string" }
        },
        required: ["path"]
    },

    async run({ path: skillPath }: any) {

        const policy = JSON.parse(
            fs.readFileSync("./config/policy.json", "utf8")
        )

        const patterns = JSON.parse(
            fs.readFileSync("./config/malicious_patterns.json", "utf8")
        )

        return scanSkill(skillPath, policy, patterns)

    }

}