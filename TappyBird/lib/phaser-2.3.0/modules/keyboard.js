/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* If you need more fine-grained control over the handling of specific keys you can create and use Phaser.Key objects.
* 
* @class Phaser.Key
* @constructor
* @param {Phaser.Game} game - Current game instance.
* @param {number} keycode - The key code this Key is responsible for.
*/
Phaser.Key = function (game, keycode) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * The enabled state of the key - see `enabled`.
    * @property {boolean} _enabled
    * @private
    */
    this._enabled = true;

    /**
    * @property {object} event - Stores the most recent DOM event.
    * @readonly
    */
    this.event = null;

    /**
    * @property {boolean} isDown - The "down" state of the key. This will remain `true` for as long as the keyboard thinks this key is held down.
    * @default
    */
    this.isDown = false;

    /**
    * @property {boolean} isUp - The "up" state of the key. This will remain `true` for as long as the keyboard thinks this key is up.
    * @default
    */
    this.isUp = true;

    /**
    * @property {boolean} altKey - The down state of the ALT key, if pressed at the same time as this key.
    * @default
    */
    this.altKey = false;

    /**
    * @property {boolean} ctrlKey - The down state of the CTRL key, if pressed at the same time as this key.
    * @default
    */
    this.ctrlKey = false;

    /**
    * @property {boolean} shiftKey - The down state of the SHIFT key, if pressed at the same time as this key.
    * @default
    */
    this.shiftKey = false;

    /**
    * @property {number} timeDown - The timestamp when the key was last pressed down. This is based on Game.time.now.
    */
    this.timeDown = 0;

    /**
    * If the key is down this value holds the duration of that key press and is constantly updated.
    * If the key is up it holds the duration of the previous down session.
    * @property {number} duration - The number of milliseconds this key has been held down for.
    * @default
    */
    this.duration = 0;

    /**
    * @property {number} timeUp - The timestamp when the key was last released. This is based on Game.time.now.
    * @default
    */
    this.timeUp = -2500;

    /**
    * @property {number} repeats - If a key is held down this holds down the number of times the key has 'repeated'.
    * @default
    */
    this.repeats = 0;

    /**
    * @property {number} keyCode - The keycode of this key.
    */
    this.keyCode = keycode;

    /**
    * @property {Phaser.Signal} onDown - This Signal is dispatched every time this Key is pressed down. It is only dispatched once (until the key is released again).
    */
    this.onDown = new Phaser.Signal();

    /**
    * @property {function} onHoldCallback - A callback that is called while this Key is held down. Warning: Depending on refresh rate that could be 60+ times per second.
    */
    this.onHoldCallback = null;

    /**
    * @property {object} onHoldContext - The context under which the onHoldCallback will be called.
    */
    this.onHoldContext = null;

    /**
    * @property {Phaser.Signal} onUp - This Signal is dispatched every time this Key is pressed down. It is only dispatched once (until the key is released again).
    */
    this.onUp = new Phaser.Signal();

    /**
     * @property {boolean} _justDown - True if the key has just been pressed (NOTE: requires to be reset, see justDown getter)
     * @private
     */
    this._justDown = false;

    /**
     * @property {boolean} _justUp - True if the key has just been pressed (NOTE: requires to be reset, see justDown getter)
     * @private
     */
    this._justUp = false;

};

