window.fbAsyncInit = function() {
  FB.init({
    appId      : '681725175179931', // App ID
    channelUrl : '//www.logofid.es/argo/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

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
      testAPI();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login(function(response) {
       // handle the response
      }, {scope: 'user_status,email,user_likes'});

      // FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login(function(response) {
       // handle the response
      }, {scope: 'user_status,email,user_likes'});  

      // FB.login();
    }
  });
};

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
      console.log('Good to see you, ' + response.link + '.');
    });
    // FB.api(
    //     "/me/friends",
    //     function (response) {
    //       if (response && !response.error) {
    //         console.log('La lista de FRIENDS ' + JSON.stringify(response))  ;
    //       }
    //     }
    // );

    FB.api(
        "/me/statuses",
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log('La lista de STATUSES ' + JSON.stringify(response))  ;
          }
        }
    );

    FB.api(
        "/me/likes",
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log('La lista de likes ' + JSON.stringify(response))  ;
          }
        }
    );

  }


  // function testLOGIN() {
  //   console.log('Vamos por aqui');
  //   FB.login(function(response) {
  //    // handle the response
  //   }, {scope: 'user_status,email,user_likes'});  
  // };

  // var fblogin = function() {
  //   FB.login(function(response) {
  //       if (response) {
  //           if (response.authResponse) {
  //               //successful auth
  //               //do things like create account, redirect etc.
  //           } else {
  //               //unsuccessful auth
  //               //do things like notify user etc.
  //           }
  //       },{scope:'email,publish_stream'}); //whatever perms your app needs
  // };



