const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];
const numOptions = 5;
const arcSize = (2 * Math.PI) / numOptions;
const radius = 250;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    for (let i = 0; i < numOptions; i++) {
        const angle = arcSize * i - Math.PI / 2;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(250, 250, radius, angle, angle + arcSize, false);
        ctx.lineTo(250, 250);
        ctx.fill();
        ctx.stroke();
    }
}

function spin() {
    const spinTime = Math.random() * 3000 + 2000;  // Spin between 2 and 5 seconds
    const startAngle = Math.random() * 2 * Math.PI;
    let currentAngle = startAngle;
    const rotateWheel = (timestamp) => {
        if (currentAngle < startAngle + spinTime) {
            drawWheel();
            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(currentAngle);
            ctx.translate(-250, -250);
            ctx.restore();
            currentAngle += Math.PI / 32;
            requestAnimationFrame(rotateWheel);
        }
    };
    requestAnimationFrame(rotateWheel);
}

spinButton.addEventListener('click', spin);

drawWheel();
