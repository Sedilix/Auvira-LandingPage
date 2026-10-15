/* ==========================================================================
   AUVIRA CLIENT INTERACTIVE LOGIC
   Brand Tone: Calm, grown-up, trustworthy, editorial.
   Copy Rules: Never say Auvira diagnoses; provides answers, insights, and starting points.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initWispyStreaks();
  initScreenerApp();
  initTeamAccordion();
  initFaqAccordion();
  initPilotForm();
  initInterestForm();
  initMobileNav();
  initFlowPaletteToggle();
});

/* --------------------------------------------------------------------------
   1. FREE 10-MINUTE HORMONE CHECK APP
   -------------------------------------------------------------------------- */
const screenerQuestions = [
  {
    id: 'cycle',
    prompt: 'How would you describe your menstrual cycle over the past 6 months?',
    hint: 'Rotterdam Criterion 1: Ovulatory intervals and regularity.',
    options: [
      { text: 'Predictable (21 to 35 days every month)', subtext: 'Normal ovulatory baseline', score: 0 },
      { text: 'Irregular or unpredictable (varies by more than 7 days)', subtext: 'Common sign of fluctuating ovulation', score: 2 },
      { text: 'Infrequent (cycles longer than 35 days, or skip 1-2 months)', subtext: 'Strong hallmark of oligomenorrhea', score: 3 },
      { text: 'Completely absent (>3 months without a period, not pregnant)', subtext: 'Amenorrhea indicating ovulatory arrest', score: 4 }
    ]
  },
  {
    id: 'metabolic',
    prompt: 'Which metabolic or weight patterns resonate with your daily experience?',
    hint: 'Asian metabolic sensitivity: Even lean Asian women can have severe insulin resistance.',
    options: [
      { text: 'Normal, stable energy and steady weight', subtext: 'No noticeable metabolic friction', score: 0 },
      { text: 'Lean body frame, but carrying abdominal fullness or bloating', subtext: 'Classic Lean Asian PMOS visceral presentation', score: 3 },
      { text: 'Sudden, unexplained weight gain that feels impossible to shift', subtext: 'Often driven by hyperinsulinemia and cellular resistance', score: 3 },
      { text: 'Intense 3PM energy crashes, sugar cravings, or shaky when hungry', subtext: 'Clear signs of reactive hypoglycemia and insulin spikes', score: 3 }
    ]
  },
  {
    id: 'androgen',
    prompt: 'Do you experience any of these skin or hair patterns?',
    hint: 'Rotterdam Criterion 2: Clinical or biochemical androgen signs.',
    options: [
      { text: 'None of these symptoms', subtext: 'Clear skin and balanced hair density', score: 0 },
      { text: 'Persistent cystic acne along jawline, chin, or neck', subtext: 'High androgen sensitivity in sebaceous glands', score: 3 },
      { text: 'Excess dark, coarse hair on upper lip, chin, chest, or abdomen', subtext: 'Mild hirsutism (often subtler in Asian ethnicities)', score: 3 },
      { text: 'Noticeable thinning or widening part at the crown of your scalp', subtext: 'Androgenic follicular sensitivity', score: 3 }
    ]
  },
  {
    id: 'medical_history',
    prompt: 'What has been your experience when consulting doctors previously?',
    hint: 'Understanding your prior diagnostic hurdles.',
    options: [
      { text: 'I have not seen a doctor for my hormones yet', subtext: 'First time investigating symptoms', score: 1 },
      { text: 'Doctor did basic blood tests and told me "everything is normal"', subtext: 'Standard tests frequently miss Asian fasting insulin thresholds', score: 3 },
      { text: 'Doctor prescribed the birth control pill without root cause testing', subtext: 'Pill induces withdrawal bleeds, masking ovarian signaling', score: 3 },
      { text: 'Family history of Type 2 Diabetes or hormonal conditions', subtext: 'Strong genetic predisposition in Southeast Asia', score: 2 }
    ]
  },
  {
    id: 'lifestyle_mood',
    prompt: 'How do your energy, sleep, and emotional health feel day-to-day?',
    hint: 'Neuroendocrine and autonomic stress interactions.',
    options: [
      { text: 'Generally restful sleep and steady mood throughout the month', subtext: 'Balanced neuroendocrine axis', score: 0 },
      { text: 'Chronic daytime fatigue unimproved by 8 hours of sleep', subtext: 'Linked to cellular metabolic strain and poor recovery', score: 2 },
      { text: 'Heightened anxiety, brain fog, or low mood linked to cycle phase', subtext: 'Progesterone deficiency or neurosteroid dysregulation', score: 3 },
      { text: 'Smartwatch or Garmin shows high stress or elevated resting heart rate', subtext: 'Sympathetic nervous system overdrive', score: 2 }
    ]
  }
];

