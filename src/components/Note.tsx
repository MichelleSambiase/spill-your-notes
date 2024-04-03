import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { INote, NotesColors, TypeOfNotes } from '../types/types'
import { humanReadable } from '../utils/noteDate'

interface INoteProps extends INote {
	handleShowNote: (id?: string) => void
	handleDeleteNote: (id?: string) => void
	isOpenNote: boolean
	isOpacityEnabled?: boolean
	noteRef?: React.LegacyRef<HTMLDivElement>
	style?: { transition: string | undefined; transform: string | undefined }
	isDragging?: boolean
}
const buttonHeaderStyle = 'hover:bg-white hover:bg-opacity-60 hover:transition-all hover:duration-200 p-1 rounded-[4px]  h-[25px]'
const Note = ({ date, title, typeOfNote, description, handleShowNote, id, handleDeleteNote }: INoteProps) => {
	const { attributes, setNodeRef, transform, transition } = useSortable({ id })

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		lineHeight: '0.5'
	}

	return (
		<>
			<div ref={setNodeRef} style={style} {...attributes}>
				<div className='h-full '>
					{/* Note header */}
					<HeaderNote title={title} typeOfNote={typeOfNote} onClick={() => handleDeleteNote(id)} id={id} />

					{/* Note content */}
					<ContentNote date={date} description={description} onClick={handleShowNote} typeOfNote={typeOfNote} />
				</div>
			</div>
		</>
	)
}

export default Note

interface IHeaderNote {
	typeOfNote?: TypeOfNotes
	title: string
	onClick?: () => void
	id: string
}
const HeaderNote = ({ title, typeOfNote, onClick, id }: IHeaderNote) => {
	const { listeners } = useSortable({ id })

	return (
		<div className={`${NotesColors[typeOfNote || 'houseWork']} w-full rounded-t-md h-full flex items-center justify-between pr-1`}>
			<div className=' pr-1'>
				<h1 className='font-medium text-xs p-3 truncate max-w-[90px] sm:max-w-[120px]  md:max-w-[150px] md:text-clip'>{title}</h1>
			</div>

			<div>
				<button onClick={onClick} className={`${buttonHeaderStyle}  `} id={id}>
					<svg stroke='#5F5F5F' fill='#5F5F5F' width='15' height='15' viewBox='-4 -5 30 30' xmlns='http://www.w3.org/2000/svg'>
						<path d='M2.99998 -0.000206962C2.7441 -0.000206962 2.48794 0.0972617 2.29294 0.292762L0.292945 2.29276C-0.0980552 2.68376 -0.0980552 3.31682 0.292945 3.70682L7.58591 10.9998L0.292945 18.2928C-0.0980552 18.6838 -0.0980552 19.3168 0.292945 19.7068L2.29294 21.7068C2.68394 22.0978 3.31701 22.0978 3.70701 21.7068L11 14.4139L18.2929 21.7068C18.6829 22.0978 19.317 22.0978 19.707 21.7068L21.707 19.7068C22.098 19.3158 22.098 18.6828 21.707 18.2928L14.414 10.9998L21.707 3.70682C22.098 3.31682 22.098 2.68276 21.707 2.29276L19.707 0.292762C19.316 -0.0982383 18.6829 -0.0982383 18.2929 0.292762L11 7.58573L3.70701 0.292762C3.51151 0.0972617 3.25585 -0.000206962 2.99998 -0.000206962Z' />
					</svg>
				</button>

				<button {...listeners} className={`${buttonHeaderStyle}`}>
					<svg className='cursor-grabbing' viewBox='0 0 20 20' width='15' height='15' stroke='#5F5F5F' fill='#5F5F5F'>
						<path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z'></path>
					</svg>
				</button>
			</div>
		</div>
	)
}

interface IContentNote {
	onClick: () => void
	description: string
	date: Date | string
	typeOfNote?: TypeOfNotes
}
const ContentNote = ({ date, description, typeOfNote, onClick }: IContentNote) => {
	return (
		<div onClick={onClick} className={`bg-[#fbfbfb] h-[220px] md:h-[180px] lg:h-[120px] text-sm pt-2 flex flex-col justify-between`}>
			<p className='h-full'>{description?.length > 160 ? description?.slice(0, 160) + '...' : description}</p>
			<p className='text-xs flex justify-end pr-2 text-[#414141] font-medium '>{humanReadable(date)}</p>
			<div className={`h-1 mt-1 ${NotesColors[typeOfNote || 'houseWork']}`} />
		</div>
	)
}
