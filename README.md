Testing branches out

# SoundBites
Enter the last song you listened to and discover a spot that suits you.
[Live on the interwebs here](https://sound-bites.herokuapp.com)
## Meta
**Author** Ian Civgin<br />
**Email** imciv2@gmail.com<br />
**Site** https://sound-bites.herokuapp.com<br />
## Purpose
To help sometimes indecicive people (like myself) find a good place to hangout (eat, drink, mingle, etc.). We might not know what type of food we want for dinner, but we probably chose the last song we listened to based on our mood. So why not use that information?
## How it works
It's rather simple. SoundBites runs your song through an algorithm that converts it to food keywords. Then it searches for a great place to eat. 
## What does SoundBites use?
1. Node.js
2. Express
3. Body-Parser
4. Bcrypt
5. Express-Session
6. Bootstrap
7. jQuery
8. Handlebars
9. Leaflet/Mapbox
10. Mongo/Mongoose
11. Heroku/MongoLab

## Installing SoundBites
The following assumes you have Node, Express, and Mongo installed on your system.
* First clone this repo `https://github.com/icivgin/sound-bites`
* Navigate to the parent directory
* Run `npm install` to install dependent modules
* Start a mongo server `mongod` and run `node server.js`
* You're good to go!