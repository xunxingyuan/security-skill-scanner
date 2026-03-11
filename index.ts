import scanSkill from "./skills/security_scan_skill/index.js"
import reviewSkill from "./skills/security_review_skill/index.js"

export default {

    id: "security_plugin",

    name: "OpenClaw Security",

    description: "Security protection layer",

    skills: [
        scanSkill,
        reviewSkill
    ]

}