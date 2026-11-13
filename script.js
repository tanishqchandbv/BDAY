// --- Photo Array (Randomized Order) ---
const photoUrls = [
    "/Images/Image5.jpeg",
    "/Images/Image2.jpeg",
    "/Images/Image8.jpeg",
    "/Images/Image1.jpeg",
    "/Images/Image6.jpeg",
    "/Images/Image3.jpeg",
    "/Images/Image7.jpeg",
    "/Images/Image4.jpeg"
];

// --- DUAL-MODE BACKGROUND ANIMATION ---
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
let bgMode = 'hacker'; 
let particles = [];
const hackerChars = ['0', '1', '{', '}', '<', '>', '@', '#', '$', '%', '&', '*'];

function initParticles() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 50; i++) particles.push(createParticle());
}

function createParticle(reset = false) {
    let p = { x: Math.random() * bgCanvas.width, size: Math.random() * 10 + 10 };
    if (bgMode === 'hacker') {
        p.y = reset ? -20 : Math.random() * bgCanvas.height; 
        p.speedY = Math.random() * 1.5 + 0.5; 
        p.char = hackerChars[Math.floor(Math.random() * hackerChars.length)];
        p.color = Math.random() > 0.5 ? 'rgba(13, 212, 186, 0.4)' : 'rgba(74, 246, 38, 0.4)'; 
    } else {
        p.y = reset ? bgCanvas.height + 20 : Math.random() * bgCanvas.height; 
        p.speedY = Math.random() * 0.5 + 0.2; 
        p.char = Math.random() > 0.5 ? '<3' : '♥';
        p.color = Math.random() > 0.5 ? 'rgba(255, 50, 100, 0.7)' : 'rgba(255, 150, 200, 0.7)'; 
    }
    return p;
}

function animateParticles() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    particles.forEach(p => {
        bgCtx.fillStyle = p.color;
        bgCtx.font = `${p.size}px monospace`;
        bgCtx.fillText(p.char, p.x, p.y);
        
        if (bgMode === 'hacker') {
            p.y += p.speedY; 
            if (Math.random() < 0.05) p.char = hackerChars[Math.floor(Math.random() * hackerChars.length)];
            if (p.y > bgCanvas.height + 20) Object.assign(p, createParticle(true));
        } else {
            p.y -= p.speedY; 
            if (p.y < -20) Object.assign(p, createParticle(true));
        }
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);
initParticles();
animateParticles();

// --- NAVIGATION LOGIC ---
let activeStep = 0;

function nextStep(targetNum) {
    const currentStep = document.getElementById('step' + activeStep);
    const nextStepEl = document.getElementById('step' + targetNum);
    
    if(currentStep) currentStep.classList.add('tv-turn-off');
    
    setTimeout(() => {
        if(currentStep) {
            currentStep.style.display = 'none';
            currentStep.classList.remove('tv-turn-off');
        }
        
        if(nextStepEl) {
            if(targetNum === 6) {
                nextStepEl.style.display = 'flex';
            } else {
                nextStepEl.style.display = 'block';
            }
            
            nextStepEl.classList.add('tv-turn-on');
            activeStep = targetNum;
            
            setTimeout(() => {
                nextStepEl.classList.remove('tv-turn-on');
                if(targetNum === 5) initFinalReveal(); 
            }, 600);
        }
    }, 600);
}

// --- STEP 0: Boot Sequence ---
const bootLines = [
    "ZION.OS v9.4 initializing...",
    "Mounting root filesystem... OK",
    "Initializing Apache Kafka heartbeat streams... OK",
    "Allocating Apache Spark clusters for romantic memory analytics... OK",
    "Establishing secure uplink to Central_Perk... OK",
    "Querying Hive metastore for 'Lobster' status... MATCH FOUND",
    "Bypassing standard firewall protocols...",
    "Boot sequence complete."
];

async function runBootSequence() {
    const term = document.getElementById('bootTerminal');
    for (let i = 0; i < bootLines.length; i++) {
        let currentText = term.innerHTML;
        for (let j = 0; j < bootLines[i].length; j++) {
            currentText += bootLines[i].charAt(j);
            term.innerHTML = currentText;
            await new Promise(r => setTimeout(r, 20)); 
        }
        term.innerHTML += "<br>";
        await new Promise(r => setTimeout(r, 300)); 
    }
    term.classList.remove('active-typing');
    setTimeout(() => nextStep(1), 1000); 
}
window.onload = runBootSequence;

// --- STEP 1: Login Logic ---
function submitLogin() {
    const rawInput = document.getElementById('nicknameInput').value;
    const cleanInput = rawInput.trim().toLowerCase();
    
    if (cleanInput === '') {
        document.getElementById('loginError').innerText = "> ERR: FIELD CANNOT BE EMPTY";
    } else if (cleanInput !== 'sleepybean') {
        document.getElementById('loginError').innerText = "> ACCESS DENIED. UNRECOGNIZED ENTITY.";
    } else {
        document.getElementById('loginError').innerText = "";
        document.getElementById('displayNickname').innerText = rawInput; 
        nextStep(2); 
    }
}

// --- STEP 3: Truth Verification Riddle (The Runaway Button) ---
const btnWrong = document.getElementById('btnWrong');

function dodgeButton(e) {
    if(e.type === 'touchstart') e.preventDefault(); 
    
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 150) - 75;
    
    btnWrong.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    const taunts = [
        "> LIES DETECTED. TRY AGAIN.",
        "> ACCESS DENIED. SYSTEM REJECTS FALSEHOODS.",
        "> NICE TRY. BUT WE BOTH KNOW THE TRUTH.",
        "> ERROR 404: EGO NOT FOUND."
    ];
    document.getElementById('riddleError').innerText = taunts[Math.floor(Math.random() * taunts.length)];
}