Phaser.Key.prototype = {

    /**
    * Called automatically by Phaser.Keyboard.
    * 
    * @method Phaser.Key#update
    * @protected
    */
    update: function () {

        if (!this._enabled) { return; }

        if (this.isDown)
        {
            this.duration = this.game.time.time - this.timeDown;
            this.repeats++;

            if (this.onHoldCallback)
            {
                this.onHoldCallback.call(this.onHoldContext, this);
            }
        }

    },

    /**
    * Called automatically by Phaser.Keyboard.
    * 
    * @method Phaser.Key#processKeyDown
    * @param {KeyboardEvent} event - The DOM event that triggered this.
    * @protected
    */
    processKeyDown: function (event) {

        if (!this._enabled) { return; }

        this.event = event;

        // exit if this key down is from auto-repeat
        if (this.isDown)
        {
            return;
        }

        this.altKey = event.altKey;
        this.ctrlKey = event.ctrlKey;
        this.shiftKey = event.shiftKey;

        this.isDown = true;
        this.isUp = false;
        this.timeDown = this.game.time.time;
        this.duration = 0;
        this.repeats = 0;

        // _justDown will remain true until it is read via the justDown Getter
        // this enables the game to poll for past presses, or reset it at the start of a new game state
        this._justDown = true;

        this.onDown.dispatch(this);

    },

    /**
    * Called automatically by Phaser.Keyboard.
    * 
    * @method Phaser.Key#processKeyUp
    * @param {KeyboardEvent} event - The DOM event that triggered this.
    * @protected
    */
    processKeyUp: function (event) {

        if (!this._enabled) { return; }

        this.event = event;

        if (this.isUp)
        {
            return;
        }

        this.isDown = false;
        this.isUp = true;
        this.timeUp = this.game.time.time;
        this.duration = this.game.time.time - this.timeDown;

        // _justUp will remain true until it is read via the justUp Getter
        // this enables the game to poll for past presses, or reset it at the start of a new game state
        this._justUp = true;

        this.onUp.dispatch(this);

    },

    /**
    * Resets the state of this Key.
    *
    * This sets isDown to false, isUp to true, resets the time to be the current time, and _enables_ the key.
    * In addition, if it is a "hard reset", it clears clears any callbacks associated with the onDown and onUp events and removes the onHoldCallback.
    *
    * @method Phaser.Key#reset
    * @param {boolean} [hard=true] - A soft reset won't reset any events or callbacks; a hard reset will.
    */
    reset: function (hard) {

        if (typeof hard === 'undefined') { hard = true; }

        this.isDown = false;
        this.isUp = true;
        this.timeUp = this.game.time.time;
        this.duration = 0;
        this._enabled = true; // .enabled causes reset(false)
        this._justDown = false;
        this._justUp = false;

        if (hard)
        {
            this.onDown.removeAll();
            this.onUp.removeAll();
            this.onHoldCallback = null;
            this.onHoldContext = null;
        }

    },

    /**
    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
    * or was pressed down longer ago than then given duration.
    * 
    * @method Phaser.Key#downDuration
    * @param {number} [duration=50] - The duration within which the key is considered as being just pressed. Given in ms.
    * @return {boolean} True if the key was pressed down within the given duration.
    */
    downDuration: function (duration) {

        if (typeof duration === "undefined") { duration = 50; }

        return (this.isDown && this.duration < duration);

    },

    /**
    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
    * or was pressed down longer ago than then given duration.
    * 
    * @method Phaser.Key#upDuration
    * @param {number} [duration=50] - The duration within which the key is considered as being just released. Given in ms.
    * @return {boolean} True if the key was released within the given duration.
    */
    upDuration: function (duration) {

        if (typeof duration === "undefined") { duration = 50; }

        return (!this.isDown && ((this.game.time.time - this.timeUp) < duration));

    }

};

/**
* The justDown value allows you to test if this Key has just been pressed down or not.
* When you check this value it will return `true` if the Key is down, otherwise `false`.
* You can only call justDown once per key press. It will only return `true` once, until the Key is released and pressed down again.
* This allows you to use it in situations where you want to check if this key is down without using a Signal, such as in a core game loop.
* 
* @property {boolean} justDown
* @memberof Phaser.Key
* @default false
*/
Object.defineProperty(Phaser.Key.prototype, "justDown", {

    get: function () {

        var current = this._justDown;
        this._justDown = false;
        return current;

    }

});

/**
* The justUp value allows you to test if this Key has just been released or not.
* When you check this value it will return `true` if the Key is up, otherwise `false`.
* You can only call justUp once per key release. It will only return `true` once, until the Key is pressed down and released again.
* This allows you to use it in situations where you want to check if this key is up without using a Signal, such as in a core game loop.
* 
* @property {boolean} justUp
* @memberof Phaser.Key
* @default false
*/
Object.defineProperty(Phaser.Key.prototype, "justUp", {

    get: function () {

        var current = this._justUp;
        this._justUp = false;
        return current;

    }

});

