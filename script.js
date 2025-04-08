// Mendapatkan elemen canvas dan konteks 2D
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Fungsi untuk mengubah ukuran canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight); // Menyesuaikan tinggi agar sesuai dengan seluruh halaman
}

resizeCanvas();

// Array untuk menyimpan bentuk-bentuk
const shapes = [];

// Fungsi untuk membuat bentuk-bentuk secara acak
function createShapes() {
    for (let i = 0; i < 50; i++) {
        const shapeType = Math.floor(Math.random() * 3);
        const shape = {
            type: shapeType, // Jenis bentuk (0: lingkaran, 1: persegi, 2: segitiga)
            x: Math.random() * canvas.width, // Posisi X
            y: Math.random() * canvas.height, // Posisi Y
            size: Math.random() * 50, // Ukuran bentuk
            dx: (Math.random() - 0.5) * 2, // Kecepatan horizontal
            dy: (Math.random() - 0.5) * 2, // Kecepatan vertikal
            color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)` // Warna acak
        };
        shapes.push(shape);
    }
}

// Fungsi untuk menggambar bentuk-bentuk di canvas
function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Membersihkan canvas
    shapes.forEach(shape => {
        ctx.beginPath();
        ctx.fillStyle = shape.color;
        switch (shape.type) {
            case 0: // Lingkaran
                ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
                break;
            case 1: // Persegi
                ctx.rect(shape.x, shape.y, shape.size, shape.size);
                break;
            case 2: // Segitiga
                ctx.moveTo(shape.x, shape.y);
                ctx.lineTo(shape.x + shape.size, shape.y + shape.size);
                ctx.lineTo(shape.x - shape.size, shape.y + shape.size);
                ctx.closePath();
                break;
        }
        ctx.fill();
    });
}

// Fungsi untuk memperbarui posisi bentuk-bentuk
function updateShapes() {
    shapes.forEach(shape => {
        shape.x += shape.dx;
        shape.y += shape.dy;

        // Membalik arah jika bentuk mencapai batas canvas
        if (shape.x + shape.size > canvas.width || shape.x - shape.size < 0) {
            shape.dx *= -1;
        }
        if (shape.y + shape.size > canvas.height || shape.y - shape.size < 0) {
            shape.dy *= -1;
        }
    });
}

// Fungsi animasi untuk menggambar dan memperbarui bentuk-bentuk
function animate() {
    drawShapes();
    updateShapes();
    requestAnimationFrame(animate);
}

createShapes(); // Membuat bentuk-bentuk awal
animate(); // Memulai animasi

// Menangani perubahan ukuran jendela
window.addEventListener('resize', () => {
    resizeCanvas(); // Mengubah ukuran canvas
    shapes.length = 0; // Menghapus bentuk-bentuk lama
    createShapes(); // Membuat bentuk-bentuk baru
});