btnWrong.addEventListener('mouseover', dodgeButton);
btnWrong.addEventListener('touchstart', dodgeButton);

btnWrong.addEventListener('click', () => {
    document.getElementById('riddleError').innerText = "> CHEAT DETECTED. BUT STILL... NO.";
});

function checkRiddle() {
    document.getElementById('riddlePrompt').innerHTML = 
        "<div style='text-align: center;'>" +
        "> VERIFIED. OBVIOUSLY I DO.<br>" +
        "> YOU ARE MY FAVORITE HUMAN.<br>" +
        "> SYSTEM UNLOCKED.<br>" +
        "</div>";
        
    document.getElementById('riddleError').innerText = "";
    document.getElementById('riddleBtns').style.display = 'none';
    
    setTimeout(() => nextStep(4), 3000); 
}

// --- STEP 4: Data Deck Logic ---
const deckReasons = [
    "DATA ENTRY #01: Because you actually laugh at my jokes.",
    "DATA ENTRY #02: You make even sitting feel like a date.",
    "DATA ENTRY #03: Because you're my ludkubean.",
    "DATA ENTRY #04: Your smile instantly resets my mood.",
    "DATA ENTRY #05: As if I need any reason to love you other than you being you."
];
let cardIndex = 0;
function drawCard() {
    const display = document.getElementById('cardText');
    display.innerText = "Processing...";
    setTimeout(() => {
        display.innerText = deckReasons[cardIndex % deckReasons.length];
        cardIndex++;
    }, 400);
}

// --- STEP 5: Final Holographic Reveal & Grid Expansion ---
let animatingBox = false;

