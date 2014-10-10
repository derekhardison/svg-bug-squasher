SVG Bug Squasher
============

A fun bug squashing game built with SVG

## Game Background
The inspiration for this game comes from a game called [Fly Swatter](http://www.majman.net/flyswatter/). The game we want to make will have a similar UI in that clicking on bugs will kill them and earn you points.

## Gameplay Requirements
- Bugs will appear on the left side of the playing screen in random locations, and make their way to the right side of the playing screen. During their journey, they should also move up and down the screen.
- There should be a running score that increases as bugs are squashed.
- Clicking on a bug should kill it and give the user points.
- If a bug reaches the right side of the playing screen without getting squashed, the player loses
- There should be three different types of bugs:
  - Each bug should have its own SVG graphics
  - There should be an easy, medium, and hard bug. For example, the easy bug could be large and slow, while the hard bug
  - is small, fast, and have unpredictable movement. 
  - Harder bugs should be worth more points.
- The game should get harder the longer you play
- The game should keep track of the top 10 scores.


## Other Requirements for Project Completion
- The player should see a welcome screen that displays game instructions and the high scores.
- A player should be able to start a new game from the welcome screen.
- When a player loses, they should see a "Game Over" message along with their final score.
- At the end of a game, if the player has a top 10 score, ask them to enter their name and save it to the high score board.
- At the end of a game, the player should return to the welcome screen

## Guidelines
- Graphics for bugs need to be in SVG.
- You are free to use whatever client-side libraries you want.
- The server-side code should be written in Node.js. You can use any 3rd party modules you want.
- The top 10 scores can be stored in memory. No database persistence necessary.
- Make it easy to play. Try to make it look good too, but we understand you have limited time.

## Submission
- Create a fork of this repo
- Commit and push your code to your forked repo as many times as you want
- Make sure that the app can be run from the command line using 'node app.js'. 
- Submit a pull request to the master branch when you're done. Congrats!