/**
* An enabled key processes its update and dispatches events.
* A key can be disabled momentarily at runtime instead of deleting it.
* 
* @property {boolean} enabled
* @memberof Phaser.Key
* @default true
*/
Object.defineProperty(Phaser.Key.prototype, "enabled", {

    get: function () {

        return this._enabled;

    },

    set: function (value) {

        value = !!value;

        if (value !== this._enabled)
        {
            if (!value)
            {
                this.reset(false);
            }

            this._enabled = value;
        }
    }

});

Phaser.Key.prototype.constructor = Phaser.Key;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Keyboard class monitors keyboard input and dispatches keyboard events.
*
* _Be aware_ that many keyboards are unable to process certain combinations of keys due to hardware
* limitations known as ghosting. Full details here: http://www.html5gamedevs.com/topic/4876-impossible-to-use-more-than-2-keyboard-input-buttons-at-the-same-time/
*
* @class Phaser.Keyboard
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.Keyboard = function (game) {

    /**
    * @property {Phaser.Game} game - Local reference to game.
    */
    this.game = game;

    /**
    * Keyboard input will only be processed if enabled.
    * @property {boolean} enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property {object} event - The most recent DOM event from keydown or keyup. This is updated every time a new key is pressed or released.
    */
    this.event = null;

    /**
    * @property {object} pressEvent - The most recent DOM event from keypress.
    */
    this.pressEvent = null;

    /**
    * @property {object} callbackContext - The context under which the callbacks are run.
    */
    this.callbackContext = this;

    /**
    * @property {function} onDownCallback - This callback is invoked every time a key is pressed down, including key repeats when a key is held down.
    */
    this.onDownCallback = null;

    /**
    * @property {function} onPressCallback - This callback is invoked every time a DOM onkeypress event is raised, which is only for printable keys.
    */
    this.onPressCallback = null;

    /**
    * @property {function} onUpCallback - This callback is invoked every time a key is released.
    */
    this.onUpCallback = null;

    /**
    * @property {array<Phaser.Key>} _keys - The array the Phaser.Key objects are stored in.
    * @private
    */
    this._keys = [];

    /**
    * @property {array} _capture - The array the key capture values are stored in.
    * @private
    */
    this._capture = [];

    /**
    * @property {function} _onKeyDown
    * @private
    * @default
    */
    this._onKeyDown = null;

    /**
    * @property {function} _onKeyPress
    * @private
    * @default
    */
    this._onKeyPress = null;

    /**
    * @property {function} _onKeyUp
    * @private
    * @default
    */
    this._onKeyUp = null;

    /**
    * @property {number} _i - Internal cache var
    * @private
    */
    this._i = 0;

    /**
    * @property {number} _k - Internal cache var
    * @private
    */
    this._k = 0;

};

