<script>
    export let chapters = [];
    export let selectedChapter = null;
    export let startQuiz; // Function to start the quiz or flashcards
    export let title = 'Select a Chapter'; // Default title

    function handleChapterChange(event) {
        selectedChapter = parseInt(event.target.value);
    }
</script>

<div class="chapter-selection">
    <h2>{title}</h2>
    <label for="chapter-select"><strong>Select Chapter:</strong></label>
    <select id="chapter-select" bind:value={selectedChapter} on:change={handleChapterChange}>
        <option value="">All Chapters</option>
        {#each chapters as chapter}
            <option value={chapter}>{`Chapter ${chapter}`}</option>
        {/each}
    </select>
    <button on:click={startQuiz} disabled={!selectedChapter}>Start</button>
</div>

<style>
    .chapter-selection {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 16px;
        width: 50%;
    }

    .chapter-selection select {
        padding: 8px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 16px;
        width: 100%;
    }

    .chapter-selection button {
        padding: 10px 15px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        background-color: #007BFF;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .chapter-selection button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .chapter-selection button:hover:not(:disabled) {
        background-color: #0056b3;
    }
</style>
