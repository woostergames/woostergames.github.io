function encrypt(s) {
  let r = ""
  for (let i = 0; i < s.length; i++) {
    r += (s.charCodeAt(i) ^ 23).toString(16)
  }
  return r
}

const STORED_KEY = "3ef6fcfa10310710a123111e2111f2114"

function unlock() {
  const input = document.getElementById("pw").value
  if (encrypt(input) === STORED_KEY) {
    document.getElementById("lock").style.display = "none"
    document.getElementById("content").innerHTML = PAGE_HTML
  } else {
    alert("Wrong password")
  }
}
