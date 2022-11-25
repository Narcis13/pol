<template>
    <q-page padding>
                <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
        <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                <q-banner inline-actions rounded class="bg-orange text-white">
                    Cabinete platforma programare online
                    <template v-slot:action>
                        <q-btn @click="tab='adaugare';reset()" flat label="Adauga" />
                    </template>
                </q-banner>
                <q-card class="q-mt-sm">
                    <q-card-section v-show="tab!=='lista'">
                        <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{actiune}}</div>
                            <div class="text-subtitle2">cabinet</div>
                        </div>

                        <div class="col-auto">
                            <q-btn round  icon="cancel" @click="tab='lista'" />
                        </div>
                        </div>
                    </q-card-section>

                    <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="lista">
                            <q-slide-item v-for="cabinet in state.cabinete" :key="cabinet.id" @left="onLeft(cabinet.id)" @right="onRight(cabinet.id)" left-color="purple" right-color="red" style="width: 370px">
                                <template v-slot:left>
                                <div class="row items-center">
                                    <q-icon left name="create" /> Actualizeaza
                                </div>
                                </template>
                                <template v-slot:right>
                                <div class="row items-center">
                                   Sterge <q-icon right name="delete_forever" />
                                </div>
                                </template>

                                <q-item>
                                    <q-item-section>
                                    <q-item-label>{{cabinet.denumire}}</q-item-label>
                                    <q-item-label caption>Operator: {{cabinet.operator}}</q-item-label>

                                    </q-item-section>

                                </q-item>


                            </q-slide-item>
                    </q-tab-panel>

                    <q-tab-panel name="editare">
                        <div class="q-pa-sm q-gutter-md" column style="width: 370px">

                            <q-card class="my-card flex flex-center" style="max-width: 370px" bordered>
                               


                                    <q-img
                                        :src="calePozaImplicita"
                                        class="q-ma-sm"
                                         style="height: 180px; max-width: 240px">
                                    </q-img>
                                   
                           
                             <q-uploader
                                   :url="uploadURL"
                                    auto-upload
                                    :form-fields="ff"
                                    field-name="pozacabinet"
                                    max-file-size="1048576"
                                    accept=".jpg,.png, image/*"
                                    color="teal"
                                    label="Schimba poza"
                                    flat
                                    bordered
                                    no-thumbnails
                                    @uploaded="pozaUrcata"
                                    @rejected="onRejected"
                                    style="max-width: 300px"
                            />
                            </q-card>

                            <q-input autofocus no-error-icon v-model="denumire" bottom-slots error-message="Denumirea cabinetului trebuie sa fie unica!" :error="!denumireUnica" label="Denumire cabinet *" dense/>

                             <q-select v-model="operator" :rules="[val => !!val || 'Cimp obligatoriu']" :options="operatori" label="Operator *" dense/>
                                <q-tabs
                                            v-model="tabu"
                                            dense
                                            class="text-grey"
                                            active-color="primary"
                                            indicator-color="primary"
                                            
                                            narrow-indicator
                                            >
                                            <q-tab name="dotare" label="Dotare" />
                                            <q-tab name="servicii" label="Servicii" />
                                            <q-tab name="orar" label="Orar" />
                                            </q-tabs>

                                            

                                            <q-tab-panels v-model="tabu" animated>
                                            <q-tab-panel name="dotare">
                                                <q-editor 
                                                    v-model="dotare"
                                                   
                                                    dense
                                                    min-height="5rem" 
                                                    :toolbar="[
                                                                [
                                                                {
                                                                    label: $q.lang.editor.align,
                                                                    icon: $q.iconSet.editor.align,
                                                                    fixedLabel: true,
                                                                    list: 'only-icons',
                                                                    options: ['left', 'center', 'right', 'justify']
                                                                },
                                                                        'bold', 'italic',  'underline','hr', 'unordered'
                                                                ],

                                                            ]"
                                                ></q-editor>
                                            </q-tab-panel>

                                            <q-tab-panel name="servicii">
                                                <q-editor 
                                                    v-model="servicii"
                                                    dense
                                                    min-height="5rem" 
                                                    :toolbar="[
                                                                [
                                                                {
                                                                    label: $q.lang.editor.align,
                                                                    icon: $q.iconSet.editor.align,
                                                                    fixedLabel: true,
                                                                    list: 'only-icons',
                                                                    options: ['left', 'center', 'right', 'justify']
                                                                },
                                                                        'bold', 'italic',  'underline','hr', 'unordered'
                                                                ],

                                                            ]"
                                                ></q-editor>
                                            </q-tab-panel>

                                            <q-tab-panel name="orar">
                                                <q-editor 
                                                    v-model="orar"
                                                    dense
                                                    min-height="5rem" 
                                                    :toolbar="[
                                                                [
                                                                {
                                                                    label: $q.lang.editor.align,
                                                                    icon: $q.iconSet.editor.align,
                                                                    fixedLabel: true,
                                                                    list: 'only-icons',
                                                                    options: ['left', 'center', 'right', 'justify']
                                                                },
                                                                        'bold', 'italic',  'underline','hr', 'unordered'
                                                                ],

                                                            ]"
                                                ></q-editor>
                                            </q-tab-panel>
                                            </q-tab-panels>  
                            <div class="q-mt-sm flex flex-center"><q-btn outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="adaugare">
                        <div class="q-pa-sm q-gutter-md" column style="width: 370px">
                            <q-input dense autofocus no-error-icon v-model="denumire" bottom-slots error-message="Denumirea cabinetului trebuie sa fie unica!" :error="!denumireUnica" label="Denumire cabinet *"/>

                             <q-select v-model="operator" :rules="[val => !!val || 'Cimp obligatoriu']" :options="operatori" label="Operator *" dense/>

                                <q-tabs
                                            v-model="tabu"
                                            dense
                                            class="text-grey"
                                            active-color="primary"
                                            indicator-color="primary"
                                            
                                            narrow-indicator
                                            >
                                            <q-tab name="dotare" label="Dotare" />
                                            <q-tab name="servicii" label="Servicii" />
                                            <q-tab name="orar" label="Orar" />
                                            </q-tabs>

                                            <q-separator />

                                            <q-tab-panels v-model="tabu" animated>
                                            <q-tab-panel name="dotare">
                                                <q-editor 
                                                    v-model="dotare"
                                                    dense
                                                    min-height="5rem" 
                                                    :toolbar="[
                                                                [
                                                                {
                                                                    label: $q.lang.editor.align,
                                                                    icon: $q.iconSet.editor.align,
                                                                    fixedLabel: true,
                                                                    list: 'only-icons',
                                                                    options: ['left', 'center', 'right', 'justify']
                                                                },
                                                                        'bold', 'italic',  'underline','hr', 'unordered'
                                                                ],

                                                            ]"
                                                ></q-editor>
                                            </q-tab-panel>

                                            <q-tab-panel name="servicii">
                                                <q-editor 
                                                    v-model="servicii"
                                                    dense
                                                    min-height="5rem" 
                                                    :toolbar="[
                                                                [
                                                                {
                                                                    label: $q.lang.editor.align,
                                                                    icon: $q.iconSet.editor.align,
                                                                    fixedLabel: true,
                                                                    list: 'only-icons',
                                                                    options: ['left', 'center', 'right', 'justify']
                                                                },
                                                                        'bold', 'italic',  'underline','hr', 'unordered'
                                                                ],

                                                            ]"
                                                ></q-editor>
                                            </q-tab-panel>

                                            <q-tab-panel name="orar">
                                                <q-editor 
                                                    v-model="orar"
                                                    dense
                                                    min-height="5rem" 
                                                    :toolbar="[
                                                                [
                                                                {
                                                                    label: $q.lang.editor.align,
                                                                    icon: $q.iconSet.editor.align,
                                                                    fixedLabel: true,
                                                                    list: 'only-icons',
                                                                    options: ['left', 'center', 'right', 'justify']
                                                                },
                                                                        'bold', 'italic',  'underline','hr', 'unordered'
                                                                ],

                                                            ]"
                                                ></q-editor>
                                            </q-tab-panel>
                                            </q-tab-panels>
                            <div class="q-mt-sm flex flex-center"><q-btn :disable="!denumireUnica" outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>
                    </q-tab-panels>
                </q-card>
        </div>
    </q-page>
