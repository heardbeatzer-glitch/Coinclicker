let balance = 0;
let clickPower = 1;
let autoRate = 0;
const multiplier = 1.15;

let upgrades = {
    click: { level: 0, cost: 10, power: 1 },
    auto: { level: 0, cost: 50, power: 2 }
};

const coin = document.getElementById('coin');
const balanceTxt = document.getElementById('balance');
const cpsTxt = document.getElementById('cps');

function handleAction(x, y) {
    balance += clickPower;
    spawnText(x, y, `+€${clickPower}`);
    updateUI();
}

coin.addEventListener('mousedown', (e) => handleAction(e.clientX, e.clientY));
coin.addEventListener('touchstart', (e) => { e.preventDefault(); handleAction(e.touches[0].clientX, e.touches[0].clientY); });

document.getElementById('upg-click').onclick = () => buyUpgrade('click');
document.getElementById('upg-auto').onclick = () => buyUpgrade('auto');

function buyUpgrade(type) {
    let upg = upgrades[type];
    if (balance >= upg.cost) {
        balance -= upg.cost;
        upg.level++;
        if (type === 'click') clickPower += upg.power;
        if (type === 'auto') autoRate += upg.power;
        upg.cost = Math.floor(upg.cost * multiplier);
        updateUI();
    }
}

setInterval(() => { balance += autoRate; updateUI(); }, 1000);

function format(n) { return Math.floor(n).toLocaleString('nl-NL'); }

function updateUI() {
    balanceTxt.innerText = `€${format(balance)}`;
    cpsTxt.innerText = `Inkomen: €${format(autoRate)} /sec`;
    updateBtn('upg-click', 'click');
    updateBtn('upg-auto', 'auto');
}

function updateBtn(id, type) {
    const btn = document.getElementById(id);
    const upg = upgrades[type];
    document.getElementById(`${type}-lv`).innerText = `Level ${upg.level}`;
    document.getElementById(`${type}-cost`).innerText = `€${format(upg.cost)}`;
    btn.className = balance >= upg.cost ? "upgrade-card available" : "upgrade-card";
}

function spawnText(x, y, val) {
    const div = document.createElement('div');
    div.className = 'float-text';
    div.innerText = val;
    div.style.left = x + 'px'; div.style.top = y + 'px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 700);
}
