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
        <div><h5>Administare solicitari</h5></div>
            <q-btn-dropdown class="q-ml-sm" dense color="primary" label="Interval">
                  <q-list>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Anul acesta</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup >
                      <q-item-section>
                        <q-item-label>Azi</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Saptamina aceasta</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Luna aceasta</q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-list>
        </q-btn-dropdown>

        <q-btn dense class="q-ml-sm" color="primary"  label="Mesaj primit"  />
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



export default {
  setup () {


         axios.get(process.env.host+`solicitari`).then(

                res => {
                      console.log('Toate solicitarile',res.data)
                      state.solicitari=[];
                   res.data.solicitari.map(s=>{
                        state.solicitari.push(s)
                    })
                
                })
            
            
                .catch(err =>{})
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
      filter
    }
  }
}
</script>