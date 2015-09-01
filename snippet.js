define(function (require, exports, module) {
    'use strict';

    var snippets = {};

    // MDL - Base

    snippets.mdl = '<!DOCTYPE html>\n' +
        '<html lang="fr">\n' +
        '\n' +
        '   <head>\n' +
        '       <meta charset="utf-8">\n' +
        '       <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
        '       <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        '       <meta name="description" content="">\n' +
        '       <meta name="author" content="">\n' +
        '       <title>KVM Studio</title>\n' +
        '\n' +
        '       <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.indigo-pink.min.css">\n' +
        '       <script src="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.min.js"></script>\n' +
        '       <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">\n' +
        '       <link href="http://fonts.googleapis.com/css?family=Roboto:400,300" rel="stylesheet" type="text/css">\n' +
        '       <link rel="stylesheet" href="css/style.css">\n' +
        '\n' +
        '   </head>\n' +
        '   <body>\n' +
        '       <header>\n' +
        '\n' +
        '       </header>\n' +
        '       <main>\n' +
        '\n' +
        '       </main>\n' +
        '       <footer>\n' +
        '\n' +
        '       </footer>\n' +
        '       <script src="js/jquery.min.js"></script>\n' +
        '   </body>\n' +
        '</html>\n';

    snippets.mdlbase = snippets.mdl;

    // Fixed Header

    snippets.mdlfixedheader = '<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">\n' +
            '   <header class="mdl-layout__header">\n' +
            '       <div class="mdl-layout__header-row">\n' +
            '           <!-- Title -->\n' +
            '           <span class="mdl-layout-title">Title</span>\n' +
            '           <div class="mdl-layout-spacer"></div>\n' +
            '           <!-- Navigation. We hide it in small screens. -->\n' +
            '           <nav class="mdl-navigation mdl-layout--large-screen-only">\n' +
            '               <a class="mdl-navigation__link" href="">Link</a>\n' +
            '               <a class="mdl-navigation__link" href="">Link</a>\n' +
            '               <a class="mdl-navigation__link" href="">Link</a>\n' +
            '               <a class="mdl-navigation__link" href="">Link</a>\n' +
            '           </nav>\n' +
            '       </div>\n' +
            '   </header>\n' +
            '   <div class="mdl-layout__drawer">\n' +
            '       <span class="mdl-layout-title">Title</span>\n' +
            '       <nav class="mdl-navigation">\n' +
            '           <a class="mdl-navigation__link" href="">Link</a>\n' +
            '           <a class="mdl-navigation__link" href="">Link</a>\n' +
            '           <a class="mdl-navigation__link" href="">Link</a>\n' +
            '           <a class="mdl-navigation__link" href="">Link</a>\n' +
            '       </nav>\n' +
            '   </div>\n' +
            '   <main class="mdl-layout__content">\n' +
            '       <div class="page-content"><!-- Your content goes here --></div>\n' +
            '   </main>\n' +
            '</div>\n';

    snippets.mdlsearch = 
            '<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">\n' +
            '   <label class="mdl-button mdl-js-button mdl-button--icon" for="waterfall-exp">\n' +
            '       <i class="material-icons">search</i>\n' +
            '   </label>\n' +
            '   <div class="mdl-textfield__expandable-holder">\n' +
            '      <input class="mdl-textfield__input" type="text" name="sample" id="waterfall-exp" />\n' +
            '   </div>\n' +
            '</div>\n';
    
    snippets.mdlcoloredbuttonripple = 
            '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">\n' +
            '   <i class="material-icons">add</i>\n' +
            '</button>\n';
    
    snippets.mdlfloatinput =
        '<form action="#">\n' +
        '   <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\n' +
        '       <input class="mdl-textfield__input" type="text" id="sample3" />\n' +
        '       <label class="mdl-textfield__label" for="sample3">Text...</label>\n' +
        '   </div>\n' +
        '</form>\n';
    
    snippets.mdldropdownleft =
        '<button id="demo-menu-lower-left" class="mdl-button mdl-js-button mdl-button--icon">\n' +
        '   <i class="material-icons">more_vert</i>\n' +
        '</button>\n' +

        '<ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-left">\n' +
        '   <li class="mdl-menu__item">Some Action</li>\n' +
        '   <li class="mdl-menu__item">Another Action</li>\n' +
        '   <li disabled class="mdl-menu__item">Disabled Action</li>\n' +
        '   <li class="mdl-menu__item">Yet Another Action</li>\n' +
        '</ul>\n';
    
    snippets.mdldropdownright =
        '<button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">\n' +
        '   <i class="material-icons">more_vert</i>\n' +
        '</button>\n' +

        '<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">\n' +
        '   <li class="mdl-menu__item">Some Action</li>\n' +
        '   <li class="mdl-menu__item">Another Action</li>\n' +
        '   <li disabled class="mdl-menu__item">Disabled Action</li>\n' +
        '   <li class="mdl-menu__item">Yet Another Action</li>\n' +
        '</ul>\n';
    
    
    module.exports = snippets;
});
