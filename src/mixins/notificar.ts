import { TipoNotificao } from "@/interfaces/INotificao"
import { NOTIFICAR } from "@/store/tipo-mutacoes"
import { store } from "@/store"

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificao, titulo: string, texto: string) : void{
                store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            })
        }
    }
}