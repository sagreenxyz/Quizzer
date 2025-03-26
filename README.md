# AIQuizzer

AIQuizzer is a SvelteKit-based application that provides a Quiz and Flashcard system. It allows users to select chapters, take quizzes, and review flashcards with a consistent and user-friendly interface.

## Features

- **Quiz Mode**:
  - Navigate to `/quiz` to start the quiz application.
  - Select a chapter to start the quiz.
  - Answer multiple-choice questions with instant feedback.
  - Track your score, progress, and percentage of correct answers.
  - Review your answers at the end of the quiz.
  - Includes a "Quit" button to return to chapter selection.
  - Includes a "Back to Main Menu" button to return to the main menu.

- **Flashcard Mode**:
  - Navigate to `/flashcards` to start the flashcards application.
  - Select a chapter to start reviewing flashcards.
  - Navigate through flashcards using "Previous" and "Next" buttons.
  - Track your progress through the flashcards.
  - Includes a "Quit" button to return to chapter selection.
  - Includes a "Back to Main Menu" button to return to the main menu.

- **Main Menu**:
  - The main menu is accessible at `/`.
  - Provides navigation buttons to access the Quiz and Flashcards applications.

- **Chapter Selection**:
  - Unified `ChapterSelection` component used in both the Quiz and Flashcards apps.
  - Dynamically displays a title based on the app (e.g., "Select a Chapter to Start the Quiz" or "Select a Chapter to Start Flashcards").

- **API Routes**:
  - `/api/questions`: Full CRUD operations for quiz questions.
  - `/api/flashcards`: Full CRUD operations for flashcards.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/AIQuizzer2.git
   cd AIQuizzer2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

## Project Structure

### Components

- **`src/components/Quiz.svelte`**:
  - Handles the quiz functionality, including chapter selection, question display, and progress tracking.
  - Uses the `ChapterSelection` component for chapter selection.

- **`src/components/FlashCardViewer.svelte`**:
  - Handles the flashcards functionality, including chapter selection, flashcard navigation, and progress tracking.
  - Uses the `ChapterSelection` component for chapter selection.

- **`src/components/ChapterSelection.svelte`**:
  - A reusable component for chapter selection.
  - Accepts a `title` prop to dynamically display the appropriate title for the Quiz or Flashcards app.

- **`src/components/ProgressBar.svelte`**:
  - Displays a progress bar to track the user's progress through the quiz or flashcards.

### Routes

- **`/`**:
  - The main menu of the application.
  - Provides navigation buttons to access the Quiz and Flashcards applications.

- **`/quiz`**:
  - The route for the Quiz application.
  - Renders the `Quiz.svelte` component.

- **`/flashcards`**:
  - The route for the Flashcards application.
  - Renders the `FlashCardViewer.svelte` component.

### API Routes

- **`src/routes/api/questions/+server.js`**:
  - Provides full CRUD operations for quiz questions.
  - Reads and writes data to `static/data/questions.json`.

- **`src/routes/api/flashcards/+server.js`**:
  - Provides full CRUD operations for flashcards.
  - Reads and writes data to `static/data/flashcards.json`.

### Static Data

- **`static/data/questions.json`**:
  - Stores the quiz questions data.

- **`static/data/flashcards.json`**:
  - Stores the flashcards data.

## Usage

### Main Menu

1. Open the app at `/`.
2. Click "Go to Quiz" to navigate to the Quiz application.
3. Click "Go to Flashcards" to navigate to the Flashcards application.

### Quiz App

1. Navigate to `/quiz`.
2. Select a chapter from the dropdown menu.
3. Click "Start" to begin the quiz.
4. Answer multiple-choice questions and receive feedback.
5. View your progress, score, and percentage.
6. Use the "Quit" button to return to chapter selection.
7. Use the "Back to Main Menu" button to return to the main menu.

### Flashcards App

1. Navigate to `/flashcards`.
2. Select a chapter from the dropdown menu.
3. Click "Start" to begin reviewing flashcards.
4. Navigate through flashcards using the "Previous" and "Next" buttons.
5. View your progress through the flashcards.
6. Use the "Quit" button to return to chapter selection.
7. Use the "Back to Main Menu" button to return to the main menu.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
