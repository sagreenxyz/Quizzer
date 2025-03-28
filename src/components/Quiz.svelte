<script>
    import { onMount } from 'svelte';
    import ProgressBar from './ProgressBar.svelte';
    import ChapterSelection from './ChapterSelection.svelte';
    import ReviewAnswers from './ReviewAnswers.svelte';

    let question = null;
    let selectedAnswer = null;
    let feedback = '';
    let score = 0;
    let totalQuestionsAnswered = 0;
    let selectedChapter = null;
    let chapters = [];
    let totalQuestions = 0;
    let userAnswers = [];
    let isReviewMode = false;
    let questions = [];
    let isChapterSelectionMode = true;
    let isLastQuestionAnswered = false;
    let selectedChapterName = ''; // Add a variable to store the chapter name or number

    async function loadQuestions() {
        try {
            const response = await fetch('/api/questions');
            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
            }
            questions = await response.json();
            chapters = [...new Set(questions.map(q => parseInt(q.chapters_id)).filter(chapter => !isNaN(chapter)))];
        } catch (error) {
            console.error('Error loading questions:', error);
        }
    }

    function startQuiz() {
        isChapterSelectionMode = false;
        totalQuestionsAnswered = 0;
        score = 0;
        userAnswers = [];
        isLastQuestionAnswered = false;

        const filteredQuestions = selectedChapter
            ? questions.filter(q => q.question_type === 'multiple-choice' && q.chapters_id === selectedChapter)
            : questions.filter(q => q.question_type === 'multiple-choice');

        totalQuestions = filteredQuestions.length;
        questions = [...filteredQuestions];

        // Set the chapter name or number for display
        selectedChapterName = selectedChapter ? `Chapter ${selectedChapter}` : 'All Chapters';

        loadQuestion();
    }

    async function loadQuestion() {
        if (questions.length === 0) {
            console.error('No questions available for the selected chapter.');
            return;
        }
        question = questions[Math.floor(Math.random() * questions.length)];
        selectedAnswer = null;
        feedback = '';
    }

    function checkAnswer(index) {
        if (index === parseInt(question.correct_answer)) {
            feedback = 'Correct!';
            score++;
        } else {
            feedback = `The correct answer is: ${question.choices[parseInt(question.correct_answer)]}`;
        }
        selectedAnswer = index;
        totalQuestionsAnswered++;

        userAnswers.push({
            question: question.question,
            selectedAnswer: question.choices[index],
            correctAnswer: question.choices[parseInt(question.correct_answer)],
            explanation: question.explanation,
            isCorrect: index === parseInt(question.correct_answer)
        });

        if (totalQuestionsAnswered === totalQuestions) {
            isLastQuestionAnswered = true;
        }
    }

    function handleNext() {
        if (isLastQuestionAnswered) {
            isReviewMode = true;
        } else {
            loadQuestion();
        }
    }

    function handleChapterChange(event) {
        selectedChapter = parseInt(event.target.value);
        loadQuestions();
    }

    function resetQuiz() {
        score = 0;
        totalQuestionsAnswered = 0;
        userAnswers = [];
        isReviewMode = false;
        question = null;
        feedback = '';
        selectedAnswer = null;
        totalQuestions = 0;
        isLastQuestionAnswered = false;
        isChapterSelectionMode = true;
    }

    function quitQuiz() {
        isChapterSelectionMode = true; // Return to chapter selection mode
        selectedChapter = null; // Reset the selected chapter
        selectedChapterName = ''; // Clear the chapter name
        questions = []; // Clear the questions
        totalQuestionsAnswered = 0; // Reset progress
        score = 0; // Reset score
        isReviewMode = false; // Exit review mode if active
    }

    onMount(() => {
        loadQuestions();
    });

    function calculatePercentage() {
        return totalQuestionsAnswered > 0 ? Math.round((score / totalQuestionsAnswered) * 100) : 0;
    }

    function calculateQuestionsRemaining() {
        return totalQuestions - totalQuestionsAnswered;
    }

    function calculateQuestionsAnswered() {
        return totalQuestionsAnswered;
    }
