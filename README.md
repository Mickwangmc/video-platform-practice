[![Netlify Status](https://api.netlify.com/api/v1/badges/098eeaca-6634-45a5-a49c-26bb62547988/deploy-status)](https://app.netlify.com/sites/video-platform-practice/deploys)

# Video Platform Practice
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage
Clone this repo and use `npm run start` to run this project.
Or visit [Online Demo](https://video-platform-practice.netlify.app/), which is deployed on Netlify.

## Features
### Responsive Design 
- Compatible with common devices (phone, tablet, desktop).
- Proper navbar position for different device types.

### Get Videos
- Get videos through `YouTube Videos API`, show popular videos in Taiwan by default.
- Sending request implemented with `axios` .


### Collect Favorites
- Collect favorites in `browser local storage` .
- Sending request triggered by `Waypoint` .

### Play Video
- Implements video player with `Video.js` .
- Show video info retrieved in video list.
- Play a list by default.
- Show advertisement when the video been paused.
- Keypress events.