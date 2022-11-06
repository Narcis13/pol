<template>
  <q-page padding>
    <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
    <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column">
      <q-table
      title="Zile libere"
      :rows="state.sarbatori"
      :columns="columns"
      :pagination="initialPagination"
      row-key="id"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="detalii" :props="props">
            {{ props.row.detalii }}
            <q-popup-edit v-model="props.row.detalii" v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="zi" :props="props">
            {{ props.row.zi }}
            <q-popup-edit v-model="props.row.zi" title="Modifica zi" buttons v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td key="luna" :props="props">
            {{ props.row.luna }}
            <q-popup-edit v-model="props.row.luna" title="Modifica luna" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus  />
            </q-popup-edit>
          </q-td>

        </q-tr>
      </template>
    </q-table>
    </div>

    
  </q-page>
</template>

<script>
import { defineComponent,inject,ref ,reactive} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'


const columns = [
  {
    name: 'detalii',
    required: true,
    label: 'Detalii',
    align: 'left',
    field: 'detalii',

    sortable: true
  },
  { name: 'zi', align: 'center', label: 'Zi', field: 'zi', sortable: true },
  { name: 'luna', align: 'center', label: 'Luna', field: 'luna', sortable: true }
]



const state = reactive({
    sarbatori:[],
    oSarbatoare:{}
})
let selected = ref([])

export default defineComponent({
  name: 'Libere',
  setup(){
    const $q = useQuasar()
    const global=inject('global');
    let token = global.state.user.token;

    function toatesarbatorile(){
      axios.get(process.env.host+`sarbatori`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

              res => {
                
                  console.log('Toate sarbatorile',res.data.sarbatori)
                  state.sarbatori=[];
                   res.data.sarbatori.map(s=>{
                        state.sarbatori.push(s)
                    })

              })


              .catch(err =>{})
    }

    toatesarbatorile()
    
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 20
        // rowsNumber: xx if getting data from a server
      },
      global,
      columns,
      state,
      selected
    
    }
  }
})
</script>
