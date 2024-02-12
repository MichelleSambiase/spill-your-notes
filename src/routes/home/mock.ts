import { INote } from '../../types/types'

export const mockNotes: INote[] = [
	{
		title: 'Almohadas',
		description: 'Tengo que realizar una inspección `Almohadonesca`',
		date: new Date(2013, 1, 14),
		typeOfNote: 'houseWork',
		id: '1'
	},
	{
		title: 'Ropa',
		description: 'Planificar nuevas ideas en mi fondo de armario',
		date: new Date(2023, 1, 24),
		typeOfNote: 'newIdeas',
		id: '2'
	},
	{
		title: 'Pesadilla',
		description: 'El jueves pasado tuve una pesadilla, soñé que un hombre lobo entraba por el balcón! Pero lo que el hombre lobo no sabía, es que yo tengo un murciélago de mascota! spoiler: El hombre lobo fue la cena de mi mascota. :)',
		date: new Date(2023, 10, 21),
		typeOfNote: 'personalDiary',
		id: '3'
	},

	{
		title: 'TEMPO',
		description: 'Tengo que subir las horas de mis tareas.',
		date: new Date(2023, 10, 11),
		typeOfNote: 'workTasks',
		id: '4'
	},
	// {
	// 	title: 'Diseñar una máquina que haga llover chicle',
	// 	description: 'A veces quiero comer chicles, que tal si tan solo creara una maquina que que pudiese generar lluvia y que esa lluvia sean chicles? ',
	// 	date: new Date(2022, 10, 18),
	// 	typeOfNote: 'newIdeas',
	// 	id: 5
	// },
	// {
	// 	title: 'Plantas de interior',
	// 	description: 'Ayer soñé que tenía una conversación profunda con mi planta de interior, creo que las 2 nos dijimos cosas importantes. ¿Qué me estará pasando?',
	// 	date: new Date(2023, 10, 17),
	// 	typeOfNote: 'personalDiary',
	// 	id: 6
	// },
	// {
	// 	title: 'Buscar a los duendes',
	// 	description: 'Ultimamente la casa esta muy sucia, tengo que buscar a esos pequeño duendes de la limpieza para que limpien un poco.',
	// 	date: new Date(2023, 10, 14),
	// 	typeOfNote: 'workTasks',
	// 	id: 7
	// },
	// {
	// 	title: 'Escribir una historia',
	// 	description: 'Me gutaría empezar a escribir una thriller distopico donde la corrupción, los engaños y el amor son el principal protagonista.  ',
	// 	date: new Date(2023, 10, 4),
	// 	typeOfNote: 'newIdeas',
	// 	id: 8
	// },
	// {
	// 	title: 'Sueños pasados',
	// 	description: 'Hace un par de meses soñé que una palta me hablaba, parecía estar feliz, tenía pequeños brazos y piernas... Parecían hechos de palta... Me rogó que no la comiera, pero tenía hambre, asi que la comí. ',
	// 	date: new Date(2023, 10, 11),
	// 	typeOfNote: 'personalDiary',
	// 	id: 9
	// },
	// {
	// 	title: 'Título 4',
	// 	description: 'Descripción 1005',
	// 	date: new Date(2023, 10, 5),
	// 	typeOfNote: 'newIdeas',
	// 	id: 10
	// },
	// {
	// 	title: 'Título 4',
	// 	description: 'Descripción 1005',
	// 	date: new Date(2022, 10, 18),
	// 	typeOfNote: 'houseWork',
	// 	id: 11
	// },
	// {
	// 	title: 'El cuento de la lechera',
	// 	description: 'El otro día soñé que na lechera llevaba en la cabeza un cubo de leche recién ordeñada y caminaba hacia su casa soñando despierta. “Como esta leche es muy buena”, se decía, “dará mucha nata. Batiré muy bien la nata hasta que se convierta en una mantequilla blanca y sabrosa, que me pagarán muy bien en el mercado. Con el dinero, me compraré un canasto de huevos y, en cuatro días, tendré la granja llena de pollitos, que se pasarán el verano piando en el corral. Cuando empiecen a crecer, los venderé a buen precio, y con el dinero que saque me compraré un vestido nuevo de color verde, con tiras bordadas y un gran lazo en la cintura. Cuando lo vean, todas las chicas del pueblo se morirán de envidia. Me lo pondré el día de la fiesta mayor, y seguro que el hijo del molinero querrá bailar conmigo al verme tan guapa. Pero no voy a decirle que sí de buenas a primeras. Esperaré a que me lo pida varias veces y, al principio, le diré que no con la cabeza. Eso es, le diré que no: “¡así!”',
	// 	date: new Date(2019, 5, 18),
	// 	typeOfNote: 'personalDiary',
	// 	id: 12
	// }
	// ,
	// {
	// 	title: 'Un Sueño, de Jorge Luis Borges',
	// 	description: 'En un desierto lugar del Irán hay una no muy alta torre de piedra, sin puerta ni ventana. En la única habitación (cuyo piso es de tierra y que tiene la forma de círculo) hay una mesa de madera y un banco. En esa celda circular, un hombre que se parece a mí escribe, en caracteres que no comprendo, un largo poema sobre un hombre que en otra celda circular escribe un poema sobre un hombre que en otra celda circular… El proceso no tiene fin y nadie podrá leer lo que los prisioneros escriben.',
	// 	date: new Date(2023, 10, 2),
	// 	typeOfNote: 'personalDiary',
	// 	id: 13
	// }
	// ,
	// {
	// 	title: 'Aspiradora',
	// 	description: 'Debo entrena a mi aspiradora así puede limpiar por mi',
	// 	date: new Date(2023, 10, 15),
	// 	typeOfNote: 'houseWork',
	// 	id: 14
	// }
	// ,
	// {
	// 	title: 'Entregar el challenge',
	// 	description: 'El miércoles 21-11-2023 presento este challenge',
	// 	date: new Date(2014, 10, 18),
	// 	typeOfNote: 'workTasks',
	// 	id: 15
	// }
	// ,
	// {
	// 	title: 'Inventar nuevo idea',
	// 	description: 'Creo que estaría bueno poder inventar un idioma nuevo',
	// 	date: new Date(2015, 10, 18),
	// 	typeOfNote: 'newIdeas',
	// 	id: 16
	// }
	// ,
	// {
	// 	title: 'Título 4',
	// 	description: 'Descripción 1005',
	// 	date: new Date(2012, 10, 18),
	// 	typeOfNote: 'personalDiary',
	// 	id: 17
	// }
	// ,
	// {
	// 	title: 'Título 4',
	// 	description: 'Descripción 1005',
	// 	date: new Date(2022, 10, 18),
	// 	typeOfNote: 'workTasks',
	// 	id: 18
	// }
	// ,
	// {
	// 	title: 'Título 4',
	// 	description: 'Descripción 1005',
	// 	date: new Date(2021, 10, 18),
	// 	typeOfNote: 'newIdeas',
	// 	id: 19
	// }
	// ,
	// {
	// 	title: 'Título 4',
	// 	description: 'Descripción 1005',
	// 	date: new Date(2023, 10, 17),
	// 	typeOfNote: 'houseWork',
	// 	id: 20
	// },
	// {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2023, 10, 12),
  //   typeOfNote: 'workTasks',
  //   id: 21
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2023, 10, 10),
  //   typeOfNote: 'newIdeas',
  //   id: 22
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2023, 10, 12),
  //   typeOfNote: 'personalDiary',
  //   id: 23
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2023, 10, 11),
  //   typeOfNote: 'workTasks',
  //   id: 24
	// },
	// {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2005, 10, 18),
  //   typeOfNote: 'workTasks',
  //   id: 27
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2021, 10, 18),
  //   typeOfNote: 'newIdeas',
  //   id: 28
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2010, 10, 18),
  //   typeOfNote: 'personalDiary',
  //   id: 29
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2021, 10, 18),
  //   typeOfNote: 'workTasks',
  //   id: 30
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2009, 10, 18),
  //   typeOfNote: 'newIdeas',
  //   id: 31
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2017, 10, 18),
  //   typeOfNote: 'houseWork',
  //   id: 32
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2018, 6, 18),
  //   typeOfNote: 'workTasks',
  //   id: 33
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2019, 3, 18),
  //   typeOfNote: 'newIdeas',
  //   id: 34
  // },
  // {
  //   title: 'Título 4',
  //   description: 'Descripción 1005',
  //   date: new Date(2020, 4, 18),
  //   typeOfNote: 'personalDiary',
  //   id: 35
  // }
]