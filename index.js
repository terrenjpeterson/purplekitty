/**
 * This is the piano player skill for Amazon Alexa
 */

var Alexa = require('alexa-sdk');

// utility methods for creating Image and TextField objects
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage     = Alexa.utils.ImageUtils.makeImage;

// valid states in the skill
var states = {
    STARTMODE: '_STARTMODE'
};

// These are messages that Alexa says to the user during conversation

// This is the intial welcome message
const welcomeMessage = "Hello. This is Purple Kitty. Your personal pet on the Alexa. " +
    "To get started, say something like 'Dance' or 'Throw kitty the ball'.";

// This is the message that is repeated if the response to the initial welcome message is not heard
const repeatWelcomeMessage = "You are currently using the purple kitty skill. Kitty is waiting for you to " +
    "do something. Say 'Play with kitty' or 'Feed the kitty' to begin.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
const promptToStartMessage = "Say something like, Feed, Play, Dance, or Throw Ball to get started.";

// this is the help message during the setup at the beginning of the skill
const helpMessage = "This skill gives you the ability to play with a virtual cat inside your Alexa. " +
    "Kitty likes to interact with you. Say things like 'Throw kitty the ball', 'Dance kitty', " +
    "'Feed the kitty', or 'Play with kitty'.";

// This is the message indicating that a non-screen Alexa is attempting to use the skill
const noVideoMessage = "Sorry, this skill requires a video player. For example, an Echo Show " +
    "or Echo Spot.";

// This is the goodbye message when the user has asked to quit the game
const goodbyeMessage = "Ok, see you next time!";

// Tis is the unhandled message when the skill is invoked, but unclear of 
const unhandledMessage = "I'm sorry, I didn't understand your request. Would you like me to " +
   "teach you a song? If so, please say something like, List Songs, to get started.";

// These are the backgrounds used to display on the screen including the initial launch
const kittyBackground = 'https://s3.amazonaws.com/purplekitty/images/background.png';

// These are the folders where the mp3 & mp4 files are located
const videoLoc = 'https://s3.amazonaws.com/purplekitty/';

// titles played on the video player
const skillTitle = "Purple Kitty";
const skillDesc = "Your Friendly Cat";

// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.2b1c1e58-ff39-4c86-a948-470939d2b4ab';
    alexa.registerHandlers(newSessionHandler, startLessonHandlers);
    alexa.execute();
};

// set state to start up
var newSessionHandler = {
    'LaunchRequest': function () {
        console.log("Native Launch Request");
        // move next utterance to use start mode
        this.handler.state = states.STARTMODE;
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            this.response.speak(welcomeMessage).listen(repeatWelcomeMessage).renderTemplate(template);
            console.log("this was requested by an Echo Show");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    'AMAZON.HelpIntent': function () {
        // move next utterance to use start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', helpMessage, helpMessage);
    },
    // this plays the dance video
    'Dance': function() {
        // move next utterance to use start mode
        this.handler.state = states.STARTMODE;
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            this.response.renderTemplate(template);
            console.log("this was requested by an Echo Show");

            const videoClip = videoLoc + "Dance.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    // this plays the dance video
    'Feed': function() {
        // move next utterance to use start mode
        this.handler.state = states.STARTMODE;
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Feed.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    // this plays the dance video
    'ThrowBall': function() {
        // move next utterance to use start mode
        this.handler.state = states.STARTMODE;
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Ball.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    // this plays the basic cat video
    'Play': function() {
        // move next utterance to use start mode
        this.handler.state = states.STARTMODE;
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Kitty.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    // this makes the kitty sing
    'Sing': function() {
        // move next utterance to use start mode
        this.handler.state = states.STARTMODE;
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Sing.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    'Unhandled': function () {
        console.log("Unhandled event");
        console.log(JSON.stringify(this.event));
        this.emit(':ask', unhandledMessage, unhandledMessage);
    }
};

// --------------- Functions that control the skill's behavior -----------------------

// Called at the start of the game, picks and asks first question for the user
var startLessonHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function () {
         this.emit(':ask', promptToStartMessage, promptToStartMessage);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', helpMessage, helpMessage);
    },
    'Welcome': function() {
	console.log("Playing Welcome Function from Start Handler");
	this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'SessionEndedRequest': function() {
	console.log("Session ended");
	this.emit(':tell', goodbyeMessage);
    },
    // this plays the dance video
    'Dance': function() {
        // Display.RenderTemplate directives can be added to the response
	console.log("Dance routine requested");
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Dance.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
	    this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    // this plays the dance video
    'Feed': function() {
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Feed.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    // this plays the dance video
    'ThrowBall': function() {
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Ball.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    // this plays the basic cat video
    'Play': function() {
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Kitty.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    // this makes the kitty sing     
    'Sing': function() {
        // move next utterance to use start mode
        this.handler.state = states.STARTMODE;
        // Display.RenderTemplate directives can be added to the response
        const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        const imageLoc = kittyBackground;
        const template = builder.setTitle(skillDesc)
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText(skillTitle))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            console.log("this was requested by an Echo Show");
            const videoClip = videoLoc + "Sing.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
            this.emit(':responseReady');
        } else {
            this.attributes['EchoShow'] = false;
            this.emit(':tell', noVideoMessage);
        }
    },
    'Unhandled': function () {
    	console.log("Unhandled event");
        console.log(JSON.stringify(this.event));
        this.emit(':ask', unhandledMessage, unhandledMessage);
    }
});
