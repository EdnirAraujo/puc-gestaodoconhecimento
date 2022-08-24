import http from "@/http";
import ITarefa from "@/interfaces/ITarefa"
import { Estado } from "@/store"
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "@/store/tipo-acoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex"
import { getDatabase, ref, set, update, child, get, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {

};
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
const db = getDatabase();
export interface EstadoDaTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoDaTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tare => tare.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas'

            if (filtro) {
                url += '?descricao=' + filtro
            }
            get(child(dbRef, `tarefas/`))
                .then(snapshot => commit(DEFINIR_TAREFAS, snapshot.val()))
            // http.get(url)
            //     .then(reposta => commit(DEFINIR_TAREFAS, reposta.data))
        },
        [CADASTRAR_TAREFA](contexto, tarefa: ITarefa) {
            tarefa.id=  Math.floor(1000 + Math.random() * 9000).toString()
            // const proj ={
            //     id:'3333',
            //     nome:'HHHHH'
            // }
            // tarefa.projeto=proj
            return set(ref(db, `tarefas/` + tarefa.id), tarefa)//.then((resposta) => commit(ADICIONA_TAREFA, tarefa))
            //return http.post('/tarefas', tarefa)
            //    .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        }
    }
}


// descricao
// :
// "Csdfdsfsdfsd-FIREBASE"
// duracaoEmSegundos
// :
// 2400
// id
// :
// 1
// projeto
// id
// :
// 3
// nome
// :
// "Inaja Bernardino Mayr-FIREBASE"
