document.getElementById('btn-generate').addEventListener('click', () => {
    const input = document.getElementById('guest-input').value;
    const names = input.split('\n').map(n => n.trim()).filter(n => n !== '');
    const tbody = document.getElementById('result-body');
    const table = document.getElementById('result-table');

    tbody.innerHTML = ''; 

    names.forEach(name => {
        // Menggunakan domain dari config.js
        const domain = weddingConfig.baseUrl || "https://domain-sementara.com";
        const link = `${domain}/?to=${encodeURIComponent(name)}`;

        const tr = document.createElement('tr');
        
        const tdName = document.createElement('td');
        tdName.innerText = name;
        
        const tdLink = document.createElement('td');
        tdLink.innerHTML = `<a href="${link}" target="_blank">Lihat</a>`;
        
        const tdAction = document.createElement('td');
        const waButton = document.createElement('button');
        waButton.innerText = "Salin Teks WA";
        
        waButton.onclick = () => {
            const message = `Assalamu'alaikum warahmatullahi wabarakatuh.\n\nDengan hormat, kami mengundang Bapak/Ibu/Saudara/i *${name}* untuk hadir di acara pernikahan kami.\n\nAlessandro & Hardini\n17 April 2027\n\nDetail acara dan lokasi dapat dilihat melalui tautan undangan berikut:\n${link}\n\nMerupakan kebahagiaan bagi kami apabila Anda berkenan hadir.\nTerima kasih.`;
            navigator.clipboard.writeText(message);
            waButton.innerText = "Tersalin!";
            setTimeout(() => waButton.innerText = "Salin Teks WA", 2000);
        };

        tdAction.appendChild(waButton);
        tr.appendChild(tdName);
        tr.appendChild(tdLink);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);
    });

    table.style.display = 'table';
});