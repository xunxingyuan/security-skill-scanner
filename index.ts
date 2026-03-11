import scanSkill from "./skills/scan_skill/index.js"
import reviewSkill from "./skills/review_skill/index.js"

export default {

    id: "security_plugin",

    name: "OpenClaw Security",

    description: "Security protection layer",

    skills: [
        scanSkill,
        reviewSkill
    ]

}