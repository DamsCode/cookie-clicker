(() => {
    let mydiv = document.getElementById("affichage");
    let mybtn = document.getElementById("click");
    let btnmulti = document.getElementById("multiplier");
    let btnautoclick = document.getElementById("autoclick");
    let btnbonus = document.getElementById("bonus");
    let multiplicateur = 1;
    let score = 0;
    let cout = 50;
    let bonusactivate = false;
    let multibonus = 1;
    btnmulti.innerText = `Multiplicateur x${multiplicateur} (${cout} crédit)`;
    btnmulti.setAttribute("disabled", "true");
    btnautoclick.setAttribute("disabled", "true");
    btnbonus.setAttribute("disabled", "true");

    function augmenterMultiplicateur(elem) {
        cout *= 2;
        multiplicateur++;
        elem.innerText = `Multiplicateur x${multiplicateur} (${cout} crédit)`;
        if (bonusactivate) {
            multibonus = multiplicateur * 2;
        }
    }

    function increment() {
        let inc = parseInt(mydiv.innerText);
        if (bonusactivate) {
            score = inc + multibonus;
        } else score = inc + multiplicateur;
        mydiv.innerText = score;
    }

    function decrementbonus(compteur, e) {
        if (compteur > 0) {
            compteur--;
            e.target.innerText = compteur;
            setTimeout(() => {
                decrementbonus(compteur, e);
            }, 1000);
        } else {
            multibonus = Math.ceil(multibonus / 2);
            e.target.innerText = "bonus (5000 crédits)";
            bonusactivate = false;
            gestionbutton();
        }
    }

    mybtn.addEventListener("click", () => {
        increment();
        gestionbutton();
    });

    btnmulti.addEventListener("click", e => {
        if (score >= cout) {
            score -= cout;
            augmenterMultiplicateur(e.target);
            mydiv.innerText = score;
        }
        gestionbutton();
    });

    btnautoclick.addEventListener("click", e => {
        if (score >= 500) {
            setInterval(() => {
                increment();
            }, 1000);
            score -= 500;
            mydiv.innerText = score;
            e.target.disabled = false;
        }
        gestionbutton();
    });
    btnbonus.addEventListener("click", e => {
        if (score >= 5000) {
            score -= 5000;
            bonusactivate = true;
            e.target.disabled = true;
            let compteur = 30;
            multibonus = multiplicateur * 2;
            decrementbonus(compteur, e);
            mydiv.innerText = score;
        }
    });

    function gestionbutton() {
        if (score >= cout) {
            btnmulti.disabled = false;
        } else {
            btnmulti.disabled = true;
        }
        if (score >= 500) {
            btnautoclick.disabled = false;
        } else {
            btnautoclick.disabled = true;
        }
        if (score >= 5000 && !bonusactivate) {
            btnbonus.disabled = false;
        } else {
            btnbonus.disabled = true;
        }
    }
})();