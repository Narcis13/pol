<template>
<q-page padding>
    <div class="flex flex-center column">
        <div class="text-h5">Anulare programare</div> 
            <q-card v-if="mesaj=='interogare'" class="my-card">
                    <q-card-section class="bg-purple text-white">
                        <div class="text-h6">Doriti anularea programarii?</div>
                     
                    </q-card-section>

                    <q-card-actions align="around">
                        <q-btn @click="anulare" flat>DA</q-btn>
                        <q-btn @click="mesaj='abandon'" flat>NU</q-btn>
                    </q-card-actions>
             </q-card>
            <div v-if="mesaj=='abandon'" class="doc-note">
                 <p>Va multumim pentru increderea pe care ne-o acordati si va asteptam in data si la ora pentru care ati facut programarea!</p>
                
            </div>
            <div v-if="mesaj=='anulare'" class="doc-note">
                 <p>Programarea dumneavoastra a fost ANULATA!</p>
                
            </div>
    </div>
</q-page>
    
</template>
<script>
import { defineComponent,ref } from 'vue'
import { useRoute } from "vue-router";
import axios from 'axios'
export default defineComponent({
    name:'Anulare',
    setup() {
         const route =useRoute()
        console.log('Ruta este...',route.params.token)
        let token=route.params.token;
        let mesaj=ref('interogare')

        function anulare(){
            console.log('anulare',token)
                  axios.delete(process.env.host+`programare/${token}`,).then(

                                res => {
                                           mesaj.value='anulare'  
                                      
                                }
                                ).catch(err =>{})
           
        }

        return {
            mesaj,
            anulare
        }
    },
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 320px
.doc-note 
  background-color: #daf8e1
  border-color: #9cedaf
  border-radius: 4px
  border-style: solid
  border-width: 0 5px
  font-family: Helvetica,Arial,sans-serif
  font-size: 1em
  letter-spacing: .5px
  line-height: 1.35em
  margin: 16px 0
  padding: 16px 24px
</style>