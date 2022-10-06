import {reactive} from 'vue'

const state = reactive({
    user:{
        autentificat:false,
        nume:'',
        nume_intreg:'',

        rol:null,
        
        idutilizator:0,
        idclinica:0,
        token:null

    }
})

const actions = {
     autentificare(user,token){
         console.log('!Autentificare: ',user,token)

         state.user.autentificat=true;
        
         state.user.nume=user.nume;
         state.user.nume_intreg=user.numeintreg;
         state.user.rol=user.rol;
         state.user.idutilizator=user.id;
         state.user.idclinica=user.idclinica;
         state.user.token=token;
   
     },
     deconectare(){
        state.user.autentificat=false
     }
}

export default {
    state,
    actions
}