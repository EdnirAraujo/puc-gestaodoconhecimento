import IProfessor from "@/interfaces/IProfessor";
import { Estado } from "@/store";
import { ALTERAR_PROFESSOR, CADASTRAR_PROFESSOR, OBTER_PROFESSORES, REMOVER_PROFESSOR } from "@/store/tipo-acoes";
import { ADICIONA_PROFESSOR, ALTER_PROFESSOR, DEFINIR_PROFESSORES, EXCLUIR_PROFESSOR } from "@/store/tipo-mutacoes";
import { Module } from "vuex";
import { getDatabase, ref, set, update, child, get, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {

  };    
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
const db = getDatabase();


export interface EstadoDoProfessor {
    professores: IProfessor[]
}

export const professor: Module<EstadoDoProfessor, Estado> = {
    mutations: {
        [ADICIONA_PROFESSOR](state, nomeDoProfessor: string) {
            const professor = {
                id: new Date().toISOString(),
                nome: nomeDoProfessor
            } as IProfessor
            state.professores.push(professor)
        },
        [ALTER_PROFESSOR](state, professor: IProfessor) {
            const index = state.professores.findIndex(proj => proj.id == professor.id)
            state.professores[index] = professor
        },
        [EXCLUIR_PROFESSOR](state, id: string) {
            state.professores = state.professores.filter(proj => proj.id != id)
        },
        [DEFINIR_PROFESSORES](state, professores: IProfessor[]) {
            state.professores = professores
        }
    },
    actions: {
        [OBTER_PROFESSORES]({ commit }) {
            get(child(dbRef, `professores/`))
                .then(snapshot => commit(DEFINIR_PROFESSORES, snapshot.val()))
        },
        [CADASTRAR_PROFESSOR](contexto, nomeDoProfessor: string) {
            const idI = Math.floor(100 + Math.random() * 900000)
            return set(ref(db, 'professores/' + idI), { nome: nomeDoProfessor, id: idI })
        },
        [ALTERAR_PROFESSOR](contexto, professor: IProfessor) {
            const updates = [['/professores/' + professor.id], professor];
            return update(ref(db), updates);
        },
        [REMOVER_PROFESSOR](contexto, id: string) {
            return remove(ref(db, 'professores/' + id))
        }
    },
}
