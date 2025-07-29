import {Person} from "@/types/persons";

export const data: Person[] = [
    {
        id: '1',
        firstName: 'Николай',
        secondName: 'Складнев',
        fatherName: 'Сергеевич',
        parents: {
            father: '3',
            mother: '2'
        }
    },
    {
        id: '2',
        firstName: 'Ирина',
        secondName: 'Складнева',
        fatherName: 'Юрьевна',
        originalSecondName: 'Лузина',
        parents: {}
    },
    {
        id: '3',
        firstName: 'Сергей',
        secondName: 'Складнев',
        fatherName: 'Геннадьевич',
        parents: {
            father: '9'
        }
    },
    {
        id: '4',
        firstName: 'Лев',
        secondName: 'Складнев',
        fatherName: 'Николаевич',
        parents: {
            father: '1',
            mother: '5'
        }
    },
    {
        id: '5',
        firstName: 'Анна',
        secondName: 'Складнева',
        fatherName: 'Владимировна',
        originalSecondName: 'Затолокина',
        parents: {
            father: '6',
            mother: '7'
        }
    },
    {
        id: '6',
        firstName: 'Владимир',
        secondName: 'Затолокин',
        fatherName: 'Андреевич',
        parents: {}
    },
    {
        id: '7',
        firstName: 'Надежда',
        secondName: 'Затолокина',
        fatherName: 'Ивановна',
        originalSecondName: 'Герасимова',
        parents: {}
    },
    {
        id: '8',
        firstName: 'Иван',
        secondName: 'Затолокин',
        fatherName: 'Владимирович',
        parents: {
            father: '6',
            mother: '7'
        }
    },
    {
        id: '9',
        firstName: 'Геннадий',
        secondName: 'Складнев',
        fatherName: 'Иосифович',
        parents: {}
    },
]