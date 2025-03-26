<script>
    import { onMount } from 'svelte';
    import FlashCard from './FlashCard.svelte';

    let flashcards = [];
    let currentIndex = 0;

    async function loadFlashcards() {
        try {
            const response = await fetch('/data/flashcards.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch flashcards.json: ${response.status} ${response.statusText}`);
            }
            flashcards = await response.json();
        } catch (error) {
            console.error('Error loading flashcards:', error);
        }
    }

    function nextFlashcard() {
        currentIndex = (currentIndex + 1) % flashcards.length;
    }

    function previousFlashcard() {
        currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    }

    onMount(loadFlashcards);
</script>

<div class="flashcard-viewer">
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
    {/if}
</div>

<style>
    .flashcard-viewer {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

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
</style>
