'use strict';

var debug = true;

debug && console.log('UI Loaded');

(function(exports) {
  var _templates = {}, _dom = {};
  
  var UI = {
    init: function ui_init() {
      debug && console.log('UI initialized');
      debug && console.log('Handlebars ' + Handlebars);
      _dom.offersList = document.getElementById('offers-list');
      _templates.offer = Handlebars.compile(
        document.querySelector("#offer-template").innerHTML
      );
    },
    renderOffers: function ui_renderOffers(offers, reset) {
      debug && console.log('UI renderOffers called');
      if (reset) {
        _dom.offersList.innerHTML = '';
      }
      
      // IF reset is TRUE we clean the DOM before adding more elements
      offers.forEach(function(offer) {
        console.log('Creando elemento')
        var offerDOM = document.createElement('li');
        var html = _templates.offer({title: offer.message, photo: offer.photos[0] || ''});
        console.log('El elemento tiene ' + html);
        offerDOM.innerHTML = html;
        console.log('El elemento es ' + html);
        _dom.offersList.appendChild(offerDOM);
      });
    }
  };

  exports.UI = UI;

}(this));