### Project contains both client and server in separate directories

- Client: `cd client`

  - Run: `yarn install`
  - Run: `yarn start`

- Server: `cd server`
  - Run: `yarn install`
  - Run: `yarn dev`

### Known Issues

1. Currently facing issues running test, issue is with the jest version that is installed, its conflicting with the required requirements for React version.
2. When you scroll on the videoList, more data is loaded but the bug now is that the player itself get reloaded, that was a feature I added to help with changing the video that being played but then after adding the Lazy loading the bug started. Could be solved by improving how the video content is being changed when playing another video
