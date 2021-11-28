<template>
    <div>Programare pacienti pentru specialitatea....</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from "vue-router";
export default defineComponent({
  name: 'Programare',
  setup(){
    const route =useRoute()
   console.log('Ruta este...',route.params.token)

    return {

    }
  }
})
</script>