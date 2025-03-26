import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

const questionsFilePath = path.resolve('static/data/questions.json');

async function readQuestions() {
    const data = await fs.readFile(questionsFilePath, 'utf-8');
    return JSON.parse(data);
}

async function writeQuestions(questions) {
    await fs.writeFile(questionsFilePath, JSON.stringify(questions, null, 2), 'utf-8');
}

export async function GET() {
    try {
        const questions = await readQuestions();
        return json(questions);
    } catch (error) {
        console.error('Error reading questions.json:', error);
        return json({ error: 'Failed to load questions' }, { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const newQuestion = await request.json();
        const questions = await readQuestions();
        newQuestion.id = questions.length ? Math.max(...questions.map(q => q.id)) + 1 : 1;
        questions.push(newQuestion);
        await writeQuestions(questions);
        return json(newQuestion, { status: 201 });
    } catch (error) {
        console.error('Error adding question:', error);
        return json({ error: 'Failed to add question' }, { status: 500 });
    }
}

export async function PUT({ request }) {
    try {
        const updatedQuestion = await request.json();
        const questions = await readQuestions();
        const index = questions.findIndex(q => q.id === updatedQuestion.id);
        if (index === -1) {
            return json({ error: 'Question not found' }, { status: 404 });
        }
        questions[index] = updatedQuestion;
        await writeQuestions(questions);
        return json(updatedQuestion);
    } catch (error) {
        console.error('Error updating question:', error);
        return json({ error: 'Failed to update question' }, { status: 500 });
    }
}

export async function DELETE({ request }) {
    try {
        const { id } = await request.json();
        const questions = await readQuestions();
        const filteredQuestions = questions.filter(q => q.id !== id);
        if (questions.length === filteredQuestions.length) {
            return json({ error: 'Question not found' }, { status: 404 });
        }
        await writeQuestions(filteredQuestions);
        return json({ success: true });
    } catch (error) {
        console.error('Error deleting question:', error);
        return json({ error: 'Failed to delete question' }, { status: 500 });
    }
}
