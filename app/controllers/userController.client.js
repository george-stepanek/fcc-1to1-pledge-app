'use strict';

$("document").ready($.get(window.location.origin + '/api/:id', function (user) {
   if (user.displayName !== null) {
      $('#display-name').html(user.displayName);
   } else {
      $('#display-name').html(user.username);
   }
}));
