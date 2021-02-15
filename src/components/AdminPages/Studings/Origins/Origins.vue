<template>
<div>
        <Header />
        <font-awesome-icon />
        
        <!-- ALERTS -->
        <div class="container mb-2" v-show="formData.errorOnSubmit || formData.submitted">
            <transition :duration="5000" name="slide-fade">
                <div class="alert"
                     :class="{'alert-success': formData.submitted, 'alert-danger': formData.errorOnSubmit}">
                    <p class="text-center">
                        {{ alertMessage }}
                      <!--  <router-link :to="{name: 'status'}" v-if="formData.submitted" class="mb-auto">
                            <span class="statusActionBtn mb-3">Retour à la page des orignes</span>
                        </router-link>  -->
                    </p>
                </div>
            </transition>
        </div>

    <h1 class="pt-5">Liste des Origines</h1>
      
        <div class="container">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Origine</th>
             <th  colspan=3>Action souhaitée</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="(origine,index) in ListeOri" :key="origine">
              <td>{{origine}}</td>
              <td><router-link to="/admin/origines/prof">
                   <button  class="btn btn-info btn-block" v-on:click="recup(index)">Voir Liste professeur</button>
                  </router-link></td>
              <td><button  class="btn btn-outline-primary mb-2" v-on:click="modifier">Modifier <font-awesome-icon icon="edit"></font-awesome-icon></button></td>
              <td><button  class="btn btn-outline-danger mb-2" v-on:click="supprimer">Supprimer <font-awesome-icon icon="trash"></font-awesome-icon></button></td>
            </tr> 
            <tr>
             <td>
             <form >
             <div class="form-group">
              <input type="text" class="form-control"  placeholder="Origine" v-model.lazy="formData.OrigineName" required>
              
             </div>
             </form>
             </td>
             <td colspan =3> <button class="btn btn-primary btn-block" @submit.prevent="sendForm">Ajouter <font-awesome-icon icon="plussquare"></font-awesome-icon></button></td>
            </tr>
             
         </tbody>
        </table>
            

         

        <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><a class="page-link"  @click="prevPage">Précédent</a></li>
                        <li class="page-item"><a class="page-link"  @click="nextPage">Suivant</a></li>
                    </ul>
        </nav>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import Header from "@/components/AdminPages/Header";


export default {
    name: "Origins",
    components: {Header},

    data () {
        return {
            success:true,
            nbrePage: 5,
            currentPage: 1,
            alertMessage: '',
            formData: {
                OrigineName: null,
                submitted: false,
                errorOnSubmit: false
            },
            Origines:["Département Informatique","Indéfinies","Département Bio","Département de Math","Université","UFR ST","Privé"]
        }

    },

    computed:{

      ListeOri:function(){
            return this.Origines.filter((row, index) => {
                let start = (this.currentPage - 1) * this.nbrePage;
                let end = this.currentPage* this.nbrePage;
                if (index >= start && index < end) return true
        });
    }
    },

    methods:{
         prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if ((this.currentPage * this.nbrePage) < this.Origines.length) {
                this.currentPage++;
            }
        },
         setElementsnbrePage(nbrePage) {
            this.nbrePage = nbrePage
        },

        RetourOri() {
            this.success=true
        },

        VoirListeProf() {
            this.success=false
        },

        recup(index){
            //let ooori=this.Origines[index];
           Vue.prototype.$ori=this.Origines[index];

        },

        resetData(resetError) {
            if (resetError) {
                this.formData.errorOnSubmit = false
            }
            this.formData.OrigineName = null
            this.formData.submitted = false
        },

        sendForm() {
            if (this.formData.OrigineName) {
                const newOrigine = {
                    name: this.formData.OrigineName,
                }
                axios.post('https://back-serverdevoeux.herokuapp.com/api/origins', newOrigine).then((response) => {
                    console.log(response)
                    this.alertMessage = "La nouvelle origine a été ajoutée avec succès !"
                    this.formData.submitted = true
                }).catch(error => {
                    this.alertMessage = "L'origine n'a pas pu être ajoutée. Veuillez réessayer"
                    this.formData.errorOnSubmit = true
                    console.error(error)
                })
                //this.resetData(true)
                this.formData.submitted = false
            } else {
                this.formData.errorOnSubmit = true
                this.alertMessage = "Veuillez renseigner le champs nom svp."
            }
        }
    },

}
</script>

<style scoped>

#bt1 {
    width:100px;
    height:30px;
}

#div1{
  text-align:center;
  width:400px;
  height:30px;
}

#inpt1{
 height:30px;
 width:300px;

}


</style>
