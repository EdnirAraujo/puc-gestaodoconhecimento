import { TipoNotificao } from "@/interfaces/INotificao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

type Notificador ={
    notificar: (tipo: TipoNotificao,titulo: string, texto: string) => void
}

export default() : Notificador => {
    const notificar = (tipo: TipoNotificao, titulo: string, texto: string) : void => {
        store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo
    })
}
return{
    notificar
}


}