function initFinalReveal() {
    animatingBox = true;
    const boxPre = document.getElementById('boxLayer');
    const ribbonPre = document.getElementById('ribbonLayer');
    const width = 70; const height = 35;
    let A = 0.4; let B = 0;   
    const points = []; const size = 1.2;

    for (let i = -size; i <= size; i += 0.04) {
        const edge = '#';
        points.push({x: i, y: -size, z: -size, c: edge, type: 'box'}, {x: i, y: size, z: -size, c: edge, type: 'box'},
                    {x: i, y: -size, z: size, c: edge, type: 'box'}, {x: i, y: size, z: size, c: edge, type: 'box'},
                    {x: -size, y: i, z: -size, c: edge, type: 'box'}, {x: size, y: i, z: -size, c: edge, type: 'box'},
                    {x: -size, y: i, z: size, c: edge, type: 'box'}, {x: size, y: i, z: size, c: edge, type: 'box'},
                    {x: -size, y: -size, z: i, c: edge, type: 'box'}, {x: size, y: -size, z: i, c: edge, type: 'box'},
                    {x: -size, y: size, z: i, c: edge, type: 'box'}, {x: size, y: size, z: i, c: edge, type: 'box'});
    }
    for (let i = -size; i <= size; i += 0.05) {
        for (let w = -0.15; w <= 0.15; w += 0.05) {
            const rb = '@';
            points.push({x: w, y: i, z: -size, c: rb, type: 'ribbon'}, {x: w, y: i, z: size, c: rb, type: 'ribbon'},
                        {x: w, y: -size, z: i, c: rb, type: 'ribbon'}, {x: w, y: size, z: i, c: rb, type: 'ribbon'},
                        {x: i, y: -size, z: w, c: rb, type: 'ribbon'}, {x: i, y: size, z: w, c: rb, type: 'ribbon'},
                        {x: -size, y: i, z: w, c: rb, type: 'ribbon'}, {x: size, y: i, z: w, c: rb, type: 'ribbon'});
        }
    }
    const bowRad = 0.4; const bowThick = 0.15;
    for (let a = 0; a < Math.PI * 2; a += 0.2) {
        for (let b = 0; b < Math.PI * 2; b += 0.2) {
            let tx = (bowRad + bowThick * Math.cos(b)) * Math.cos(a);
            let ty = (bowRad + bowThick * Math.cos(b)) * Math.sin(a);
            let tz = bowThick * Math.sin(b);
            points.push({x: tx + 0.35, y: -size - 0.2 + ty, z: tz, c: '*', type: 'ribbon'},
                        {x: tx - 0.35, y: -size - 0.2 + ty, z: tz, c: '*', type: 'ribbon'});
        }
    }

    function render3D() {
        if (!animatingBox) return;
        const bBox = new Array(width * height).fill(' ');
        const bRibbon = new Array(width * height).fill(' ');
        const zBuffer = new Array(width * height).fill(0);
        B += 0.01; 
        const cA = Math.cos(A), sA = Math.sin(A);
        const cB = Math.cos(B), sB = Math.sin(B);

        for (let p of points) {
            let xA = p.x * cB + p.z * sB;
            let zA = -p.x * sB + p.z * cB;
            let yA = p.y * cA - zA * sA;
            let zB = p.y * sA + zA * cA + 5; 
            let ooz = 1 / zB; 
            let xp = Math.floor(width / 2 + 45 * ooz * xA);
            let yp = Math.floor(height / 2 + 25 * ooz * yA); 
            let idx = xp + yp * width;
            if (idx >= 0 && idx < width * height && ooz > zBuffer[idx]) {
                zBuffer[idx] = ooz;
                if (p.type === 'ribbon') { bRibbon[idx] = p.c; bBox[idx] = ' '; } 
                else { bBox[idx] = p.c; bRibbon[idx] = ' '; }
            }
        }
        let strBox = '', strRibbon = '';
        for (let k = 0; k < width * height; k++) {
            let isBreak = (k % width === width - 1) ? '\n' : '';
            strBox += bBox[k] + isBreak; strRibbon += bRibbon[k] + isBreak;
        }
        boxPre.innerText = strBox; ribbonPre.innerText = strRibbon;
        requestAnimationFrame(render3D);
    }
    render3D();
}

function scrambleReveal(element, imageUrl) {
    const finalString = "[ DECRYPTING... ]";
    element.innerText = ''; 
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.innerText = finalString.split('').map((char, index) => {
            if (char === ' ') return char; 
            if (index < iterations) return char; 
            return chars[Math.floor(Math.random() * chars.length)]; 
        }).join('');
        
        if (iterations >= finalString.length) {
            clearInterval(interval);
            setTimeout(() => {
                element.parentElement.style.padding = '0';
                element.innerHTML = `<img src="${imageUrl}" class="decrypted-photo">`;
            }, 500); 
        }
        iterations += 0.5; 
    }, 40); 
}

