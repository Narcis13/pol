<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
            <div class="text-subtitle2">
            el EvenT en App
            </div>
        </q-toolbar-title>
        <div class="gt-sm">v. 1.0.0</div>
    
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1 "

    >
    <div class="column items-center">
       <q-input v-show="!global.state.user.autentificat" class="q-mt-md" v-model="username" filled dense label="Utilizator" />
       <q-input v-show="!global.state.user.autentificat" class="q-mt-md" v-model="password" filled dense type="password" label="Parola" />
       <q-btn v-show="!global.state.user.autentificat" class="q-ma-md col" outline rounded color="deep-purple-14" label="Autentificare" @click="autentificare"/>
    
      <q-card class="col my-card q-mt-md" v-if="global.state.user.autentificat">

        <q-card-section>
       
            <q-item>
            <q-item-section avatar>
              <q-avatar size="70px" font-size="52px" color="deep-purple-14" text-color="white" icon="account_box" />
            </q-item-section>

            <q-item-section>
              <q-item-label  class="text-blue-grey-10 text-subtitle2">{{global.state.user.rol}}</q-item-label>
              <q-item-label  class="text-blue-grey-10 text-subtitle2">{{global.state.user.nume_intreg}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-blue-grey-10">Abonament:{{ global.state.user.plan[0].denumire }} </q-item-label>
              <q-item-label v-show="global.state.user.clinica.stare!=='inactiv'" class="text-blue-grey-10"> Expira la: {{global.state.user.clinica.stare=='trial'? global.state.user.clinica.stoptrial: global.state.user.clinica.stopabonament }}</q-item-label>
              <q-item-label v-show="global.state.user.clinica.stare=='inactiv'" class="text-red-7"> EXPIRAT!</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator />

        <q-card-actions class="q-pa-sm" vertical >
          <div class="flex flex-center">
            <q-btn  align="around" class="q-pa-sm" color="deep-purple-14" text-color="pink-1" icon="logout" :to="'/'+slug"  @click="global.actions.deconectare">Deconectare!</q-btn>
          </div>
          <div v-if="global.state.user.clinica.stare=='trial'" class="flex flex-center q-mt-md">
            <q-btn  align="around" class="q-pa-sm" color="blue-grey-10" text-color="pink-1" icon="shopping_cart_checkout" @click="plata_card">Plata card online...</q-btn>
          </div>

        </q-card-actions>
    </q-card>

         <Meniu v-show="global.state.user.autentificat" class="q-mt-md col"/>
    </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Meniu from 'components/Meniu.vue'
import { defineComponent, ref ,inject} from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Meniu
  },

  setup () {
    const leftDrawerOpen = ref(false)
   
    const username = ref("")
    const password = ref("")
    const global=inject('global');
    const bus = inject('bus') 
    const $q = useQuasar()
    let slug=ref('')
     // console.log('MainLayout!')
      bus.on('ruta-stabilita',s=>{
     //   console.log('Receptionat ruta-stabilita in MainLayout',s)
        slug.value=s;
      })
     function plata_card(){
     // console.log('plata card',global.state.user)

     
      fetch(process.env.host+"create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${global.state.user.token}`,
              'idclinica':global.state.user.idclinica
            },
            body: JSON.stringify({
              items: [
                { id: global.state.user.plan[0].id, quantity: 1 }
              ],
            }),
          })
            .then(res => {
              if (res.ok) return res.json()
              return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
              global.actions.deconectare()
              window.open(url,'_blank');
          // console.log('Am primit acest url',url)
            })
            .catch(e => {
              console.error(e.error)
            })
              
      
     

     } 
    return {
      plata_card, 
      leftDrawerOpen,
      username,
      password,
      global,
      slug,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      autentificare(){
       // console.log('Tentativa de autentificare...',process.env.host)

                  axios.post(process.env.host+'login',{nume:username.value,password:password.value,slug:slug.value}).then(
                      res => {
                      //  console.log('Raspuns la autentificare ',res.data)
                        username.value=''
                        password.value=''
                        if(res.data.loggeduser){
                         $q.notify({
                                  message:res.data.clinica.stare=="inactiv"?'Perioada de incercare a expirat!':'Utilizator autentificat cu succes!',
                                  timeout:2000,
                                  position:'top',
                                  color:res.data.clinica.stare=="inactiv"?'negative':'positive'
                                }) 

                            global.actions.autentificare(res.data.loggeduser,res.data.token.token,res.data.clinica,res.data.plan)
                            bus.emit('succes-autentificare',res.data.loggeduser,res.data.clinica,res.data.plan)
                            slug.value=res.data.clinica.slug
                            global.actions.verificareCreditSMS();
                        }
                        else
                        {
                          $q.notify({
                                  message:'Autentificare nereusita!',
                                  timeout:3000,
                                  position:'top',
                                  color:'negative'
                                }) 
                        }

                      }
              ).catch(err=>{
                username.value=''
                password.value=''
                    $q.notify({
                              color: 'negative',
                              timeout:1500,
                              position:'top',
                              icon: 'delete',
                              message: `User sau parola incorecte...`
                            })
              console.log('Eroare autentificare',err);
              });
      },
    
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>