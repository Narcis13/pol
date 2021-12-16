<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>


        <div>
         Programari online servicii medicale
        </div>
    
    
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref ,inject} from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'

export default defineComponent({
  name: 'ProgramariLayout',

  components: {
   
  },

  setup () {
      console.log('ProgramariLayout!')
  }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>