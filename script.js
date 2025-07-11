let mouseStopTimeout; // Variabel untuk menampung timer

document.addEventListener('mousemove', (e) => {
    // Menghitung posisi mouse dari tengah layar (nilai dari -1 sampai 1)
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;

    // Pilih elemen gambar yang akan dianimasikan
    const image = document.querySelector('.char-image-large');

    // Hapus timer sebelumnya setiap kali mouse bergerak
    clearTimeout(mouseStopTimeout);

    // Terapkan transformasi ke gambar, dengan mempertahankan posisi vertikalnya
    if (image) {
        // Tentukan seberapa kuat gambar akan bergerak (kekuatan paralaks)
        const imageStrength = 80;
        image.style.transform = `translateY(-50%) translate(${x * imageStrength}px, ${y * imageStrength}px)`;
    }

    // Atur timer baru. Jika mouse tidak bergerak selama 100ms, kembalikan gambar ke posisi semula.
    mouseStopTimeout = setTimeout(() => {
        if (image) {
            image.style.transform = 'translateY(-50%)';
        }
    }, 300);
});

/* --- LOGIKA UNTUK BAGIAN SOFTWARE & SKILLS --- */

// Data untuk setiap skill (Single Source of Truth)
const skillsData = {
    canva: {
        name: 'Canva',
        description: 'Demonstrates a high level of proficiency in utilizing Canva for professional gra[hic design purposes including but not limited to social media content creation, presentation layout, and visual branding materials. Capable of effectively employing advance tools and design principles to produce cohesive and visually engaging result.',
        level: '90%'
    },
    csp: {
        name: 'Clip Studio Paint',
        description: 'Possesses strong command of Clip Studio Paint, particularly in the areas of digital illustration, and storyboard development. Adept at applying the softwares full range of features to support a professional and efficient creative workflow.',
        level: '85%'
    },
    capcut: {
        name: 'CapCut',
        description: 'Adequately skilled in using CapCut for video editing tasks such as trimming, applying effects, inserting transitions, and adding teks overlays. Capable of producing concise and polished video content suited for digital platforms',
        level: '50%'
    },
    blender: {
        name: 'Blender 3D',
        description: 'Holds moderate proficiency in Blender, with a focus on creating basic 3D animations. Failiar with essential workflows such as keyframing, timeline manipulation, and simple rigging to produce fundamental animated sequences for creative project.',
        level: '60%'
    }
};

// Ambil semua elemen yang dibutuhkan dari DOM
const skillsTitle = document.querySelector('.skills-title');
const skillsGrid = document.querySelector('.skills-grid');
const skillItems = document.querySelectorAll('.skill-item');
const skillDetailsContainer = document.querySelector('.skill-details-container');
const skillName = document.getElementById('skill-name');
const skillDescription = document.getElementById('skill-description');
const skillLevel = document.getElementById('skill-level');

// Event listener untuk judul
skillsTitle.addEventListener('click', () => {
    // Toggle kelas untuk animasi judul dan visibilitas grid
    skillsTitle.classList.toggle('title-clicked');
    const isGridBecomingVisible = skillsGrid.classList.toggle('is-visible');

    // Jika grid disembunyikan (karena diklik ulang), sembunyikan juga detail skill
    if (!isGridBecomingVisible) {
        skillDetailsContainer.classList.remove('is-visible');
        skillItems.forEach(item => item.classList.remove('active')); // Hapus status aktif pada ikon
    }
});

// Event listener untuk setiap ikon skill
skillItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const currentItem = e.currentTarget;

        // Cek apakah item yang diklik sudah aktif
        if (currentItem.classList.contains('active')) {
            // Jika sudah aktif, sembunyikan detail dan hapus status aktif
            skillDetailsContainer.classList.remove('is-visible');
            currentItem.classList.remove('active');
            return; // Hentikan eksekusi fungsi di sini
        }

        // Hapus kelas 'active' dari semua item lain
        skillItems.forEach(i => i.classList.remove('active'));
        // Tambahkan kelas 'active' ke item yang diklik
        currentItem.classList.add('active');

        const skillKey = currentItem.dataset.skill;
        const data = skillsData[skillKey];

        // Perbarui konten detail
        skillName.textContent = data.name;
        skillDescription.textContent = data.description;
        skillLevel.style.width = data.level;

        // Tampilkan kontainer detail
        skillDetailsContainer.classList.add('is-visible');
    });
});

/* --- LOGIKA UNTUK BAGIAN KARYA (WORKS) & INISIALISASI HALAMAN --- */

