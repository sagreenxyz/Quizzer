<script>
    export let totalQuestionsAnswered = 0; // Default to 0
    export let totalQuestions = 1; // Avoid division by zero
</script>

<div class="progress">
    <div
        class="progress-bar"
        role="progressbar"
        style="width: {Math.min((totalQuestionsAnswered / totalQuestions) * 100, 100)}%;"
        aria-valuenow={totalQuestionsAnswered}
        aria-valuemin="0"
        aria-valuemax={totalQuestions}
    >
        {#if totalQuestionsAnswered / totalQuestions >= 0.2}
            <span>{totalQuestionsAnswered} of {totalQuestions}</span>
        {/if}
    </div>
</div>

<style>
    .progress {
        height: 20px;
        background-color: #f3f3f3;
        border-radius: 10px;
        overflow: hidden;
        margin: 1rem 0;
    }

    .progress-bar {
        height: 100%;
        background-color: #007BFF;
        transition: width 0.5s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: bold;
    }

    /* Ensure all fonts are sans-serif */
    :global(body) {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>
