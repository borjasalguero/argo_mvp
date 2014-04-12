var debug = true;

window.onload = function() {
  debug && console.log('App loaded');

  var fbLoginButton = document.getElementById('fb-login-button');
  var refreshButton = document.getElementById('refresh-button');
  refreshButton.disabled = true;
  // Init FB
  FBHelper.init(
    function onLoggedIn() {
      console.log('Logueado!');
      fbLoginButton.disabled = true;
      refreshButton.disabled = false;
    }
  );
  // Add a listener to the login button
  fbLoginButton.addEventListener(
    'click',
    FBHelper.login
  );
  // Add a listener to the refresh button
  refreshButton.addEventListener(
    'click',
    function() {
      FBHelper.requestOffers(function(offers) {
        console.log('Las ofertas son ' + JSON.stringify(offers));
      });
    }
  );
}


// AVE https://www.facebook.com/groups/301921786500139/
// Mercadillo vespa https://www.facebook.com/groups/159962360823091/