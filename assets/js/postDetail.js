// $$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
//   $$('a.left.back.link').click(function() {
//     console.log("!!!!!!");
//     var historyView = mainView.history;
//     if (historyView[historyView.length - 2] == '#home') {
//       mainView.router.back();
//     } else {
//       window.location.href = '/app';
//     }
//     //  window.location.href = '/app';
//     //  mainView.router.loadPage('/app');
//   });
// });
//
//
// $$(document).on('pageInit pageReInit', '.page[data-page="postDetailF7"]', function(e) {
//   var id = $$("input#itemId").val();
//   // $("#postDetailF7 > .page-content").load("/post/" + id);
//   // $$("#postDetailF7 > .page-content").html(jsLoad("/post/" + id));
//   $$(".back.link").on("click", function() {
//     // clean fb sdk stuff
//     // $$('head script[id="facebook-jssdk"]').remove();
//     // $$('head style').remove()
//   });
//
// }); // end page postDetailF7

// when page loaded
var postDetailAfterAnimation = myApp.onPageAfterAnimation('postDetail', function(page) {

  console.log("postDetail onPageAfterAnimation");

  // $$(function() {
  //   var origin = window.location.origin;
  //   $$(".fb-comments").attr('data-href', origin);
  // });

  $$('div[data-page="postDetail"] .left .link.back').click(function(e) {
    console.log(" postDetail back click ");
    var historyView = mainView.history;
    if (historyView[historyView.length - 1] != '#home') {
      console.log("after post");
      $$('div[data-page="postDetail"] .left .link.back').addClass('with-animation');
      $$('div[data-page="postDetail"] .left .link.back').attr('data-ignore-cache', 'true');
      $$('div[data-page="postDetail"] .left .link.back').attr('data-reload-previous', 'true');
      $$('div[data-page="postDetail"] .left .link.back').attr('data-force', 'true');
      $$('div[data-page="postDetail"] .left .link.back').attr('href', '/app');
      // historyView = [];
      // var homeIndex = 0;
      // for (var a = 0; a < mainView.history.length; a++) {
      //   console.log(mainView.history[a]);
      //   if (mainView.history[a].indexOf("/post/create") == -1) historyView.push(mainView.history[a]);
      //   if (mainView.history[a] == "#home") homeIndex = mainView.history.length - a;
      // }
      // mainView.history = historyView;
      // console.log("not home");
      // console.log(homeIndex);
      // console.log(mainView.history.length);
      // mainView.router.load({
      //   url: "#home",
      //   "force": true,
      //   "ignoreCache": true,
      // });
      // } else {
      //   mainView.router.back();
    }
  });

  $$(".fbShare").on('click', function() {
    console.log("fb click");
    var origin = window.location.href;
    FB.ui({
        method: 'share',
        href: origin
      },
      // callback
      function(response) {
        if (response && !response.error_message) {
          //- alert('Posting completed.');
        } else {
          //- alert('Error while posting.');
        }
      });
  }); // end fbShare

  $$('.lineIt').attr('href', $$('.lineIt').attr('href') + window.location.href)

});