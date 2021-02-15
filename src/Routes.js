
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
import ProfessorDetails from "@/components/AdminPages/Professors/Professors/ProfessorDetails";
import AddProfessor from "@/components/AdminPages/Professors/Professors/AddProfessor";
import ModifyProfessor from "@/components/AdminPages/Professors/Professors/ModifyProfessor";
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
import Wishes from "@/components/AdminPages/Wishes/Wishes";
import Conflicts from "@/components/AdminPages/Wishes/Conflicts";
import AddDisclaimer from "@/components/AdminPages/Professors/Disclaimers/AddDisclaimer";


export default [

    // Login route


    // Register route


    // Admin routes
    {path: '/admin/', name: 'homepage', component: Homepage },
    {path: '/admin/profil', name: 'admin-profil', component: Profile },
    {path: '/admin/voeux', name: 'wishes', component: Wishes },
    {path: '/admin/voeux/conflits', name: 'conflict-wishes', component: Conflicts },

    {path: '/admin/enseignants/', name: 'professors', component: Professors },
    {path: '/admin/enseignants/ajouter-un-enseignant', name: 'professors-add', component: AddProfessor },
    {path: '/admin/enseignants/modifier-un-enseignant/:idProf', name: 'professors-edit', component: ModifyProfessor },
    {path: '/admin/enseignants/:idProf', name: 'professor', component: ProfessorDetails },
    {path: '/admin/heures-effectuees', name: 'hoursMade', component: HoursMade },
    {path: '/admin/statuts/', name: 'status', component: Status },
    {path: '/admin/statuts/ajouter-un-statut', name: 'status-add', component: AddStatus },
    {path: '/admin/statuts/modifier-un-statut/:idStatus', name: 'status-edit', component: ModifyStatus },
    {path: '/admin/decharges/', name: 'disclaimers', component: Disclaimers },
    {path: '/admin/decharges/ajouter-une-decharge', name: 'disclaimers-add', component: AddDisclaimer },
    {path: '/admin/decharges/modifier-une-decharge/:idDisclaimer', name: 'disclaimers-edit', component: ModifyDisclaimer },

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
