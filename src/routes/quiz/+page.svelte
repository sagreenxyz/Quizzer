<script>
  import Quiz from '../../components/Quiz.svelte';
  import { goto } from '$app/navigation';
</script>

<div class="quiz-app">
  <button class="back-button" on:click={() => goto('/')}>Back to Main Menu</button>
  <Quiz />
</div>

<style>
  .quiz-app {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }
  .back-button {
    padding: 10px 15px;
    font-size: 1rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 5px;
    background-color: #6c757d;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .back-button:hover {
    background-color: #5a6268;
  }
</style>
