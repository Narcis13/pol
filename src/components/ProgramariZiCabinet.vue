<template>
    <div style="min-width:180px;" v-bind:class="{'q-pa-sm':true, 'column':true,'azi':(nrcrtzi ==0)}" >
       <div class="text-subtitle2">{{denumirezi}}</div> 
       <div class="bg-blue-grey-7 text-white text-h6 fit row wrap justify-center items-center content-start q-pa-md q-mt-md" v-if="intervale.length==0" style="width:180px;height:180px;">INCHIS</div>
         <q-timeline layout="dense" side="right" color="secondary">
             <q-timeline-entry
                :key="interval.idprogramare"
                v-for="interval in intervale"
                :subtitle="interval.orastart +'-'+ interval.orastop"
                side="right"
                >
                <div v-bind:class="{ 'text-strike': !interval.activ }">
                   {{interval.nume}}
                </div>
                <div v-show="interval.activ" class="q-mt-xs">{{interval.telefon}}</div>
                 <div v-show="interval.activ" class="q-mt-xs">{{interval.medic}}</div>
                <q-btn v-show="interval.activ&&nrcrtzi>0" icon="event" class="q-mt-xs" dense outline rounded color="red" label="Anuleaza" @click="anulez_programare(interval.index)"/>
                <q-btn v-show="interval.activ&&nrcrtzi==0"  class="q-mt-xs" dense outline rounded color="teal" label="Reprogramare" @click="solicitare_reprogramare(interval.index)"/>
            </q-timeline-entry>


         </q-timeline>
        </div>
            <q-dialog  v-model="show_anulare_dialog" persistent >
                <q-card style="width: 350px; max-width: 80vw;">
                <q-card-section>
                      <q-input
                        v-model="text"
                        filled
                        hint="Mesaj care va fi incorporat in mail"
                        type="textarea"
                        />
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal">
                          <q-btn  flat label="Renunt" v-close-popup />
                          <q-space />
                          <q-btn @click="chiar_anulez_programarea" flat label="Anuleaza programarea"  />
               </q-card-actions>
                </q-card>
            </q-dialog>      
       
            <q-dialog  v-model="show_reprogramare" persistent >
                <q-card style="width: 350px; max-width: 80vw;">
                    <q-card-section>
                        <div class="text-h6">{{solicitare.nume}}</div>
                        <div class="text-subtitle2">{{solicitare.telefon}}</div>
                        <div class="text-subtitle2">{{solicitare.email}}</div>
                    </q-card-section>

                    <q-separator></q-separator>
                    <q-card-section>
                        <q-select filled use-input  input-debounce="0" v-model="solicitare.specialitate" :options="solicitare.specialitati" label="Specialitatea" />
                        <q-input
                            v-model="solicitare.mesaj"
                            filled
                            hint="Scurt mesaj"
                            type="textarea"
                            class="q-mt-md"
                            />
                    </q-card-section>
                     <q-card-actions align="right" class="bg-white text-teal">
                                <q-btn  flat label="Renunt" v-close-popup />
                                <q-space />
                                <q-btn v-close-popup @click="reprogrameaza" flat label="Solicita reprogramarea"  />
                    </q-card-actions>
                </q-card>
            </q-dialog>  

</template>
<script>
import { defineComponent,ref ,inject} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router";


