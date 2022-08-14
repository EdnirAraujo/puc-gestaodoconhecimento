<template>
    <div class="professores">
        <h1 class="title">Professores</h1>
                 <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'Professores-'  
})

</script>
<style>
.professores {
    padding: 1.25rem;
}
</style>

