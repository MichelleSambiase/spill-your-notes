import { addDoc, collection, getDocs } from 'firebase/firestore'

import { db } from '../firebase/auth'

interface INoteData {
	title: string
	description: string
	id: number | string
	typeOfNote: string
	date: Date | string
}

// Create and save new note in db
export const addNewNote = async (data: INoteData) => {
	try {
		const docRef = await addDoc(collection(db, 'note'), data)
		console.log('Document written with ID: ', docRef.id)
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}

// Read note values from db
export const handleReadNoteValues = async () => {
	const notesCollection = collection(db, 'note')
	const response = await getDocs(notesCollection)
	return response
}
