/**
 * Stuhlinkontinenz Interactive Quiz
 * Group: Kailas, Phuong, Tung, Susi, Wildan, Kunal
 */

// Quiz Data Structure
const quizData = [
    {
        category: "Definition & Schweregrade (Folie 3 & 7)",
        question: "Was bedeutet Schweregrad II (Grad II) bei der Stuhlinkontinenz nach dem 3-Grad-System (Folie 7)?",
        options: [
            "Unkontrollierter Abgang von Darmgasen (Grad I).",
            "Unfähigkeit, flüssigen Stuhl willentlich zurückzuhalten (Grad II).",
            "Unfähigkeit, festen Stuhl willentlich zurückzuhalten (Grad III)."
        ],
        correct: 1, // Option B (Index 1)
        explanation: "Nach dem in der täglichen Pflege verwendeten 3-Grad-System (Folie 7) bedeutet Grad II die Unfähigkeit, flüssigen Stuhl willentlich zurückzuhalten. Grad I betrifft Darmgase, und Grad III beschreibt die Unfähigkeit, festen Stuhl zurückzuhalten. Die allgemeine Definition (Folie 3) beschreibt Stuhlinkontinenz als das Unvermögen, den Stuhl willkürlich zurückzuhalten."
    },
    {
        category: "Ursachen (Folie 5 & 6)",
        question: "Welches der folgenden Beispiele ist eine muskuläre Ursache für Stuhlinkontinenz (Folie 5)?",
        options: [
            "Eine Schädigung des Schließmuskels oder Beckenbodeninsuffizienz (z. B. nach Geburtstraumen).",
            "Ein Schlaganfall, Demenz oder Multiple Sklerose (neurogene Ursachen).",
            "Eine verminderte oder fehlende anale Sensibilität (sensorische Ursachen)."
        ],
        correct: 0, // Option A (Index 0)
        explanation: "Wie auf Folie 5 beschrieben, gehören Schädigungen des Schließmuskels und Beckenbodeninsuffizienz (z. B. durch Geburtstraumen, Gebärmutter-OPs, Fisteln oder Bestrahlung) zu den muskulären Ursachen. Schlaganfall, Demenz und MS sind zentrale neurogene Ursachen (Folie 6), während fehlende Sensibilität sensorisch bedingt ist."
    },
    {
        category: "Diagnostik (Folie 8)",
        question: "Mit welcher Methode wird in der Diagnostik (Folie 8) die Kraft des Schließmuskels gemessen?",
        options: [
            "Koloskopie (Darmspiegelung zur Schleimhautkontrolle)",
            "Manometrie (Druckmessung des Schließmuskels)",
            "Stuhlprotokoll (Dokumentation im Alltag)"
        ],
        correct: 1, // Option B (Index 1)
        explanation: "Die Manometrie (Folie 8) dient speziell der Messung der Schließmuskelkraft. Die Koloskopie (Darmspiegelung) untersucht das Gewebe auf Veränderungen und Tumoren. Das Stuhlprotokoll erfasst im Pflegealltag die Konsistenz und Häufigkeit des Stuhlgangs."
    },
    {
        category: "Therapie (Folie 9 & 10)",
        question: "Wann werden in der Therapie operative Eingriffe wie ein Darmschrittmacher oder eine Schließmuskelprothese in Erwägung gezogen (Folie 10)?",
        options: [
            "Sofort als Erstbehandlung bei der Diagnose.",
            "Ausschließlich bei immobilen Pflegeempfängern zur Erleichterung der Pflege.",
            "Erst wenn konservative Methoden (wie Beckenbodentraining oder Stuhlregulation) ausgeschöpft sind."
        ],
        correct: 2, // Option C (Index 2)
        explanation: "Gemäß Folie 10 werden operative Eingriffe (wie Darmschrittmacher/Sakralnervstimulation, Schließmuskelprothese oder Stoma) erst durchgeführt, wenn konservative Methoden (Folie 9) wie Beckenbodentraining, Biofeedback, Elektrostimulation oder Diätetik ausgeschöpft sind."
    },
    {
        category: "Hautpflege & Hilfsmittel (Folie 11 & 12)",
        question: "Welche Grundregel gilt laut Folie 11 und 12 für die Reinigung und den Hautschutz bei Stuhlinkontinenz?",
        options: [
            "Reinigung immer von hinten nach vorne und intensives Reiben mit Handtüchern.",
            "Sofortiger Wechsel, Reinigung von vorne nach hinten mit warmem Wasser, sanft tupfen und Anwendung von Barriereprodukten (z. B. Zinkoxid, Dimeticon).",
            "Verwendung von Pants bei dünnflüssigem Stuhl ohne zusätzlichen Hautschutz."
        ],
        correct: 1, // Option B (Index 1)
        explanation: "Folie 11 betont: Sofortiger Wechsel, Reinigung immer von vorne nach hinten (Verhinderung von Keimverschleppung), sanft trockentupfen und obligater Hautschutz mit Barriereprodukten (Zinkoxid-Salbe oder Dimeticon-Creme) zum Schutz vor stuhleigenen Enzymen. Pants (Folie 12) sind bei dünnflüssigem Stuhl weniger geeignet."
    }
];

