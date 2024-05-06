import crypto from "crypto";

const hash = (str)=>crypto.createHash("sha512").update(str).digest("hex");

export default hash;