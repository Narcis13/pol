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
                                        <q-btn flat :key="cab.id" @click="programariCabinet(cab.id,cab.denumire,'i')">Programari</q-btn>
                                        <q-space />
                                        <q-btn @click="programariCabinet(cab.id,cab.denumire,'t')" dense color="grey-4" text-color="purple" glossy unelevated icon="add" label="Offline" />
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
                                            <div class="text-h4">{{numecabinet}}</div>

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
                    <q-btn v-show="paginacurenta!==10&&tab=='editare'" @click="paginaUrmatoare"  fab   icon="east" color="accent" >
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
        let numecabinet=ref('Toate cabinetele')
        let zile=ref([])
        let zileperpagina=ref([])
        let paginacurenta=ref(1)
        const token = global.state.user.token;
        let userid= global.state.user.rol=='admin'? 0:global.state.user.idutilizator
        console.log('Administrare programari',userid)

        axios.get(process.env.host+`toatespecialitatile`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

            res => {
            
                state.liste.specialitati=[];
                res.data.map(s=>{
                    state.liste.specialitati.push({
                    denumire:s.denumire,
                    id:s.id
                    
                    })
                })

            })


            .catch(err =>{})

        axios.get(process.env.host+`toatecabinetele`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

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

                //   ****************************************
                axios.get(process.env.host+`sarbatori`,{headers:{'idclinica':global.state.user.idclinica}}).then(
                               
                               res => {
                                // console.log('Sarbatori',res.data)
                                 state.liste.sarbatori=[]
                                   res.data.sarbatori.map(s=>{
                                     state.liste.sarbatori.push('d'+s.zi.toString()+'m'+s.luna.toString())
                                   })
                                
                               })       
                               .catch(err =>{})
                
                               axios.get(process.env.host+`indisoperator/${userid}`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                                        res => {
                                        
                                            state.liste.indis=[];
                                            res.data.indis.map(i=>{
                                                let ds = new Date(i.datastop)
                                                    ds.setDate(ds.getDate()+1)
                                                    state.liste.indis.push({
                                                        idmedic:i.idmedic,
                                                        tipindi:i.tipindisponibilitate,
                                                        datastart:new Date(i.datastart),
                                                        datastop:ds//new Date(i.datastop)
                                                    })
                                            
                                                
                                                })
                                            })

                                     


                                        .catch(err =>{})               

                 // ********************************************************************
                 
                 
                axios.get(process.env.host+`program/0}`,{headers:{'idclinica':global.state.user.idclinica}}).then(

                                        res => {
                                        console.log('Zile...',res.data);
                                        zile.value=res.data.zile
                                        zileperpagina.value=[]
                                        zile.value.map(z=>{
                                          if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                                        })
                                      
                                        }
                                        ).catch(err =>{})

        function programariCabinet(idcabinet,denumirecabinet,kind){
                console.log('Programarile cabinetului ',idcabinet)
                state.liste.kind=kind
                 // aici trebuie sa interoghez programarile cabinetului
                 numecabinet.value=denumirecabinet
                 axios.get(process.env.host+`programcabinet/${idcabinet}/${kind}`).then(

                        res => {

                           // console.log('Orar cabinet ',res.data)
                            state.liste.program=[]
                            res.data.program_cabinet.map(p=>{
                                state.liste.program.push(p)
                            })

                            axios.get(process.env.host+`programaricabinet/${idcabinet}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                                        res => {

                                            console.log('Programari cabinet ',res.data)
                                            state.liste.programari=[]
                                            res.data.programari.map(p=>{
                                                state.liste.programari.push(p)
                                            })

                                            tab.value='editare'

                                        })

                                        .catch(err =>{})  

                        })

                        .catch(err =>{})  


               
        } 

        return {
      
            global,
            tab,
            state,
            programariCabinet,
         
             zile,
                    zileperpagina,
                    paginacurenta,
                  numecabinet,
                    paginaUrmatoare(){
                        if(paginacurenta.value<11) paginacurenta.value ++   
                    
                        
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