Phaser.Keyboard.prototype = {

    /**
    * Add callbacks to the Keyboard handler so that each time a key is pressed down or released the callbacks are activated.
    *
    * @method Phaser.Keyboard#addCallbacks
    * @param {object} context - The context under which the callbacks are run.
    * @param {function} [onDown=null] - This callback is invoked every time a key is pressed down.
    * @param {function} [onUp=null] - This callback is invoked every time a key is released.
    * @param {function} [onPress=null] - This callback is invoked every time the onkeypress event is raised.
    */
    addCallbacks: function (context, onDown, onUp, onPress) {

        this.callbackContext = context;

        if (typeof onDown !== 'undefined')
        {
            this.onDownCallback = onDown;
        }

        if (typeof onUp !== 'undefined')
        {
            this.onUpCallback = onUp;
        }

        if (typeof onPress !== 'undefined')
        {
            this.onPressCallback = onPress;
        }

    },

    /**
    * If you need more fine-grained control over a Key you can create a new Phaser.Key object via this method.
    * The Key object can then be polled, have events attached to it, etc.
    *
    * @method Phaser.Keyboard#addKey
    * @param {number} keycode - The keycode of the key, i.e. Phaser.Keyboard.UP or Phaser.Keyboard.SPACEBAR
    * @return {Phaser.Key} The Key object which you can store locally and reference directly.
    */
    addKey: function (keycode) {

        if (!this._keys[keycode])
        {
            this._keys[keycode] = new Phaser.Key(this.game, keycode);

            this.addKeyCapture(keycode);
        }

        return this._keys[keycode];

    },

    /**
    * Removes a Key object from the Keyboard manager.
    *
    * @method Phaser.Keyboard#removeKey
    * @param {number} keycode - The keycode of the key to remove, i.e. Phaser.Keyboard.UP or Phaser.Keyboard.SPACEBAR
    */
    removeKey: function (keycode) {

        if (this._keys[keycode])
        {
            this._keys[keycode] = null;

            this.removeKeyCapture(keycode);
        }

    },

    /**
    * Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right.
    *
    * @method Phaser.Keyboard#createCursorKeys
    * @return {object} An object containing properties: up, down, left and right. Which can be polled like any other Phaser.Key object.
    */
    createCursorKeys: function () {

        return {
            up: this.addKey(Phaser.Keyboard.UP),
            down: this.addKey(Phaser.Keyboard.DOWN),
            left: this.addKey(Phaser.Keyboard.LEFT),
            right: this.addKey(Phaser.Keyboard.RIGHT)
        };

    },

    /**
    * Starts the Keyboard event listeners running (keydown and keyup). They are attached to the window.
    * This is called automatically by Phaser.Input and should not normally be invoked directly.
    *
    * @method Phaser.Keyboard#start
    */
    start: function () {

        if (this.game.device.cocoonJS)
        {
            return;
        }

        if (this._onKeyDown !== null)
        {
            //  Avoid setting multiple listeners
            return;
        }

        var _this = this;

        this._onKeyDown = function (event) {
            return _this.processKeyDown(event);
        };

        this._onKeyUp = function (event) {
            return _this.processKeyUp(event);
        };

        this._onKeyPress = function (event) {
            return _this.processKeyPress(event);
        };

        window.addEventListener('keydown', this._onKeyDown, false);
        window.addEventListener('keyup', this._onKeyUp, false);
        window.addEventListener('keypress', this._onKeyPress, false);

    },

    /**
    * Stops the Keyboard event listeners from running (keydown, keyup and keypress). They are removed from the window.
    *
    * @method Phaser.Keyboard#stop
    */
    stop: function () {

        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('keyup', this._onKeyUp);
        window.removeEventListener('keypress', this._onKeyPress);

        this._onKeyDown = null;
        this._onKeyUp = null;
        this._onKeyPress = null;

    },

    /**
    * Stops the Keyboard event listeners from running (keydown and keyup). They are removed from the window.
    * Also clears all key captures and currently created Key objects.
    *
    * @method Phaser.Keyboard#destroy
    */
    destroy: function () {

        this.stop();

        this.clearCaptures();

        this._keys.length = 0;
        this._i = 0;

    },

    /**
    * By default when a key is pressed Phaser will not stop the event from propagating up to the browser.
    * There are some keys this can be annoying for, like the arrow keys or space bar, which make the browser window scroll.
    * You can use addKeyCapture to consume the keyboard event for specific keys so it doesn't bubble up to the the browser.
    * Pass in either a single keycode or an array/hash of keycodes.
    *
    * @method Phaser.Keyboard#addKeyCapture
    * @param {number|array|object} keycode - Either a single numeric keycode or an array/hash of keycodes: [65, 67, 68].
    */
    addKeyCapture: function (keycode) {

        if (typeof keycode === 'object')
        {
            for (var key in keycode)
            {
                this._capture[keycode[key]] = true;
            }
        }
        else
        {
            this._capture[keycode] = true;
        }
    },

    /**
    * Removes an existing key capture.
    *
    * @method Phaser.Keyboard#removeKeyCapture
    * @param {number} keycode
    */
    removeKeyCapture: function (keycode) {

        delete this._capture[keycode];

    },

    /**
    * Clear all set key captures.
    *
    * @method Phaser.Keyboard#clearCaptures
    */
    clearCaptures: function () {

        this._capture = {};

    },

    /**
    * Updates all currently defined keys.
    *
    * @method Phaser.Keyboard#update
    */
    update: function () {

        this._i = this._keys.length;

        while (this._i--)
        {
            if (this._keys[this._i])
            {
                this._keys[this._i].update();
            }
        }

    },

    /**
    * Process the keydown event.
    *
    * @method Phaser.Keyboard#processKeyDown
    * @param {KeyboardEvent} event
    * @protected
    */
    processKeyDown: function (event) {

        this.event = event;

        if (!this.game.input.enabled || !this.enabled)
        {
            return;
        }

        //   The event is being captured but another hotkey may need it
        if (this._capture[event.keyCode])
        {
            event.preventDefault();
        }

        if (!this._keys[event.keyCode])
        {
            this._keys[event.keyCode] = new Phaser.Key(this.game, event.keyCode);
        }

        this._keys[event.keyCode].processKeyDown(event);

        this._k = event.keyCode;

        if (this.onDownCallback)
        {
            this.onDownCallback.call(this.callbackContext, event);
        }

    },

    /**
    * Process the keypress event.
    *
    * @method Phaser.Keyboard#processKeyPress
    * @param {KeyboardEvent} event
    * @protected
    */
    processKeyPress: function (event) {

        this.pressEvent = event;

        if (!this.game.input.enabled || !this.enabled)
        {
            return;
        }

        if (this.onPressCallback)
        {
            this.onPressCallback.call(this.callbackContext, String.fromCharCode(event.charCode), event);
        }

    },

    /**
    * Process the keyup event.
    *
    * @method Phaser.Keyboard#processKeyUp
    * @param {KeyboardEvent} event
    * @protected
    */
    processKeyUp: function (event) {

        this.event = event;

        if (!this.game.input.enabled || !this.enabled)
        {
            return;
        }

        if (this._capture[event.keyCode])
        {
            event.preventDefault();
        }

        if (!this._keys[event.keyCode])
        {
            this._keys[event.keyCode] = new Phaser.Key(this.game, event.keyCode);
        }

        this._keys[event.keyCode].processKeyUp(event);

        if (this.onUpCallback)
        {
            this.onUpCallback.call(this.callbackContext, event);
        }

    },

    /**
    * Resets all Keys.
    *
    * @method Phaser.Keyboard#reset
    * @param {boolean} [hard=true] - A soft reset won't reset any events or callbacks that are bound to the Keys. A hard reset will.
    */
    reset: function (hard) {

        if (typeof hard === 'undefined') { hard = true; }

        this.event = null;

        var i = this._keys.length;

        while (i--)
        {
            if (this._keys[i])
            {
                this._keys[i].reset(hard);
            }
        }

    },

    /**
    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
    * or was pressed down longer ago than then given duration.
    * 
    * @method Phaser.Keyboard#downDuration
    * @param {number} keycode - The keycode of the key to check, i.e. Phaser.Keyboard.UP or Phaser.Keyboard.SPACEBAR
    * @param {number} [duration=50] - The duration within which the key is considered as being just pressed. Given in ms.
    * @return {boolean} True if the key was pressed down within the given duration, false if not or null if the Key wasn't found.
    */
    downDuration: function (keycode, duration) {

        if (this._keys[keycode])
        {
            return this._keys[keycode].downDuration(duration);
        }
        else
        {
            return null;
        }

    },

    /**
    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
    * or was pressed down longer ago than then given duration.
    * 
    * @method Phaser.Keyboard#upDuration
    * @param {number} keycode - The keycode of the key to check, i.e. Phaser.Keyboard.UP or Phaser.Keyboard.SPACEBAR
    * @param {number} [duration=50] - The duration within which the key is considered as being just released. Given in ms.
    * @return {boolean} True if the key was released within the given duration, false if not or null if the Key wasn't found.
    */
    upDuration: function (keycode, duration) {

        if (this._keys[keycode])
        {
            return this._keys[keycode].upDuration(duration);
        }
        else
        {
            return null;
        }

    },

    /**
    * Returns true of the key is currently pressed down. Note that it can only detect key presses on the web browser.
    *
    * @method Phaser.Keyboard#isDown
    * @param {number} keycode - The keycode of the key to check, i.e. Phaser.Keyboard.UP or Phaser.Keyboard.SPACEBAR
    * @return {boolean} True if the key is currently down, false if not or null if the Key wasn't found.
    */
    isDown: function (keycode) {

        if (this._keys[keycode])
        {
            return this._keys[keycode].isDown;
        }
        else
        {
            return null;
        }

    }

};

