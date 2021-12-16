<template>
     <q-page padding>
                <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
                <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column" style="max-width:90vw">
                    <q-tab-panels v-model="tab" animated>

                        <q-tab-panel name="lista">
                            <div class="row items-start">
                                <q-card v-for="cab in state.cabinete" inline style="width: 300px" class="bg-secondary text-white q-ma-sm" :key="cab.id">
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
                                                    <zi-cabinet @interval-sters="intervalsters" :zi="zi" :liste="state.liste"/>
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
    cabinetselectat:{},
    liste:{}
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
                        if(global.state.user.rol=='admin'||global.state.user.idutilizator==c.idoperator)
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

                axios.get(process.env.host+`totimedicii`).then(

                res => {
                   
                    state.liste.medici=[];
                    res.data.medici.map(m=>{
                        state.liste.medici.push({
                        nume:m.nume,
                        grad:m.grad,
                        codparafa:m.codparafa,
                        idspecialitate:m.idspecialitate,
                        competente:m.competente,
                        urlpoza:m.urlpoza,
                        mail:m.mail,
                        id:m.id,
                        specialitate:m.denumire
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})

                axios.get(process.env.host+`toateserviciile`).then(

                res => {
                   
                    state.liste.servicii=[];
                    res.data.map(s=>{
                        state.liste.servicii.push({
                        denumire:s.denumire,
                        durata:s.durata,
                        id:s.id
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})

            
                axios.get(process.env.host+`program`).then(

                res => {
                   
                        console.log('Orar cabinete ',res.data)
                        state.liste.program=[]
                        res.data.program.map(p=>{
                            state.liste.program.push(p)
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
            state.liste.cabinet=state.cabinetselectat
            tab.value='editare'
        }

        return {
            tab,
            global,
            state,
            configurez,
            zile,
            intervalsters(p){
                console.log('INterval sters (PARENT)',p)
                state.liste.program = state.liste.program.filter((item) => item.id !== p.id);
            }
            
        }
    },
})
</script>
