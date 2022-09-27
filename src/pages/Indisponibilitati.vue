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
                         <q-table
                            title="Indisponibilitati medici"
                            :rows="state.indisponibilitati"
                            dense
                            :columns="columns"
                            row-key="id"
                            selection="single"
                            :pagination="initialPagination"
                            v-model:selected="selected"
                            >

                            <template v-slot:top>
                                <div class="q-pa-sm text-h6">Indisponibilitati medici</div>
                                
                               
                                <div class="flex" style="min-width:200px;max-height:100px;">
                                    <q-btn  @click="sterge" class="q-ma-sm" :disable="selected.length==0" round color="red" icon="delete_forever" >
                                        <q-tooltip class="bg-accent">Sterge</q-tooltip>
                                    </q-btn>

                                    <q-btn   @click="tab='adaugare'"  class="q-ma-sm" round color="amber"    icon="assignment" >

                                            <q-tooltip class="bg-accent">Adauga</q-tooltip>
                                    </q-btn>
                                

                                </div>

                             </template>
                    
                

                         </q-table>
                    </q-tab-panel>


                    <q-tab-panel name="adaugare">
                        <div class="q-pa-sm q-gutter-md" column style="max-width: 540px">
                            
                            <q-select v-model="medic" :rules="[val => !!val || 'Cimp obligatoriu']" :options="medici" label="Medic *" />
                            <q-input  v-model="tip"  label="Tip indisponibilitate" />
                                        <q-input label="De la data"  v-model="deladata" mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                <q-date v-model="deladata">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Inchide" color="primary" flat />
                                                </div>
                                                </q-date>
                                            </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                        </q-input>

                             <q-input label="La data"  v-model="ladata" mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                <q-date v-model="ladata">
                                                <div class="row items-center justify-end">
                                                    <q-btn :disable="!eMedicSelectat" v-close-popup @click="interval_selectat" label="Inchide" color="primary" flat />
                                                </div>
                                                </q-date>
                                            </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                        </q-input>
                            <q-banner v-if="state.programari.length>0" inline-actions rounded class="bg-orange text-white q-mt-sm q-mb-sm">
                                 Exista persoane programate in acest interval!

                            <template v-slot:action>
                                <q-btn to="../adminpro" flat label="Vezi.." @click="state.programari=[]">
                                    <q-badge color="red" floating>{{state.programari.length}}</q-badge>
                                </q-btn>
                            </template>
                            </q-banner>
                            <div class="q-mt-md flex flex-center">
                                <q-btn :disable="!eMedicSelectat" outline rounded color="primary" label="Salveaza" @click="salveaza" />
                                <q-btn class="q-ml-md" outline rounded color="secondary" label="Renunta" @click="tab='lista'" />
                            </div>
                        </div>
                    </q-tab-panel>
                    </q-tab-panels>
  </div>
    </q-page>
</template>