function initScreenerApp() {
  const container = document.getElementById('questionContainer');
  const progressFill = document.getElementById('progressFill');
  const stepCounter = document.getElementById('stepCounter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const resultContainer = document.getElementById('resultContainer');
  const screenerNav = document.querySelector('.screener-nav');

  if (!container || !nextBtn) return;

  let currentStep = 0;
  const userAnswers = [];

  function renderQuestion(stepIndex) {
    const q = screenerQuestions[stepIndex];
    const progressScale = (stepIndex + 1) / screenerQuestions.length;
    progressFill.style.transform = `scaleX(${progressScale})`;
    stepCounter.textContent = `Question ${stepIndex + 1} of ${screenerQuestions.length}`;

    const selectedOptionIndex = userAnswers[stepIndex];

    container.innerHTML = `
      <div class="question-block">
        <h3 class="question-prompt">${q.prompt}</h3>
        <p class="question-hint">${q.hint}</p>
        <div class="options-stack">
          ${q.options.map((opt, idx) => `
            <div class="option-item ${selectedOptionIndex === idx ? 'selected' : ''}" data-index="${idx}" tabindex="0" role="button">
              <div class="option-checkbox-svg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="option-text">
                <strong>${opt.text}</strong>
                <span>${opt.subtext}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bind option click
    const optionItems = container.querySelectorAll('.option-item');
    optionItems.forEach(item => {
      function selectItem() {
        optionItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        const idx = parseInt(item.getAttribute('data-index'), 10);
        userAnswers[stepIndex] = idx;
        nextBtn.removeAttribute('disabled');
      }
      item.addEventListener('click', selectItem);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectItem();
        }
      });
    });

    // Update Nav buttons
    prevBtn.disabled = stepIndex === 0;
    if (userAnswers[stepIndex] === undefined) {
      nextBtn.setAttribute('disabled', 'true');
    } else {
      nextBtn.removeAttribute('disabled');
    }

    if (stepIndex === screenerQuestions.length - 1) {
      nextBtn.textContent = 'View my assessment';
    } else {
      nextBtn.textContent = 'Continue';
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderQuestion(currentStep);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (userAnswers[currentStep] === undefined) return;

    if (currentStep < screenerQuestions.length - 1) {
      currentStep++;
      renderQuestion(currentStep);
    } else {
      showResults();
    }
  });

  function showResults() {
    container.style.display = 'none';
    screenerNav.style.display = 'none';
    stepCounter.style.display = 'none';
    progressFill.style.transform = 'scaleX(1)';
    resultContainer.style.display = 'block';

    // Calculate score & phenotype
    let totalScore = 0;
    userAnswers.forEach((ansIdx, qIdx) => {
      totalScore += screenerQuestions[qIdx].options[ansIdx].score;
    });

    const isLeanAsian = userAnswers[1] === 1;

    let phenotypeTitle = 'High likelihood of metabolic PMOS';
    let phenotypeClass = 'Insulin-resistant PMOS pattern';

    if (isLeanAsian) {
      phenotypeTitle = 'Lean Asian PMOS pattern detected';
      phenotypeClass = 'Metabolically sensitive normal weight';
    } else if (totalScore < 4) {
      phenotypeTitle = 'Mild hormonal sensitivity';
      phenotypeClass = 'Low PMOS probability / regular monitoring recommended';
    }

    resultContainer.innerHTML = `
      <div class="result-box">
        <div class="result-header">
          <span class="result-phenotype-badge">${phenotypeClass}</span>
          <h3 class="result-title">${phenotypeTitle}</h3>
          <p class="result-summary-text">
            Based on your responses, your symptoms align with key Rotterdam diagnostic criteria. 
            In Singapore and Asian populations, this pattern is frequently missed because standard BMI cutoffs tell you your weight is "normal".
          </p>
        </div>

        <div class="result-breakdown-grid">
          <div class="breakdown-card">
            <h4>Recommended guideline blood panels</h4>
            <ul class="breakdown-list">
              <li><strong>Fasting Insulin &amp; Glucose:</strong> Calculate HOMA-IR (crucial for Asian cutoffs)</li>
              <li><strong>Free Androgen Index (FAI):</strong> Total Testosterone + SHBG</li>
              <li><strong>Cycle Day 3 LH:FSH:</strong> Checks neuroendocrine ovulatory ratio</li>
              <li><strong>DHEA-S:</strong> Evaluates adrenal androgen activity</li>
              <li><strong>Pelvic Ultrasound:</strong> Antral follicle count evaluation</li>
            </ul>
          </div>

          <div class="breakdown-card">
            <h4>Practical steps forward</h4>
            <ul class="breakdown-list">
              <li><strong>Avoid extreme diets:</strong> Generic keto often spikes cortisol in Asian bodies</li>
              <li><strong>Look past "normal" fasting glucose:</strong> Insulin spikes long before glucose rises</li>
              <li><strong>Do not rely on birth control alone:</strong> Masks symptoms without resolving root causes</li>
              <li><strong>Bring one summary to your doctor:</strong> Connect cycles, symptoms, and bloods together</li>
            </ul>
          </div>
        </div>

        <div class="result-cta-banner">
          <h3>Take these answers to a PMOS-trained doctor</h3>
          <p>
            Join Auvira's Singapore pilot to have these tests ordered directly and reviewed with a dedicated care team who understands the full picture.
          </p>
          <div class="result-actions">
            <a href="#pilot" class="btn btn-primary" id="applyWithAnswersBtn">Join the Singapore pilot with my answers</a>
            <button class="btn btn-outline" id="retakeScreenerBtn">Retake check</button>
          </div>
        </div>
      </div>
    `;

    // Retake button
    const retakeBtn = document.getElementById('retakeScreenerBtn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        currentStep = 0;
        userAnswers.length = 0;
        resultContainer.style.display = 'none';
        container.style.display = 'block';
        screenerNav.style.display = 'flex';
        stepCounter.style.display = 'block';
        renderQuestion(0);
      });
    }

    // Auto-fill note in pilot form if clicked
    const applyWithAnswers = document.getElementById('applyWithAnswersBtn');
    if (applyWithAnswers) {
      applyWithAnswers.addEventListener('click', () => {
        const notesField = document.getElementById('notes');
        if (notesField) {
          notesField.value = `Hormone check result: ${phenotypeTitle} (${phenotypeClass}). Reported cycle: ${screenerQuestions[0].options[userAnswers[0]].text}.`;
        }
      });
    }
  }

  // Initial render
  renderQuestion(0);
}

