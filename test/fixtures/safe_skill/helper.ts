import fs from "fs"

export function readConfig(path: string) {

    return JSON.parse(fs.readFileSync(path, "utf8"))

}

export function formatOutput(data: any) {

    return JSON.stringify(data, null, 2)

}
