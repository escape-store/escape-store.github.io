const CONFIG = {
    PAYMENT_LINKS: {
        playerok: {
            15: "",
            25: "",
            50: "https://playerok.com/products/8ac9a51c5640-50-zvezd-cherez-username-escape-store",
            75: "https://playerok.com/products/a1b5a3d00362-75-zvezd-cherez-username-escape-store",
            100: "",
            150: "",
            250: "",
            300: "",
            500: "",
            750: "",
            1000: "",
            2500: ""
        },
        telegram: {
            15: "",
            25: "",
            50: "",
            75: "",
            100: "",
            150: "",
            250: "",
            300: "",
            500: "",
            750: "",
            1000: "",
            2500: ""
        }
    },
    PRICES: {
        playerok: {
            15: "12$",
            25: "18$",
            50: "30$",
            75: "42$",
            100: "54$",
            150: "78$",
            250: "120$",
            300: "144$",
            500: "228$",
            750: "336$",
            1000: "420$",
            2500: "960$"
        },
        telegram: {
            15: "0.099 TON",
            25: "0.139 TON",
            50: "0.159 TON",
            75: "0.229 TON",
            100: "0.289 TON",
            150: "0.409 TON",
            250: "0.629 TON",
            300: "0.889 TON",
            500: "1.249 TON",
            750: "1.849 TON",
            1000: "2.449 TON",
            2500: "6.039 TON"
        }
    }
};

class SnowEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.init();
        this.animate();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        for(let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 4 + 1,
                speed: Math.random() * 3 + 1,
                opacity: Math.random()
            });
        }
    }

    resize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    animate() {
        if (!this.ctx || !this.canvas) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${document.body.classList.contains('light-theme') ? '0,0,0' : '255,255,255'}, ${particle.opacity})`;
            this.ctx.fill();

            particle.y += particle.speed;

            if(particle.y > this.canvas.height) {
                particle.y = -10;
                particle.x = Math.random() * this.canvas.width;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

let selectedQuantity = null;
let selectedPayment = null;

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize snow effects
    ['snow', 'snow-buy', 'snow-terms'].forEach(id => {
        new SnowEffect(id);
    });

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    // Quantity options
    const quantities = [15, 25, 50, 75, 100, 150, 250, 300, 500, 750, 1000, 2500];
    const quantityGrid = document.querySelector('.quantity-grid');
    
    if (quantityGrid) {
        quantities.forEach(qty => {
            const button = document.createElement('button');
            button.className = 'quantity-option';
            button.textContent = qty;
            button.addEventListener('click', () => {
                document.querySelectorAll('.quantity-option').forEach(btn => 
                    btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedQuantity = qty;
                updatePayButton();
            });
            quantityGrid.appendChild(button);
        });
    }

    // Payment options
    document.querySelectorAll('.payment-option').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(btn => 
                btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedPayment = button.textContent.toLowerCase();
            updatePayButton();
        });
    });

    // Buy button
    document.querySelector('#buy .buy-button')?.addEventListener
