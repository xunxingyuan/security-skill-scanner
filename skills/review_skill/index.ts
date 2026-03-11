import fs from "fs"
import { aiReview } from "../../llm/ai_review.js"

export default {

    id: "security.review_skill",

    description: "AI review skill code",

    input_schema: {
        type: "object",
        properties: {
            file: { type: "string" }
        },
        required: ["file"]
    },

    async run({ file }: any, ctx: any) {

        const code = fs.readFileSync(file, "utf8")

        return aiReview(code, ctx.llm)

    }

}