/* --------------------------------------------------------------------------
   2. CARE TEAM ACCORDION
   -------------------------------------------------------------------------- */
function initTeamAccordion() {
  const cards = document.querySelectorAll('.team-roles-accordion .role-card');

  cards.forEach(card => {
    function toggleCard() {
      const wasActive = card.classList.contains('active');
      cards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-expanded', 'false');
      });
      if (!wasActive) {
        card.classList.add('active');
        card.setAttribute('aria-expanded', 'true');
      }
    }
    card.addEventListener('click', toggleCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        faqItems.forEach(i => {
          i.classList.remove('active');
          const btn = i.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (!wasActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   4. PILOT APPLICATION FORM
   -------------------------------------------------------------------------- */
function initPilotForm() {
  const tabPatient = document.getElementById('tabPatient');
  const tabClinician = document.getElementById('tabClinician');
  const patientAgeGroup = document.getElementById('patientAgeGroup');
  const clinicianRoleGroup = document.getElementById('clinicianRoleGroup');
  const patientStatusGroup = document.getElementById('patientStatusGroup');
  const notesLabel = document.getElementById('notesLabel');
  const submitBtn = document.getElementById('submitPilotBtn');
  const pilotForm = document.getElementById('pilotForm');
  const pilotSuccess = document.getElementById('pilotSuccess');

  if (!tabPatient || !tabClinician || !pilotForm) return;

  function setMode(mode) {
    if (mode === 'clinician') {
      tabClinician.classList.add('active');
      tabPatient.classList.remove('active');
      tabClinician.setAttribute('aria-selected', 'true');
      tabPatient.setAttribute('aria-selected', 'false');
      if (patientAgeGroup) patientAgeGroup.style.display = 'none';
      if (clinicianRoleGroup) clinicianRoleGroup.style.display = 'flex';
      if (patientStatusGroup) patientStatusGroup.style.display = 'none';
      if (notesLabel) notesLabel.textContent = 'How would you like to collaborate with Auvira (e.g. Medical Advisor, Partner Clinic)?';
      if (submitBtn) submitBtn.textContent = 'Submit clinician inquiry';
    } else {
      tabPatient.classList.add('active');
      tabClinician.classList.remove('active');
      tabPatient.setAttribute('aria-selected', 'true');
      tabClinician.setAttribute('aria-selected', 'false');
      if (patientAgeGroup) patientAgeGroup.style.display = 'flex';
      if (clinicianRoleGroup) clinicianRoleGroup.style.display = 'none';
      if (patientStatusGroup) patientStatusGroup.style.display = 'block';
      if (notesLabel) notesLabel.textContent = 'What is the most frustrating part of your hormonal journey right now?';
      if (submitBtn) submitBtn.textContent = 'Submit pilot application';
    }
  }

  tabPatient.addEventListener('click', () => setMode('patient'));
  tabClinician.addEventListener('click', () => setMode('clinician'));

  pilotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
      pilotForm.style.display = 'none';
      pilotSuccess.style.display = 'block';
    }, 500);
  });
}

/* --------------------------------------------------------------------------
   5. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   6. TOPOLOGICAL FLOW PALETTE PREVIEW SWITCHER
   -------------------------------------------------------------------------- */
function initFlowPaletteToggle() {
  const toggleBtns = document.querySelectorAll('.palette-pill-btn');
  const bgImg = document.getElementById('heroFlowBackdropImg');
  if (!toggleBtns.length || !bgImg) return;

  const themes = {
    auvira: 'assets/auvira_flow_exact_auvira.svg',
    original: 'assets/auvira_flow_exact_original.svg',
    dark_gold: 'assets/auvira_flow_exact_dark_gold.svg'
  };

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const themeKey = btn.getAttribute('data-theme');
      if (themes[themeKey]) {
        bgImg.style.opacity = '0';
        setTimeout(() => {
          bgImg.src = themes[themeKey];
          bgImg.style.opacity = '0.92';
        }, 150);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   MAILING LIST: REGISTER INTEREST (Coming Soon)
   Submissions go to Formspree (free tier). Create a form at https://formspree.io,
   then paste its endpoint here, e.g. 'https://formspree.io/f/xxxxxxxx'.
   -------------------------------------------------------------------------- */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeaerykn';

function initInterestForm() {
  const form = document.getElementById('interestForm');
  const input = document.getElementById('interestEmail');
  const note = document.getElementById('interestNote');
  const btn = form && form.querySelector('button[type="submit"]');
  const headerBtn = document.getElementById('headerInterestBtn');
  if (!form || !input || !note || !btn) return;

  if (headerBtn) {
    headerBtn.addEventListener('click', () => setTimeout(() => input.focus(), 400));
  }

  const show = (msg, cls, pillText) => {
    const textEl = note.querySelector('.note-text');
    const pillEl = note.querySelector('.note-pill');
    if (textEl) {
      textEl.textContent = msg;
    } else {
      note.textContent = msg;
    }
    if (pillEl) {
      if (cls === 'is-success') {
        pillEl.textContent = pillText || 'Interest registered';
      } else if (cls === 'is-error') {
        pillEl.textContent = pillText || 'Notice';
      } else {
        pillEl.textContent = pillText || 'Coming soon to Singapore';
      }
    }
    note.classList.remove('is-error', 'is-success');
    if (cls) note.classList.add(cls);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      show('Please enter a valid email address.', 'is-error');
      input.focus();
      return;
    }
    // Honeypot: bots fill the hidden field, people never see it.
    if (form.elements._gotcha && form.elements._gotcha.value) return;

    if (!FORMSPREE_ENDPOINT) {
      console.warn('Mailing list not connected: set FORMSPREE_ENDPOINT in main.js');
      show('Signup is not available just yet. Please check back soon.', 'is-error');
      return;
    }

    btn.disabled = true;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'coming-soon-hero' })
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      show("Thank you. You're on the list, and we'll be in touch when Auvira launches.", 'is-success');
    } catch (err) {
      console.error(err);
      show('Something went wrong. Please try again in a moment.', 'is-error');
    } finally {
      btn.disabled = false;
    }
  });
}

