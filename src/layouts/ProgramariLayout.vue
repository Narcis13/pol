<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>


        <q-toolbar-title>
          <div class="text-subtitle2">
            el EvenT en App
            </div>
        </q-toolbar-title>
        <div class="gt-sm">v. 1.0.0.</div>
    
    
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent} from 'vue'


export default defineComponent({
  name: 'ProgramariLayout',

  components: {
   
  },

  setup () {
    //  console.log('ProgramariLayout!')
  }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>