// Gabungkan semua logika yang perlu dijalankan setelah halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // --- Animasi Fade-in saat halaman dimuat ---
    const elementToFadeIn = document.querySelector('.fade-in-on-load');
    if (elementToFadeIn) {
        // Diberi sedikit penundaan agar transisi terlihat
        setTimeout(() => elementToFadeIn.classList.add('is-visible'), 200);
    }

    // --- DATA PROYEK ---
    // Menyimpan semua data proyek di satu tempat agar mudah dikelola.
    // 'id' harus sama dengan 'data-project-id' pada slide di HTML Anda.
    const projectsData = {
        'project-a': {
            title: 'Bercelo-teh',
            description: 'IIn this project, which is a childrens story with a comedic tone, I designed the characters comprehensively-starting from body shape exploration and emotional expressions to various perspective angles. The design process included silhouette development, dynamic pose studies, facial expression variations, as well as the application of color and costume choices that align with the storys setting. The goal of this assignment was to create visually strong characters with consistent personalities across different situations.',
            images: [
                'img/works/project1/image1.png',
                'img/works/project1/image2.png',
                'img/works/project1/image3.png',
                'img/works/project1/image4.png',
                'img/works/project1/image5.png',
                'img/works/project1/image6.png'
            ]
        },
        'project-b': {
            title: 'Jejak Tarana',
            description: 'The art concept in the game Jejak Tarana adopts a retro pixel art visual style to evoke a simple yet meaningful classic atmosphere. Character designs are created with minimalistic proportions while remaining expressive through pixel details that clearly convey movement and interaction. All environmental assets-including houses, trees, village roads, piles of trash, and other interactive elements-are designed using a limited color palette to create a sense of nostalgia and visual consistency. This retro style was chosen to support the story about change that begins with small steps, while also offering a warm and recognizable gameplay experience for players across generations..',
            images: [
                'img/works/project2/image1.png',
                'img/works/project2/image2.png',
                'img/works/project2/image3.png',
                'img/works/project2/image4.png',
                
            ]
        }
    };

    // --- ELEMEN DOM UNTUK DETAIL PROYEK ---
    const detailsContainer = document.querySelector('.project-details-container');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailSliderWrapper = document.querySelector('.project-images-slider .swiper-wrapper');
    let detailSwiper = null; // Variabel untuk menampung instance slider detail

    // --- FUNGSI UNTUK MENGELOLA DETAIL PROYEK ---

    /**
     * Menampilkan atau memperbarui detail proyek berdasarkan ID.
     * @param {string} projectId - ID dari proyek yang akan ditampilkan.
     */
    function showOrUpdateProjectDetails(projectId) {
        const projectData = projectsData[projectId];
        if (!projectData) return;

        // 1. Isi deskripsi dan judul
        detailTitle.textContent = projectData.title;
        detailDescription.textContent = projectData.description;

        // 2. Buat slide baru untuk slider detail
        detailSliderWrapper.innerHTML = ''; // Kosongkan wrapper
        projectData.images.forEach(imageUrl => {
            detailSliderWrapper.innerHTML += `<div class="swiper-slide"><img src="${imageUrl}" alt="${projectData.title}"></div>`;
        });

        // 3. Tampilkan kontainer detail dan scroll jika pertama kali
        if (!detailsContainer.classList.contains('is-visible')) {
            detailsContainer.classList.add('is-visible');
            detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // 4. Inisialisasi atau update slider detail
        if (detailSwiper) detailSwiper.destroy(true, true);

        detailSwiper = new Swiper('.project-images-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: false,
            speed: 600,
            coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
            navigation: { nextEl: '.detail-swiper-button-next', prevEl: '.detail-swiper-button-prev' }
        });
    }

    function hideProjectDetails() {
        detailsContainer.classList.remove('is-visible');
    }

    // --- INISIALISASI SLIDER ---

    // 1. Slider utama (cover)
    const mainSwiper = new Swiper('.works-slider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: false,
        speed: 600,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        navigation: {
            nextEl: '.main-swiper-button-next',
            prevEl: '.main-swiper-button-prev'
        }
    });

    // --- EVENT LISTENERS ---

    // --- EVENT LISTENER UNTUK KLIK COVER ---
    document.querySelectorAll('.works-slider .swiper-slide').forEach(slide => {
        if (slide.classList.contains('coming-soon')) return; // Abaikan slide 'coming-soon'

        slide.addEventListener('click', function() {
            showOrUpdateProjectDetails(this.dataset.projectId);
        });
    });

    // --- EVENT LISTENER UNTUK PERUBAHAN SLIDE COVER UTAMA ---
    mainSwiper.on('slideChange', function () {
        // Hanya perbarui jika kontainer detail sudah terlihat
        if (detailsContainer.classList.contains('is-visible')) {
            const activeSlide = this.slides[this.activeIndex];

            if (activeSlide.classList.contains('coming-soon')) {
                hideProjectDetails();
            } else {
                showOrUpdateProjectDetails(activeSlide.dataset.projectId);
            }
        }
    });
});