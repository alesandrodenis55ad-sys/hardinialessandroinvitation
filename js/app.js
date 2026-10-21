document.addEventListener("DOMContentLoaded", () => {
    // Slideshow Otomatis untuk Banner Foto Sebelum Acara
    const slideshowImg = document.getElementById('auto-slideshow-img');
    if (slideshowImg) {
        // Daftar foto yang akan berganti otomatis (mengambil dari galeri / assets)
        const bannerPhotos = [
            "assets/DSC09793.jpg",
            "assets/DSC09802.jpg",
            "assets/DSC09865.jpg",
            "assets/DSC09971.jpg"
        ];
        
        let bannerIndex = 0;
        // Efek transisi halus pada elemen gambar
        slideshowImg.style.transition = "opacity 1s ease-in-out";

        setInterval(() => {
            // Efek fade out
            slideshowImg.style.opacity = 0;

            setTimeout(() => {
                bannerIndex = (bannerIndex + 1) % bannerPhotos.length;
                slideshowImg.src = bannerPhotos[bannerIndex];
                // Efek fade in kembali
                slideshowImg.style.opacity = 1;
            }, 1000); // Waktu jeda transisi 1 detik

        }, 4000); // Foto berganti setiap 4 detik
    }
    // 1. Parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || 'Bapak/Ibu/Saudara/i';
    const guestNameEl = document.getElementById('guest-name');
    if (guestNameEl) guestNameEl.innerText = guestName;

    const rsvpNameEl = document.getElementById('rsvp-name');
    if (rsvpNameEl) rsvpNameEl.value = guestName !== 'Bapak/Ibu/Saudara/i' ? guestName : '';

    // 2. Load Data Mempelai
    const coverBg = document.getElementById('cover-bg');
    if (coverBg) coverBg.style.backgroundImage = `url('${weddingConfig.coverPhoto}')`;

    const bridePhoto = document.getElementById('bride-photo');
    if (bridePhoto) bridePhoto.src = weddingConfig.bridePhoto;
    
    const brideFull = document.getElementById('bride-full');
    if (brideFull) brideFull.innerText = weddingConfig.brideFull;

    const brideParents = document.getElementById('bride-parents');
    if (brideParents) brideParents.innerHTML = weddingConfig.brideParents;

    const brideIg = document.getElementById('bride-ig');
    if (brideIg) brideIg.href = weddingConfig.brideInstagram;

    const groomPhoto = document.getElementById('groom-photo');
    if (groomPhoto) groomPhoto.src = weddingConfig.groomPhoto;

    const groomFull = document.getElementById('groom-full');
    if (groomFull) groomFull.innerText = weddingConfig.groomFull;

    const groomParents = document.getElementById('groom-parents');
    if (groomParents) groomParents.innerHTML = weddingConfig.groomParents;

    const groomIg = document.getElementById('groom-ig');
    if (groomIg) groomIg.href = weddingConfig.groomInstagram;

    // Load Data Acara
    const akadDate = document.getElementById('akad-date');
    if (akadDate) akadDate.innerText = weddingConfig.ceremony.dateText;
    const akadTime = document.getElementById('akad-time');
    if (akadTime) akadTime.innerText = `${weddingConfig.ceremony.startTime} - ${weddingConfig.ceremony.endTime}`;
    const akadVenue = document.getElementById('akad-venue');
    if (akadVenue) akadVenue.innerText = weddingConfig.ceremony.venue;
    const akadAddress = document.getElementById('akad-address');
    if (akadAddress) akadAddress.innerText = weddingConfig.ceremony.address;
    const akadMap = document.getElementById('akad-map');
    if (akadMap) akadMap.href = weddingConfig.ceremony.mapsUrl;

    const resepsiDate = document.getElementById('resepsi-date');
    if (resepsiDate) resepsiDate.innerText = weddingConfig.reception.dateText;
    const resepsiTime = document.getElementById('resepsi-time');
    if (resepsiTime) resepsiTime.innerText = `${weddingConfig.reception.startTime} - ${weddingConfig.reception.endTime}`;
    const resepsiVenue = document.getElementById('resepsi-venue');
    if (resepsiVenue) resepsiVenue.innerText = weddingConfig.reception.venue;
    const resepsiAddress = document.getElementById('resepsi-address');
    if (resepsiAddress) resepsiAddress.innerText = weddingConfig.reception.address;
    const resepsiMap = document.getElementById('resepsi-map');
    if (resepsiMap) resepsiMap.href = weddingConfig.reception.mapsUrl;

    // 3. Tombol Buka Undangan, Transisi Smooth, & Musik
    const btnOpen = document.getElementById('btn-open');
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    const bottomNav = document.getElementById('bottom-nav');
    const bgMusic = document.getElementById('bg-music');
    const btnMusic = document.getElementById('btn-music');
    
    if (bgMusic && weddingConfig.music) {
        bgMusic.src = weddingConfig.music.src;
        bgMusic.load();
    }
    let isPlaying = false;

    if (btnOpen) {
        btnOpen.addEventListener('click', (e) => {
            e.preventDefault();

            if (mainContent) mainContent.classList.remove('hidden');
            if (bottomNav) bottomNav.classList.remove('hidden');
            if (coverPage) coverPage.classList.add('slide-up');

            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if (btnMusic) {
                        btnMusic.innerText = "🎵";
                        btnMusic.classList.remove('hidden');
                    }
                }).catch(err => {
                    isPlaying = false;
                    if (btnMusic) {
                        btnMusic.innerText = "🔇";
                        btnMusic.classList.remove('hidden');
                    }
                });
            }

            setTimeout(() => {
                if (coverPage) coverPage.style.display = "none";
            }, 1000);
        });
    }

    if (btnMusic) {
        btnMusic.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                isPlaying = false;
                btnMusic.innerText = "🔇";
            } else {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    btnMusic.innerText = "🎵";
                }).catch(e => {
                    console.log("Gagal memutar musik:", e);
                });
            }
        });
    }

    // 4. Hitung Mundur (Countdown)
    const countDate = new Date(`${weddingConfig.date}T00:00:00+07:00`).getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const distance = countDate - now;
        if (distance < 0) return;

        const daysEl = document.getElementById("cd-days");
        const hoursEl = document.getElementById("cd-hours");
        const minsEl = document.getElementById("cd-minutes");
        const secsEl = document.getElementById("cd-seconds");

        if (daysEl) daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        if (hoursEl) hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (minsEl) minsEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        if (secsEl) secsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);

    // 5. Render 15 Foto Kolase Grid dengan Lightbox & Pinch-to-Zoom
    const collageGrid = document.getElementById('collage-grid');
    if(collageGrid && weddingConfig.gallery) {
        weddingConfig.gallery.forEach((imgData, index) => {
            const item = document.createElement('div');
            item.classList.add('collage-item');
            item.innerHTML = `<img src="${imgData.src}" alt="${imgData.alt}" data-index="${index}">`;
            
            // Event klik untuk membuka lightbox
            item.addEventListener('click', () => {
                openLightbox(index);
            });

            collageGrid.appendChild(item);
        });
    }

    // Variabel dan Logika Lightbox
    let currentImageIndex = 0;
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const zoomContainer = document.getElementById('lightbox-zoom-container');

    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let startX = 0;
    let startY = 0;
    let initialDistance = null;

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightboxModal.classList.remove('hidden');
        resetZoom();
    }

    function closeLightbox() {
        lightboxModal.classList.add('hidden');
        resetZoom();
    }

    function updateLightboxImage() {
        if(weddingConfig.gallery[currentImageIndex]) {
            lightboxImg.src = weddingConfig.gallery[currentImageIndex].src;
            resetZoom();
        }
    }

    function resetZoom() {
        scale = 1;
        pointX = 0;
        pointY = 0;
        setTransform();
    }

    function setTransform() {
        lightboxImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    }

    if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    if(lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length;
            updateLightboxImage();
        });
    }

    if(lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % weddingConfig.gallery.length;
            updateLightboxImage();
        });
    }

    // Tutup saat klik di luar gambar
    if(lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if(e.target === lightboxModal || e.target === zoomContainer) {
                closeLightbox();
            }
        });
    }

    // Fitur Gestur Pinch-to-Zoom (Dua Jari) & Geser untuk Mobile/Desktop
    if(zoomContainer) {
        zoomContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const xs = (e.clientX - pointX) / scale;
            const ys = (e.clientY - pointY) / scale;
            if (e.deltaY < 0) {
                scale = Math.min(scale * 1.1, 4);
            } else {
                scale = Math.max(scale / 1.1, 1);
            }
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;
            setTransform();
        });

        zoomContainer.addEventListener('pointerdown', (e) => {
            if (scale > 1) {
                panning = true;
                startX = e.clientX - pointX;
                startY = e.clientY - pointY;
                zoomContainer.setPointerCapture(e.pointerId);
            }
        });

        zoomContainer.addEventListener('pointermove', (e) => {
            if (!panning) return;
            pointX = e.clientX - startX;
            pointY = e.clientY - startY;
            setTransform();
        });

        zoomContainer.addEventListener('pointerup', (e) => {
            panning = false;
        });

        // Touch event untuk Pinch Zoom HP
        zoomContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        });

        zoomContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && initialDistance) {
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const factor = currentDistance / initialDistance;
                scale = Math.min(Math.max(scale * factor, 1), 4);
                initialDistance = currentDistance;
                setTransform();
            }
        });

        zoomContainer.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) {
                initialDistance = null;
            }
        });
    }

    // 6. Logika Kirim Ucapan RSVP
    const btnRsvp = document.getElementById('btn-rsvp');
    if(btnRsvp) {
        btnRsvp.addEventListener('click', () => {
            const name = document.getElementById('rsvp-name').value;
            const status = document.getElementById('rsvp-status').value;
            const msg = document.getElementById('rsvp-message').value;

            if(!name || !msg) {
                alert("Silakan lengkapi nama dan ucapan Anda.");
                return;
            }

            const displayArea = document.getElementById('rsvp-display-area');
            if (displayArea) displayArea.classList.remove('hidden');

            const messageList = document.getElementById('rsvp-messages-list');
            if (messageList) {
                const messageItem = document.createElement('div');
                messageItem.classList.add('rsvp-message-item');
                messageItem.innerHTML = `<h5>${name} <span>${status}</span></h5><p>"${msg}"</p>`;
                messageList.prepend(messageItem);
            }
            
            const msgInput = document.getElementById('rsvp-message');
            if (msgInput) msgInput.value = '';
            
            btnRsvp.innerText = "Berhasil Dikirim!";
            setTimeout(() => { btnRsvp.innerText = "Kirim Ucapan"; }, 3000);
        });
    }

    // 7. Slideshow Background Otomatis setiap 4 Detik (Transisi Smooth)
    const heroSection = document.getElementById('hero-section');
