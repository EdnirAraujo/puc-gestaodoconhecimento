import IProfessor from "./IProfessor";


export default interface ITarefa {
    duracaoEmSegundos: number,
    descricao: string,
    professor: IProfessor,
    id: string
}