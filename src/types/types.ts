/* eslint-disable @typescript-eslint/no-explicit-any */
interface ITitle {
	title: any
	clasName?: string
}

interface IButton {
	buttonText: string
	handleFunction?: (arg: string) => void
	isLoading?: boolean
	type: 'submit' | 'reset' | 'button' | undefined
	icon?: string
}

interface IInput {
	name: string
	type: 'text' | 'textarea' | 'number' | 'password'
	label: string
	value?: string
	id?: string
	className?: string
	error?: boolean | string
	maxLength?: number
	icon?: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>
	showPassword?: boolean
}

interface FormRules {
	errAllFields?: string
	errEmail?: string
	errFullName?: string
	errPassword?: string
	errRepeatPassword?: string
}

interface FormTypes {
	fullName: string | boolean
	email: string
	password: string
	repeatPassword: string
}

interface IUserSlice {
	user?: {
		email: string
		uid: string
		name: string
	} | null
	isLoading?: boolean
	note: {
		title: string
		description: string
		id: string
		typeOfNote?: TypeOfNotes,
		date: Date | string
	}
}

type TypeOfNotes = 'houseWork' | 'workTasks' | 'newIdeas' | 'personalDiary' | 'allNotes'


interface INote {
	title: string
	typeOfNote: TypeOfNotes
	description: string
	date: Date
	id:  string
} 


interface IDialog {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	handleEditNote?: () => void
	addNewNoteToHome?: (selectedNoteType: SelectOptions, id: string ) => void | undefined
	setCreateNoteValues?: React.Dispatch<
		React.SetStateAction<{
			titleNote: string
			descriptionNote: string
			typeOfNote: string,
			date: Date,
			id: string
		}>
	> 
	createNoteValues?: {
		titleNote: string
		descriptionNote: string
		typeOfNote: string,
		date: Date,
		id: string
	}
	selectedNoteType?: SelectOptions
	description: string
	title: string
	createNote?: boolean
	typeOfNote?: TypeOfNotes,
	date: Date | string
	handleDeleteNote?: () => void
}

interface ISelect {
	typeOfNote: TypeOfNotes
	id?: number
	selectedTypeNote: SelectOptions
	className?: string
	setSelectedTypeNote: React.Dispatch<React.SetStateAction<SelectOptions>>
	hasAllNotes?:boolean
}

interface IHome {
	noteInputVal: string
}

// Types
type ButtonLoading = {
	defaultLoading: boolean
	googleLoading: boolean
}

type SelectOptions = {
	id: number
	name: string
	typeOfNote: TypeOfNotes,
}

// Enum
export enum NotesColors {
	houseWork = 'bg-houseWork',
	workTasks = 'bg-workTasks',
	newIdeas = 'bg-newIdeas',
	personalDiary = 'bg-personalDiary',
	allNotes = 'bg-gradient-to-r from-[#35558A] from-30% via-[#B0E9CA] via-70% to-[#FDE99D] to-90%'
}

interface IHeader {
	handleLogout: () => void,
	className?: string
}

export type {
	ITitle,
	IButton,
	IInput,
	FormRules,
	FormTypes,
	IUserSlice,
	ButtonLoading,
	INote,
	IDialog,
	ISelect,
	IHome,
	TypeOfNotes,
	SelectOptions,
	IHeader
}
