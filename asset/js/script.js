$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

var descriptionpersonnage={
  g:"<strong>Yakou</strong> a une âme de leader et aime donner des conseils. Pourtant, il doute parfois de lui. Il adore les animaux de toutes sortes.",
  b:"<strong>Eugénie</strong> est enjouée et curieuse. Elle se fait facilement de nouveaux amis. Elle n’a qu’une seule phobie : les ballons de baudruche.",
  f:"<strong>Théa</strong> a un caractère bien trempé. Elle est sportive et aime les casse-tête. Sa devise : un esprit sain dans un corps sain.",
  e:"<strong>Odile</strong> est une Éclaireuse. Elle peut paraître discrète mais une fois qu’on la connait on ne l’oublie pas ! Elle est taquine, drôle, et aime les jeux de stratégie.",
  a:"<strong>Carlos</strong> est un Éclaireur. Il aime explorer son environnement et vivre dans la nature. Il est dynamique, observateur et réfléchi.",
  d:"<strong>Nino</strong> est très inventif. Il adore fabriquer des choses de ses mains. Il est spontané et dit tout ce qui lui passe par la tête.",
  c:"<strong>Idriss</strong> est un vrai comédien dans l’âme. Il aime incarner des personnages et créer des spectacles. Certains pensent qu’il est « perché »."
}
