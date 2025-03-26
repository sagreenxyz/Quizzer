<script>
  import { goto } from '$app/navigation';
</script>

<div class="menu">
  <h1>Welcome to AIQuizzer</h1>
  <button on:click={() => goto('/quiz')}>Go to Quiz</button>
  <button on:click={() => goto('/flashcards')}>Go to Flashcards</button>
</div>

<style>
  .menu {
    text-align: center;
    margin-top: 2rem;
  }
  button {
    padding: 10px 20px;
    font-size: 1.2rem;
    margin: 10px;
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
</style>