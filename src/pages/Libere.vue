<template>
  <q-page padding>
    <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
    <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column">
      <q-table

      :rows="state.sarbatori"
      :columns="columns"
      :pagination="initialPagination"
      selection="single"
      v-model:selected="selected"
      row-key="id"
      binary-state-sort
    >

    <template v-slot:top>
        <div><h6>Zile libere / Sarbatori legale</h6></div>
       
      
        <div class="q-pa-md q-gutter-sm">
          <q-btn round color="primary" icon="add" @click="medium=true">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>Adauga zi libera</strong> 
         
             </q-tooltip>
          </q-btn>
          <q-btn :disable="selected.length==0" round color="red" icon="remove" @click="stergsarbatoare" >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>Sterge zi libera</strong> 
         
             </q-tooltip>
          </q-btn>

       </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
                          <q-checkbox  v-model="props.selected" ></q-checkbox>
          </q-td>
          <q-td key="detalii" :props="props">
            {{ props.row.detalii }}
            <q-popup-edit v-model="props.row.detalii" auto-save v-slot="scope" @save="editeaza(props.row.id,'detalii')" buttons>
              <q-input v-model="scope.value" dense autofocus  />
            </q-popup-edit>
          </q-td>
          <q-td key="zi" :props="props">
            {{ props.row.zi }}
            <q-popup-edit v-model="props.row.zi" title="Modifica zi" buttons v-slot="scope" @save="editeaza">
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td key="luna" :props="props">
            {{ props.row.luna }}
            <q-popup-edit v-model="props.row.luna" title="Modifica luna" buttons persistent v-slot="scope" @save="editeaza(props.row.id,'luna',props.row.luna)">
              <q-input type="number" v-model="scope.value" dense autofocus  />
            </q-popup-edit>
          </q-td>

        </q-tr>
      </template>
    </q-table>
    </div>

    <q-dialog
      v-model="medium"
    >
      <q-card style="width: 400px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Adaugare zi libera</div>
        </q-card-section>

        
          <div class="row q-pa-sm q-gutter-lg">
          <q-input filled v-model="datanoua" mask="date" :rules="['date']" style="max-width:200px">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="datanoua">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Inchide" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input style="max-width:150px" filled v-model="detaliiZiLibera" label="Reprezinta" />
      </div>
       

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn  :disable="!ziLiberaDiferita" flat label="Adauga" v-close-popup @click="adaugZiLibera"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent,inject,ref ,reactive,computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
import { parallelism } from 'app/backend/webpack.config'

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
    
    const today = new Date()

    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)
     let detaliu=ref('')
    let datanoua=ref(date.formatDate(tomorrow, 'YYYY/MM/DD'))
    let detaliiZiLibera = ref('Sarbatoare legala')

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

    function editeaza(id,cheie,d){
      let newvalue=null
      state.sarbatori.map(s=>{
        if(s.id==id) newvalue=s[cheie]
      })
      console.log('Editez...',id,cheie,newvalue)
    } 
    
    function inputdetaliu(v){
        console.log(v)
    }   

    function adaugZiLibera(){
      let zi = (new Date(datanoua.value)).getDate()
      let luna = (new Date(datanoua.value)).getMonth()+1
      let zilibera={
        zi,
        luna,
        detalii:detaliiZiLibera.value,
        idclinica:global.state.user.idclinica
      }
       console.log('Adaug zi libera ',zilibera)

       axios.post(process.env.host+'sarbatori',zilibera,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                //   console.log('Am salvat utilizator nou',res.data)
                                toatesarbatorile();
                                detaliiZiLibera.value="Sarbatoare legala"
                                $q.notify({
                                        message:'Zi libera adaugata cu succes!',
                                        timeout:2000,
                                        position:'top',
                                        color:'positive'
                                        }) 

                                            }).catch(err=>{
                                                console.log(err)
                                                    $q.notify({
                                                        message:'EROARE!',
                                                        timeout:2000,
                                                        position:'top',
                                                        color:'negative'
                                                        })                  
                                            })
    }
     
     function stergsarbatoare(){
      //console.log(selected.value[0].id)
      let id=selected.value[0].id
       axios.delete(process.env.host+`sarbatori/${id}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

       res => {
            $q.notify({
                message:'Zi libera / Sarbatoare legala stearsa cu succes!',
                timeout:2000,
                position:'top',
                color:'positive'
                }) 
               toatesarbatorile()
      
      }
      ).catch(err =>{})
     }

    let ziLiberaDiferita = computed(()=>{
      const zi = (new Date(datanoua.value)).getDate().toString()
      const luna = ((new Date(datanoua.value)).getMonth()+1).toString()
      const ziluna=zi+luna
      let zinoua=true
        state.sarbatori.map(s=>{
          if(s.zi.toString()+s.luna.toString()===ziluna) zinoua=false
        })
      return zinoua
    })


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
      selected,
      medium:ref(false),
      datanoua,
      detaliiZiLibera,
      adaugZiLibera,
      ziLiberaDiferita,
      stergsarbatoare,
      editeaza,
      detaliu,
      inputdetaliu
    
    }
  }
})
</script>
