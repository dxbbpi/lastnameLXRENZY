// member.js
const members = [
    { name: "Nonx Threethousand", fbId: "100092972023302#" },
    { name: "Jox Jutistory", fbId: "lakksjslal.ksksiksks" },
    { "name": "Hydra Swizz", "fbId": "Leo4y#" },
    { name: "Nevil Diamondonsnow", fbId: "Nevilwtfzera#" },
    { name: "Midas Lxrenzy", fbId: "100065837666522#" },
    { name: "Jaydase Vincere", fbId: "jaydase.vincere#" },
    { name: "Hugo Vega", fbId: "61570465692953#" },
    { name: "Felix Lxrenzy", fbId: "61553664876339#" },
    { name: "Ciel Lxrenzy", fbId: "ciel.genesis.2024" }
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const selectEl = document.getElementById("group");
    if (selectEl) {
      members.forEach(member => {
        const option = document.createElement("option");
        option.value = member.name;
        option.textContent = member.name;
        selectEl.appendChild(option);
      });
    }
  });
  