</template>
<script>
import { defineComponent,ref , reactive,inject,computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

const state = reactive(
  {
    cabinete : []  ,
    cabinetselectat:{}
  }
  )

  var decodeEntities =function(text){
    var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
  }

export default defineComponent({
    name:'Cabinete',
    setup() {
        const $q = useQuasar()
        const global=inject('global');
        const token = global.state.user.token;
        let tab=ref('lista')
        let tabu = ref('dotare')
        let denumire=ref('')
        let dotare=ref('')
        dotare.value=null;

        let servicii=ref('')
        servicii.value=null;
        let orar = ref('')
        orar.value=null;
        let ff=ref([{name: 'idcabinet', value: 0}])
        let uploadURL = ref(process.env.host+'uploadpozacabinet')
        let calePozaImplicita=ref(process.env.host+'/cabs/cabinet.png')
        let operator=ref(null)
        let operatori=[]
     //  let durata=ref(5);
         function pozaUrcata(info){
          console.log('Poza urcata',JSON.parse(info.xhr.response).numefisier)
          let numefisier=JSON.parse(info.xhr.response).numefisier
          calePozaImplicita.value=process.env.host+'/cabs/'+numefisier;
          toatecabinetele();
        }

        function onRejected (rejectedEntries) {

                $q.notify({
                    type: 'negative',
                    message: `Imagine invalida sau dimensiune fisier > 1Mb!`
                })
    }

//computed zone
        let actiune = computed(()=>{
            return tab.value=='editare'? 'Actualizare' : tab.value=='lista'? '':'Adaugare' 
        })

         axios.get(process.env.host+`alluserscabs`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                res => {
           
                    res.data.map(u=>{
                        operatori.push({
                        label:u.nume,
                        value:u.id
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})


        function toatecabinetele(){
            
                axios.get(process.env.host+`toatecabinetele`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                res => {
                   
                    state.cabinete=[];
                    console.log('Cabinete',res.data.cabinete);
                    res.data.cabinete.map(c=>{
                        state.cabinete.push({
                        denumire:c.denumire,
                        dotare:c.dotare,
                        servicii:c.servicii,
                        idoperator:c.idoperator,
                        orar:c.orar,
                        id:c.id,
                        operator:c.nume,

                        urlpoza:c.urlpoza
                        })
                    })
                
                })
            
            
                .catch(err =>{console.log(err)})
                
        }

       toatecabinetele();

       function reset(){
              denumire.value=''
              dotare.value=''
              orar.value=''
              servicii.value=''

              operator.value = {label:'',value:null};
              state.cabinetselectat=null;
       
            
       }

        function sterg(id){

                state.cabinete.map(c=>{
                    if(c.id==id) state.cabinetselectat=c
                })

                      $q.dialog({
                            title: 'Confirmati',
                            message: 'Sunteti sigur ca doriti stergerea inregistrarii? Vor fi efecte in lant si asupra altor componente ale aplicatiei care depind de inregistrarea ce urmeaza a fi stearsa!',
                            cancel: true,
                            persistent: true
                        }).onOk(() => {
                             console.log('>>>> Sterg ',id,arguments)
                             axios.delete(process.env.host+`cabinete/${id}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                                res => {
                                            $q.notify({
                                                message:'Cabinet sters cu succes!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                                toatecabinetele(); 
                                      
                            }
                                ).catch(err =>{})
                        }).onOk(() => {
                            // console.log('>>>> second OK catcher')
                        }).onCancel(() => {
                            state.cabinete = state.cabinete.filter(function(el) { return el.id !== id }); 
                            toatecabinetele();
                            // console.log('>>>> Cancel')
                        }).onDismiss(() => {
                            // console.log('I am triggered on both OK and Cancel')
                        })
        }

        function editeaza(p){
                
             //   let userselectat={}
                state.cabinete.map(c=>{
                    if(c.id==p) state.cabinetselectat=c
                })

                ff.value[0]={name: 'idcabinet', value: state.cabinetselectat.id}
              denumire.value=state.cabinetselectat.denumire
               orar.value=state.cabinetselectat.orar
                dotare.value=state.cabinetselectat.dotare
                 servicii.value=state.cabinetselectat.servicii
                 calePozaImplicita.value=process.env.host+state.cabinetselectat.urlpoza
                 

                   operatori.map(o=>{
                       if(o.value==state.cabinetselectat.idoperator ) operator.value={value:state.cabinetselectat.idoperator,label:o.label}
                   })
                          console.log('editez...',state.cabinetselectat.dotare)
                   //specialitate.value={value:state.medicselectat.id,label:}
             // durata.value=state.serviciuselectat.durata
        }

       function salveaza(){
           if(tab.value=='editare'){
               let cab_modificat = {
                        denumire:denumire.value,
                        dotare:dotare.value,
                        servicii:servicii.value,
                        idoperator:operator.value.value,
                        orar:orar.value,

                      /* durata:durata.value*/
                  
               }
             console.log('patch',cab_modificat)
            axios.patch(process.env.host+`cabinete/${state.cabinetselectat.id}`,cab_modificat).then(res =>{
                                
                                   console.log('Am editat med ',res.data)
                                toatecabinetele();
                                reset();
                                tab.value='lista';
                                $q.notify({
                                        message:'Cabinet actualizat cu succes!',
                                        timeout:2000,
                                        position:'top',
                                        color:'positive'
                                        }) 

                                            }).catch(err=>{
                                                console.log(err)
                                                     $q.notify({
                                                        message:'EROARE! Cod: '+res.data.errors.errors[0].message,
                                                        timeout:3000,
                                                        position:'top',
                                                        color:'negative'
                                                        }) 
                                            })

           } else {
                    let cabinet_nou={
                        denumire:denumire.value,
                        dotare:dotare.value,
                        servicii:servicii.value,
                        idoperator:operator.value.value,
                        orar:orar.value,
                        idclinica:global.state.user.idclinica,
                        urlpoza:'/cabs/cabinet.png'
                      //  durata:durata.value
                   
                    } 
                    console.log('salvez cabinet',cabinet_nou)

                    axios.post(process.env.host+'cabinete',cabinet_nou,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                //   console.log('Am salvat utilizator nou',res.data)
                                toatecabinetele();
                                reset();
                                tab.value='lista';
                                if(res.data.errors)
                                         $q.notify({
                                                        message:'EROARE! Cod: '+res.data.errors.errors[0].message,
                                                        timeout:3000,
                                                        position:'top',
                                                        color:'negative'
                                                        }) 
                                   else
                                    $q.notify({
                                        message:'Cabinet adaugat cu succes!',
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

       }
       let denumireUnica=computed(()=>{
                 let existaDeja=false;
                 //console.log('denumireUnica',state.serviciuselectat)
                 state.cabinete.map(c=>{
                    if(state.cabinetselectat){
                        if (c.denumire==denumire.value&&c.denumire!==state.cabinetselectat.denumire) existaDeja=true
                    } else{
                        if (c.denumire==denumire.value) existaDeja=true
                    }
                   
                 })
                return  !existaDeja&&denumire.value.length>2
             })
        return {
            tab,
            global,
             state,
             denumire,
            dotare,
            servicii,
            orar,
            reset,
            operator,
            operatori,
             salveaza,
             denumireUnica,
             tabu,
             calePozaImplicita,
             uploadURL,
             ff,
             onRejected,
             pozaUrcata,
             actiune,
            onLeft (p) {
                tab.value='editare'
                editeaza(p);
            },

            onRight (id) {
                sterg(id)
              }
          }
    },
})
</script>