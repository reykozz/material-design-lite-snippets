define(function (require, exports, module) {
    'use strict';

    var AppInit = brackets.getModule('utils/AppInit'),
        EditorManager = brackets.getModule('editor/EditorManager'),
        CodeHintManager = brackets.getModule("editor/CodeHintManager"),
        LanguageManager = brackets.getModule("language/LanguageManager"),
        PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
        Menus = brackets.getModule('command/Menus'),
        CommandManager = brackets.getModule('command/CommandManager'),
        KeyEvent = brackets.getModule('utils/KeyEvent'),

        snippets = require('snippet'),
        mdlfuncHint = require('text!mdl-func.txt'),
        enabled = false,
        prefs = PreferencesManager.getExtensionPrefs('material-design-lite-snippets'),

        COMMAND_NAME = 'Enable Material Design Lite Snippets',
        COMMAND_ID = 'acbapbox.toggleMDLSnippets',
        handleToggleSnippets = function () {
            enabled = !enabled;
            prefs.set('enabled', enabled);
            prefs.save();
            CommandManager.get(COMMAND_ID).setChecked(enabled);
        },
        applyPreferences = function () {
            enabled = prefs.get('enabled');
            CommandManager.get(COMMAND_ID).setChecked(enabled);
        },

        parseLine = function (line, cursorPosition) {
            var words;
            line = line.substring(0, cursorPosition);
            words = line.split(/\W/);
            return words[words.length - 1];
        },

        keyEventHandler = function ($event, editor, event) {
            enabled = prefs.get('enabled');

            var cursorPosition, line, snippetKey, start;

            if (enabled) {
                if ((event.type === 'keydown') && (event.keyCode === KeyEvent.DOM_VK_TAB || event.keyCode === KeyEvent.DOM_VK_DOWN)) {
                    cursorPosition = editor.getCursorPos();
                    line = editor.document.getLine(cursorPosition.line);
                    snippetKey = parseLine(line, cursorPosition.ch);
                    if (snippets[snippetKey]) {
                        start = {
                            line: cursorPosition.line,
                            ch: cursorPosition.ch - snippetKey.length
                        };

                        editor.document.replaceRange(snippets[snippetKey], start, cursorPosition);
                        event.preventDefault();
                    }
                }
            }
        },

        activeEditorChangeHandler = function ($event, focusedEditor, lostEditor) {
            enabled = prefs.get('enabled');
            if (lostEditor) {
                $(lostEditor).off('keyEvent', keyEventHandler);
            }
            if (focusedEditor) {
                $(focusedEditor).on('keyEvent', keyEventHandler);
            }
        };


    var lastLine,
        lastFileName,
        cachedMatches,
        cachedWordList,
        tokenDefinition,
        currentTokenDefinition;

    function MDLhints() {
        this.lastLine = 0;
        this.lastFileName = "";
        this.cachedMatches = [];
        this.cachedWordList = [];
        this.tokenDefinition = /[a-zA-Z][(_a-zA-Z0-9$,.';_ )].{2,}/g;
        this.currentTokenDefinition = /[a-zA-Z][a-zA-Z0-9_]+$/g;
    }

    MDLhints.prototype.hasHints = function (editor, implicitChar) {
        this.editor = editor;
        var cursor = this.editor.getCursorPos();

        if (cursor.line !== this.lastLine) {
            var rawWordList = mdlfuncHint.match(this.tokenDefinition);
            this.cachedWordList = [];
            var i;
            for (i = 0; i < rawWordList.length; i++) {
                var word = rawWordList[i];
                if (this.cachedWordList.indexOf(word) === -1) {
                    this.cachedWordList.push(word);
                }
            }
        }
        this.lastLine = cursor.line;

        var lineBeginning = {
            line: cursor.line,
            ch: 0
        };
        var textBeforeCursor = this.editor.document.getRange(lineBeginning, cursor);
        var symbolBeforeCursorArray = textBeforeCursor.match(this.currentTokenDefinition);
        if (symbolBeforeCursorArray) {
            var n;
            for (n = 0; n < this.cachedWordList.length; n++) {
                if (this.cachedWordList[n].indexOf(symbolBeforeCursorArray[0]) === 0) {
                    return true;
                }
            }
        }
        return false;
    };

    MDLhints.prototype.getHints = function (implicitChar) {
        var cursor = this.editor.getCursorPos();
        var lineBeginning = {
            line: cursor.line,
            ch: 0
        };
        var textBeforeCursor = this.editor.document.getRange(lineBeginning, cursor);
        var symbolBeforeCursorArray = textBeforeCursor.match(this.currentTokenDefinition);
        var hintList = [];
        var j;
        for (j = 0; j < this.cachedWordList.length; j++) {
            if (this.cachedWordList[j].indexOf(symbolBeforeCursorArray[0]) === 0) {
                hintList.push(this.cachedWordList[j]);
            }
        }

        return {
            hints: hintList,
            match: symbolBeforeCursorArray[0],
            selectInitial: true,
            handleWideResults: false
        };
    };

    /**
     * Complete the word
     *
     * @param {String} hint
     * The hint to be inserted into the editor context.
     *
     * @return {Boolean}
     * Indicates whether the manager should follow hint insertion with an
     * additional explicit hint request.
     */

    MDLhints.prototype.insertHint = function (hint) {
        var cursor = this.editor.getCursorPos();
        var lineBeginning = {
            line: cursor.line,
            ch: 0
        };
        var textBeforeCursor = this.editor.document.getRange(lineBeginning, cursor);
        var indexOfTheSymbol = textBeforeCursor.search(this.currentTokenDefinition);
        var replaceStart = {
            line: cursor.line,
            ch: indexOfTheSymbol
        };
        // hint = hint + '\t';
        this.editor.document.replaceRange(hint, replaceStart, cursor);

        var cursorPosition = this.editor.getCursorPos();
        var line = this.editor.document.getLine(cursorPosition.line);
        var snippetKey = parseLine(line, cursorPosition.ch);
        if (snippets[snippetKey]) {
            var start = {
                line: cursorPosition.line,
                ch: cursorPosition.ch - snippetKey.length
            };

            this.editor.document.replaceRange(snippets[snippetKey], start, cursorPosition);
            event.preventDefault();
        }

        return false;
    };

    AppInit.appReady(function () {
        enabled = prefs.get('enabled');

        CommandManager.register(COMMAND_NAME, COMMAND_ID, handleToggleSnippets);
        Menus.getMenu(Menus.AppMenuBar.EDIT_MENU).addMenuItem(COMMAND_ID);

        var currentEditor = EditorManager.getCurrentFullEditor();
        $(currentEditor).on('keyEvent', keyEventHandler);
        $(EditorManager).on('activeEditorChange', activeEditorChangeHandler);

        var mdlHints = new MDLhints();
        CodeHintManager.registerHintProvider(mdlHints, ["all"], 0);

        prefs.on('change', applyPreferences);
        applyPreferences();
    });
});
