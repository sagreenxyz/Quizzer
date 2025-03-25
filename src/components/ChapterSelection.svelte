<script>
    export let chapters = [];
    export let selectedChapter = null;
    export let startQuiz;

    function handleChapterChange(event) {
        selectedChapter = parseInt(event.target.value);
    }
</script>

<div>
    <h2>Select a Chapter to Start the Quiz</h2>
    <label for="chapter-select"><strong>Select Chapter:</strong></label>
    <select id="chapter-select" bind:value={selectedChapter} on:change={handleChapterChange}>
        <option value="">All Chapters</option>
        {#each chapters as chapter}
            <option value={chapter}>{`Chapter ${chapter}`}</option>
        {/each}
    </select>
    <button on:click={startQuiz} disabled={!selectedChapter}>Start Quiz</button>
</div>

<style>
    select {
        padding: 8px;
        font-size: 1rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
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

    button:hover:not([disabled]) {
        background-color: #0056b3;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>
