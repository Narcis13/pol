<template>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="state.clinici"
        :columns="columns"
        row-key="id"
        selection="single"
        v-model:selected="selected"
        :pagination="initialPagination"
        :filter="filter"
    
      >
  
        <template v-slot:top>
          <q-btn :disable="selected.length==0||(selected.length>0&&selected[0].stare=='activ')" color="primary" label="Activeaza!" @click="activeaza"/>
          
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

  import { defineComponent,ref , inject,reactive} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
  const columns = [

    { name: 'denumire', align: 'left', label: 'Denumire', field: 'denumire', sortable: true },
    { name: 'email',  align: 'left',label: 'Email', field: 'email', sortable: true },
    { name: 'slug',  align: 'left',label: 'Slug', field: 'slug' },
    { name: 'stare',  align: 'left',label: 'Stare', field: 'stare' },
    { name: 'starttrial',  align: 'center',label: 'Start trial', field: 'starttrial' },
    { name: 'stoptrial',  align: 'center',label: 'Stop trial', field: 'stoptrial' },
    { name: 'startabonament',  align: 'center',label: 'Start abonament', field: 'startabonament' },
    { name: 'stopabonament',  align: 'center',label: 'Stop abonament', field: 'stopabonament' }

   
  ]
  const  initialPagination = {
       // sortBy: 'desc',
       // descending: false,
        page: 1,
        rowsPerPage: 15

      }
  
  const state = reactive(
  {
    clinici : []  

  }
  )
  export default defineComponent({
    name:'Clinici',
    setup () {
      const loading = ref(false)
      const filter = ref('')
      const rowCount = ref(10)
      let selected= ref([])
      const global=inject('global');
      let token = global.state.user.token;
      const $q = useQuasar()
      function toateclinicile(){
        axios.get(process.env.host+`toateclinicile`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                res => {
             //      console.log(res.data.clinici) 
                    state.clinici=[];
                    res.data.clinici.map(c=>{
                        state.clinici.push({
                       
                           id:c.id,
                           denumire:c.denumire,
                           email:c.email,
                           slug:c.slug,
                           stare:c.stare,
                           starttrial:date.formatDate(c.starttrial, 'DD/MM/YYYY'),
                           stoptrial:date.formatDate(c.stoptrial, 'DD/MM/YYYY'),
                           startabonament:date.formatDate(c.startabonament, 'DD/MM/YYYY'),
                           stopabonament:date.formatDate(c.stopabonament, 'DD/MM/YYYY')
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})
      }
      toateclinicile()

      function activeaza(){
       // console.log('slug',selected.value[0].slug)
       axios.get(process.env.host+`azaevitca/${selected.value[0].slug}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

              res => {
                   
                    $q.notify({
                                                message:res.data.mesaj,
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                       selected.value=[]        
                       toateclinicile()                 

              })
              .catch(err =>{})


      }

      return {
        columns,
        activeaza,
        state,
        loading,
        filter,
        rowCount,
        selected,
        initialPagination,
     
      }
    }
  })
  </script>