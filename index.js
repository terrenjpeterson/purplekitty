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
const welcomeMessage = "Welcome to the piano teacher skill, your personal instructor. " +
    "To get started, say 'List Lessons', 'List Songs', or 'Play musical note guessing game'.";

// This is the message that is repeated if the response to the initial welcome message is not heard
const repeatWelcomeMessage = "You are currently using the piano teacher skill. This skill is designed " +
    "to teach beginner lessons on the piano. Say something like, Teach me how to play " +
    "Mary Had a Little Lamb, to get started, or ask for help.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
const promptToStartMessage = "Say something like, List Songs or List Lessons, to get started.";

// this is the help message during the setup at the beginning of the game
const helpMessage = "This skill has the ability to provide beginner lessons for the piano. " +
    "To begin, say, List Lessons, and I will go through some helpful lessons to get started. " +
    "One of those lessons is to teach how to play the scale. Just say 'Play the Scale', and " +
    "I will go through the individual notes on a scale. " +
    "As you are beginning to learn musical notes, see how well you can recognize them " +
    "by saying 'Play musical note guessing game' and see how many notes in a row you can recognize. " +
    "There are also many different songs that I can teach. Say, 'List Songs' " +
    "for a complete list, then ask me to teach you one, and I will provide the notes to go along.";

// these are messages when a song requested was invalid
const noSongMessage = "Sorry, I didn't hear a song name. Which song do you want to learn?";
const noSongRepeatMessage = "Would you like me to teach you a song? If so, please provide me " +
    "the song name. For example, say something like, Teach me how to play Twinkle Twinkle Little Star.";

// these are messages when a guess is made for a game, but no game is in progress
const noGameMessage = "Sorry, no game is currently in-progress. If you would like to begin the music " +
    "note game, just say, 'Play musical note guessing game.'";
const noGameReminderMessage = "Are you interested in playing the music guessing game? If so, " +
    "just say, 'Play musical note guessing game' and I will play the first note.";

// this is the message after the chord lesson is taught
const repromptChordMessage = "Would you like to learn another lesson? If so, " +
    "please say something like, List Lessons, and I will read out what is " +
    "currently available.";

// This is the message indicating that a non-screen Alexa is attempting to use the skill
const noVideoMessage = "Sorry, this skill requires a video player. For example, an Echo Show " +
    "or Echo Spot.";

// This is the goodbye message when the user has asked to quit the game
const goodbyeMessage = "Ok, see you next time!";

// Tis is the unhandled message when the skill is invoked, but unclear of 
const unhandledMessage = "I'm sorry, I didn't understand your request. Would you like me to " +
   "teach you a song? If so, please say something like, List Songs, to get started.";

// These are the backgrounds used to display on the screen including the initial launch
const musicBackground = 'https://s3.amazonaws.com/pianoplayerskill/logos/pianoKeyboard.jpg';
const pianoStrings = 'https://s3.amazonaws.com/pianoplayerskill/logos/pianoStrings.jpg';

// These are the folders where the mp3 & mp4 files are located
const audioLoc = 'https://s3.amazonaws.com/pianoplayerskill/audio/';
const videoLoc = 'https://s3.amazonaws.com/pianoplayerskill/media/';
const musicNoteFolder = "\"https://s3.amazonaws.com/pianoplayerskill/musicNotes/";
const chordExample = 'https://s3.amazonaws.com/pianoplayerskill/musicChords/CMajorChord.mp3';

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
        const imageLoc = musicBackground;
        const template = builder.setTitle('Your Personal Instructor')
                                                        .setBackgroundImage(makeImage(imageLoc))
                                                        .setTextContent(makePlainText('Piano Teacher'))
                                                        .build();

        if (this.event.context.System.device.supportedInterfaces.Display) {
            this.response.speak(welcomeMessage).listen(repeatWelcomeMessage).renderTemplate(template);
            console.log("this was requested by an Echo Show");
            this.attributes['EchoShow'] = true;
            this.emit(':responseReady');

            const videoClip = "https://s3.amazonaws.com/purplekitty/Kitty.mp4";
            const metadata = {
                'title': 'Purple Kitty'
            };
            this.response.playVideo(videoClip, metadata);
            console.log("Invoked from video playing device");
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
	this.emit('PlayScale');
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
    'Unhandled': function () {
    	console.log("Unhandled event");
        console.log(JSON.stringify(this.event));
        this.emit(':ask', unhandledMessage, unhandledMessage);
    }
});