</script>

<style>
    button {
        padding: 10px 15px;
        font-size: 1rem;
        margin: 5px 0;
        border: none;
        border-radius: 5px;
        background-color: #007BFF;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover:not([disabled]) {
        background-color: #0056b3;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .feedback {
        font-size: 1.2rem;
        margin-top: 1rem;
        font-weight: bold;
    }

    .feedback.correct {
        color: #28a745;
    }

    .feedback.incorrect {
        color: #dc3545;
    }

    .explanation {
        margin-top: 1rem;
        font-size: 1rem;
        color: #555;
        background-color: #f9f9f9;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ddd;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
    }

    li button {
        width: 100%;
        text-align: left;
    }

    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    .feedback-container {
        margin-top: 1rem;
    }

    .feedback.correct {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .feedback.incorrect {
        text-align: left;
    }

    /* Add or modify the style for the question text */
    .question-text {
        font-size: 1.25rem; /* Slightly larger font size */
        font-weight: bold; /* Optional: make it bold for emphasis */
    }

    button.selected-correct {
        background-color: #28a745; /* Green for correct answer */
        color: white;
    }

    button.selected-incorrect {
        background-color: #dc3545; /* Red for incorrect answer */
        color: white;
    }

    .quit-container {
        margin-top: 16px;
    }

    .quit-container button {
        padding: 10px 15px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        background-color: #dc3545; /* Red for quit button */
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .quit-container button:hover {
        background-color: #a71d2a;
    }
</style>

<div>
    {#if isChapterSelectionMode}
        <ChapterSelection
            {chapters}
            bind:selectedChapter
            startQuiz={startQuiz}
            title="Select a Chapter to Start the Quiz"
        />
    {:else if isReviewMode}
        <ReviewAnswers
            {userAnswers}
            {score}
            {totalQuestionsAnswered}
            calculatePercentage={calculatePercentage}
            resetQuiz={resetQuiz}
        />
    {:else}
        <div>
            <!-- Add a heading to display the selected chapter -->
            <h2>{selectedChapterName}</h2>

            <p><strong>Score:</strong> {score}/{totalQuestionsAnswered} ({calculatePercentage()}%)</p>

            <ProgressBar
                totalQuestionsAnswered={totalQuestionsAnswered}
                totalQuestions={totalQuestions}
            />

            {#if question}
                <div>
                    <p class="question-text"><strong>Question:</strong> {question.question}</p>
                    <ul>
                        {#each question.choices as choice, index}
                            <li>
                                <button
                                    on:click={() => checkAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                    class:selected-correct={selectedAnswer !== null && index === parseInt(question.correct_answer)}
                                    class:selected-incorrect={selectedAnswer !== null && index === selectedAnswer && index !== parseInt(question.correct_answer)}
                                >
                                    {choice}
                                </button>
                            </li>
                        {/each}
                    </ul>
                    {#if feedback}
                        <div class="feedback-container">
                            <p class="feedback {feedback === 'Correct!' ? 'correct' : 'incorrect'}">
                                {feedback}
                            </p>
                        </div>
                    {/if}
                    {#if selectedAnswer !== null}
                        <div class="explanation">
                            <strong>Explanation:</strong> {question.explanation}
                        </div>
                        <div class="button-container">
                            <button on:click={handleNext}>
                                {isLastQuestionAnswered ? 'Review Your Answers' : 'Next Question'}
                            </button>
                        </div>
                    {/if}
                </div>
            {:else}
                <p>Loading question...</p>
            {/if}

            <!-- Quit button -->
            <div class="quit-container">
                <button on:click={quitQuiz}>Quit</button>
            </div>
        </div>
    {/if}
</div>
