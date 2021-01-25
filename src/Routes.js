import Professors from "./components/professor/Professors";
import ProfessorService from "./components/professor/Prof_Service";
//modules

import DetailsModule from "./components/Modules/Details_Module";

//Filiere
import Branch from "./components/Filieres/Branch";
import DetailsBranch from "./components/Filieres/Details_Branch";


export default [

    // Login route


    // Register route


    // Admin routes


    // Professor routes
    {path: '/professors', component: Professors},
    {path: '/professorService', component: ProfessorService},

    //Modules
    {path: '/detailsModule', component: DetailsModule},

    //Branch
    {path: '/branch', component: Branch},
    {path: '/detailsBranch', component: DetailsBranch}
]
