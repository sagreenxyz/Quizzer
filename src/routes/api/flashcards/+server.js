import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

const flashcardsFilePath = path.resolve('static/data/flashcards.json');

async function readFlashcards() {
    const data = await fs.readFile(flashcardsFilePath, 'utf-8');
    return JSON.parse(data);
}

async function writeFlashcards(flashcards) {
    await fs.writeFile(flashcardsFilePath, JSON.stringify(flashcards, null, 2), 'utf-8');
}

export async function GET() {
    try {
        const flashcards = await readFlashcards();
        return json(flashcards);
    } catch (error) {
        console.error('Error reading flashcards.json:', error);
        return json({ error: 'Failed to load flashcards' }, { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const newFlashcard = await request.json();
        const flashcards = await readFlashcards();
        newFlashcard.id = flashcards.length ? Math.max(...flashcards.map(f => f.id)) + 1 : 1;
        flashcards.push(newFlashcard);
        await writeFlashcards(flashcards);
        return json(newFlashcard, { status: 201 });
    } catch (error) {
        console.error('Error adding flashcard:', error);
        return json({ error: 'Failed to add flashcard' }, { status: 500 });
    }
}

export async function PUT({ request }) {
    try {
        const updatedFlashcard = await request.json();
        const flashcards = await readFlashcards();
        const index = flashcards.findIndex(f => f.id === updatedFlashcard.id);
        if (index === -1) {
            return json({ error: 'Flashcard not found' }, { status: 404 });
        }
        flashcards[index] = updatedFlashcard;
        await writeFlashcards(flashcards);
        return json(updatedFlashcard);
    } catch (error) {
        console.error('Error updating flashcard:', error);
        return json({ error: 'Failed to update flashcard' }, { status: 500 });
    }
}

export async function DELETE({ request }) {
    try {
        const { id } = await request.json();
        const flashcards = await readFlashcards();
        const filteredFlashcards = flashcards.filter(f => f.id !== id);
        if (flashcards.length === filteredFlashcards.length) {
            return json({ error: 'Flashcard not found' }, { status: 404 });
        }
        await writeFlashcards(filteredFlashcards);
        return json({ success: true });
    } catch (error) {
        console.error('Error deleting flashcard:', error);
        return json({ error: 'Failed to delete flashcard' }, { status: 500 });
    }
}