/**
* If disabled all Keyboard input will be ignored.
* @property {boolean} disabled
* @memberof Phaser.Keyboard
* @default false
* @deprecated Use {@link Phaser.Keyboard#enabled} instead
*/
Object.defineProperty(Phaser.Keyboard.prototype, "disabled", {

    get: function () {
        return !this.enabled;
    },
    set: function (value) {
        this.enabled = !value;
    }

});

/**
* Returns the string value of the most recently pressed key.
* @name Phaser.Keyboard#lastChar
* @property {string} lastChar - The string value of the most recently pressed key.
* @readonly
*/
Object.defineProperty(Phaser.Keyboard.prototype, "lastChar", {

    get: function () {

        if (this.event.charCode === 32)
        {
            return '';
        }
        else
        {
            return String.fromCharCode(this.pressEvent.charCode);
        }

    }

});

/**
* Returns the most recently pressed Key. This is a Phaser.Key object and it changes every time a key is pressed.
* @name Phaser.Keyboard#lastKey
* @property {Phaser.Key} lastKey - The most recently pressed Key.
* @readonly
*/
Object.defineProperty(Phaser.Keyboard.prototype, "lastKey", {

    get: function () {

        return this._keys[this._k];

    }

});

Phaser.Keyboard.prototype.constructor = Phaser.Keyboard;

