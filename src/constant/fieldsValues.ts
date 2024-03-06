import { SelectOptions } from '../types/types'

const formData = {
	fullName: '',
	email: '',
	password: '',
	repeatPassword: ''
}

const defaultErrors = {
	errAllFields: '',
	errFullName: '',
	errEmail: '',
	errPassword: '',
	errRepeatPassword: ''
}

const fieldNoteValues = {
	titleNote: '',
	descriptionNote: '',
	typeOfNote: '',
	date: new Date(),
	id: ''
}
const searchNoteValues = {
	searchValues: ''
}

const noteTypes: SelectOptions[] = [
	{
		id: 0,
		name: 'Todas las notas',
		typeOfNote: 'allNotes'
	},
	{
		id: 1,
		name: 'Tareas de casa',
		typeOfNote: 'houseWork',
	},
	{
		id: 2,
		name: 'Cosas del trabajo',
		typeOfNote: 'workTasks'
	},
	{
		id: 3,
		name: 'Ideas nuevas',
		typeOfNote: 'newIdeas'
	},
	{
		id: 4,
		name: 'Diario personal',
		typeOfNote: 'personalDiary'
	}
]

export { formData, defaultErrors, fieldNoteValues, noteTypes, searchNoteValues }
