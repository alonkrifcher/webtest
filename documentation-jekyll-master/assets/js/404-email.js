$(document).ready(function() {
  var currentUrl = window.location.href;
  var referUrl = document.referrer;

  var body = 'I\'ve discovered a broken link!\nThe page "' + currentUrl + '" was referred to by "' + referUrl + '" and does not work!\nPlease fix me!';

  var query = {
    subject: 'Broken Academy Link',
    body: body
  }
  var mailtoLink = 'mailto:success@appboy.com?' + $.param(query);

  emailLink = $('#404-email-link');
  emailLink.attr('href', mailtoLink);
});
