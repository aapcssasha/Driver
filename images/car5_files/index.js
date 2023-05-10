(function() {
    var URLMETHOD, DIVMETHOD; 
    console.log("cheezwhiz has been loaded");
    //SESSION-FLAG POUR LES BESOINS DE RAFFLE (EG. ANTI-ADBLOCK POUR SEULEMENT 20% DES UTILISATEURS)
    sessionStorage.sessionFlag = sessionStorage.sessionFlag || Math.random() <= 0.2;

    //SETUP DE FLAGS/EVENTS POST-DETECTION
    function go() {
    
      //ADBLOCK IS TRUE
      if (DIVMETHOD || URLMETHOD) {
        localStorage.removeItem('adblockerdeactivated');
        localStorage.removeItem('_adblockerdeactivated');
        console.log("adblock detected");
    
        Dispatch_AdB(true);

        //ADBLOCK IS FALSE
      } else {       
      
        //KV POUR GAM SI ADBLOCK ÉTAIT TRUE AUPARAVANT
        if (localStorage.adBlock === 'true') {
          localStorage.adblockerdeactivated = 'yes';
          localStorage._adblockerdeactivated = Date.now();
        }
        console.log("adblock not detected");
    
        Dispatch_AdB(false);
      }
    }

    //DISPATCH EVENTS
    function Dispatch_AdB(bool) {
      if (
            
      //FORCE LA DÉTECTION
      (window.location.search.match('cheezwhiz') || 
      
      //DÉTECTE SUR UNE LISTE PRÉCISE DE HOSTNAME
      window.location.hostname.match('salutbonjour|guideauto|journalde|video\.tva\.ca|videos\.tva\.ca') 
      
      /* EXEMPLE DE RAFFLE
      || (window.location.hostname.match('coupdepouce') && sessionStorage.sessionFlag === 'true') 
      */
      
      )){
      //ENVOI DU EVENT POUR LE EVENTLISTENER D'AFFICHAGE DU ANTI-ADBLOCK
      document.dispatchEvent(new CustomEvent('detectAdBlock', {
        detail: {
          result: bool
        }
      }));
      }

      //DL PUSH POUR GA
      dataLayer.push({
        event: 'detectAdBlock',
        eventCategory: bool.toString(),
        eventLabel: localStorage.adblockerdeactivated
      });

      //FLAG LOCALSTORAGE
      localStorage.adBlock = bool;
    }

    //DETECTION ADBLOCK PAR DIV
    DIVMETHOD = (function() {
      var ad = document.createElement('ins');
      ad.className = 'AdSense';
      ad.style.display = 'block';
      ad.style.position = 'absolute';
      ad.style.top = '-1px';
      ad.style.height = '1px';
      document.body.appendChild(ad);
      var isAdBlockEnabled = !ad.clientHeight;
      document.body.removeChild(ad);
      return isAdBlockEnabled
    })();

    if (!DIVMETHOD && window.location.hostname !== 'www.journaldequebec.com') {
      //DETECTION ADBLOCK PAR URL SI DIV N'A RIEN DÉTECTÉ
      Promise.resolve(
        fetch(new Request('https://securepubads.g.doubleclick.net/tag/js/gpt.js', {
          method: 'HEAD',
          mode: 'no-cors'
        })).then(function(response) {
          return undefined
        }).catch(function(e) {
          return e
        })
      ).then(function(value) {
        //MÉTHODE AVEC TRÈS PEU DE FAUX-POSITIF
        URLMETHOD = value === 'TypeError: Network request failed';
        go()
      })
    } else {
      go()
    }
  })();