<script>
import { defineComponent,ref , reactive,inject,computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
const state = reactive(
  {
    indisponibilitati : []  ,
    oindisponibilitate:{},
    programari:[]
  }
  )

  const columns = [

  { name: 'nume', align: 'left', label: 'Nume medic', field: 'nume', sortable: true },
  { name: 'tipindisponibilitate', align: 'left', label: 'Tip ind.', field: 'tipindisponibilitate', sortable: true },
  { name: 'datastart', align: 'center',label: 'De la data', field: 'datastart', sortable: true },
  { name: 'datastop', align: 'center',label: 'La data', field: 'datastop', sortable: true }

 
]

const  initialPagination = {
       // sortBy: 'desc',
       // descending: false,
        page: 1,
        rowsPerPage: 15

      }


export default defineComponent({
    name:'Indisponibilitati',
    setup() {
        const $q = useQuasar()
        const global=inject('global');
         let userid= global.state.user.rol=='admin'? 0:global.state.user.idutilizator
        let tab=ref('lista')
        let selected= ref([])
        let medic=ref(null)
        let medici=[]
        let tip=ref('C.O.')

        const today = new Date()

        console.log("today => ",today)
        let tomorrow =  new Date()
        tomorrow.setDate(today.getDate() + 1)

        let deladata=ref(date.formatDate(tomorrow, 'YYYY/MM/DD'))
        let ladata=ref(date.formatDate(tomorrow, 'YYYY/MM/DD'))

  

      
       
       let dateValide = computed(()=>{
            const diff = date.getDateDiff(ladata.value, deladata.value, 'days')
            return diff>0
       })

        let perioada= ref({ from: date.formatDate(today, 'YYYY/MM/DD'), to: date.formatDate(tomorrow, 'YYYY/MM/DD') })

        axios.get(process.env.host+`mediciperoperator/${userid}`).then(

                res => {
           
                    res.data.medici.map(m=>{
                        medici.push({
                        label:m.nume,
                        value:m.id
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})



        function indisponibilitatile(){
            axios.get(process.env.host+`indisoperator/${userid}`).then(

                res => {
                   
                    state.indisponibilitati=[];
                    res.data.indis.map(i=>{
                        state.indisponibilitati.push({
                        id:i.id,    
                        nume:i.nume,
                        tipindisponibilitate:i.tipindisponibilitate,
                        datastart:date.formatDate(i.datastart, 'DD/MM/YYYY'),
                        datastop:date.formatDate(i.datastop, 'DD/MM/YYYY')
                      
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})
        }

        indisponibilitatile()
        
        function reset(){
            tip.value='C.O.';
            deladata.value=date.formatDate(tomorrow, 'YYYY/MM/DD')
            ladata.value=date.formatDate(tomorrow, 'YYYY/MM/DD')
          //  perioada.value= { from: date.formatDate(today, 'YYYY-MM-DD'), to: date.formatDate(tomorrow, 'YYYY-MM-DD') }
            medic.value={value:0,label:''}

        }

        function sterge(){
          console.log('sterg ',selected.value[0].id)
          axios.delete(process.env.host+`indis/${selected.value[0].id}`,).then(

                                res => {
                                            $q.notify({
                                                message:'Indisponibilitate stearsa!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                                indisponibilitatile(); 
                                      
                            }
                                ).catch(err =>{})
        }

        function salveaza(){
           let indi={
               idmedic:medic.value.value,
               tipindisponibilitate:tip.value,
               datastart:date.formatDate(deladata.value, 'YYYY-MM-DD'),
               datastop:date.formatDate(ladata.value, 'YYYY-MM-DD')
           }
           

                            axios.post(process.env.host+'indis',indi).then(res =>{
                                
                              
                                indisponibilitatile();
                                reset();
                                tab.value='lista';
                                console.log(res.data)
                                if(res.data.errors){
                                    $q.notify({
                                                        message:'EROARE DATE INCORECTE! Cod: '+res.data.errors.errors[0].message,
                                                        timeout:2000,
                                                        position:'top',
                                                        color:'negative'
                                                        })  
                                }
                                else{
                                    $q.notify({
                                        message:'Indisponibilitate salvata!',
                                        timeout:2000,
                                        position:'top',
                                        color:'positive'
                                        }) 
                                }


                                            }).catch(err=>{
                                                console.log(err)
                                                               
                                            })


        }
    //computed
    let eMedicSelectat = computed(()=>{
       return medic.value!==null
     })

    function interval_selectat(){
        let datastart=date.formatDate(deladata.value, 'YYYY-MM-DD')
        let datastop=date.formatDate(ladata.value, 'YYYY-MM-DD')
        let idmedic=medic.value.value
        let query=`?idmedic=${idmedic}&datastart=${datastart}&datastop=${datastop}`
        
        axios.get(process.env.host+`programaremedic/${query}`).then(

                res => {

                   console.log('Raspuns programare medic',res.data)
                   state.programari=[]
                   res.data.programari.map(p=>{
                       state.programari.push(p)
                   })
                
                })
            
            
                .catch(err =>{})

    }

        return {
            tab,
            global,
             state,
             initialPagination,
             columns,
             selected,
             medic,
             medici,
             tip,
             perioada,
             salveaza,
             deladata,
             ladata,
             dateValide,
             sterge,
             eMedicSelectat,
             interval_selectat
        }
    },
})
</script>
