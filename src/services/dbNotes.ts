import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { INote } from '@/types/types'

import { db } from '../firebase/auth'

interface INoteData {
	title: string
	description: string
	id: number | string
	typeOfNote: string
	date: Date | string
	email?: string
}

interface IUser {
	uid?: string
	name?: string | null
	email?: string | null
	notes?: []
}

// Set new note
export const setCollection = async ({ email }: IUser) => {
	try {
		const usersRef = doc(db, 'users', email || '')
		await setDoc(usersRef, {
			email,
			notes: []
		})
	} catch (error) {
		console.log(error)
	}
}
// Create and save new note in db
export const addNewNote = async ({ date, description, id, title, typeOfNote, email }: INoteData) => {
	try {
		const noteRef = doc(db, 'users', email || '')
		const noteData = { id, title, description, typeOfNote, date };

		await updateDoc(noteRef, {
			notes: arrayUnion(noteData)
	});
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}

// Read note values from db
export const handleReadNoteValues = async (email?: string | null) => {
	try {
		const refUsers = doc(db, 'users', email || '')
		const res = await getDoc(refUsers)
		
		return res.data()
	} catch (error) {
		console.log(error)
	}
}

export const deleteNote = async (email: string, note?: INote) => {
	try {		
		const deleteRef = doc(db, 'users', email || '')
		await updateDoc(deleteRef, {
			 notes: arrayRemove(note)
		 })
		
	} catch (error) {
		console.error(error)
	}
}