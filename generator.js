let itemsList = [];
let itemData = [];

fetch("list.txt")
  .then(res => res.json())
  .then(data => {
    itemsList = data;
    const bagSelect = document.getElementById("bagSelect");
    const itemSelect = document.getElementById("itemSelect");

    const bags = itemsList.filter(i => i.id.startsWith("item_backpack"));
    bags.forEach(bag => {
      const opt = document.createElement("option");
      opt.value = bag.id;
      opt.innerText = bag.id;
      bagSelect.appendChild(opt);
    });

    itemsList.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.id;
      opt.innerText = item.id;
      itemSelect.appendChild(opt);
    });

    document.getElementById("itemSearch").addEventListener("input", () => {
      const filter = document.getElementById("itemSearch").value.toLowerCase();
      itemSelect.innerHTML = "";
      itemsList
        .filter(i => i.id.toLowerCase().includes(filter))
        .forEach(i => {
          const opt = document.createElement("option");
          opt.value = i.id;
          opt.text = i.id;
          itemSelect.appendChild(opt);
        });
    });
  });

function addItem() {
  const itemID = document.getElementById("itemSelect").value;
  const count = parseInt(document.getElementById("count").value) || 1;
  const hueInput = document.getElementById("hue");
  const satInput = document.getElementById("sat");
  const sizeInput = document.getElementById("size");
  const state = parseInt(document.getElementById("state").value) || 0;
  const randHue = document.getElementById("randomHue").checked;
  const randSat = document.getElementById("randomSat").checked;
  const randSize = document.getElementById("randomSize").checked;

  for (let i = 0; i < count; i++) {
    const hue = randHue ? getRandom(0, 210) : parseInt(hueInput.value);
    const sat = randSat ? getRandom(0, 120) : parseInt(satInput.value);
    const size = randSize ? getRandom(-128, 127) : parseInt(sizeInput.value);

    let baseItem = {
      itemID,
      colorHue: hue,
      colorSaturation: sat,
      scaleModifier: size
    };

    if (itemID === "item_shredder" && state > 0) {
      baseItem.state = Math.min(state, 8000);
    }

    // Heart Gun Nesting
    let wrappedItem = {
      itemID: "item_heart_gun",
      children: [baseItem]
    };

    itemData.push(wrappedItem);

    const entry = document.createElement("li");
    entry.innerText = `Wrapped: ${itemID} — Hue:${hue} Sat:${sat} Size:${size}` + (baseItem.state ? ` State:${baseItem.state}` : "");
    document.getElementById("itemList").appendChild(entry);
  }
}

function generateJSON() {
  const bag = document.getElementById("bagSelect").value;
  const data = {
    leftHand: {
      itemID: bag,
      children: itemData
    }
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${bag}_${itemData.length}.json`;
  link.click();
}

function resetAll() {
  itemData = [];
  document.getElementById("itemList").innerHTML = "";
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