document.getElementById('mainContainer').addEventListener('click', () => {
    if (!animatingBox) return;
    animatingBox = false; 
    
    document.getElementById('boxLayer').style.display = 'none';
    document.getElementById('ribbonLayer').style.display = 'none';
    document.getElementById('instructionText').innerText = "> EXTRACTING CORE...";
    
    const canvas = document.getElementById('heartCanvas');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'lighter';
    ctx.translate(canvas.width / 2, canvas.height / 2 + 20);
    ctx.scale(1, -1); 

    let i = 0;
    function drawHeart() {
        if (i >= 320) {
            let flash = document.createElement('div');
            flash.className = 'flash-burst';
            flash.style.animation = 'flashAnim 1.2s ease-out forwards';
            document.body.appendChild(flash); 
            
            setTimeout(() => {
                document.getElementById('mainContainer').style.display = 'none';
                document.getElementById('instructionText').style.display = 'none';
                
                const grid = document.getElementById('gridContainer');
                grid.style.display = 'grid';
                void grid.offsetWidth; 
                grid.style.opacity = '1';
                
                // --- SWITCH BACKGROUND TO ROMANTIC HEARTS ---
                bgMode = 'romantic'; 
                initParticles(); 
                
                for(let k = 1; k <= 8; k++) {
                    const frame = document.getElementById(`frame${k}`);
                    setTimeout(() => scrambleReveal(frame, photoUrls[k-1]), Math.random() * 1000);
                }

                setTimeout(() => {
                    const btn = document.getElementById('finalProtocolBtn');
                    btn.style.display = 'inline-block';
                    setTimeout(() => btn.style.opacity = '1', 50);
                }, 7000); 

            }, 600); 
            setTimeout(() => flash.remove(), 1200);
            return;
        }

        for (let step = 0; step < 1; step++) {
            if (i >= 320) break;
            let a = 2 * Math.PI * i / 320;
            let scale = 11; 
            let xo = 16 * Math.pow(Math.sin(a), 3) * scale;
            let yo = (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * scale;
            let L = 0.15 + Math.random() * 0.35; 
            let xi = xo * (1 - L); let yi = yo * (1 - L);

            for (let j = 0; j < 10; j++) {
                let f = j / 10; let next_f = (j + 1) / 10;
                let r = Math.floor((1 - 0.6 * f) * 255);
                let g = Math.floor((0.7 * (1 - f)) * 255);
                let b = Math.floor((0.8 * (1 - f)) * 255);
                ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(xo + (xi - xo) * f, yo + (yi - yo) * f);
                ctx.lineTo(xo + (xi - xo) * next_f, yo + (yi - yo) * next_f);
                ctx.stroke();
            }
            i++;
        }
        requestAnimationFrame(drawHeart);
    }
    drawHeart();
});

document.getElementById('finalProtocolBtn').addEventListener('click', () => {
    const centerMsg = document.getElementById('centerMsg');
    const rect = centerMsg.getBoundingClientRect(); 
    
    document.querySelectorAll('.ascii-frame').forEach(frame => {
        if (frame.id !== 'centerMsg') frame.classList.add('frame-fade-out');
    });
    
    centerMsg.style.position = 'fixed';
    centerMsg.style.top = rect.top + 'px';
    centerMsg.style.left = rect.left + 'px';
    centerMsg.style.width = rect.width + 'px';
    centerMsg.style.height = rect.height + 'px';
    centerMsg.style.margin = '0';
    centerMsg.style.transform = 'none';

    document.getElementById('initialMsg').style.display = 'none';
    void centerMsg.offsetWidth; 
    
    centerMsg.classList.add('msg-box-expanded');
    
    setTimeout(() => {
        const finalLetter = document.getElementById('finalLetter');
        finalLetter.style.display = 'block';
        void finalLetter.offsetWidth; 
        finalLetter.style.opacity = '1';
    }, 1200); 
});

// --- STEP 6: HOLO CARD 3D LOGIC ---
const card = document.getElementById('holoCard');
const imageBox = document.getElementById('cardImage');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;
    const posX = (x / rect.width) * 100;
    const posY = (y / rect.height) * 100;
    const translateX = ((x - centerX) / centerX) * 15;
    const translateY = ((y - centerY) / centerY) * 15;

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--px', `${posX}%`);
    card.style.setProperty('--py', `${posY}%`);
    card.style.setProperty('--tx', `${translateX}px`);
    card.style.setProperty('--ty', `${translateY}px`);

    imageBox.style.boxShadow = `${-translateX}px ${-translateY}px 25px rgba(0,0,0,0.9)`;
});

card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rx', `0deg`);
    card.style.setProperty('--ry', `0deg`);
    card.style.setProperty('--px', `50%`);
    card.style.setProperty('--py', `50%`);
    card.style.setProperty('--tx', `0px`);
    card.style.setProperty('--ty', `0px`);
    imageBox.style.boxShadow = `0px 0px 15px rgba(255, 50, 100, 0.4) inset, 0px 0px 10px rgba(255, 50, 100, 0.4)`;
});

window.addEventListener('deviceorientation', (e) => {
    if(activeStep !== 6) return; 
    let tiltX = Math.max(-30, Math.min(30, e.beta)); 
    let tiltY = Math.max(-30, Math.min(30, e.gamma));
    
    card.style.setProperty('--rx', `${-tiltX}deg`);
    card.style.setProperty('--ry', `${tiltY}deg`);
    card.style.setProperty('--px', `${50 + (tiltY * 1.5)}%`);
    card.style.setProperty('--py', `${50 + (tiltX * 1.5)}%`);
});
