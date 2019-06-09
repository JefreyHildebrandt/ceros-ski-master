# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!

*********************************************************************************

**Jeff Hildebrandt Edits**

**Crash Bug**
* for this bug after the skier crashed the skier's direction would be set to the enum SKIER_CRASH
* the SKIER_CRASH enum equals 0, and SKIER_LEFT equals 1
* when the skier crashes and tries to move left the skier's direction becomes -1 which sets the skier's direction 
* state was added to the skier which represents whether the skier is crashed, skiing, or jumping, and has custom actions for motion depending on the state.
* added a unit test that tests the skier's state and direction after a crash 

**Added**
* If you press 'r' the game will reset
* jump ability
  * if you press 'space' the skier will jump
  * while the skier is in the jump state it will be able to jump over rocks and ramps for 30 frames
  * the skier will still crash on trees
* trick jump ability 
  * when you press 'space' again the skier will begin to do a trick 
  * if you hit 'space' five times then the skier will complete the trick 
  * if you are in the middle of a trick when the skier tries to land, then the skier will crash 
  * while you are doing a trick in the air, you will gain style points 
  * if you hold the skier_jump_5 pose, then you'll gain extra points since that pose has a bunch of sparkles
* jump ramps 
  * when the skier collides with a jump ramp then they will stay in the air at double speed for 100 frames
  * the skier remains in the jump state for the entire jump 
  * the skier will still collide with trees even if jumping from a ramp 
  * doing a jump ramp is the only way to outrun the rhino
    * the rhino runs 30% faster than the skier and runs directly towards it 
    * the ramp jump makes the skier travel twice as fast, so if you can hit a lot of jumps then the rhino won't catch you.
* Distance score and Style score is displayed
  * Distance score takes the vertical distance that the skier has traveled and shows it to the user (both up and down motion).
  * Style score adds points if the skier is doing a trick and subtracts points if the skier is crashes
* Rhino
  * chases down and eats the skier 
  * doesn't move until the skier hits a distance of 1000
  * starts -1000 pixels from the skier's start line
  * runs 30% faster than the skier, so will catch up if the skier does not take lots of ramp jumps or if the skier crashes
  * destroys obstacles if touches them.  I added a 'destroyed' asset for each obstacle and if the rhino touches a non-destroyed obstacle it will switch it's asset name
  * eats the skier when a collision is detected
  * once the skier is eaten, the skier's asset is replaced with a pool of blood
  * animation updates every 10 frames, otherwise it looks very choppy
  * checks where the skier is and moves toward it.  If the skier is direcly below it will move down, if the skier is down left then it will move down left, etc... 

**Coding Decisions:**
* Adding state to the skier in addition to the direction 
  * I added state since ultimately relying solely on direction is what caused the bug I fixed
  * State allowed me to treat motion differently depending on the state the skier is currently in
    * for instance when jumping I did not want the user to be able to change the trajectory
* Creating MovingEntity that skier and rhino extend
  * I noticed that the skier and rhino share much of the same functionality
    * Both the rhino and skier need to move around on the screen
    * the rhino moves based on the skier position and the skier moves based on the user input
* Creating MovingEntityManager
  * in addition to the rhino and skier having similar needs, they also control similarly
    * for instance both the skier and the rhino need to know when they collide with an Obstacle 
      * the rhino will destroy the obstacle and the skier will crash 
    * both need to know when they collide into eachother
    * both have a need for a move() function every frame 
  * Adding this manager took some of the responsibility off of Game.ts and allowed all MovingEntities to be controlled by this manager 
  * This also followed the pattern presented by ObstacleManager and AssetManager
  * Allows easier unit testing without having to create/mock a Game object
* Skier can outrun the rhino
  * I liked the idea that the skier if performing perfectly could outrun the rhino
  * Since the game is so simplistic, the game would have to be challenging in order to be fun 
* Keep track of distance and style
  * if there wasn't some sort of point system, then there would be no goal for the game and there would be no point in playing it 
  * I made the penalty for crashes high to add more difficulty and replayability to the game
  * You get -25 points per frame for a crash, additionally you get +10 points per frame for a trick and an aditional +50 points if you're in the style trick position.

**Running the Code:**
* locally
  1. npm install
  1. npm run dev 

*********************************************************************************************************
