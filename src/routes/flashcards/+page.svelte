<script>
  import FlashCardViewer from '../../components/FlashCardViewer.svelte';
  import { goto } from '$app/navigation';
</script>

<div class="flashcards-app">
  <button class="back-button" on:click={() => goto('/')}>Back to Main Menu</button>
  <FlashCardViewer />
</div>

<style>
  .flashcards-app {
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
