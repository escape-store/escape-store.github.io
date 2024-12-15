// Snowfall effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.opacity = Math.random();
    snowflake.style.width = snowflake.style.height = Math.random() * 5 + 2 + 'px';
    
    document.getElementById('snowfall').appendChild(snowflake);
    
    let animation = snowflake.animate([
        { transform: 'translateY(-5vh)' },
        { transform: `translateY(105vh)` }
    ], {
        duration: Math.random() * 2000 + 3000,
        iterations: Infinity
    });
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

setInterval(createSnowflake, 100);

// Star options
const starAmounts = [15, 25, 50, 75, 100, 150, 250, 300, 500, 750, 1000, 2500];
const starsGrid = document.querySelector('.stars-grid');

starAmounts.forEach(amount => {
    const option = document.createElement('div');
    option.classList.add('star-option');
    option.textContent = amount;
    option.addEventListener('click', () => {
        document.querySelectorAll('.star-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
    starsGrid.appendChild(option);
});

// Payment options
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Terms modal
const termsBtn = document.getElementById('termsBtn');
const termsModal = document.getElementById('termsModal');

termsBtn.addEventListener('click', () => {
    termsModal.style.display = 'block';
});

termsModal.addEventListener('click', (e) => {
    if (e.target === termsModal) {
        termsModal.style.display = 'none';
    }
});
