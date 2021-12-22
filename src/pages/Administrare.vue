<template>
<q-page padding>
    <div class="flex flex-center ">
            <div class="row  ">
                    <q-input class="col q-mt-md" dense outlined v-model="dataraport" mask="date" :rules="['date']">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="dataraport">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                     </q-input>
                      <q-btn  @click="raport"  dende class="col q-ml-md" color="primary" icon="mail" label="RAPORT" /> 
            </div>
    </div>
    
</q-page>    
</template>
<script>
import { defineComponent,ref } from 'vue'
import { date } from 'quasar'

export default defineComponent({
    name:'Administrare',
    setup() {
        
        console.log('Administrare programari')

        let dataraport = ref('2000/01/01')

        function raport(){
            let d=date.formatDate(dataraport.value,'YYYY-MM-DD')
             window.open(process.env.host+'raportprogramari?d='+d,'_blank');
        }

        return {
            dataraport,
            raport
        }
    },
})
</script>