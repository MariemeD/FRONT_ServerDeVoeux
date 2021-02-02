<template>
    <div>
        <Header />
        {{fil}}
        <font-awesome-icon />
        <h1 class="pt-5">Liste des filières</h1>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Filière</th>
             <th  colspan=2>Action souhaitée</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="filiere in filieres" :key="filiere">
              <td>{{filiere}}</td>
              <td><button class="btn btn-info btn-block" v-on:click="modifier"><font-awesome-icon icon="edit"></font-awesome-icon></button></td>
              <td><button class="btn btn-danger btn-block" v-on:click="supprimer"><font-awesome-icon icon="trash"></font-awesome-icon></button></td>
            </tr> 

            <tr>
              <td><input type="text" class="form-control"  placeholder="Filière"></td>
              <td colspan=2><button class="btn btn-primary btn-block" >Ajouter</button></td>
            </tr>

          </tbody>
        </table>

        <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><a class="page-link" @click="prevPage">Previous</a></li>
                        <li class="page-item"><a class="page-link" @click="nextPage">Next</a></li>
                    </ul>
        </nav>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Header from "@/components/AdminPages/Header";

export default {
    name: "Pathways",
    components: {Header},
    data () {
        return {
            filieres: [],
            pageSize: 10,
            currentPage: 1,
            
        }
    },
    mounted () {
        axios
            .get('http://146.59.195.214:8006/api/v1/events/filieres')
            .then(response => (this.filieres = response.data))
    },

    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if ((this.currentPage * this.pageSize) < this.filieres.length) {
                this.currentPage++;
            }
        }
    },

  filters  :{
        fil:function(){
            return this.matieres.filter(filiere => filiere.length < 6)
        }
    }
}
</script>

<style scoped>

</style>
