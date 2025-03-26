<script>
    export let answers = []; // Accept answers as a prop
</script>

<div>
    <h2>Review Your Answers</h2>
    {#if answers.length > 0}
        <ul>
            {#each answers as answer, index}
                <li>Question {index + 1}: {answer}</li>
            {/each}
        </ul>
    {:else}
        <p>No answers to review.</p>
    {/if}
</div>

<style>
    h2 {
        text-align: center;
        margin-bottom: 1rem;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin: 0.5rem 0;
    }
</style>
