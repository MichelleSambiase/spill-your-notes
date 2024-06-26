import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { closestCorners, DndContext, DndContextProps } from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { signOut } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { searchIcon } from '@/assets/icons'
import loadingSpinner from '@/assets/icons/loadingSpinner.svg'
import { Header, Input, Note, Select, Title } from '@/components'
import Container from '@/components/Container'
import NoteModal from '@/components/modals/NoteModal'
import { fieldNoteValues, noteTypes, searchNoteValues } from '@/constant/fieldsValues'
import { animationSelect } from '@/constant/theme'
import { auth, db } from '@/firebase/auth'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { logoutUser, setLoading, setNote } from '@/redux/userSlice'
import { addNewNote, deleteNote, handleReadNoteValues } from '@/services/dbNotes'
import { INote, SelectOptions } from '@/types/types'

const ERROR_SHOW_NOTES = 'No se pueden mostrar las notas, por favor inténtalo más tarde'
const Home = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isOpenNote, setIsOpenNote] = useState(false)
	const [selectedNoteType, setSetselectedNoteType] = useState(noteTypes[0])
	const [createNoteValues, setCreateNoteValues] = useState(fieldNoteValues)
	const [notes, setNotes] = useState<INote[]>([])
	const [search, setSearch] = useState(searchNoteValues)
	const { t } = useTranslation()

	const user = useAppSelector((state) => state.users)

	const [editMyNote, setEditMyNote] = useState(user.note)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const bottomRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (user.user !== null)
			setTimeout(() => {
				dispatch(setLoading(false))
			}, 300)
	}, [dispatch, user.user])

	useEffect(() => {
		handleNotes()
	}, [user.user])

	// Search notes
	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name

		setSearch({ ...search, [name]: e.target.value })
	}

	// Show db notes
	const handleNotes = () => {
		if (!user.user) return
		handleReadNoteValues(user.user?.email)
			.then((res) => {
				if (!res) return

				const myNotes = res?.notes

				setNotes(myNotes || [])
				setIsLoading(false)
			})
			.catch((error) => console.log(ERROR_SHOW_NOTES, error))
			.finally(() => setIsLoading(false))
	}

	// Note filter
	const filteredNotes = useMemo(() => {
		const filterByTitleAndDescription = (note: INote) =>
			note.title?.toLowerCase().includes(search.searchValues?.toLowerCase()) || note.description?.toLowerCase().includes(search.searchValues?.toLowerCase())

		return notes.filter((note) =>
			selectedNoteType.typeOfNote === 'allNotes'
				? filterByTitleAndDescription(note)
				: note.typeOfNote === selectedNoteType.typeOfNote && filterByTitleAndDescription(note)
		)
	}, [search.searchValues, notes, selectedNoteType])

	// Delete notes
	const handleDeleteNote = (id?: string) => {
		const noteToDelete = notes.find((note) => note.id === id)

		deleteNote(user.user?.email || '', noteToDelete)
		setNotes(
			notes.filter((note) => {
				return note.id !== id
			})
		)
	}

	// Note order
	const notesSorted = useCallback(() => {
		const sortedNotes = [...filteredNotes]

		sortedNotes.sort((a, b) => {
			return Number(new Date(b.date)) - Number(new Date(a.date))
		})

		return sortedNotes
	}, [filteredNotes])

	// User Logout
	const handleLogout = () => {
		dispatch(logoutUser())
		signOut(auth)
		navigate('/signIn')
	}

	// Add new notes
	const addNewNoteToHome = (selected: SelectOptions, id: string) => {
		addNewNote({
			date: createNoteValues.date,
			description: createNoteValues.descriptionNote,
			title: createNoteValues.titleNote,
			typeOfNote: selected.typeOfNote,
			id: id,
			email: user.user?.email
		})

		setNotes(
			notes.concat({
				date: createNoteValues.date,
				description: createNoteValues.descriptionNote,
				title: createNoteValues.titleNote,
				typeOfNote: selected.typeOfNote,
				id: id
			})
		)

		setCreateNoteValues({
			descriptionNote: '',
			titleNote: '',
			typeOfNote: '',
			date: new Date(),
			id: ''
		})

		normalizeNote()
	}

	const handleUpdateNote = async (myNote: INote) => {
		const email = user.user?.email
		if (!email) return // checks if emails exits

		const usersRef = doc(db, 'users', email)
		const snapshot = await getDoc(usersRef)
		const notesArray = snapshot.data()?.notes

		if (notesArray) {
			// Find object index that you would like to edit
			const noteIndex = notesArray.findIndex((note: INote) => note.id === myNote.id)
			if (noteIndex === -1) return // Si no se encuentra la nota, salir de la función

			// Create array copy and update the object
			const updatedNotesArray = [...notesArray]
			updatedNotesArray[noteIndex] = {
				...updatedNotesArray[noteIndex],
				title: myNote.title,
				description: myNote.description,
				typeOfNote: myNote.typeOfNote,
				date: new Date()
			}

			// write updated array in firebase
			await updateDoc(usersRef, {
				notes: updatedNotesArray
			})

			setEditMyNote(updatedNotesArray[noteIndex])
			setNotes(updatedNotesArray)
			dispatch(setNote(updatedNotesArray[noteIndex]))
		}
	}

	const normalizeNote = () => {
		dispatch(
			setNote({
				title: '',
				description: '',
				typeOfNote: '',
				id: '0',
				date: new Date().toISOString()
			})
		)
	}

	const getNotePosition = (id: string | undefined) => notes.findIndex((note) => note.id === id)

	const handleDragEnd: DndContextProps['onDragEnd'] = (e) => {
		const { active, over } = e

		if (active?.id === over?.id) return

		setNotes((note) => {
			const originalPos = getNotePosition(active?.id.toString())
			const newPos = getNotePosition(over?.id.toString())

			return arrayMove(note, originalPos, newPos)
		})
	}

	return (
		<>
			<DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
				<Container className='w-full relative  h-full flex flex-col lg:max-w-none '>
					<div className='lg:px-5'>
						<Header handleLogout={handleLogout} />

						<div className='flex w-full justify-around  items-center md:hidden mt-4'>
							<Title title='Spill your notes.' clasName='md:hidden lg:text-xs' />
						</div>
					</div>

					<div className={`w-full h-full flex flex-col `}>
						<div className='md:flex md:items-center md:justify-evenly w-full mt-10'>
							<Input
								label={t('search_notes')}
								type='text'
								name='searchValues'
								value={search.searchValues}
								onChange={handleFormChange}
								className={`mt-3 text-[#616161] ${animationSelect} md:w-[250px] md:mt-0 lg:w-[300px]`}
								icon={searchIcon}
							/>

							<Select
								selectedTypeNote={selectedNoteType}
								typeOfNote={selectedNoteType.typeOfNote}
								setSelectedTypeNote={setSetselectedNoteType}
								className='mt-5 bg-[#fbfbfb] md:mt-0 md:w-[250px] lg:w-[300px]'
								hasAllNotes
							/>
						</div>
						{isLoading ? (
							<div className='w-full h-full flex items-center justify-center'>
								<img src={loadingSpinner} />
							</div>
						) : (
							<>
								{notes.length <= 0 ? (
									<p className='text-gray-500 font-medium  absolute top-1/2 left-1/2 -ml-[115px] -mr-[115px] '>Todavia no hay notas, ¡Crea una! </p>
								) : (
									<SortableContext items={notes} strategy={rectSortingStrategy}>
										<div
											className={`grid grid-cols-2  md:grid-cols-2 lg:grid-rows-2 xl:grid-rows-4 xl:grid-cols-4 gap-5  items-start pb-6  mt-12 md:px-4 ${
												notes.length > 0 ? 'lg:mt-14' : 'lg:mt-0'
											}`}>
											{notesSorted().map((note) => {
												return (
													<Note
														date={note.date}
														title={note.title}
														description={note.description}
														typeOfNote={note.typeOfNote}
														handleShowNote={() => {
															setIsOpenNote(true)
															const noteEdited = {
																title: note?.title,
																description: note?.description,
																typeOfNote: note?.typeOfNote,
																id: note?.id,
																date: note?.date
															}
															dispatch(setNote(noteEdited))
															setEditMyNote(noteEdited)
														}}
														handleDeleteNote={handleDeleteNote}
														isOpenNote={isOpenNote}
														key={note.id}
														id={note.id}
													/>
												)
											})}
										</div>
									</SortableContext>
								)}
							</>
						)}

						<div ref={bottomRef} />
					</div>

					<button
						onClick={() => {
							setIsOpen(true)
						}}
						className='rounded-full w-[60px] h-[60px] bg-[#C89CF4CC] flex justify-center shadow-lg fixed right-0 bottom-0 m-3'>
						<span className='text-5xl text-white'>+</span>
					</button>
				</Container>
			</DndContext>

			{/* Show note modal */}
			<NoteModal
				isEditNote
				isOpen={isOpenNote}
				setIsOpen={() => {
					setIsOpenNote(false)
				}}
				editMyNote={editMyNote}
				setEditMyNote={setEditMyNote}
				updateNote={handleUpdateNote}
				typeOfNote={editMyNote.typeOfNote}
				date={editMyNote.date}
			/>

			{/* Create note modal */}
			<NoteModal
				isOpen={isOpen}
				setIsOpen={() => {
					setIsOpen(false)
				}}
				addNewNoteToHome={addNewNoteToHome}
				createNoteValues={createNoteValues}
				setCreateNoteValues={setCreateNoteValues}
				selectedNoteType={selectedNoteType}
				title={user.note.title}
				typeOfNote={user.note.typeOfNote}
				description={user.note.description}
				createNote
				date={user.note.date}
			/>
		</>
	)
}

export default Home