/* --------------------------------------------------------------------------
   8. PROCEDURAL ANIMATED WISPY AURA STREAKS
   Replaces mechanical dashed SVG lines with smooth, breathing light filaments
   flowing in cyclical harmony around the hero visual.
   -------------------------------------------------------------------------- */
function initWispyStreaks() {
  const canvas = document.getElementById('heroWispyCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let dpr = 1;
  let animId = null;
  let isVisible = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    cx = width * 0.5;
    cy = height * 0.5;
  }

  // 11 Layered Procedural Wispy Filaments orbiting gracefully in the Sunset Aura
  const filaments = [
    // Outer Ethereal Sweeps
    {
      baseRx: 420, baseRy: 260, rot: -0.28,
      speed: 0.0008, angle: 0.6, arcLen: 1.6, width: 2.0,
      breatheSpeed: 0.5, breatheAmp: 16, phase: 0.2,
      glowColor: 'rgba(255, 216, 107, 0.4)', glowBlur: 14
    },
    {
      baseRx: 385, baseRy: 240, rot: 0.35,
      speed: -0.0009, angle: 3.4, arcLen: 1.35, width: 1.8,
      breatheSpeed: 0.6, breatheAmp: 14, phase: 1.9,
      glowColor: 'rgba(238, 160, 156, 0.35)', glowBlur: 12
    },
    {
      baseRx: 355, baseRy: 215, rot: -0.45,
      speed: 0.0013, angle: 1.8, arcLen: 1.5, width: 2.4,
      breatheSpeed: 0.7, breatheAmp: 12, phase: 3.6,
      glowColor: 'rgba(253, 158, 57, 0.45)', glowBlur: 16
    },

    // Mid-Orbit Harmony
    {
      baseRx: 315, baseRy: 195, rot: 0.20,
      speed: -0.0012, angle: 5.1, arcLen: 1.25, width: 2.0,
      breatheSpeed: 0.8, breatheAmp: 11, phase: 5.1,
      glowColor: 'rgba(255, 241, 196, 0.6)', glowBlur: 13
    },
    {
      baseRx: 280, baseRy: 170, rot: -0.15,
      speed: 0.0016, angle: 2.9, arcLen: 1.4, width: 2.2,
      breatheSpeed: 0.85, breatheAmp: 10, phase: 2.4,
      glowColor: 'rgba(232, 190, 94, 0.45)', glowBlur: 14
    },
    {
      baseRx: 250, baseRy: 155, rot: 0.50,
      speed: -0.0015, angle: 0.4, arcLen: 1.3, width: 1.9,
      breatheSpeed: 0.95, breatheAmp: 9, phase: 4.2,
      glowColor: 'rgba(238, 160, 156, 0.38)', glowBlur: 12
    },
    {
      baseRx: 220, baseRy: 135, rot: -0.62,
      speed: 0.0019, angle: 4.4, arcLen: 1.55, width: 2.5,
      breatheSpeed: 1.05, breatheAmp: 8, phase: 0.9,
      glowColor: 'rgba(253, 158, 57, 0.5)', glowBlur: 15
    },

    // Inner Concentrated Glow (closer to the swirl emblem)
    {
      baseRx: 185, baseRy: 115, rot: 0.12,
      speed: -0.0022, angle: 1.5, arcLen: 1.45, width: 2.1,
      breatheSpeed: 1.2, breatheAmp: 7, phase: 3.0,
      glowColor: 'rgba(255, 216, 107, 0.55)', glowBlur: 12
    },
    {
      baseRx: 155, baseRy: 95, rot: -0.38,
      speed: 0.0025, angle: 3.8, arcLen: 1.6, width: 2.3,
      breatheSpeed: 1.35, breatheAmp: 6, phase: 5.7,
      glowColor: 'rgba(255, 241, 196, 0.7)', glowBlur: 14
    },
    {
      baseRx: 130, baseRy: 80, rot: 0.30,
      speed: -0.0028, angle: 0.1, arcLen: 1.35, width: 1.8,
      breatheSpeed: 1.5, breatheAmp: 5, phase: 1.4,
      glowColor: 'rgba(253, 158, 57, 0.48)', glowBlur: 11
    },
    {
      baseRx: 340, baseRy: 205, rot: 0.05,
      speed: 0.0011, angle: 2.0, arcLen: 1.2, width: 1.7,
      breatheSpeed: 0.75, breatheAmp: 10, phase: 4.8,
      glowColor: 'rgba(238, 160, 156, 0.32)', glowBlur: 11
    }
  ];

  // 36 Floating golden dust specks
  const specks = Array.from({ length: 36 }, (_, i) => ({
    orbitIndex: i % filaments.length,
    offsetAngle: (i * 0.35) % (Math.PI * 2),
    radialDrift: (Math.random() - 0.5) * 26,
    size: Math.random() * 1.5 + 0.7,
    pulseSpeed: Math.random() * 1.5 + 0.7,
    phase: Math.random() * Math.PI * 2
  }));

  let time = 0;

  function render() {
    if (!isVisible) {
      animId = requestAnimationFrame(render);
      return;
    }

    time += 0.012;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(dpr, dpr);

    // Render each wispy filament
    filaments.forEach((f) => {
      f.angle += f.speed;

      // Radial pulsation (breathing effect)
      const rx = f.baseRx + Math.sin(time * f.breatheSpeed + f.phase) * f.breatheAmp;
      const ry = f.baseRy + Math.cos(time * f.breatheSpeed + f.phase) * (f.breatheAmp * 0.6);

      const cosRot = Math.cos(f.rot);
      const sinRot = Math.sin(f.rot);

      const steps = 36;
      const points = [];

      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const currentAngle = f.angle + u * f.arcLen;

        const ex = rx * Math.cos(currentAngle);
        const ey = ry * Math.sin(currentAngle);

        const x = cx + ex * cosRot - ey * sinRot;
        const y = cy + ex * sinRot + ey * cosRot;

        points.push({ x, y });
      }

      if (points.length < 2) return;

      const pStart = points[0];
      const pEnd = points[points.length - 1];

      // Linear gradient along the wisp: 0% -> Sunlit -> Gleam Core -> Amber -> 0%
      const grad = ctx.createLinearGradient(pStart.x, pStart.y, pEnd.x, pEnd.y);
      grad.addColorStop(0, 'rgba(255, 216, 107, 0)');
      grad.addColorStop(0.18, 'rgba(255, 216, 107, 0.45)');
      grad.addColorStop(0.50, 'rgba(255, 241, 196, 0.90)');
      grad.addColorStop(0.82, 'rgba(253, 158, 57, 0.55)');
      grad.addColorStop(1, 'rgba(238, 160, 156, 0)');

      // Pass 1: Soft Ambient Halo (Glow)
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.lineWidth = f.width * 2.8;
      ctx.lineCap = 'round';
      ctx.strokeStyle = grad;
      ctx.shadowColor = f.glowColor;
      ctx.shadowBlur = f.glowBlur;
      ctx.globalAlpha = 0.35;
      ctx.stroke();

      // Pass 2: Razor Core Filament
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.lineWidth = f.width;
      ctx.lineCap = 'round';
      ctx.strokeStyle = grad;
      ctx.shadowBlur = 4;
      ctx.globalAlpha = 0.85;
      ctx.stroke();

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
    });

    // Render floating golden dust specks
    specks.forEach((s) => {
      const f = filaments[s.orbitIndex];
      const angle = f.angle + s.offsetAngle;
      const rx = f.baseRx + s.radialDrift;
      const ry = f.baseRy + s.radialDrift * 0.6;

      const cosRot = Math.cos(f.rot);
      const sinRot = Math.sin(f.rot);

      const ex = rx * Math.cos(angle);
      const ey = ry * Math.sin(angle);

      const x = cx + ex * cosRot - ey * sinRot;
      const y = cy + ex * sinRot + ey * cosRot;

      const pulse = 0.35 + 0.55 * Math.sin(time * s.pulseSpeed + s.phase);

      ctx.beginPath();
      ctx.arc(x, y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 241, 196, ${pulse * 0.75})`;
      ctx.shadowColor = 'rgba(253, 158, 57, 0.4)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.restore();
    animId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Pause when scrolled off-screen or tab hidden for battery efficiency
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }

  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
  });

  animId = requestAnimationFrame(render);
}