if (heroSection && weddingConfig.bgSlideshow && weddingConfig.bgSlideshow.length > 0) {
    let currentIndex = 0;
    heroSection.style.backgroundImage = `url('${weddingConfig.bgSlideshow[0]}')`;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % weddingConfig.bgSlideshow.length;
        heroSection.style.backgroundImage = `url('${weddingConfig.bgSlideshow[currentIndex]}')`;
    }, 4000); // Berganti setiap 4 detik
}

    // 8. Skrip Intersect Observer untuk Transisi Scroll Elegan
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'fade-in-up');
            }
        });
    }, observerOptions);

    setTimeout(() => {
        const animatedElements = document.querySelectorAll('section, .couple-card, .story-card, .card, .collage-item, .bank-card');
        animatedElements.forEach(el => observer.observe(el));
    }, 500);
});

// Fungsi Salin Rekening
function copyAccount(accNumber, btnEl) {
    navigator.clipboard.writeText(accNumber).then(() => {
        const originalText = btnEl.innerText;
        btnEl.innerText = "Tersalin!";
        setTimeout(() => { btnEl.innerText = originalText; }, 2000);
    });
    // Otomatis menampilkan semua foto dari folder assets (kecuali background1) dengan sudut kotak
    const bannerContainer = document.getElementById('dynamic-photo-banner');
    if (bannerContainer && weddingConfig.gallery) {
        // Menyaring foto selain background1.png atau foto yang tidak diinginkan
        const filteredPhotos = weddingConfig.gallery.filter(item => !item.src.includes('background1.png'));
        
        filteredPhotos.forEach(photo => {
            const imgEl = document.createElement('img');
            imgEl.src = photo.src;
            imgEl.alt = photo.alt || 'Prewedding Photo';
            imgEl.classList.add('banner-photo-item');
            bannerContainer.appendChild(imgEl);
        });
    }
}// Fungsi Lightbox Galeri (Tap-to-Zoom)
    window.openLightbox = function(imageSrc) {
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        if (modal && modalImg) {
            modal.style.display = 'flex';
            modalImg.src = imageSrc;
        }
    }

    window.closeLightbox = function() {
        const modal = document.getElementById('lightbox-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
    const btnRsvp = document.getElementById('btn-rsvp');
    const messagesList = document.getElementById('rsvp-messages-list');
    
    if (btnRsvp) {
        btnRsvp.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ambil nilai dari input form
            const nameInput = document.getElementById('rsvp-name');
            const attendanceInput = document.querySelector('input[name="attendance"]:checked');
            const messageInput = document.getElementById('rsvp-message');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const attendance = attendanceInput ? attendanceInput.value : 'Hadir';
            const message = messageInput ? messageInput.value.trim() : '';
            
            // Validasi sederhana jika nama kosong
            if (!name) {
                alert('Mohon masukkan nama Anda terlebih dahulu.');
                if (nameInput) nameInput.focus();
                return;
            }
            
            if (!message) {
                alert('Mohon tuliskan pesan & doa untuk mempelai.');
                if (messageInput) messageInput.focus();
                return;
            }
            
            // Hapus teks "Belum ada ucapan" jika itu elemen pertamanya
            const noMsgEl = messagesList.querySelector('.no-message');
            if (noMsgEl) {
                noMsgEl.remove();
            }
            
            // Buat elemen kartu pesan baru
            const messageCard = document.createElement('div');
            messageCard.className = 'rsvp-message-item';
            
            // Tentukan badge kehadiran (warna hijau jika hadir, merah jika tidak)
            const badgeClass = attendance === 'Hadir' ? 'badge- hadir' : 'badge-absent';
            
            messageCard.innerHTML = `
                <h5>
                    <span class="sender-name">${escapeHtml(name)}</span>
                    <span class="attendance-badge ${badgeClass}">${attendance}</span>
                </h5>
                <p class="sender-message">${escapeHtml(message)}</p>
                <small class="message-time">Baru saja</small>
            `;
            
            // Masukkan pesan baru di urutan paling atas daftar
            messagesList.prepend(messageCard);
            
            // Reset form pesan (nama dibiarkan agar tidak perlu mengetik ulang jika ingin melihat)
            if (messageInput) messageInput.value = '';
            
            alert('Terima kasih! Konfirmasi kehadiran dan ucapan Anda berhasil dikirim.');
        });
    }
});

// Fungsi keamanan kecil untuk mencegah karakter HTML asing
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}