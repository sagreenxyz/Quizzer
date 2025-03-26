<script>
    import FlashCardViewer from '../components/FlashCardViewer.svelte';
    import Quiz from '../components/Quiz.svelte';

    let activeApplication = 'Quiz'; // Tracks the currently selected application
</script>

<div>
    <nav>
        <button on:click={() => (activeApplication = 'Quiz')}>Quiz</button>
        <button on:click={() => (activeApplication = 'Flashcards')}>Flashcards</button>
        <!-- Add buttons for future applications here -->
    </nav>

    {#if activeApplication === 'Quiz'}
        <div class="quiz-container">
            <Quiz />
        </div>
    {:else if activeApplication === 'Flashcards'}
        <FlashCardViewer />
    {/if}
    <!-- Add conditional rendering for future applications here -->
</div>

<style>
    nav {
        margin-bottom: 1rem;
        display: flex;
        gap: 1rem;
    }
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
    button:hover {
        background-color: #0056b3;
    }
    .quiz-container {
        width: 50%;
        margin: 0 auto;
    }
</style>
 0