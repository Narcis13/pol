<template>
  <div class="q-pa-md">
    <q-table
      title="Administrare solicitari"
      dense
      :rows="state.solicitari"
      :columns="columns"
      :pagination="initialPagination"
       :filter="filter"
      selection="single"
      v-model:selected="selected"
      row-key="id"
    >

          <template v-slot:body-cell-confirmat="props">
            <q-td :props="props">
              <div  style="max-height: 24px;">
                 <q-checkbox dense :model-value="props.value==1?true:false" />
                
              </div>

            </q-td>
      </template>

      <template v-slot:top>
        <div><h5>Administrare solicitari</h5></div>
            <q-btn-dropdown class="q-ml-sm" dense color="primary" :label="'Interval ('+intervalAles.text+')'">
                  <q-list>
                    <q-item v-for="interval in intervale" :key="interval.cod" clickable v-close-popup @click="schimbaInterval(interval.cod)">
                      <q-item-section>
                        <q-item-label>{{interval.text}}</q-item-label>
                      </q-item-section>
                      <q-item-section v-if="interval.cod==intervalAles.cod" avatar>
                        <q-icon color="primary" name="done" />
                      </q-item-section>
                    </q-item>

                   

                  </q-list>
        </q-btn-dropdown>

        <q-btn dense :disable="selected.length==0" class="q-ml-sm" color="primary"  label="Mesaj primit"  @click="afiseazaMesaj"/>

        <div class="q-pa-md q-gutter-sm">
          <q-btn :disable="selected.length==0||(selected.length>0&&selected[0].confirmat==null)" round color="primary" icon="event" @click="veziProgramarea">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>Vezi programarea</strong> 
         
             </q-tooltip>
          </q-btn>
          <q-btn :disable="selected.length==0||(selected.length>0&&(selected[0].confirmat==1||selected[0].tip=='Online'))" round color="primary" icon="directions" @click="reprogramare">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>Reprogramare</strong> 
         
             </q-tooltip>
          </q-btn>
          <q-btn :disable="selected.length==0||(selected.length>0&&selected[0].confirmat==1)" round color="red" icon="remove" @click="stergeSolicitarea" >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>Sterge solicitarea</strong> 
         
             </q-tooltip>
          </q-btn>

       </div>
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>


    </q-table>
  </div>
</template>

<script>
import { defineComponent,ref , reactive,inject,computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
import { useRouter } from "vue-router";

const state = reactive({
    solicitari:[],
    oSolicitare:{}
})
let selected = ref([])
const filter = ref('')
const columns = [
  {
    name: 'data',
    required: true,
    label: 'Data',
    align: 'left',
    field: 'created_at',

    sortable: true
  },
  { name: 'nume', align: 'left', label: 'Nume pacient', field: 'nume', sortable: true },
  { name: 'telefon', align:'left',label: 'Telefon', field: 'telefon', sortable: true },
  { name: 'email', align:'left',label: 'Email', field: 'email' },
  { name: 'specialitate', align:'left',label: 'Specialitate', field: 'denumire', sortable: true },
  { name: 'tip', align:'left',label: 'Tip', field: 'tip', sortable: true },
  { name: 'confirmat', label: 'Confirmata?', field: 'confirmat' ,align:'center'}
  
]
  const intervale = [
    {
      cod:1,
      text:'Anul acesta'
  },{
    cod:2,
    text:'Azi'
  },
  {
    cod:3,
    text:'Saptamina aceasta'
  },
  {
    cod:4,
    text:'Luna aceasta'
  }
]

function getMonday(d) {
                      d = new Date(d);
                      var day = d.getDay(),
                          diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
                      return new Date(d.setDate(diff));
                    }


export default {
  setup () {
    //,{headers:{"Authorization" : `Bearer ${token}`}}
    const global=inject('global');
    //console.log('Date utilizator',global.state.user.idclinica,global.state.user.token)
    let token = global.state.user.token;
     let intervalAles=ref(intervale[3])
     const $q = useQuasar()
     let idoperator = global.state.user.rol=='admin' ? 0 : global.state.user.idutilizator
     const router =useRouter()
     function toatesolicitarile(){
        axios.get(process.env.host+`solicitarile/${intervalAles.value.cod}`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica,'idoperator':idoperator}}).then(

              res => {
                    console.log('Toate solicitarile',res.data)
                    state.solicitari=[];
                res.data.solicitari.map(s=>{
                      state.solicitari.push(s)
                  })

              })


              .catch(err =>{})
      }
      toatesolicitarile()
 

           function afiseazaMesaj(){
            console.log("Afiseaza mesaj",selected.value[0].mesaj);
            $q.notify({
                message: selected.value[0].mesaj,
                icon: 'announcement',
                position:'top',
                timeout:8000
              })
              selected.value=[]
           }
           
           function schimbaInterval(c){



             intervale.map(i=>{
                if(i.cod==c) intervalAles.value=i
              })
             

              //console.log(dataminima)

              axios.get(process.env.host+`solicitarile/${c}`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                res => {
                      //console.log('Toate solicitarile',res.data)
                      state.solicitari=[];
                   res.data.solicitari.map(s=>{
                        state.solicitari.push(s)
                    })
                
                })
            
            
                .catch(err =>{})



           }

    function stergeSolicitarea(){
      let idsolicitare=selected.value[0].id
      axios.delete(process.env.host+`solicitari/${idsolicitare}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                                res => {

                                            $q.notify({
                                                message:'Solicitare stearsa cu succes!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                      toatesolicitarile()
                                                selected.value=[]
                            }
                                ).catch(err =>{})

    } 
    
    function reprogramare(){
      console.log(selected.value)
      router.push('./programari/'+selected.value[0].hash+'-'+selected.value[0].id+'-i')
      selected.value=[]                                  
    }
     
    function veziProgramarea(){
       console.log(selected.value)
       let idsolicitare=selected.value[0].id

       axios.get(process.env.host+`oprogramare/${idsolicitare}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

            res => {
                //  console.log('O programare',res.data)
                let stare = res.data[0].stare=='anulata'? 'ANULATA':''
                let d = date.formatDate(new Date(res.data[0].data), 'DD/MM/YYYY')
                 let mesaj = `Data: ${d} Ora:${res.data[0].orastart} ${res.data[0].cabinet} Medic:${res.data[0].medic} ${stare}` 
                 selected.value=[]
                 $q.notify({
                      message: mesaj,
                      icon: 'announcement',
                      position:'top',
                      timeout:8000
                    })

            })


            .catch(err =>{})
    }

    return {
        initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 20
        // rowsNumber: xx if getting data from a server
      },
      columns,
      state,
      selected,
      filter,
      afiseazaMesaj,
      intervale,
      intervalAles,
      schimbaInterval,
      veziProgramarea,
      stergeSolicitarea,
      reprogramare
    }
  }
}
</script>