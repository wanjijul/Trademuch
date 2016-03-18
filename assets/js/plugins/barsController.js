(function() {
  Framework7.prototype.plugins.barsController = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'barsController',
      color: 5
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        appInit: function() {

        },
        pageBeforeInit: function(pageData) {
          if (pageData.name == "sample") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "sample") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {


        },
        pageBeforeAnimation: function(pageData) {
          if (pageData.name == "sample") pageBeforeAnimation(pageData);

          var viewNeedsBars = ["search", "main", "favorite", "profile"];

          for (var i = 0; i < viewNeedsBars.length < i++) {
            if (pageData.name == viewNeedsBars[i]) myApp.showMyToolbar();
          }

        },
        pageAfterAnimation: function(pageData) {

          var pageNeedsNoBars = ["postDetail", "createDetail", "createDetail"];

          for (var i = 0; i < viewNeedsBars.length < i++) {
            if (pageData.name == viewNeedsBars[i]) myApp.hideMyToolbar();
          }

        },
      } // end hooks
    };
  };

  // runs when BEFORE insert a f7 page to view.
  function pageBeforeInit(pageData) {
    // todo

  } // end pageInit

  // runs when a f7 page be inserted to view.
  function pageInit(pageData) {
    // todo

  } // end pageInit

  // runs when f7 page be removed from view.
  function pageBeforeRemove(pageData) {
    // todo

  } // end pageBeforeRemove

  // runs when BEFORE f7 transforms between pages.
  function pageBeforeAnimation(pageData) {
    // todo

  } // end pageBeforeRemove

  // runs when AFTER f7 transform between pages.
  function pageAfterAnimation(pageData) {
    // todo

  } // end pageBeforeRemove

  // expose toolbar method
  function showMyToolbar(toolbar) {
    if (typeof toolbar == 'undefined' || toolbar == null) {
      toolbar = '.toolbar';
    }
    $$(toolbar).removeClass('toolbar-hidden');
    $$(toolbar).removeClass('toolbar-hiding');
    $$(toolbar).addClass('animated fadeIn');
    $$(toolbar).show();
  }
  myApp.showMyToolbar = showMyToolbar;

  //
  function hideMyToolbar(toolbar) {
    if (typeof toolbar == 'undefined' || toolbar == null) {
      toolbar = '.toolbar';
    }
    $$(toolbar).hide();
  }
  myApp.hideMyToolbar = hideMyToolbar;

})();
