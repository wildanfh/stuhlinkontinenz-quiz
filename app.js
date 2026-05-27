/**
 * Stuhlinkontinenz Interactive Quiz
 * Group: Kailas, Phuong, Tung, Susi, Wildan, Kunal
 */

// Quiz Data Structure
const quizData = [
    {
        category: "Definition & Schweregrade",
        question: "Was bedeutet Schweregrad II (Grad II) bei der Stuhlinkontinenz im täglichen Pflegesystem?",
        options: [
            "Man kann Darmgase nicht mehr willentlich zurückhalten.",
            "Man kann flüssigen Stuhl nicht mehr willentlich zurückhalten.",
            "Das Zurückhalten von festem Stuhl ist unmöglich."
        ],
        correct: 1, // Option B (Index 1)
        explanation: "Das in der täglichen Pflege etablierte 3-Grad-System stuft die Stuhlinkontinenz wie folgt ein: Grad I beschreibt den unkontrollierten Abgang von Darmgasen. Grad II umfasst die Unfähigkeit, flüssigen oder breiigen Stuhl zurückzuhalten. Grad III beschreibt den vollständigen Kontrollverlust auch über festen Stuhl."
    },
    {
        category: "Ursachen der Stuhlinkontinenz",
        question: "Welches der folgenden Beispiele ist eine muskuläre Ursache für Stuhlinkontinenz?",
        options: [
            "Eine Schädigung des Schließmuskels, zum Beispiel durch ein Geburtstrauma.",
            "Ein Schlaganfall oder eine Demenzerkrankung.",
            "Eine verminderte Empfindlichkeit im Afterbereich nach einer Operation."
        ],
        correct: 0, // Option A (Index 0)
        explanation: "Muskuläre Ursachen basieren auf direkten Schäden am Muskelapparat. Ein typisches Beispiel sind Geburtstraumen oder Operationen (z. B. Hämorrhoiden, Fisteln), bei denen der Schließmuskel verletzt wird. Schlaganfall/Demenz sind neurogene (nervliche) Ursachen; verminderte Empfindlichkeit ist eine sensorische Ursache."
    },
    {
        category: "Diagnostik",
        question: "Mit welcher Untersuchungsmethode kann der Arzt die Kraft des Schließmuskels direkt messen?",
        options: [
            "Koloskopie (Darmspiegelung)",
            "Stuhlprotokoll",
            "Manometrie"
        ],
        correct: 2, // Option C (Index 2)
        explanation: "Die Manometrie (Druckmessung) dient gezielt dazu, die Schließmuskelkraft im Enddarmbereich zu messen. Die Koloskopie beurteilt die Darmschleimhaut und schließt Tumoren aus, während das Stuhlprotokoll im Alltag die Häufigkeit und Stuhlkonsistenz dokumentiert."
    },
    {
        category: "Therapie",
        question: "Wann wird eine operative Behandlung (z. B. ein Darmschrittmacher oder eine Schließmuskelprothese) in Erwägung gezogen?",
        options: [
            "Direkt nach der ersten Diagnose als Standardbehandlung.",
            "Erst wenn konservative Methoden (wie Beckenbodentraining oder Stuhlregulation) nicht ausreichen.",
            "Nur bei immobilen Patienten zur Erleichterung der Pflege."
        ],
        correct: 1, // Option B (Index 1)
        explanation: "Operative Eingriffe sind mit operativen Risiken verbunden. Sie werden erst dann in Erwägung gezogen, wenn alle konservativen Behandlungsmöglichkeiten (Stuhlregulation durch Ernährung, aktives Beckenbodentraining, Biofeedback oder Elektrostimulation) ausgeschöpft sind und keine Besserung brachten."
    },
    {
        category: "Hautpflege & Hilfsmittel",
        question: "Wie sollte die Haut im Intimbereich nach einem Stuhlabgang gereinigt und gepflegt werden?",
        options: [
            "Kräftig abreiben und mit alkoholhaltigen Tüchern desinfizieren.",
            "Von hinten nach vorne wischen und anschließend eine dicke Zinksalbe ohne vorherige Reinigung auftragen.",
            "Von vorne nach hinten mit warmem Wasser reinigen, sanft trocken tupfen und Barriereprodukte anwenden."
        ],
        correct: 2, // Option C (Index 2)
        explanation: "Die Hautpflege bei Inkontinenz erfordert äußerste Schonung: Hautreinigung muss immer von vorne nach hinten erfolgen (Vermeidung von Keimverschleppung) mit warmem Wasser und milden Mitteln. Die Haut wird trocken getupft (nicht gerieben). Anschließend schützt ein Barriereprodukt (z. B. Zinkoxid-Salbe oder Dimeticon-Creme) vor aggressiven Enzymen im Stuhl."
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
