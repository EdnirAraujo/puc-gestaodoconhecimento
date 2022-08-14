import { INotificacao } from "@/interfaces/INotificao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { EstadoDoProfessor, professor } from "./modulos/professor";
import { EstadoDaTarefa , tarefa } from "./modulos/tarefas";

export interface Estado {
    notificaoes: INotificacao[],
    tarefa: EstadoDaTarefa
    professor: EstadoDoProfessor
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificaoes: [],
        tarefa: {
            tarefas: []
        },
        professor: {
            professores: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificaoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificaoes = state.notificaoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    modules: {
        professor,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}