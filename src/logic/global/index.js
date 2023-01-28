import {reactive} from 'vue'
import axios from 'axios'
import { date } from 'quasar'
const state = reactive({
    user:{
        autentificat:false,
        nume:'',
        nume_intreg:'',

        rol:null,
        master:false,
        amBugetSMS:false,
        idutilizator:0,
        idclinica:0,
        token:null,
        clinica:{},
        plan:null

    }
})

const actions = {
     autentificare(user,token,clinica,plan){
       //  console.log('!Autentificare: ',user,token)
        if(user.nume=='master13') state.user.master=true
         state.user.autentificat=true;
        
         state.user.nume=user.nume;
         state.user.nume_intreg=user.numeintreg;
         state.user.rol=user.rol;
         state.user.idutilizator=user.id;
         state.user.idclinica=clinica.id;
         state.user.token=token;
         state.user.clinica=clinica;
         state.user.clinica.stoptrial=date.formatDate(state.user.clinica.stoptrial, 'DD/MM/YYYY')
         state.user.clinica.stopabonament=date.formatDate(state.user.clinica.stopabonament, 'DD/MM/YYYY')
         state.user.plan=plan
   
     },
     deconectare(){
        state.user.autentificat=false
     },
     verificareCreditSMS(){
        if(state.user.clinica.smsapikey&&state.user.plan[0].id==3){
            axios.get(process.env.host+`creditsms`,{headers:{'smskey':state.user.clinica.smsapikey}}).then(

                res => {
                //   console.log('Interogare credit',res)
                   if(res.data&&res.data.status==200){
                     
                    state.user.amBugetSMS=true
                   }
                }
                ).catch(err =>{})


                                
        }
     }
}

export default {
    state,
    actions
}