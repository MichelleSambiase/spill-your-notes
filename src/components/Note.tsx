import { INote, NotesColors } from '../types/types'
import { humanReadable } from '../utils/noteDate'

interface INoteProps extends INote {
	handleShowNote: () => void
	isOpenNote: boolean
	noteRef?: React.LegacyRef<HTMLDivElement>
	style?: { transition: string | undefined; transform: string | undefined }
}
const Note = ({ date, title, typeOfNote, description, handleShowNote, noteRef, style }: INoteProps) => {
	return (
		<div style={style} ref={noteRef} role='button' onClick={() => handleShowNote()} className={`${NotesColors[typeOfNote]} rounded-md h-full pb-2`}>
			<div className='h-full   cursor-pointer shadow-sm'>
				<h1 className={`font-medium text-xs p-3  ${typeOfNote === 'workTasks' ? 'text-white' : 'text-[#5F5F5F]'} truncate md:text-clip`}>{title}</h1>
				<div className={`bg-[#fbfbfb] h-[220px] md:h-[180px] lg:h-[120px] text-sm p-2 flex flex-col justify-between `}>
					<p className='h-full'>{description?.length > 160 ? description?.slice(0, 160) + '...' : description}</p>
					<p className='text-xs flex justify-end pr-2 text-[#414141] font-medium '>{humanReadable(date)}</p>
				</div>
			</div>
		</div>
	)
}

export default Note