export default defineComponent({
    name:'ProgramariZiCabinet',
    props:['zi','liste'],
    setup(props, { emit }) {
        const global=inject('global');
        const router =useRouter()
       console.log('Proprietati zi programari cabinet',props.liste.programari,props.zi)
        let intervale = ref([])
        const $q = useQuasar()
        let show_anulare_dialog = ref(false)
        let show_reprogramare = ref(false)
        let solicitare = ref({mesaj:'Multumesc',nume:'',telefon:'',email:'',specialitate:null,specialitati:[]})
        let text=ref(`Ne pare rau sa va informam ca programarea dumneavoastra la Dr. Ionescu Ion din data 01/02/2022 incepind cu ora 10.15 a fost anulata din motive obiective, neprevazute.`)
        let token_anulare=null;
        //programari per cabinet
        let index=0
       props.liste.programari.map(p=>{
           if (p.data==props.zi.formatata){
               intervale.value.push({
                   index,
                   idprogramare:p.id,
                   nume:p.nume,
                   telefon:p.telefon,
                   medic:p.medic,
                   idsolicitare:p.idsolicitare ,
                   orastart:p.orastart,
                   orastop:p.orastop,
                   token:p.token,
                   email:p.email,
                   data:p.data,
                   specialitateid:p.specialitateid,
                   activ:true


               })
               index++
           }
       })
      
       function solicitare_reprogramare(index){
        //console.log('reprogramare',intervale.value[index],props.liste.specialitati)
        solicitare.value.nume=intervale.value[index].nume
        solicitare.value.telefon=intervale.value[index].telefon
        solicitare.value.email=intervale.value[index].email
        solicitare.value.specialitati=[]
        solicitare.value.specialitate=null
        props.liste.specialitati.map(s=>{
            solicitare.value.specialitati.push({
                label:s.denumire,
                value:s.id
            })
            if (s.id===intervale.value[index].specialitateid){
                solicitare.value.specialitate={value:s.id,label:s.denumire}
              //  console.log('selectez specialitatea....')
            } 
        })

        show_reprogramare.value=true;
       }

       function reprogrameaza(){
         
           let repro = {
            nume:solicitare.value.nume,
            telefon:solicitare.value.telefon,
            email:solicitare.value.email,
            idspecialitate:solicitare.value.specialitate.value,
            idclinica:global.state.user.idclinica,
            mesaj:solicitare.value.mesaj
           }
        
          axios.post(process.env.host+'solicitarereprogramare',repro).then(res =>{
                                
                                   console.log('Solicitare reprogramare',res.data)
                               router.push('./programari/'+res.data.hash+'-'+res.data.id+'-i')
                                            }).catch(err=>{
                                                console.log(err)
                                                       
                                            })
       }

      function anulez_programare(token){
          
          token_anulare=token
         // console.log(intervale.value[token])
          let slot=intervale.value[token]
          let d=slot.data.split('-')
          const data = d[2]+'.'+d[1]+'.'+d[0]
          text.value=`Ne pare rau sa va informam ca programarea dumneavoastra la ${slot.medic} din data ${data} incepind cu ora ${slot.orastart} a fost anulata din motive obiective, neprevazute.`
          show_anulare_dialog.value=true

      }
      function chiar_anulez_programarea(){
         let date_anulare={
             id:intervale.value[token_anulare].idprogramare,
             email:intervale.value[token_anulare].email,
             mesaj:text.value
         } 
         console.log('Chiar Anulez programare',date_anulare)
         //aici fac totul
         axios.post(process.env.host+'anulareprogramare',date_anulare).then(res =>{

                  console.log('Raspuns de la anulare programare',res.data)
                   show_anulare_dialog.value=false
                   
                   //aici trebuie sa fac sa dispara slotul....
                  // intervale.value.splice(token_anulare,1)
                  intervale.value[token_anulare].activ=false
                  emit('programare-anulata',{idprogramare:intervale.value[token_anulare].idprogramare})
                   token_anulare=null
                 $q.notify({
                                        message:res.data.mesaj,
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

      return {
          denumirezi:props.zi.textlocalizat,
          nrcrtzi:props.zi.nrcrt,
         intervale,
         anulez_programare,
         show_anulare_dialog,
         chiar_anulez_programarea,
         solicitare_reprogramare,
         show_reprogramare,
         reprogrameaza,
         solicitare,
         text
      }  
    },
})
</script>
<style>
.azi {
    border: solid 1px rgb(101, 205, 11) ;
}
</style>