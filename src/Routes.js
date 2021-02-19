
import HomeProf from "./components/ProfessorPages/HomePage";

//professor
import Professor from "./components/ProfessorPages/professor/Professors";
import ProfessorService from "./components/ProfessorPages/professor/Prof_Service";
import Profil from "./components/ProfessorPages/Profile";
//modules
//import DetailsModule from "./components/ProfessorPages/Modules/Details_Module";
import EditModule from "./components/ProfessorPages/Modules/Edit_Module";
import Demandes from "./components/ProfessorPages/Modules/Demandes";
//Filiere
import Branch from "./components/ProfessorPages/Filieres/Branch";
import DetailsBranch from "./components/ProfessorPages/Filieres/Details_Branch";

// Admin interface
import Homepage from "@/components/AdminPages/Homepage";
import Profile from "@/components/AdminPages/Profile";
import Professors from "@/components/AdminPages/Professors/Professors/Professors";
import HoursMade from "@/components/AdminPages/Professors/Hours/HoursMade";
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
import Wishes from "@/components/AdminPages/Wishes/Wishes";
import AddDisclaimer from "@/components/AdminPages/Professors/Disclaimers/AddDisclaimer";
//General
import Login from "./components/GeneralPages/Login"

export default [

    // Login route
    {path: '/', component: Login },
    {path: '/login/', component: Login },

    // Register route

    // Admin routes
    {path: '/admin/', name: 'homepage', component: Homepage },
    {path: '/admin/profil', name: 'admin-profil', component: Profile },
    {path: '/admin/voeux/', name: 'wishes', component: Wishes },
    {path: '/admin/voeux/:conflicts', name: 'conflict-wishes', component: Wishes },

    {path: '/admin/enseignants/', name: 'professors', component: Professors },
    {path: '/admin/heures-effectuees', name: 'hoursMade', component: HoursMade },
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

    {path: '/home', component: HomeProf},
    {path: '/profil', component: Profil},

    // Professor routes
    {path: '/professors', component: Professor},
    {path: '/professorService', component: ProfessorService},

    //Modules
    //{path: '/detailsModule', component: DetailsModule},
    {path: '/detailsModule', component: EditModule},
    {path: '/demandes', component: Demandes},

    //Branch
    {path: '/branch', component: Branch},
    {path: '/detailsBranch', component: DetailsBranch}

    // Professors routes

]
