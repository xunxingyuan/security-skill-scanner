import { NodeVM } from "vm2"

export function runSandbox(code: string) {

    const vm = new NodeVM({

        console: "off",

        sandbox: {},

        require: {
            external: false
        },

        timeout: 1000

    })

    return vm.run(code)

}