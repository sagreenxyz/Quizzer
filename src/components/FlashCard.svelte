<script>
    export let question;
    export let answer;
    let isFlipped = false;

    function flipCard() {
        isFlipped = !isFlipped;
    }
</script>

<div class="flashcard">
    {#if isFlipped}
        <p class="answer">{answer}</p>
    {:else}
        <p class="question">{question}</p>
    {/if}
    <button on:click={flipCard}>Flip Card</button>
</div>

<style>
    .flashcard {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 16px 0;
        background-color: #f9f9f9;
        text-align: center;
    }

    .question, .answer {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .answer {
        color: #007BFF;
    }

    button {
        margin-top: 12px;
        padding: 8px 16px;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        background-color: #007BFF;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>
