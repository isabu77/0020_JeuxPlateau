/************* JEU du MORPION à 2 JOUEURS **************/
/* variables globales */
var joueur = 1;
var nbColonnes = 5;
var nbLignes = 5;
var jeu = true;
var texte = "";
var plateau = [];  // ou new Array();
var score = 5;
var quelJeu = 0;
var nomJeu = ["Puissance-4", "Tic-tac-toe"];

/* appel principal pour lancer le jeu */

/* lancement du jeu */
function newGame(jeu){
	this.quelJeu = jeu;
	this.nbLignes = this.nbColonnes = document.getElementById("size").value;
/*	prompt("Entrez la taille du plateau (nb de lignes et de colonnes) ?");
*/	this.score = document.getElementById("quelscore").value;
/*	prompt("Quel score faut-il atteindre pour gagner ?");
*/	
	if (parseInt(this.nbLignes) <= 0){
		this.nbLignes = this.nbColonnes = 3;
	}
	if (parseInt(this.nbLignes) > 100){
		this.nbLignes = this.nbColonnes = 100;
	}
	if (parseInt(this.score) <= 0){
		this.score = 3;
	}
	if (parseInt(this.score) > parseInt(this.nbLignes)){
		this.score = this.nbLignes;
	}
	document.getElementById("quelscore").value = this.score;

	for (var i = 0; i < this.nbLignes; i++) {
		this.plateau[i] = [];
	}
	// this : "celui du fichier", cad du contexte courant
	for (var i = 0; i < this.nbLignes; i++) {
		for (var j = 0; j < this.nbColonnes; j++) {
			this.plateau[i][j] = 0;
		}
	}
	this.joueur = 1;
	afficheTextAnnonce("Le jeu de " + this.nomJeu[jeu] + " commence ! <br/><p class='rouge'>C'est au tour du joueur ROUGE</p>");
	document.getElementById("clignotant").className = "";
	
/*	document.getElementById(this.nomJeu[jeu]).disabled = true;
*/
	this.jeu = true;
	creerTableau();
}

/* affichage d'un texte dans la div "textAnnonce" */
function afficheTextAnnonce(texte){
	document.getElementById("textAnnonce").innerHTML = texte;
}

/* attribution de la couleur au joueur */
function nomDuJoueur(numJoueur){
	if (numJoueur == 1){
		return ("ROUGE");
	}else{
		return("BLEU");
	}
}


/* création du tableau représentant le plateau de jeu */
function creerTableau(){
    this.texte = '<table id="tabPlateau">';
    for (i = 0; i < this.nbLignes; i++) {
        this.texte += '<tr>';
        for (j = 0; j < this.nbColonnes; j++) {
            this.texte += '<td onclick="detectClic(' + i + ',' + j + ')" id="' + i + '-' + j + '">';
            this.texte += '</td>';
        }
        this.texte += '</tr>';
    }
    this.texte += '</table>';
    document.getElementById('plateau').innerHTML = this.texte;
    document.getElementById('idfeu').style.width = document.getElementById('tabPlateau').getClientRects()[0].width + 'px';
}

/* evenement Clic sur une case */
/* i= ligne , j= colonne de la case cliquée */
function detectClic(i,j){
	// s'il reste une case de libre dans la colonne et si e jeu est en cours
	if(verifPosition(i,j) && this.jeu){
		var ligneEnCours = poseJeton(i,j); /* numero de la ligne en cours */
		
		// la vérif si vainqueur
		var verifEnd = calculScore(ligneEnCours, j, 0, 0);

		if(verifEnd){
			this.jeu = false;
			document.getElementById("clignotant").className = (this.joueur == 1 ? 'cligRouge' : 'cligBleu');
			afficheTextAnnonce("Le joueur " + nomDuJoueur(this.joueur) + " a gagné la partie.");
		}else{
			this.joueur == 1 ? this.joueur = 2 : this.joueur = 1;
/*			if (this.joueur == 1){
				this.joueur = 2;
			}else{
				this.joueur = 1;
			}
*/			
			afficheTextAnnonce("C'est au tour du joueur " + nomDuJoueur(this.joueur));
			document.getElementById("clignotant").className = (this.joueur == 1 ? 'rouge' : 'bleu');
		}
	}
}

/* vérification que la case ciquée est libre pour y jouer */
/* i= ligne , j= colonne de la case cliquée */
function verifPosition(i,j){
	switch (this.quelJeu){
		case 0: /* puissance 4 */
			return (this.plateau[0][j] == 0);
		case 1: /* tic-tac-toe */
			return (this.plateau[i][j] == 0);
	}
}

/* poser le jeton sur la case cliquée  */
/* i= ligne , j= colonne de la case cliquée */
function poseJeton(i,j){
	switch (this.quelJeu){
		case 0: /* puissance 4 */
			for (var i = this.nbLignes-1; i >= 0; i--) {
				if(this.plateau[i][j] == 0){
					this.plateau[i][j] = this.joueur;
					refreshTableau(i, j, this.joueur);
					return (i);
				}
			}
			break;
		case 1: /* tic-tac-toe */
			if(this.plateau[i][j] == 0){
				this.plateau[i][j] = this.joueur;
				refreshTableau(i, j, this.joueur);
				return (i);
			}
			break;
	}
}

/* x= ligne , y= colonne de la case cliquée , j= n° du joueur*/
function refreshTableau(x, y, i){
	switch (this.quelJeu){
		case 0: /* puissance 4 */
			this.texte = "<div class='puissance4-";
			break;
		case 1: /* tic-tac-toe */
			this.texte = "<div class='tictactoe-";
			break;
	}
	this.texte += "joueur" + i ;
	this.texte += "'></div>";
	document.getElementById(x + '-' + y).innerHTML = this.texte;
}

/* fonction récursive de calcul du score et détection du gagnant */
function calculScore(lig, col, l=0, c=0){
	// condition primaire de la récursivité
	if (c == 0 && l == 0){
		//console.log("initial valeurs : " + lig + " " + col + " / Incrément " + l + " " + c);

		// ce 1er appel lance les appels récursifs
		// -1 pour decaler d'une colonne à gauche ou en haut (et ne pas revenir dans cette condition 0 0) 
		// 1 pour decaler d'une colonne à droite ou en bas (et ne pas revenir dans cette condition 0 0) 
		var va = 1 + calculScore(lig, col-1, 0, -1) + calculScore(lig, col+1, 0, 1); 
		
		// vertical
		var vb = 1 + calculScore(lig-1, col, -1, 0) + calculScore(lig+1, col, 1, 0);

		// diagonale qui descend vers la gauche
		var vc = 1 + calculScore(lig-1, col-1, -1, -1) + calculScore(lig+1, col+1, 1, 1);

		// diagonale qui descend vers la droite
		var vd = 1 + calculScore(lig-1, col+1, -1, 1) + calculScore(lig+1, col-1, 1, -1);

		//console.log(va,vb,vc,vd);
		if(va >= score || vb >= score || vc >= score || vd >= score){
			return true;
		}
		else{
			return false;
		}		
	}

	// condition terminale
	if (lig < this.nbLignes && lig >= 0 && col < this.nbColonnes && col >= 0){
		//console.log("récursive valeurs : " + lig + " " + col + " / Incrément " + l + " " + c);
		if (this.plateau[lig][col] == this.joueur){
			//console.log("ok");
			// boucle récursive avec le décalage d'entrée (-1 ou +1) pour voir les cases suivantes
			return 1 + calculScore(lig + l, col + c, l, c);
		}
		else{
			//console.log("pas ok");
			return 0;
		}
	}

	return 0;
}	



