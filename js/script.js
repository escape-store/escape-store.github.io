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
    },
    TELEGRAM_CHANNEL: "https://t.me/escape_store",
    SUPPORT_EMAIL: "escape-store@ccmail.uk"
};

class SnowEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
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

document.addEventListener('DOMContentLoaded', () => {
    // Initialize snow effects
    new SnowEffect('snow');
    new SnowEffect('snow-buy');
    new SnowEffect('snow-terms');

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.dataset.page) {
                e.preventDefault();
                showPage(link.dataset.page);
            }
        });
    });

    document.querySelector('.buy-button')?.addEventListener('click', () => {
        showPage('buy');
    });

    const quantities = [15, 25, 50, 75, 100, 150, 250, 300, 500, 750, 1000, 2500];
    const quantityGrid = document.querySelector('.quantity-grid');
    let selectedQuantity = null;
    let selectedPayment = null;

    quantities.forEach(qty => {
        const button = document.createElement('button');
        button.className = 'quantity-option';
        button.textContent = qty;
        button.addEventListener('click', () => selectQuantity(button));
        quantityGrid.appendChild(button);
    });

    function selectQuantity(button) {
        document.querySelectorAll('.quantity-option').forEach(btn => 
            btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedQuantity = button.textContent;
        updatePayButton();
    }

    document.querySelectorAll('.payment-option').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(btn => 
                btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedPayment = button.textContent.toLowerCase();
            updatePayButton();
        });
    });

    function showOrderModal() {
        const modal = document.getElementById('order-modal');
        const details = modal.querySelector('.order-details');
        const proceedButton = modal.querySelector('.proceed-button');
        const notice = modal.querySelector('.availability-notice');
        
        details.innerHTML = `
            <span class="detail-label">Amount:</span> <span class="detail-value">${selectedQuantity} stars</span><br>
            <span class="detail-label">Method:</span> <span class="detail-value">${selectedPayment}</span><br>
            <span class="detail-label">Price:</span> <span class="detail-value">${CONFIG.PRICES[selectedPayment][selectedQuantity]}</span>
        `;
        
        const paymentLink = CONFIG.PAYMENT_LINKS[selectedPayment][selectedQuantity];
        
        if (paymentLink) {
            proceedButton.onclick = () => window.location.href = paymentLink;
            notice.textContent = '';
        } else {
            notice.textContent = 'Not available now';
        }
        
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            if (selectedQuantity && selectedPayment) {
                showOrderModal();
            }
        });
    });

    window.onclick = (e) => {
        const modal = document.getElementById('order-modal');
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };

    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => 
            page.classList.remove('active'));
        document.getElementById(`${pageId}-page`).classList.add('active');
    }
});