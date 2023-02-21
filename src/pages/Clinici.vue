<template>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="state.clinici"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >
  
        <template v-slot:top>
          <q-btn color="primary" :disable="loading" label="Add row" />
          <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row"  />
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

  const columns = [

    { name: 'denumire', align: 'left', label: 'Denumire', field: 'denumire', sortable: true },
    { name: 'email',  align: 'left',label: 'Email', field: 'email', sortable: true },
    { name: 'slug',  align: 'left',label: 'Slug', field: 'slug' },
    { name: 'stare',  align: 'left',label: 'Stare', field: 'stare' }
   
  ]
  
  
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
      
      const global=inject('global');
      let token = global.state.user.token;

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
                           stare:c.stare
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})
      }
      toateclinicile()
      return {
        columns,

  state,
        loading,
        filter,
        rowCount
  
     
      }
    }
  })
  </script>