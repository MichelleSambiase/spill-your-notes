import { Listbox, Transition } from '@headlessui/react'

import { arrowDownIcon } from '../assets/icons'
import { noteTypes } from '../constant/fieldsValues'
import { ISelect } from '../types/types'
import handleAllNotes from './functionComponents/ListboxOptions'

const Select = ({ selectedTypeNote, setSelectedTypeNote, className, hasAllNotes = false }: ISelect) => {
	return (
		<Listbox as='div' value={selectedTypeNote} className='relative' onChange={setSelectedTypeNote}>
			<div className='mt-2 md:mt-0'>
				<span className='inline-block w-full rounded-xl'>
					<Listbox.Button
						className={`rounded-xl w-full h-11 flex items-center justify-between pl-4 text-[#616161] text-sm font-medium border-b border-b-[#ebebeb] focus:outline-purple focus:ring-purple focus:ring-4 focus:ring-offset-0   active:ring-[#3b82f61f] active:ring-4 active:ring-offset-0 active:border-purple-900   transition-all ${className}`}>
						<span className='block truncate'> {selectedTypeNote.name}</span>

						<img src={arrowDownIcon} alt='Icono de flecha' className='pr-7' />
					</Listbox.Button>
				</span>
				<Transition
					enter='transition duration-100 ease-out'
					enterFrom='transform scale-95 opacity-0'
					enterTo='transform scale-100 opacity-100'
					leave='transition duration-75 ease-out'
					leaveFrom='transform scale-100 opacity-100'
					leaveTo='transform scale-95 opacity-0'
					className='absolute mt-1 w-full rounded-md bg-white z-50'>
					<Listbox.Options
						static
						className={`max-h-60  w-full z-50  absolute overflow-auto text-sm rounded-md leading-5 py-2 bg-white  mt-3 border border-solid border-[#ebebeb] outline-none focus:outline-none		 `}>
						{noteTypes.map((type) => (hasAllNotes ? handleAllNotes(type) : type.typeOfNote !== 'allNotes' && handleAllNotes(type)))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
}

export default Select
