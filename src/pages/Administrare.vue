<template>
<q-page padding>
                <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>

    <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column" style="max-width:90vw">
            <div class="row flex flex-center ">
                    <q-input class="col q-ml-md q-mt-md" dense outlined v-model="dataraport" mask="date" :rules="['date']">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="dataraport">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Inchide" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                     </q-input>
                     <q-badge class="q-ml-md " color="purple">
                        <q-icon name="keyboard_double_arrow_right" color="white" />
                     </q-badge>
                     <q-input class="col q-ml-md q-mt-md" dense outlined v-model="dataraportstop" mask="date" :rules="['date']">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="dataraportstop">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Inchide" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                     </q-input>


                      <q-btn :disable="dataraportstop<dataraport" class="col q-ml-md" @click="raport"    color="primary" icon="mail" label="RAPORT" /> 
            </div>

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
                                        <q-btn flat :key="cab.id" @click="programariCabinet(cab.id)">Programari</q-btn>

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
                                            <div class="text-h4">Toate cabinetele</div>

                                        </q-bar>

                                        <div class="row">
                                         
                                            <div :key="zi.formatata" v-for="zi in zileperpagina" class="q-pa-md col-12 col-md">
                                                   <programari-zi-cabinet @programare-anulata="programareAnulata" v-if="zi.pagina==paginacurenta" :zi="zi" :liste="state.liste" />
                                            </div>
                                        </div>  
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
    </div>
            <q-page-sticky  position="bottom-right" :offset="[24, 24]">
                    <q-btn v-show="paginacurenta!==5&&tab=='editare'" @click="paginaUrmatoare"  fab   icon="east" color="accent" >
                    <q-tooltip anchor="top start" self="center right" class="bg-accent">Zilele urmatoare</q-tooltip>
                    </q-btn>
            </q-page-sticky>
            <q-page-sticky  position="bottom-left" :offset="[24, 24]">
                    <q-btn v-show="paginacurenta!==1&&tab=='editare'" @click="paginaAnterioara"   fab icon="west" color="accent"  >
                    <q-tooltip anchor="top right" self="center left" class="bg-accent">Zilele anterioare</q-tooltip>
                    </q-btn>
            </q-page-sticky>   
</q-page>    
</template>
<script>
import { defineComponent,ref,inject,reactive } from 'vue'
import ProgramariZiCabinet from 'components/ProgramariZiCabinet.vue'
import { date } from 'quasar'
import axios from 'axios'
const state = reactive(
  {
    cabinete : []  ,
    cabinetselectat:{},
    liste:{}
  }
  )

export default defineComponent({
    name:'Administrare',
    components:{
        ProgramariZiCabinet
    },
    setup() {
        const global=inject('global');
        let tab=ref('lista')
        let zile=ref([])
        let zileperpagina=ref([])
        let paginacurenta=ref(1)
        let userid= global.state.user.rol=='admin'? 0:global.state.user.idutilizator
        console.log('Administrare programari',userid)
        let dataraport = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))
        let dataraportstop = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))

        function raport(){
            let d=date.formatDate(dataraport.value,'YYYY-MM-DD')
            let dbis=date.formatDate(dataraportstop.value,'YYYY-MM-DD')
            console.log(dbis,dataraportstop.value>=dataraport.value)
           if(dataraportstop.value>=dataraport.value)  window.open(process.env.host+'raportprogramari?d='+d+'&userid='+userid+'&stop='+dbis,'_blank');
        }


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

                axios.get(process.env.host+`program/0}`).then(

                                        res => {
                                        console.log('Zile...',res.data);
                                        zile.value=res.data.zile
                                        zileperpagina.value=[]
                                        zile.value.map(z=>{
                                          if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                                        })
                                      
                                        }
                                        ).catch(err =>{})

        function programariCabinet(idcabinet){
                console.log('Programarile cabinetului ',idcabinet)
                 // aici trebuie sa interoghez programarile cabinetului

                axios.get(process.env.host+`programaricabinet/${idcabinet}`).then(

                   res => {
                   
                        console.log('Programari cabinet ',res.data)
                        state.liste.programari=[]
                        res.data.programari.map(p=>{
                            state.liste.programari.push(p)
                        })
                
                         tab.value='editare'

                   })

                 .catch(err =>{})  
               
        } 

        return {
            dataraport,
            dataraportstop,
            global,
            tab,
            state,
            programariCabinet,
            raport,
             zile,
                    zileperpagina,
                    paginacurenta,
                  
                    paginaUrmatoare(){
                        if(paginacurenta.value<6) paginacurenta.value ++   
                    
                        
                        zileperpagina.value=[]
                                    zile.value.map(z=>{
                                    if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                                        })
                                    
                        


                    },
                    programareAnulata(payload){
                            console.log('Am primit mesajul programare anulata',payload)
                            for(var i = 0; i < state.liste.programari.length; i++) {
                                if(state.liste.programari[i].id == payload.idprogramare) {
                                    state.liste.programari.splice(i, 1);
                                    break;
                                }
                            }
                    },
                    paginaAnterioara(){
                        if(paginacurenta.value>1) paginacurenta.value --      
                        
                        
                        zileperpagina.value=[]
                                    zile.value.map(z=>{
                                    if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                                        })
                                
                        


                    }
        }
    },
})
</script>