<template>
<q-page padding>
        <q-banner v-if="!solicitarevalida" dense inline-actions class="text-white bg-red">
          Ne pare rau! Solicitare invalida!
          <template v-slot:action>
            <q-btn flat color="white" label="Solicita programare online" />
          </template>
         </q-banner>



    <div v-if="solicitarevalida" class="q-mt-xs flex flex-center column" style="max-width:90vw">
           <div v-if="state.cabinete.length>0" class="row ">
            <q-img
             :src="urlsigla"
             ratio="4/3"
             fit="contain"
             style="height: 90px; max-width: 120px"
             class="col-4"
             />
             <div class="col-8 column" style="min-width:300px">
              <div class="text-h6">{{numeclinica}}</div>
              <div>Email: {{emailclinica}}</div>
             </div>
           </div>
            <q-item v-if="solicitarevalida&&tab=='lista'&&state.cabinete.length>0" class="q-mt-xs">
                <q-item-section side>
                  <q-avatar rounded size="64px">
                    <img src="~assets/doctor.jpeg" />
                
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{state.solicitare.nume}}</q-item-label>
                  <q-item-label caption>{{state.solicitare.email}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                {{state.solicitare.denumire}}
                </q-item-section>
          </q-item>

                    <q-tab-panels v-model="tab" animated>

                        <q-tab-panel name="lista">
                            <div v-if="state.cabinete.length>0" class="row items-start">
                                <q-card v-for="cab in state.cabinete" inline style="width: 300px" class="bg-secondary text-white q-ma-xs" :key="cab.idcabinet">
                                    <q-card-section>
                                        <div class="text-h5">{{cab.cabinet}}</div>
                                       
                                    </q-card-section>

                                    <q-separator dark />

                                    <q-card-actions>
                                        <q-btn flat :key="cab.idcabinet" @click="maprogramez(cab.idcabinet)">Disponibilitati</q-btn>

                                    </q-card-actions>

                                </q-card>
                            </div>
                            <div v-else>
                              <q-banner  class="text-white bg-red">
                                Ne pare rau, niciun cabinet nu este disponibil conform solicitarii dumneavoastra!

                              </q-banner>
                               
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
                                                   <zi-program v-if="zi.pagina==paginacurenta" :zi="zi" :liste="state.liste" :solicitare="state.solicitare"/>
                                            </div>
                                        </div>        
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>    

            <q-page-sticky  position="bottom-right" :offset="[24, 24]">
                    <q-btn v-show="paginacurenta!==limitamaximapaginacurenta&&tab=='editare'" @click="paginaUrmatoare"  fab   icon="east" color="accent" >
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
import ZiProgram from 'components/ZiProgram.vue'
import { defineComponent ,reactive,onMounted,ref} from 'vue';
import { useRoute } from "vue-router";
import axios from 'axios'

const state = reactive({
  solicitare:{},
  cabinete:[],
  liste:{}
})
export default defineComponent({
  name: 'Programare',
  components:{
    ZiProgram
  },
  setup(){
    let solicitarevalida=ref(true)
    let tab=ref('lista')
    let numeclinica=ref('')
    let emailclinica=ref('')
    let zile=ref([])
    let zileperpagina=ref([])
    let paginacurenta=ref(1)
    let urlsigla=ref("https://placeimg.com/500/300/nature")
 // aici trebuie sa fie 10 daca vreau 2 lunide programare
    const route =useRoute()
    let elemente=route.params.token.split('-')
    console.log('Ruta este...',elemente)
    state.liste.mod=elemente[2]
    let limitamaximapaginacurenta=elemente[2]=='e'?5:10
    onMounted(() => {
      // aici aflu sarbatorile legale...
      // console.log('Component Programari is mounted!',state.liste.sarbatori)

        
                
      })

             let idc=0;

              axios.get(process.env.host+`solicitari/${elemente[1]}`).then( //axios.get(process.env.host+`solicitari/${route.params.token}`).then(

                  res => {
                  console.log('Raspuns la o solicitare',res.data.solicitare_q[0]);
                  idc=res.data.solicitare_q[0].idspecialitate;

                  if(res.data.solicitare_q[0]!=='undefined'&&res.data.solicitare_q[0].confirmat==null&&res.data.solicitare_q[0].hash==elemente[0]){
                   state.solicitare=res.data.solicitare_q[0]
                   solicitarevalida.value=true
                   state.liste.indis=[]
                     urlsigla.value=process.env.host+res.data.solicitare_q[0].calesiglaclinica
                     numeclinica.value=res.data.solicitare_q[0].numeclinica
                     emailclinica.value=res.data.solicitare_q[0].emailclinica
                   state.liste.clinica={idclinica:res.data.solicitare_q[0].idclinica,numeclinica:res.data.solicitare_q[0].numeclinica,emailclinica:res.data.solicitare_q[0].emailclinica}
                   axios.get(process.env.host+`sarbatori`,{headers:{'idclinica':res.data.solicitare_q[0].idclinica}}).then(
                               
                               res => {
                                // console.log('Sarbatori',res.data)
                                 state.liste.sarbatori=[]
                                   res.data.sarbatori.map(s=>{
                                     state.liste.sarbatori.push('d'+s.zi.toString()+'m'+s.luna.toString())
                                   })
                                  console.log('Component Programari is mounted!',state.liste.sarbatori)
                               })       
                               .catch(err =>{})



                                axios.get(process.env.host+`indis/${idc}`).then(
                               
                                res => {
                                  console.log('Indisponibilitatile specialitatii',res.data)
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

                                 axios.get(process.env.host+`program/${idc}`,{headers:{'idclinica':res.data.solicitare_q[0].idclinica}}).then(

                                        res => {
                                        console.log('Cabinete pe specialitate',idc,res.data);
                                        zile.value=res.data.zile
                                        zileperpagina.value=[]
                                        zile.value.map(z=>{
                                          if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                                        })
                                        state.cabinete=[];
                                          res.data.cabinete.map(c=>{
                                            state.cabinete.push(c)
                                          })
                                        }
                                        ).catch(err =>{})


                  }
                  else
                  {
                    solicitarevalida.value=false
                  }

                  }
                  ).catch(err =>{})
                        

                  
                  
           

            function maprogramez(idcab){
            
                  console.log('Ma programez ....',idcab,zile)
                  state.liste.idc=idcab
                  //aici interoghez programul specific cabinetului idcab si actualizez state cu asta....
                  axios.get(process.env.host+`programcabinet/${idcab}`).then(

                   res => {
                   
                        console.log('Orar cabinet ',res.data)
                        state.liste.program=[]
                        res.data.program_cabinet.map(p=>{
                            state.liste.program.push(p)
                        })
                
                         tab.value='editare'

                   })

                 .catch(err =>{})  

               
            }
           
    return {
       state,
       solicitarevalida,
       tab,
       zile,
       zileperpagina,
       paginacurenta,
       maprogramez,
       urlsigla,
       numeclinica,
       emailclinica,
       limitamaximapaginacurenta,
       paginaUrmatoare(){
        
           if(paginacurenta.value<limitamaximapaginacurenta+1) paginacurenta.value ++   //if(paginacurenta.value<11) paginacurenta.value ++ daca vreau 2 luni de programare
       
          
           zileperpagina.value=[]
                      zile.value.map(z=>{
                       if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                         })
                       
         


       },
       paginaAnterioara(){
           if(paginacurenta.value>1) paginacurenta.value --      
           
           
           zileperpagina.value=[]
                      zile.value.map(z=>{
                       if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                         })
                   
           


       }
    }
  }
})
</script>