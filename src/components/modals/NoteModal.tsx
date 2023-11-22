import { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { v4 as uuidv4 } from 'uuid'

import { noteTypes } from '../../constant/fieldsValues'
import { animationSelect } from '../../constant/theme'
import { useAppDispatch } from '../../redux/hooks'
import { setNote } from '../../redux/userSlice'
import { IDialog, NotesColors } from '../../types/types'
import { humanReadable, todayDate } from '../../utils/noteDate'
import { Button, Input, Select } from '..'

const NoteModal = ({
	description,
	isOpen,
	setIsOpen,
	title,
	createNote,
	addNewNoteToHome,
	createNoteValues,
	setCreateNoteValues,
	date,
	typeOfNote,
	handleDeleteNote
}: IDialog) => {
	const [selectedNoteType, setSelectedNoteType] = useState(noteTypes[1])

	const dispatch = useAppDispatch()

	const handleFormChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const name = e.target.name

		if (createNoteValues)
			setCreateNoteValues?.({ ...createNoteValues, [name]: e.target.value })
	}

	const handleNewNote = () => {
		const newId = uuidv4()
		if (
			createNoteValues?.titleNote === '' ||
			createNoteValues?.descriptionNote === ''
		)
			return

		setIsOpen(false)

		dispatch(
			setNote({
				title: createNoteValues?.titleNote,
				description: createNoteValues?.descriptionNote,
				typeOfNote: selectedNoteType.typeOfNote,
				id: newId,
				date: new Date().toISOString()
			})
		)

		addNewNoteToHome?.(selectedNoteType, newId)
	}

	return (
		<Transition show={isOpen}>
			<Dialog onClose={setIsOpen} className='relative  z-99'>
				<Transition.Child
					enter='transition duration-100 ease-out'
					enterFrom='transform scale-95 opacity-0'
					enterTo='transform scale-100 opacity-100'
					leave='transition duration-75 ease-out'
					leaveFrom='transform scale-100 opacity-100'
					leaveTo='transform scale-95 opacity-0'
					as={Fragment}>
					<div
						className='fixed top-0 w-full h-full bg-black/30'
						aria-hidden='true'
					/>
				</Transition.Child>
				<div className='fixed top-0 left-0  h-full flex items-center justify-center p-4 w-screen overflow-y-auto'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'>
						{/* Panel */}
						<Dialog.Panel
							data-testid='container'
							className={` border-gray-500 rounded-lg shadow-b bg-white  w-full md:max-w-sm ${
								createNote ? 'p-5' : 'p-3'
							} `}>
							<div className='h-full relative flex flex-col justify-evenly'>
								<div
									className={`flex items-center  w-full justify-between ${
										createNote ? ' mb-3' : 'px-3'
									} `}>
									{/* type of note color */}
									<div
										className={`w-[41px] h-2 rounded-xl ${
											typeOfNote
												? NotesColors[typeOfNote || 'allNotes']
												: NotesColors[selectedNoteType.typeOfNote]
										}`}
									/>

									<p className='  text-xs  text-[#414141] font-medium'>
										{createNote ? todayDate(date) : humanReadable(date)}
									</p>
									{!createNote && (
										<button
											onClick={handleDeleteNote}
											className={` rounded-lg outline-none bg-[#C89CF4] bg-opacity-60 flex items-start justify-center text-sm text-white ring-0 active:ring-[4px] focus:ring-[#535bf22b] focus:ring-opacity-30  transition-all duration-300 p-2`}>
											Eliminar nota
										</button>
									)}
								</div>

								{createNote ? (
									<>
										<Input
											label='Escribe el Título...'
											name='titleNote'
											type='text'
											value={createNoteValues?.titleNote}
											className={` mt-6 text-xl font-medium text-[#060606d4] border-t-0 border-x-0 ${animationSelect}`}
											onChange={handleFormChange}
										/>
										{/* Tipo of note select */}
										<Select
											selectedTypeNote={selectedNoteType}
											setSelectedTypeNote={setSelectedNoteType}
											typeOfNote={selectedNoteType.typeOfNote}
											className='mt-5'
										/>
									</>
								) : (
									// Modal title
									<Dialog.Title className='text-2xl text-[#181818] font-semibold mt-2 break-all'>
										{title}
									</Dialog.Title>
								)}

								{createNote ? (
									<>
										<textarea
											placeholder='Descripción'
											value={createNoteValues?.descriptionNote}
											onChange={(e) => handleFormChange(e)}
											className={`mt-10 border border-solid border-[#ebebeb] rounded-xl w-full   focus-visible:outline-none! outline-none p-1 resize-none h-[110px] ${animationSelect}`}
											name='descriptionNote'
											maxLength={160}
										/>
										<Button
											buttonText='Guardar nota'
											type='button'
											handleFunction={handleNewNote}
										/>
									</>
								) : (
									<>
										{/* Description note */}
										<div className='mt-3 flex'>
											<p className={`text-sm text-gray-500`}>{description}</p>
										</div>
									</>
								)}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

export default NoteModal
