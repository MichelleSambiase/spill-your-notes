import { Listbox } from '@headlessui/react'

import { SelectOptions } from '../../types/types'

const handleAllNotes = (type?: SelectOptions) => (
	<Listbox.Option as='div' key={type?.id} value={type}>
		{({ active, selected }) => (
			<li
				className={`p-2 ${
					active
						? 'bg-gray-300 bg-opacity-10 text-defaultText font-medium cursor-pointer '
						: 'bg-white text-black font-medium'
				} ${selected ? 'font-semibold ' : 'font-normal'}`}>
				{type?.name}
			</li>
		)}
	</Listbox.Option>
)

export default handleAllNotes