Phaser.Keyboard.A = "A".charCodeAt(0);
Phaser.Keyboard.B = "B".charCodeAt(0);
Phaser.Keyboard.C = "C".charCodeAt(0);
Phaser.Keyboard.D = "D".charCodeAt(0);
Phaser.Keyboard.E = "E".charCodeAt(0);
Phaser.Keyboard.F = "F".charCodeAt(0);
Phaser.Keyboard.G = "G".charCodeAt(0);
Phaser.Keyboard.H = "H".charCodeAt(0);
Phaser.Keyboard.I = "I".charCodeAt(0);
Phaser.Keyboard.J = "J".charCodeAt(0);
Phaser.Keyboard.K = "K".charCodeAt(0);
Phaser.Keyboard.L = "L".charCodeAt(0);
Phaser.Keyboard.M = "M".charCodeAt(0);
Phaser.Keyboard.N = "N".charCodeAt(0);
Phaser.Keyboard.O = "O".charCodeAt(0);
Phaser.Keyboard.P = "P".charCodeAt(0);
Phaser.Keyboard.Q = "Q".charCodeAt(0);
Phaser.Keyboard.R = "R".charCodeAt(0);
Phaser.Keyboard.S = "S".charCodeAt(0);
Phaser.Keyboard.T = "T".charCodeAt(0);
Phaser.Keyboard.U = "U".charCodeAt(0);
Phaser.Keyboard.V = "V".charCodeAt(0);
Phaser.Keyboard.W = "W".charCodeAt(0);
Phaser.Keyboard.X = "X".charCodeAt(0);
Phaser.Keyboard.Y = "Y".charCodeAt(0);
Phaser.Keyboard.Z = "Z".charCodeAt(0);
Phaser.Keyboard.ZERO = "0".charCodeAt(0);
Phaser.Keyboard.ONE = "1".charCodeAt(0);
Phaser.Keyboard.TWO = "2".charCodeAt(0);
Phaser.Keyboard.THREE = "3".charCodeAt(0);
Phaser.Keyboard.FOUR = "4".charCodeAt(0);
Phaser.Keyboard.FIVE = "5".charCodeAt(0);
Phaser.Keyboard.SIX = "6".charCodeAt(0);
Phaser.Keyboard.SEVEN = "7".charCodeAt(0);
Phaser.Keyboard.EIGHT = "8".charCodeAt(0);
Phaser.Keyboard.NINE = "9".charCodeAt(0);
Phaser.Keyboard.NUMPAD_0 = 96;
Phaser.Keyboard.NUMPAD_1 = 97;
Phaser.Keyboard.NUMPAD_2 = 98;
Phaser.Keyboard.NUMPAD_3 = 99;
Phaser.Keyboard.NUMPAD_4 = 100;
Phaser.Keyboard.NUMPAD_5 = 101;
Phaser.Keyboard.NUMPAD_6 = 102;
Phaser.Keyboard.NUMPAD_7 = 103;
Phaser.Keyboard.NUMPAD_8 = 104;
Phaser.Keyboard.NUMPAD_9 = 105;
Phaser.Keyboard.NUMPAD_MULTIPLY = 106;
Phaser.Keyboard.NUMPAD_ADD = 107;
Phaser.Keyboard.NUMPAD_ENTER = 108;
Phaser.Keyboard.NUMPAD_SUBTRACT = 109;
Phaser.Keyboard.NUMPAD_DECIMAL = 110;
Phaser.Keyboard.NUMPAD_DIVIDE = 111;
Phaser.Keyboard.F1 = 112;
Phaser.Keyboard.F2 = 113;
Phaser.Keyboard.F3 = 114;
Phaser.Keyboard.F4 = 115;
Phaser.Keyboard.F5 = 116;
Phaser.Keyboard.F6 = 117;
Phaser.Keyboard.F7 = 118;
Phaser.Keyboard.F8 = 119;
Phaser.Keyboard.F9 = 120;
Phaser.Keyboard.F10 = 121;
Phaser.Keyboard.F11 = 122;
Phaser.Keyboard.F12 = 123;
Phaser.Keyboard.F13 = 124;
Phaser.Keyboard.F14 = 125;
Phaser.Keyboard.F15 = 126;
Phaser.Keyboard.COLON = 186;
Phaser.Keyboard.EQUALS = 187;
Phaser.Keyboard.UNDERSCORE = 189;
Phaser.Keyboard.QUESTION_MARK = 191;
Phaser.Keyboard.TILDE = 192;
Phaser.Keyboard.OPEN_BRACKET = 219;
Phaser.Keyboard.BACKWARD_SLASH = 220;
Phaser.Keyboard.CLOSED_BRACKET = 221;
Phaser.Keyboard.QUOTES = 222;
Phaser.Keyboard.BACKSPACE = 8;
Phaser.Keyboard.TAB = 9;
Phaser.Keyboard.CLEAR = 12;
Phaser.Keyboard.ENTER = 13;
Phaser.Keyboard.SHIFT = 16;
Phaser.Keyboard.CONTROL = 17;
Phaser.Keyboard.ALT = 18;
Phaser.Keyboard.CAPS_LOCK = 20;
Phaser.Keyboard.ESC = 27;
Phaser.Keyboard.SPACEBAR = 32;
Phaser.Keyboard.PAGE_UP = 33;
Phaser.Keyboard.PAGE_DOWN = 34;
Phaser.Keyboard.END = 35;
Phaser.Keyboard.HOME = 36;
Phaser.Keyboard.LEFT = 37;
Phaser.Keyboard.UP = 38;
Phaser.Keyboard.RIGHT = 39;
Phaser.Keyboard.DOWN = 40;
Phaser.Keyboard.INSERT = 45;
Phaser.Keyboard.DELETE = 46;
Phaser.Keyboard.HELP = 47;
Phaser.Keyboard.NUM_LOCK = 144;
Phaser.Keyboard.PLUS = 43;
Phaser.Keyboard.MINUS = 45;