// App State
let currentQuestionIndex = 0;
let score = 0;
let answersLocked = false;
let selectedOptionIndex = null;

// DOM Elements
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionIndex = document.getElementById('question-index');
const scoreCounter = document.getElementById('score-counter');
const progressBar = document.getElementById('progress-bar');

const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const explanationContainer = document.getElementById('explanation-container');
const feedbackIconWrapper = document.getElementById('feedback-icon-wrapper');
const feedbackTitle = document.getElementById('feedback-title');
const explanationText = document.getElementById('explanation-text');

const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

// Result Screen DOM Elements
const circleProgress = document.getElementById('circle-progress');
const scorePercent = document.getElementById('score-percent');
const scoreFraction = document.getElementById('score-fraction');
const resultBadge = document.getElementById('result-badge');
const resultMessage = document.getElementById('result-message');

const breakdownNursing = document.getElementById('breakdown-nursing');
const breakdownSkin = document.getElementById('breakdown-skin');

// Icons definition
const SVG_ICONS = {
    correct: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    incorrect: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6m-6-4h6m-7-4h8a5 5 0 1 0-10 0c0 1.3.4 2.5 1.2 3.4L9 18h6l.8-2.6C16.6 14.5 17 13.3 17 12z"></path></svg>`
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(currentQuestionIndex);
    
    // Bind Event Listeners
    nextBtn.addEventListener('click', handleNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
});

