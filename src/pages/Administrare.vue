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
import { defineComponent,ref,inject } from 'vue'
import { date } from 'quasar'

export default defineComponent({
    name:'Administrare',
    setup() {
         const global=inject('global');
       
       let userid= global.state.user.rol=='admin'? 0:global.state.user.idutilizator
        console.log('Administrare programari',userid)
        let dataraport = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))

        function raport(){
            let d=date.formatDate(dataraport.value,'YYYY-MM-DD')
             window.open(process.env.host+'raportprogramari?d='+d+'&userid='+userid,'_blank');
        }

        return {
            dataraport,
            raport
        }
    },
})
</script>