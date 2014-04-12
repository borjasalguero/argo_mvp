var debug = true;
debug && console.log('FB Helper loaded');

// Load the SDK asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
 debug && console.log('FB Code loaded');
}(document));

(function(exports) {
  var _onLoggedIn, _onLoggedOut;
  var _accessToken;
  // App permissions needed.
  var permissions = 'basic_info,user_groups,user_location,publish_stream,publish_actions';
  // Query for getting the offers
  var queryOffers = 'SELECT message, action_links, attachment, comment_info, like_info, permalink, updated_time, created_time FROM stream WHERE source_id=159962360823091 ORDER BY created_time desc';
      
  function _getLargeImage(fbUrl) {
    return fbUrl.replace('_s.jpg','_n.jpg');
  }

  var FBHelper = {
    init: function fbh_init(onLoggedIn, onLoggedOut) {
      _onLoggedIn = onLoggedIn || function() {};
      _onLoggedOut = onLoggedOut || function() {};
      // window.fbAsyncInit = function() {
        // TODO Add a way to retrieve APP ID
        FB.init({
          appId      : '681725175179931', // App ID
          channelUrl : '//www.logofid.es/argo/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });
        console.log('Se llamó ya al INIT');
        // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
        // for any authentication related change, such as login, logout or session refresh. This means that
        // whenever someone who was previously logged out tries to log in again, the correct case below 
        // will be handled. 
        FB.Event.subscribe('auth.authResponseChange', function(response) {
          // Here we specify what we do with the response anytime this event occurs. 
          if (response.status === 'connected') {
            // The response object is returned with a status field that lets the app know the current
            // login status of the person. In this case, we're handling the situation where they 
            // have logged in to the app.
            _accessToken = response.authResponse.accessToken;
            _onLoggedIn();
            // testAPI(response.authResponse.accessToken);
            // console.log(JSON.stringify(response.authResponse));
          } else if (response.status === 'not_authorized') {
            // In this case, the person is logged into Facebook, but not into the app, so we call
            // FB.login() to prompt them to do so. 
            // In real-life usage, you wouldn't want to immediately prompt someone to login 
            // like this, for two reasons:
            // (1) JavaScript created popup windows are blocked by most browsers unless they 
            // result from direct interaction from people using the app (such as a mouse click)
            // (2) it is a bad experience to be continually prompted to login upon page load.
            
            FBHelper.login();
          } else {
            // In this case, the person is not logged into Facebook, so we call the login() 
            // function to prompt them to do so. Note that at this stage there is no indication
            // of whether they are logged into the app. If they aren't then they'll see the Login
            // dialog right after they log in to Facebook. 
            // The same caveats as above apply to the FB.login() call here.
           
           FBHelper.login();
          }
        }); // End of FB.event.suscribe
      // };
    },
    login: function fbh_login() {
      FB.login(function(response) {
       // handle the response
      }, {scope: permissions}); 
    },
    requestMe: function fbh_requestMe(callback) {
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
        console.log('Good to see you, ' + response.link + '.');
        if (typeof callback === 'function') {
          callback(data);
        }
      });
    },
    requestOffers: function fbh_requestOffers(callback) {
      if (typeof callback !== 'function') {
        console.error('requestOffers: callback have to be defined');
        return;
      }

      FB.api(
        { 
          access_token: _accessToken,
          method: 'fql.query',
          query: queryOffers
        }, 
        function onData(rawOffers) {
          var offers = [];
          rawOffers.forEach(function(rawOffer) {
            var photos = [];
            if (rawOffer.attachment && rawOffer.attachment.media) {
              rawOffer.attachment.media.forEach(function(attachment){
                photos.push(_getLargeImage(attachment.src));
              });
            }
            
            offers.push({
              message: rawOffer.message,
              photos: photos,
              comments_count: rawOffer.comment_info.comment_count,
              likes_count: rawOffer.like_info.like_count,
              created_time: rawOffer.created_time,
              updated_time: rawOffer.updated_time
            });
          });
          callback(offers);
        }
      );
    }
  };

  exports.FBHelper = FBHelper;
}(this));
  
