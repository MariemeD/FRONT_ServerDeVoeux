<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="row pt-3">
                <div class="col-lg-4 col-md-8 col-sm-6">
                    <div id="server-card" class="card p-3">
                       <div id="div-professor-icon">
                            <font-awesome-icon id="professor-icon" icon="users" size="5x" style="color: #C9893C" />
                        </div>
                        <h2 class="mt-3 mb-0 text-uppercase">Enseignements non couverts</h2>
                     
                       

                      
                    </div>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-6">
                    <div id="professor-card" class="card p-3">
                        <div id="div-professor-icon">
                            <font-awesome-icon id="professor-icon" icon="users" size="5x" style="color: #C9893C" />
                        </div>
                        <h2 class="mt-3 mb-0 text-uppercase">Enseignants</h2>
                      
                    </div>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-6">
                    <div id="studings-card" class="card p-3">
                        <div id="div-studings-icon">
                            <font-awesome-icon id="studings-icon" icon="book" size="5x" style="color: #C9893C" />
                        </div>
                        <h2 class="mt-3 mb-0 text-uppercase">Enseignements</h2>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar_Prof";
export default {
    name: "Homepage",
    components: {Navbar}
}
</script>

<style scoped>
.container {
    padding-top: 3em;
}



#server-card, #studings-card {
    background-color: #D5D5D5;
     height: 370px;
}

#div-server-icon, #div-professor-icon, #div-studings-icon {
    border: 1px solid #B5B9D1;
    border-radius: 50%;
    background-color: #B5B9D1;
    padding: 15px;
    width: 50%;
    margin: 0 auto;
}

h2 {
    font-weight: bold;
}




#professor-card {
    background-color: #344C80;
    height: 400px;
}



@media all and (max-width: 992px) and (min-width: 769px) {
    .col-md-8 {
        margin: 5px auto;
    }

    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
    }
}

@media all and (max-width: 768px) {
    .col-md-8 {
        margin: 5px auto;
    }

    #server-card, #professor-card, #studings-card {
        width: 100%;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 50%;
        margin: 0 auto;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.6em;
    }
}

@media all and (max-width: 576px) {
    #server-card, #professor-card, #studings-card {
        width: 60%;
        margin: 0 auto 5px;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 45%;
         margin-top: 50px;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
    }
}

@media all and (max-width: 390px) {
    .container {
        padding-top: 1em;
    }

    #server-card, #professor-card, #studings-card {
        width: 80%;
        margin: 0 auto 5px;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 45%;
         margin-top: 50px;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
       
    }
}

</style>
