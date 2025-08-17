// tous les liens de la nav
const navLien = document.querySelectorAll('nav a');

// toutes les sections qui ont un id
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let scroll = window.scrollY + 120; // pour compenser la hauteur de la nav

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scroll >= top && scroll < top + height) {
            navLien.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`nav a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Sélection du formulaire et des champs
    const form = document.querySelector('.form');
    const np = document.getElementById('np');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const message = document.querySelector('textarea'); 
    const cCount = document.getElementById('char-count'); // un span pour le compteur

    const erreurs = {
        np: document.getElementById('npError'),
        email: document.getElementById('emailError'),
        tel: document.getElementById('telError'),
        message: document.getElementById('messageError')
    };

    // majuscule automatique nom prénom
    np.addEventListener('input', function () {
        this.value = this.value
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase());
    });

    // restrictions sur les champs
    const champs = [np, email, tel, message];
    const interdit = /[";<>=]/g;
    const maxLengthTextarea = 200;

    champs.forEach(champ => {
        champ.addEventListener('input', function () {
            // supprime les caracteres interdit
            this.value = this.value.replace(interdit, '');

            // pour tel uniquement chiffres et +
            if (this.id === 'tel') {
                this.value = this.value.replace(/[^\d+]/g, '');
            }

            // pour textartea ,compteur et limite 200 caracteres
            if (this === message) {
                if (this.value.length > maxLengthTextarea) {
                    this.value = this.value.slice(0, maxLengthTextarea);
                }
                if (cCount) {
                    cCount.textContent = `${maxLengthTextarea - this.value.length} caractères restants`;
                }
            }
        });
    });

  //validation au blur
    function validerChamp(element, validationC, errorMessage, champId) {
        element.addEventListener('blur', function () {
            if (!this.value) {
                erreurs[champId].textContent = 'Ce champ est requis.';
            } else if (!validationC(this.value)) {
                erreurs[champId].textContent = errorMessage;
            } else {
                erreurs[champId].textContent = '';
            }
        });
    }

    // regex de validation
    function validationNomPrenom(valeur) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]{5,}$/;
        return regex.test(valeur.trim());
    }

    function validationEmail(valeur) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(valeur);
    }

    function validationTel(valeur) {
        const regex = /^(\+33|0)[1-9](\d{2}){4}$/;
        return regex.test(valeur);
    }

    function validationMessage(valeur) {
        return valeur.trim().length > 10; // minimum 10 caracteres
    }

    
    validerChamp(np, validationNomPrenom, 'Minimum 5 caractères alphabétiques.', 'np');
    validerChamp(email, validationEmail, 'Format email invalide.', 'email');
    validerChamp(tel, validationTel, 'Format téléphone invalide.', 'tel');
    validerChamp(message, validationMessage, 'Votre message doit faire au moins 10 caractères.', 'message'); 

    // soumission du formulaire
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        // reinitialisation des erreurs
        Object.values(erreurs).forEach(err => err.textContent = '');

        if (!validationNomPrenom(np.value)) {
            erreurs.np.textContent = 'Minimum 5 caractères alphabétiques.';
            isValid = false;
        }
        if (!validationEmail(email.value)) {
            erreurs.email.textContent = 'Format email invalide.';
            isValid = false;
        }
        if (!validationTel(tel.value)) {
            erreurs.tel.textContent = 'Format téléphone invalide.';
            isValid = false;
        }
        if (!validationMessage(message.value)) {
            erreurs.message.textContent = 'Votre message doit faire au moins 10 caractères.';
            isValid = false;
        }

        if (isValid) {
            // message de succes
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Formulaire envoyé avec succès ! Nous vous contacterons bientôt.';
            successMessage.style.color = 'green';
            successMessage.style.fontWeight = 'bold';
            successMessage.style.marginTop = '10px';
            successMessage.id = 'success-message';
            form.appendChild(successMessage);

            // reinitialiser le formulaire
            form.reset();
            Object.values(erreurs).forEach(err => err.textContent = '');

            // supprimer le message apres 10 secondes
            setTimeout(() => {
                const msg = document.getElementById('success-message');
                if (msg) msg.remove();
            }, 10000);
        }
    });
});
