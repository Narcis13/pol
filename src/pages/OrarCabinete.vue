<template>
     <q-page padding>
                <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
                <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-tab-panels v-model="tab" animated>

                        <q-tab-panel name="lista">
                            <div class="row items-start">
                                <q-card v-for="cab in state.cabinete" inline style="width: 320px" class="bg-secondary text-white q-ma-sm" :key="cab.id">
                                    <q-card-section>
                                        <div class="text-h5">{{cab.denumire}}</div>
                                        <div class="text-subtitle2">Operator: {{cab.operator}}</div>
                                    </q-card-section>

                                    <q-separator dark />

                                    <q-card-actions>
                                        <q-btn flat :key="cab.id" @click="configurez(cab.id)">Configurare</q-btn>

                                    </q-card-actions>

                                </q-card>
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="editare">
                            <div>
                                        <q-bar dark class="bg-primary text-white">
                                            
                                            <q-btn @click="tab='lista'" dense flat icon="arrow_back" v-close-popup>
                                                <q-tooltip>Inapoi la toate cabinetele</q-tooltip>
                                            </q-btn>
                                            <q-space />
                                            <div class="text-h4">Configurare {{state.cabinetselectat.denumire}}</div>

                                        </q-bar>

                                        <div class="row">
                                            <div :key="zi.zidinsaptamina" v-for="zi in zile" class="q-pa-md col-12 col-md">
                                                    <zi-cabinet />
                                            </div>
                                        </div>        
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>    
     </q-page>
</template>

<script>
import ZiCabinet from 'components/ZiCabinet.vue'
import { defineComponent,ref , reactive,inject,computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { date } from 'quasar'

const state = reactive(
  {
    cabinete : []  ,
    cabinetselectat:{}
  }
  )

const zile=[
    {
        zidinsaptamina:1,
        denumire:'LUNI'
    },
        {
        zidinsaptamina:2,
        denumire:'MARTI'
    },    {
        zidinsaptamina:3,
        denumire:'MIERCURI'
    },
        {
        zidinsaptamina:4,
        denumire:'JOI'
    },
        {
        zidinsaptamina:5,
        denumire:'VINERI'
    },
        {
        zidinsaptamina:6,
        denumire:'SAMBATA'
    },
        {
        zidinsaptamina:7,
        denumire:'DUMINICA'
    }
]
export default defineComponent({
    name:'OrarCabinete',
    components:{
       ZiCabinet
    },
    setup() {
        const $q = useQuasar()
        const global=inject('global');
        let tab=ref('lista')

                axios.get(process.env.host+`cabinete`).then(

                res => {
                   
                    state.cabinete=[];
                    res.data.cabinete.map(c=>{
                        state.cabinete.push({
                        denumire:c.denumire,
                        dotare:c.dotare,
                        servicii:c.servicii,
                        idoperator:c.idoperator,
                        orar:c.orar,
                        id:c.id,
                        operator:c.nume
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})

        function configurez(id){
            console.log('Configurez cabinet...',id)
            state.cabinete.map(cab=>{
                if(cab.id==id){
                    state.cabinetselectat=cab
                }
            })
            tab.value='editare'
        }

        return {
            tab,
            global,
            state,
            configurez,
            zile
        }
    },
})
</script>