// Load Question Content
function loadQuestion(index) {
    if (index >= quizData.length) {
        showResults();
        return;
    }

    const currentData = quizData[index];
    answersLocked = false;
    selectedOptionIndex = null;

    // Reset Elements state
    explanationContainer.classList.add('hidden');
    explanationContainer.className = 'explanation-box hidden';
    nextBtn.classList.add('hidden');
    nextBtn.disabled = true;

    // Update Progress header
    questionIndex.textContent = `Frage ${index + 1} von ${quizData.length}`;
    scoreCounter.textContent = `Punkte: ${score}`;
    progressBar.style.width = `${((index + 1) / quizData.length) * 100}%`;

    // Set texts
    questionCategory.textContent = `Thema: ${currentData.category}`;
    questionText.textContent = currentData.question;

    // Build options list
    optionsContainer.innerHTML = '';
    currentData.options.forEach((option, i) => {
        const letter = String.fromCharCode(65 + i); // A, B, C
        
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn animate-slide-up';
        optionBtn.style.animationDelay = `${i * 0.1}s`;
        optionBtn.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-content">${option}</span>
            <span class="option-status-icon"></span>
        `;
        
        optionBtn.addEventListener('click', () => selectOption(i, optionBtn));
        optionsContainer.appendChild(optionBtn);
    });
}

// Select and Verify Option
function selectOption(selectedIndex, btnElement) {
    if (answersLocked) return;
    
    answersLocked = true;
    selectedOptionIndex = selectedIndex;
    const currentData = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === currentData.correct;

    // Disable all options
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach((btn) => {
        btn.disabled = true;
    });

    if (isCorrect) {
        // Increment Score
        score++;
        scoreCounter.textContent = `Punkte: ${score}`;

        // Highlight selected
        btnElement.classList.add('correct');
        btnElement.querySelector('.option-status-icon').innerHTML = SVG_ICONS.correct;

        // Configure explanation theme
        explanationContainer.classList.add('correct-theme');
        feedbackIconWrapper.innerHTML = SVG_ICONS.correct;
        feedbackTitle.textContent = "Richtig!";
    } else {
        // Highlight selected as incorrect
        btnElement.classList.add('incorrect');
        btnElement.querySelector('.option-status-icon').innerHTML = SVG_ICONS.incorrect;

        // Visual shake feedback on incorrect
        quizScreen.classList.add('shake');
        setTimeout(() => {
            quizScreen.classList.remove('shake');
        }, 400);

        // Highlight correct option as helper
        const correctButton = allButtons[currentData.correct];
        correctButton.classList.add('correct');
        correctButton.querySelector('.option-status-icon').innerHTML = SVG_ICONS.correct;

        // Configure explanation theme
        explanationContainer.classList.add('incorrect-theme');
        feedbackIconWrapper.innerHTML = SVG_ICONS.incorrect;
        feedbackTitle.textContent = "Nicht ganz richtig";
    }

    // Load and reveal explanation text
    explanationText.textContent = currentData.explanation;
    explanationContainer.classList.remove('hidden');

    // Show Next Button
    nextBtn.classList.remove('hidden');
    nextBtn.disabled = false;
}

// Proceed to Next Question
function handleNextQuestion() {
    currentQuestionIndex++;
    
    // Add slide out effect before loading new slide
    quizScreen.classList.add('animate-fade-in');
    setTimeout(() => {
        loadQuestion(currentQuestionIndex);
        quizScreen.classList.remove('animate-fade-in');
    }, 150);
}

// Display Quiz End Screen
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // Calculations
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Animate radial gauge
    circleProgress.setAttribute('stroke-dasharray', `${percentage}, 100`);

    // Reset gauge color classifications
    circleProgress.className.baseVal = 'circle';
    resultBadge.className = 'result-badge';

    // Set rating class & content based on performance
    let ratingClass = 'poor';
    let ratingText = '';
    let ratingDesc = '';
    let nursingInsight = '';
    let skinInsight = '';

    // Q5 index is 4. Let's see if user answered correct
    // (Wait, we can track if they got the specific questions correct, but let's base it on overall score & smart evaluation)
    const isQ5Correct = selectedOptionIndex === quizData[4].correct; // tracking active score index

    if (score === 5) {
        ratingClass = 'expert';
        ratingText = 'Herausragende Leistung!';
        ratingDesc = 'Hervorragendes Fachwissen! Sie haben alle Fragen fehlerfrei beantwortet. Ihr Verständnis für die klinischen und pflegerischen Aspekte der Stuhlinkontinenz ist ausgezeichnet.';
        nursingInsight = '100% klinisch präzise';
        skinInsight = 'Perfekter Hautschutz';
    } else if (score >= 4) {
        ratingClass = 'good';
        ratingText = 'Sehr gutes Ergebnis!';
        ratingDesc = 'Klasse! Sie beherrschen die pflegerischen Schwerpunkte der Kontinenzpflege und klinischen Diagnostik nahezu fehlerfrei.';
        nursingInsight = 'Hervorragende Fachpflege';
        skinInsight = 'Sicherer Hautschutz';
    } else if (score >= 3) {
        ratingClass = 'basic';
        ratingText = 'Gute Leistung!';
        ratingDesc = 'Sie haben mehr als die Hälfte der Fragen richtig beantwortet. Eine solide Basis für den Pflegealltag ist vorhanden.';
        nursingInsight = 'Gutes Basiswissen';
        skinInsight = 'Hautpflege-Grundkenntnisse';
    } else {
        ratingClass = 'poor';
        ratingText = 'Lernbedarf vorhanden';
        ratingDesc = 'Einige Antworten waren leider nicht korrekt. Wiederholen Sie die theoretischen Grundlagen zur Kontinenz und Hautpflege noch einmal.';
        nursingInsight = 'Auffrischungsbedarf';
        skinInsight = 'Hautschutz festigen';
    }

    // Apply classes
    circleProgress.classList.add(ratingClass);
    resultBadge.classList.add(`text-${ratingClass}`);
    
    // Set content
    scorePercent.textContent = `${percentage}%`;
    scoreFraction.textContent = `${score} von ${quizData.length} richtig`;
    resultBadge.textContent = ratingText;
    resultMessage.textContent = ratingDesc;

    // Detailed insights
    breakdownNursing.textContent = nursingInsight;
    breakdownSkin.textContent = skinInsight;
}

// Reset and Start Over
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    // UI Transitions
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    loadQuestion(currentQuestionIndex);
}
