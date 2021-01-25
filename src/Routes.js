
import Professor from "./components/ProfessorPages/professor/Professors";
import ProfessorService from "./components/ProfessorPages/professor/Prof_Service";
//modules

import DetailsModule from "./components/ProfessorPages/Modules/Details_Module";

//Filiere
import Branch from "./components/ProfessorPages/Filieres/Branch";
import DetailsBranch from "./components/ProfessorPages/Filieres/Details_Branch";


import Homepage from "@/components/AdminPages/Homepage";
import Profile from "@/components/AdminPages/Profile";
import Professors from "@/components/AdminPages/Professors/Professors/Professors";
import AddProfessor from "@/components/AdminPages/Professors/Professors/AddProfessor";
import ModifyProfessor from "@/components/AdminPages/Professors/Professors/ModifyProfessor";
import Bonuses from "@/components/AdminPages/Professors/Bonus/Bonuses";
import AddBonus from "@/components/AdminPages/Professors/Bonus/AddBonus";
import ModifyBonus from "@/components/AdminPages/Professors/Bonus/ModifyBonus";
import HoursMade from "@/components/AdminPages/Professors/Hours/HoursMade";
import Status from "@/components/AdminPages/Professors/Status/Status";
import AddStatus from "@/components/AdminPages/Professors/Status/AddStatus";
import ModifyStatus from "@/components/AdminPages/Professors/Status/ModifyStatus";
import Disclaimers from "@/components/AdminPages/Professors/Disclaimers/Disclaimers";
import ModifyDisclaimer from "@/components/AdminPages/Professors/Disclaimers/ModifyDisclaimer";
import Courses from "@/components/AdminPages/Studings/Courses/Courses";
import AddCourse from "@/components/AdminPages/Studings/Courses/AddCourse";
import ModifyCourse from "@/components/AdminPages/Studings/Courses/ModifyCourse";
import Pathways from "@/components/AdminPages/Studings/Pathways/Pathways";
import AddPathway from "@/components/AdminPages/Studings/Pathways/AddPathway";
import ModifyPathway from "@/components/AdminPages/Studings/Pathways/ModifyPathway";
import Origins from "@/components/AdminPages/Studings/Origins/Origins";
import AddOrigin from "@/components/AdminPages/Studings/Origins/AddOrigin";
import ModifyOrigin from "@/components/AdminPages/Studings/Origins/ModifyOrigin";
import Types from "@/components/AdminPages/Studings/TypeOfCourses/Types";
import AddType from "@/components/AdminPages/Studings/TypeOfCourses/AddType";
import ModifyType from "@/components/AdminPages/Studings/TypeOfCourses/ModifyType";


export default [

    // Login route


    // Register route


    // Admin routes
    {path: '/admin/', component: Homepage },
    {path: '/admin/profil', component: Profile },

    {path: '/admin/enseignants/', component: Professors },
    {path: '/admin/enseignants/ajouter-un-enseignant', component: AddProfessor },
    {path: '/admin/enseignants/modifier-un-enseignant', component: ModifyProfessor },
    {path: '/admin/primes/', component: Bonuses },
    {path: '/admin/primes/ajouter-une-prime', component: AddBonus },
    {path: '/admin/primes/modifier-une-prime', component: ModifyBonus },
    {path: '/admin/heures-effectuees', component: HoursMade },
    {path: '/admin/statuts/', component: Status },
    {path: '/admin/statuts/ajouter-un-statut', component: AddStatus },
    {path: '/admin/statuts/modifier-un-statut', component: ModifyStatus },
    {path: '/admin/decharges/', component: Disclaimers },
    {path: '/admin/decharges/ajouter-une-decharge', component: Disclaimers },
    {path: '/admin/decharges/modifier-une-decharge', component: ModifyDisclaimer },

    {path: '/admin/cursus/', component: Courses },
    {path: '/admin/cursus/ajouter-un-cursus', component: AddCourse },
    {path: '/admin/cursus/modifier-un-cursus', component: ModifyCourse },
    {path: '/admin/filieres/', component: Pathways },
    {path: '/admin/filieres/ajouter-une-filiere', component: AddPathway },
    {path: '/admin/filieres/modifier-une-filiere', component: ModifyPathway },
    {path: '/admin/origines/', component: Origins },
    {path: '/admin/origines/ajouter', component: AddOrigin },
    {path: '/admin/origines/modifier', component: ModifyOrigin },
    {path: '/admin/types-de-cours/', component: Types },
    {path: '/admin/types-de-cours/ajouter', component: AddType },
    {path: '/admin/types-de-cours/modifier', component: ModifyType },



    // Professor routes
    {path: '/professors', component: Professor},
    {path: '/professorService', component: ProfessorService},

    //Modules
    {path: '/detailsModule', component: DetailsModule},

    //Branch
    {path: '/branch', component: Branch},
    {path: '/detailsBranch', component: DetailsBranch}

    // Professors routes

]
