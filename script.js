// Jalankan script saat seluruh elemen DOM sudah siap
document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil elemen-elemen input (sliders)
    const columnsInput = document.getElementById("columnsInput");
    const gapInput = document.getElementById("gapInput");
    const heightInput = document.getElementById("heightInput");

    // 2. Ambil elemen penampil teks nilai
    const columnsVal = document.getElementById("columnsVal");
    const gapVal = document.getElementById("gapVal");
    const heightVal = document.getElementById("heightVal");

    // 3. Ambil elemen target galeri dan output CSS
    const gridGallery = document.getElementById("gridGallery");
    const cssCode = document.getElementById("cssCode");
    const copyBtn = document.getElementById("copyBtn");

    // Fungsi utama untuk memperbarui tata letak CSS Grid
    function updateGrid() {
        const cols = columnsInput.value;
        const gap = gapInput.value;
        const height = heightInput.value;

        // Update teks label nilai slider
        columnsVal.textContent = cols;
        gapVal.textContent = `${gap}px`;
        heightVal.textContent = `${height}px`;

        // Terapkan perubahan gaya langsung ke elemen galeri
        gridGallery.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridGallery.style.gap = `${gap}px`;

        // Terapkan tinggi ke seluruh elemen item foto
        const items = document.querySelectorAll(".gallery-item");
        items.forEach(function (item) {
            item.style.height = `${height}px`;
        });

        // Hasilkan teks string kode CSS untuk ditampilkan di textarea
        const generatedCSS = `.gallery-container {\n  display: grid;\n  grid-template-columns: repeat(${cols}, 1fr);\n  gap: ${gap}px;\n}\n\n.gallery-item {\n  height: ${height}px;\n}`;
        cssCode.value = generatedCSS;
    }

    // 4. Tambahkan Event Listener pada slider input (real-time)
    columnsInput.addEventListener("input", updateGrid);
    gapInput.addEventListener("input", updateGrid);
    heightInput.addEventListener("input", updateGrid);

    // 5. Fitur Salin Kode CSS ke Clipboard
    copyBtn.addEventListener("click", function () {
        cssCode.select();
        cssCode.setSelectionRange(0, 99999); // Untuk perangkat seluler

        navigator.clipboard.writeText(cssCode.value)
            .then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = "Tersalin! ✓";
                copyBtn.style.backgroundColor = "#2980b9";

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.backgroundColor = "#27ae60";
                }, 1500);
            })
            .catch((err) => {
                alert("Gagal menyalin kode.");
            });
    });

    // Jalankan fungsi awal untuk inisialisasi tampilan awal
    updateGrid();
});
