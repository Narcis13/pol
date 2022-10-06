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
         axios.get(process.env.host+`solicitarile/${intervalAles.value.cod}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                res => {
                      console.log('Toate solicitarile',res.data)
                      state.solicitari=[];
                   res.data.solicitari.map(s=>{
                        state.solicitari.push(s)
                    })
                
                })
            
            
                .catch(err =>{})

           function afiseazaMesaj(){
            console.log("Afiseaza mesaj",selected.value[0].mesaj);
            $q.notify({
                message: selected.value[0].mesaj,
                icon: 'announcement',
                position:'top',
                timeout:8000
              })
           }
           
           function schimbaInterval(c){



             intervale.map(i=>{
                if(i.cod==c) intervalAles.value=i
              })
             

              //console.log(dataminima)

              axios.get(process.env.host+`solicitarile/${c}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                res => {
                      //console.log('Toate solicitarile',res.data)
                      state.solicitari=[];
                   res.data.solicitari.map(s=>{
                        state.solicitari.push(s)
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
      schimbaInterval
    }
  }
}
</script>