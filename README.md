# Purple Kitty Alexa Skill

This is a video skill for the Alexa platform. It provides the ability to interact with a digital pet through mp4 files embedded in an Alexa skill.

For a live demo of this skill, check out the entry on the [DevPost Alexa Kids Challenge](https://devpost.com/software/purple-kitty).

![](media/logo-108x108.png)

**Table of Contents**

- [How does this work?](#skill-overview)
- [What happens if someone with a normal echo tries it?](#non-echo-engagement)

## Skill Overview

The skill works by mapping intents provided by a user to identify different short video clips that are then sent back to the Alexa device.

## Non Echo Enagagement

If someone that doesn't have an Echo tries to use the skill, it responds back with a nice message indicating that the skill won't work.
This is based on a check that is done from the request. Here is an example.

```sh
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
```
