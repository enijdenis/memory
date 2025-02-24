var tableauCorrespondanceMemoryImage = [
  {nom:"legumes",nomAffiche:"Légumes",img:"./ressources/memory-legume/memory_detail.png",chemin:"./ressources/memory-legume/",extension:"svg"},
  {nom:"animaux",nomAffiche:"Animaux",img:"./ressources/animaux/memory_detail_animaux.png",chemin:"./ressources/animaux/",extension:"webp"},
  {nom:"animauxAnimes",nomAffiche:"Animaux animés",img:"./ressources/animauxAnimes/memory_detail_animaux_animes.png",chemin:"./ressources/animauxAnimes/",extension:"webp"},
  {nom:"animauxDomestiques",nomAffiche:"Animaux Domestiques",img:"./ressources/animauxdomestiques/memory_detail_animaux_domestiques.png",chemin:"./ressources/animauxdomestiques/",extension:"jpg"},
  {nom:"chiens",nomAffiche:"Chiens",img:"./ressources/chiens/memory_details_chiens.png",chemin:"./ressources/chiens/",extension:"webp"},
  {nom:"dinosaures",nomAffiche:"Dinosaures",img:"./ressources/dinosaures/memory_detail_dinosaures.png",chemin:"./ressources/dinosaures/",extension:"jpg"},
  {nom:"dinosauresAvecNom",nomAffiche:"Dinosaures avec nom",img:"./ressources/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png",chemin:"./ressources/dinosauresAvecNom/",extension:"jpg"},
  {nom:"alphabetScrabble",nomAffiche:"Lettre Scrablle",img:"./ressources/alphabet-scrabble/memory_detail_scrabble.png",chemin:"./ressources/alphabet-scrabble/",extension:"png"}
];

function afficheMessageDepuisTableau(tableau,nom){
  if(tableau!=null && tableau.length>0 && nom!=null){
    for (const val of tableau)
    {
      if(val.nom==nom){
        return val.nomAffiche;
      }
    }
  }else{
    return nom;
  }
}

const cards = document.querySelectorAll(".card")
//var pseudo = prompt("Veuillez saisir votre pseudo pour enregistrer les résultats !");
pseudo = localStorage.getItem("utilisateurEmail") || "";
let refTable = document.getElementById("tableScore");
let tableau5DerniersScoresLu =   localStorage.getItem("tableau5DerniersScores");
let tableau5DerniersScores =JSON.parse(tableau5DerniersScoresLu)|| [];


//let chaineAVerif = "Pas encore de score enregistré";
const nbLigneAvantSuppression = 5;

function vider(elementAVider){
  //console.log(elementAVider);
  tailleTableau=elementAVider.rows.length;
  //console.log(tailleTableau);
  let cpt=2;
  while (tailleTableau>=cpt) {
    refTable.deleteRow(1);
    cpt++;
	}
}

showTableauDernierScore(tableau5DerniersScores,refTable,nbLigneAvantSuppression);
function showTableauDernierScore(tableau,refTable,nbLigneAvantSuppression){
  
  let totalNbLignesTableau = refTable.rows.length;
  if(tableau!=null){
     console.log(tableau);
     let index=1;
     vider(refTable);
    /*if(tableau.length>nbLigneAvantSuppression){
      index=tableau.length-nbLigneAvantSuppression;
    }*/
    console.log("index="+index);
    for (const ligne of tableau.sort((a,b)=>a.score-b.score)) {
          console.log(ligne);
         
          if(ligne!=null && index <= nbLigneAvantSuppression){
              // Insère une ligne dans la table à l'indice de ligne 0
              let nouvelleLigne = refTable.insertRow(index);

              // Insère une cellule dans la ligne à l'indice 0
              let nouvelleCellulePseudo = nouvelleLigne.insertCell(0);
              let nouvelleCelluleScore = nouvelleLigne.insertCell(1);
              let nouvelleCelluleTaille = nouvelleLigne.insertCell(2);
              let nouvelleCelluleChoixMemory = nouvelleLigne.insertCell(3);
              let nouvelleCelluleDate = nouvelleLigne.insertCell(4);

              // Ajoute un nœud texte à la cellule
              let nouveauTexte = document.createTextNode(ligne.nom);
              nouvelleCellulePseudo.appendChild(nouveauTexte);
              nouveauTexte = document.createTextNode(ligne.score);
              nouvelleCelluleScore.appendChild((nouveauTexte));
              nouveauTexte = document.createTextNode(ligne.tailleMemory);
              nouvelleCelluleTaille.appendChild((nouveauTexte));

              nouveauTexte = document.createTextNode(afficheMessageDepuisTableau(tableauCorrespondanceMemoryImage,ligne.choixMemory));
              nouvelleCelluleChoixMemory.appendChild(nouveauTexte);

              nouveauTexte = document.createTextNode(ligne.dateScore);
              nouvelleCelluleDate.appendChild((nouveauTexte));
              index++;
          }
      }
  }

}

