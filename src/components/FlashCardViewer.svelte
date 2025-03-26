<script>
    import { onMount } from 'svelte';
    import FlashCard from './FlashCard.svelte';
<<<<<<< HEAD
    import ProgressBar from './ProgressBar.svelte';
    import ChapterSelection from './ChapterSelection.svelte';

    let flashcards = [];
    let filteredFlashcards = [];
    let currentIndex = 0;
    let chapters = [];
    let selectedChapter = null;
    let selectedChapterName = ''; // Store the selected chapter name
    let isChapterSelectionMode = true; // Add a mode for chapter selection

    async function loadFlashcards() {
        try {
            const response = await fetch('/api/flashcards');
            if (!response.ok) {
                throw new Error(`Failed to fetch flashcards: ${response.status} ${response.statusText}`);
            }
            flashcards = await response.json();
            chapters = [...new Set(flashcards.map(f => f.chapters_id).filter(chapter => chapter !== null))];
=======

    let flashcards = [];
    let currentIndex = 0;

    async function loadFlashcards() {
        try {
            const response = await fetch('/data/flashcards.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch flashcards.json: ${response.status} ${response.statusText}`);
            }
            flashcards = await response.json();
>>>>>>> 04e987a (Added flashcards)
        } catch (error) {
            console.error('Error loading flashcards:', error);
        }
    }

<<<<<<< HEAD
    function startFlashcards() {
        isChapterSelectionMode = false;
        filterFlashcards();
    }

    function filterFlashcards() {
        filteredFlashcards = selectedChapter
            ? flashcards.filter(f => f.chapters_id === selectedChapter)
            : flashcards;
        selectedChapterName = selectedChapter ? `Chapter ${selectedChapter}` : 'All Chapters';
        currentIndex = 0; // Reset to the first flashcard
    }

    function nextFlashcard() {
        currentIndex = (currentIndex + 1) % filteredFlashcards.length;
    }

    function previousFlashcard() {
        currentIndex = (currentIndex - 1 + filteredFlashcards.length) % filteredFlashcards.length;
    }

    function quitFlashcards() {
        isChapterSelectionMode = true; // Return to chapter selection mode
        selectedChapter = null; // Reset the selected chapter
        selectedChapterName = ''; // Clear the chapter name
        filteredFlashcards = []; // Clear the filtered flashcards
        currentIndex = 0; // Reset the current index
=======
    function nextFlashcard() {
        currentIndex = (currentIndex + 1) % flashcards.length;
    }

    function previousFlashcard() {
        currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
>>>>>>> 04e987a (Added flashcards)
    }

    onMount(loadFlashcards);
</script>

<div class="flashcard-viewer">
<<<<<<< HEAD
    {#if isChapterSelectionMode}
        <!-- Use ChapterSelection component -->
        <ChapterSelection
            {chapters}
            bind:selectedChapter
            startQuiz={startFlashcards}
            title="Select a Chapter to Start Flashcards"
        />
    {:else}
        <div class="flashcard-container">
            <h2>{selectedChapterName}</h2>

            <p><strong>Progress:</strong> {currentIndex + 1}/{filteredFlashcards.length}</p>

            <ProgressBar
                totalQuestionsAnswered={currentIndex + 1}
                totalQuestions={filteredFlashcards.length}
            />

            {#if filteredFlashcards.length > 0}
                <FlashCard
                    question={filteredFlashcards[currentIndex].question}
                    answer={filteredFlashcards[currentIndex].answer}
                />
                <div class="navigation">
                    <button on:click={previousFlashcard}>Previous</button>
                    <button on:click={nextFlashcard}>Next</button>
                </div>
            {:else}
                <p>No flashcards available for the selected chapter.</p>
            {/if}

            <div class="quit-container">
                <button on:click={quitFlashcards}>Quit</button>
            </div>
        </div>
=======
    {#if flashcards.length > 0}
        <FlashCard
            question={flashcards[currentIndex].question}
            answer={flashcards[currentIndex].answer}
        />
        <div class="navigation">
            <button on:click={previousFlashcard}>Previous</button>
            <button on:click={nextFlashcard}>Next</button>
        </div>
    {:else}
        <p>Loading flashcards...</p>
>>>>>>> 04e987a (Added flashcards)
    {/if}
</div>

<style>
    .flashcard-viewer {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

<<<<<<< HEAD
    .flashcard-container {
        width: 50%; /* Match the width used in the Quiz app */
        margin: 0 auto;
        text-align: center;
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 16px;
    }

=======
>>>>>>> 04e987a (Added flashcards)
    .navigation {
        margin-top: 16px;
    }

    .navigation button {
        margin: 0 8px;
        padding: 8px 16px;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        background-color: #007BFF;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .navigation button:hover {
        background-color: #0056b3;
    }
<<<<<<< HEAD

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
=======
>>>>>>> 04e987a (Added flashcards)
</style>
