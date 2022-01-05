<template>
<q-page padding>
    <div class="doc-note">
        <p>Programarea dumneavoastra {{mesaj}} a fost inregistrata cu succes! In scurt timp veti primi un e-mail de confirmare.  </p>
        <p>Va informam ca trebuie sa aveti in momentul prezentarii cardul de asigurat si biletul de trimitere</p>
        <p>Va multumim si va asteptam!</p>
    </div>
</q-page>
</template>
<script>
import { defineComponent,ref } from 'vue'
import { useRoute } from "vue-router";

export default defineComponent({
    name:'Succes',
    setup() {
         const route =useRoute()
        console.log('Ruta este...',route.params.token)
        let token=route.params.token;

        let mesaj=ref(atob(token))



        return {
            mesaj
        }
    },
})
</script>
<style lang="scss">
.doc-note {
    background-color: #daf8e1;
    border-color: #9cedaf;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 5px;
    font-family: Helvetica,Arial,sans-serif;
    font-size: 1em;
    letter-spacing: .5px;
    line-height: 1.35em;
    margin: 16px 0;
    padding: 16px 24px;
}
</style>