function encrypt(str) {
  let key = 91
  let out = ""
  for (let i = 0; i < str.length; i++) {
    let v = str.charCodeAt(i)
    v = (v ^ key) + (i * 7)
    key = (key + v) % 256
    out += v.toString(16)
  }
  return out
}

const STORED_KEY = "3ef6fcfa10310710a123111e2111f2114"