function shuffleCards(){
  cards.forEach(card => {
    const randomPos = Math.trunc(Math.random() * 12)
    card.style.order = randomPos;
  })
}
shuffleCards()

cards.forEach(card => card.addEventListener("click", flipACard))

let lockedCards = false;
let cardsPicked = []
function flipACard(e){

  if(lockedCards) return;
 
  saveCard(e.target.children[0], e.target.getAttribute("data-attr"))

  if(cardsPicked.length === 2) result()
}

function saveCard(el, value) {
  if(el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({el,value})
  //console.log(cardsPicked);
}

function result(){
  saveNumberOftries()

  if(cardsPicked[0].value === cardsPicked[1].value){
    cardsPicked[0].el.parentElement.removeEventListener("click", flipACard)
    cardsPicked[1].el.parentElement.removeEventListener("click", flipACard)
    cardsPicked = [];
    return;
  }

  lockedCards = true;
  setTimeout(() => {
    cardsPicked[0].el.classList.remove("active");
    cardsPicked[1].el.classList.remove("active");
    cardsPicked = [];
    lockedCards = false;
  }, 1000)
}

const innerCards = [...document.querySelectorAll(".double-face")];
const advice = document.querySelector(".advice");
const score = document.querySelector(".score")


let numberOfTries = 0;
function saveNumberOftries(){
  numberOfTries++;
  const checkForEnd = innerCards.filter(card => !card.classList.contains("active"))

  if(!checkForEnd.length) {
    advice.textContent = `Bravo ! Vous avez gagné !`
    score.textContent = `Votre score final : ${numberOfTries}`;

    //Enregistrement du score
    enregistrementPseudoScore(pseudo,numberOfTries);
    return;
  }
  score.textContent = `Nombre de coups ${numberOfTries}`
}

window.addEventListener("keydown", handleRestart)

let shuffleLock = false;
function handleRestart(e) {
  e.preventDefault()
  if(e.keyCode === 32) {
    innerCards.forEach(card => card.classList.remove("active"))
    advice.textContent = `Tentez de gagner avec le moins d'essais possible.`
    score.textContent = `Nombre de coups : 0`
    numberOfTries = 0;
    //pseudo = prompt("Veuillez saisir votre pseudo pour enregistrer les résultats !");
    cards.forEach(card => card.addEventListener("click", flipACard))

    if(shuffleLock) return;
    shuffleLock = true;
    setTimeout(() => {
      shuffleCards()
      shuffleLock = false;
    }, 600)
  }
}


function mettreAJourCartesDepuisTableau(tableau,choixMemory){
  if(tableau!=null && tableau.length>0){
    for (const val of tableau)
    {
      if(val.nom==choixMemory){
        let objetCarte= {"chemin":val.chemin,"extension":val.extension};
        console.log(objetCarte);
        return objetCarte;
        break;
      }
    }
  }
}

let objetCarte = mettreAJourCartesDepuisTableau(tableauCorrespondanceMemoryImage,localStorage.getItem("utilisateurChoixMemory"));

function afficherCartes(objetCarte){
        let chemin= objetCarte.chemin;
        let extension= objetCarte.extension;
        console.log("chemin="+chemin);
        console.log("extension="+extension);

        let carte1=document.getElementById("carte1");
        console.log("carte1="+carte1);
        let carte1Img=carte1.src;
        let carte1Numero=carte1Img.substring(carte1Img.length-6);
        console.log("carte1Img="+carte1Img);
        console.log("carte1Numero="+carte1Numero);
        if(carte1Numero.indexOf(1)){
          carte1.src=chemin+"1"+"."+extension;
        }


        let carte2=document.getElementById("carte2");
        let carte2Img=carte2.src;
        let carte2Numero=carte2Img.substring(carte2Img.length-6);
        console.log("carte2Img="+carte2Img);
        console.log("carte2Numero="+carte2Numero);
        if(carte2Numero.indexOf(2)){
          carte2.src=chemin+"2"+"."+extension;
        }

        let carte3=document.getElementById("carte3");
        let carte3Img=carte3.src;
        let carte3Numero=carte3Img.substring(carte3Img.length-6);
        console.log("carte3Img="+carte3Img);
        console.log("carte3Numero="+carte3Numero);
        if(carte3Numero.indexOf(3)){
          carte3.src=chemin+"3"+"."+extension;
        }

        let carte4=document.getElementById("carte4");
        let carte4Img=carte4.src;
        let carte4Numero=carte4Img.substring(carte4Img.length-6);
        if(carte4Numero.indexOf(1)){
          carte4.src=chemin+"1"+"."+extension;
        }


        let carte5=document.getElementById("carte5");
        let carte5Img=carte5.src;
        let carte5Numero=carte5Img.substring(carte5Img.length-6);
        if(carte5Numero.indexOf(4)){
          carte5.src=chemin+"4"+"."+extension;
        }

        let carte6=document.getElementById("carte6");
        let carte6Img=carte6.src;
        let carte6Numero=carte6Img.substring(carte6Img.length-6);
        if(carte6Numero.indexOf(5)){
          carte6.src=chemin+"5"+"."+extension;
        }

        let carte7=document.getElementById("carte7");
        let carte7Img=carte7.src;
        let carte7Numero=carte7Img.substring(carte7Img.length-6);
        if(carte7Numero.indexOf(6)){
          carte7.src=chemin+"6"+"."+extension;
        }

        let carte8=document.getElementById("carte8");
        let carte8Img=carte6.src;
        let carte8Numero=carte8Img.substring(carte8Img.length-6);
        if(carte8Numero.indexOf(6)){
          carte8.src=chemin+"6"+"."+extension;
        }

        let carte9=document.getElementById("carte9");
        let carte9Img=carte9.src;
        let carte9Numero=carte9Img.substring(carte9Img.length-6);
        if(carte9Numero.indexOf(5)){
          carte9.src=chemin+"5"+"."+extension;
        }

        let carte10=document.getElementById("carte10");
        let carte10Img=carte10.src;
        let carte10Numero=carte10Img.substring(carte10Img.length-6);
        if(carte10Numero.indexOf(4)){
          carte10.src=chemin+"4"+"."+extension;
        }

        let carte11=document.getElementById("carte11");
        let carte11Img=carte11.src;
        let carte11Numero=carte11Img.substring(carte11Img.length-6);
        if(carte11Numero.indexOf(2)){
          carte11.src=chemin+"2"+"."+extension;
        }

        let carte12=document.getElementById("carte12");
        let carte12Img=carte12.src;
        let carte12Numero=carte12Img.substring(carte12Img.length-6);
        if(carte12Numero.indexOf(3)){
          carte12.src=chemin+"3"+"."+extension;
        }


}


afficherCartes(objetCarte);


function enregistrementPseudoScore(pseudo, score) {
  localStorage.setItem("utilisateurConnecteDerniersScores",`${score}`);
  
  let utilisateurTailleMemoryLu=localStorage.getItem("utilisateurTailleMemory");
  let utilisateurChoixMemoryLu=localStorage.getItem("utilisateurChoixMemory");
  let infoUtilisateurConnecte = {
    "nom":pseudo,
    "score":`${score}`,
    "tailleMemory": utilisateurTailleMemoryLu,
    "choixMemory":utilisateurChoixMemoryLu,
    "dateScore":new Date().toLocaleDateString("fr")
  };

  console.log("infoUtilisateurConnecte="+infoUtilisateurConnecte);
  let tableauUtilisateurConnecteLu = localStorage.getItem("tableauUtilisateurConnecte");
  let tableauUtilisateurConnecte =JSON.parse(tableauUtilisateurConnecteLu)|| [];
  tableauUtilisateurConnecte.push(infoUtilisateurConnecte);

  //Récupération Des derniers scores
  let tableau5DerniersScoresLu = localStorage.getItem("tableau5DerniersScores");
  let tableau5DerniersScores = JSON.parse(tableau5DerniersScoresLu)||[];
  tableau5DerniersScores.push(infoUtilisateurConnecte);
 
  console.log("table5DerniersScores="+tableau5DerniersScores);
  console.log("tableauUtilisateurConnecte="+tableauUtilisateurConnecte);
  localStorage.setItem("tableau5DerniersScores",JSON.stringify(tableau5DerniersScores));
  localStorage.setItem("tableauUtilisateurConnecte",JSON.stringify(tableauUtilisateurConnecte));
  showTableauDernierScore(tableau5DerniersScores,refTable,nbLigneAvantSuppression);
}