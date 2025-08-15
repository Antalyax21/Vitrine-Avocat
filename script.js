// tous les liens de la nav
    const navLien = document.querySelectorAll('nav a');

    //toutes les sections qui ont un id
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let scroll = window.scrollY + 120; // pour compenser la hauteur de la nav je regle ici

        sections.forEach(section => { // pour chaque section
            // on récupère la position du haut de la section et sa hauteur
            const top = section.offsetTop; 
            const height = section.offsetHeight;
            const id = section.getAttribute('id'); 

            if(scroll >= top && scroll < top + height) { // si scroll en haut ou en bas de la section
                // on supprime la classe active de tous les liens
                navLien.forEach(link => link.classList.remove('active')); // nav a
                // on ajoute la classe active au lien correspondant
                const activeLink = document.querySelector(`nav a[href="#${id}"]`); 
                if(activeLink) activeLink.classList.add('active');
            }
        });
    });

    // verificvation du formulaire de contact avec regex et affichage d'un message de succès ( a faire demain)
    

