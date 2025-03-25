<script>
    export let userAnswers = [];
    export let score = 0;
    export let totalQuestionsAnswered = 0;
    export let calculatePercentage;
    export let resetQuiz;
</script>

<div class="review">
    <h2>Review Your Answers</h2>
    <p><strong>Score:</strong> {score}/{totalQuestionsAnswered} ({calculatePercentage()}%)</p>
    {#each userAnswers as answer, index}
        <div class="review-item {answer.isCorrect ? 'correct' : 'incorrect'}">
            <p><strong>Question {index + 1}:</strong> {answer.question}</p>
            <p><strong>Your Answer:</strong> {answer.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> {answer.correctAnswer}</p>
            <p><strong>Explanation:</strong> {answer.explanation}</p>
        </div>
    {/each}
    <button class="restart-quiz" on:click={resetQuiz}>Restart Quiz</button>
</div>

<style>
    .review {
        margin-top: 2rem;
    }

    .review-item {
        margin-bottom: 1.5rem;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    .review-item.correct {
        border-color: #28a745;
    }

    .review-item.incorrect {
        border-color: #dc3545;
    }

    .review-item p {
        margin: 0.5rem 0;
    }

    .restart-quiz {
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

    .restart-quiz:hover:not([disabled]) {
        background-color: #0056b3;
    }

    .restart-quiz:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>
