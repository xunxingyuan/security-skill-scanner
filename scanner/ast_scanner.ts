import { parse } from "@babel/parser"
import traverse from "@babel/traverse"

export function astScan(code: string, policy: any) {

    const issues: any[] = []

    const ast = parse(code, {
        sourceType: "module",
        plugins: ["typescript"]
    })

    traverse(ast, {

        ImportDeclaration(path) {

            const moduleName = path.node.source.value

            if (policy.blocked_modules.includes(moduleName)) {

                issues.push({
                    type: "blocked_module",
                    module: moduleName
                })

            }

        },

        CallExpression(path) {

            const name = path.node.callee.name

            if (policy.blocked_functions.includes(name)) {

                issues.push({
                    type: "blocked_function",
                    function: name
                })

            }

        }

    })

    return issues

}