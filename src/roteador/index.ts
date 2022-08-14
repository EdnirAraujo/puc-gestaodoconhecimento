import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/Tarefas.vue'
import Professores from '../views/Professores.vue'
import Lista from '../views/Professores/Lista.vue'
import Formulario from '../views/Professores/Formulario.vue'

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/professores',
        component: Professores,
        children: [
            {
                path: '',
                name: 'Professores',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo professor',
                component: Formulario
            },
            {
                path: ':id',
                name: 'Editar professor',
                component: Formulario,
                props: true
            }
        ]
    }
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;