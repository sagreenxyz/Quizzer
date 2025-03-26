<script>
    import Quiz from '../components/Quiz.svelte';

    let activeApplication = 'Quiz'; // Tracks the currently selected application
</script>

<div>
    <nav>
        <button on:click={() => (activeApplication = 'Quiz')}>Quiz</button>
        <!-- Remove the "Review Your Answers" button -->
        <!-- Add buttons for future applications here -->
    </nav>

    {#if activeApplication === 'Quiz'}
        <div class="quiz-container">
            <Quiz />
        </div>
    {/if}
    <!-- Remove conditional rendering for ReviewAnswers -->
    <!-- Add conditional rendering for future applications here -->
</div>

<style>
    nav {
        margin-bottom: 1rem;
        display: flex;
        gap: 1rem;
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
    .quiz-container {
        width: 50%;
        margin: 0 auto;
    }
</style>
