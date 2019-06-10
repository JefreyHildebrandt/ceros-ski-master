export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const STYLE_FLIP_INCREMENT = 10;
export const STYLE_CRASH_DECREMENT = 25;
export const STYLE_FLIP_FINISH_BONUS = 50;
export const DISTANCE_DIVIDE = 6;
export const DISTANCE_UP_MOTION = 1;

export const DISTANCE_CANVAS = {
    X : 10,
    Y : 20,
    BEFORE_SCORE : 'Distance: ',
    AFTER_SCORE : 'm',
    FONT_STYLE : '15px Arial'
}
export const STYLE_CANVAS = {
    X : 10,
    Y : 40,
    BEFORE_SCORE : 'Style Points: ',
    AFTER_SCORE : '',
    FONT_STYLE : '15px Arial'
}

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_DESTROYED = 'treeDestroyed';
export const TREE_CLUSTER = 'treeCluster';
export const TREE_CLUSTER_DESTROYED = 'treeClusterDestroyed';
export const ROCK1 = 'rock1';
export const ROCK1_DESTROYED = 'rock1Destroyed';
export const ROCK2 = 'rock2';
export const ROCK2_DESTROYED = 'rock2Destroyed';
export const JUMP_RAMP = 'ramp';
export const JUMP_RAMP_DESTROYED = 'rampDestroyed';
export const SKIER_JUMP1 = 'skierJump1';
export const SKIER_JUMP2 = 'skierJump2';
export const SKIER_JUMP3 = 'skierJump3';
export const SKIER_JUMP4 = 'skierJump4';
export const SKIER_JUMP5 = 'skierJump5';
export const SKIER_EATEN = 'skierEaten';
export const RHINO_DEFAULT = 'rhinoDefault';
export const RHINO_LIFT = 'rhinoLift';
export const RHINO_LIFT_EAT1 = 'rhinoLiftEat1';
export const RHINO_LIFT_EAT2 = 'rhinoLiftEat2';
export const RHINO_LIFT_EAT3 = 'rhinoLiftEat3';
export const RHINO_LIFT_EAT4 = 'rhinoLiftEat4';
export const RHINO_LIFT_MOUTH_OPEN = 'rhinoLiftMouthOpen';
export const RHINO_RUN_LEFT = 'rhinoRunLeft';
export const RHINO_RUN_LEFT2 = 'rhinoRunLeft2';
export const RHINO_RUN_RIGHT = 'rhinoRunRight';
export const RHINO_RUN_RIGHT2 = 'rhinoRunRight2';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_RAMP_JUMP_SPEED = 20;

export const SKIER_JUMP_FRAMES = 30;
export const SKIER_JUMP_RAMP_FRAMES = 100;

export const RHINO_STARTING_DISTANCE = -1500;
export const RHINO_WAIT_DISTANCE_TO_MOVE = 1000;
export const RHINO_SPEED = 13;
export const RHINO_FRAMES_TO_REDRAW = 10;

export const ASSETS = {
    [SKIER_CRASH] : 'img/skier_crash.png',
    [SKIER_JUMP1] : 'img/skier_jump_1.png',
    [SKIER_JUMP2] : 'img/skier_jump_2.png',
    [SKIER_JUMP3] : 'img/skier_jump_3.png',
    [SKIER_JUMP4] : 'img/skier_jump_4.png',
    [SKIER_JUMP5] : 'img/skier_jump_5.png',
    [SKIER_LEFT] : 'img/skier_left.png',
    [SKIER_LEFTDOWN] : 'img/skier_left_down.png',
    [SKIER_DOWN] : 'img/skier_down.png',
    [SKIER_RIGHTDOWN] : 'img/skier_right_down.png',
    [SKIER_RIGHT] : 'img/skier_right.png',
    [SKIER_EATEN] : 'img/skier_eaten.png',
    [TREE] : 'img/tree_1.png',
    [TREE_DESTROYED] : 'img/tree_1_destroyed.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [TREE_CLUSTER_DESTROYED] : 'img/tree_cluster_destroyed.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK1_DESTROYED] : 'img/rock_1_destroyed.png',
    [ROCK2] : 'img/rock_2.png',
    [ROCK2_DESTROYED] : 'img/rock_2_destroyed.png',
    [JUMP_RAMP] : 'img/jump_ramp.png',
    [JUMP_RAMP_DESTROYED] : 'img/jump_ramp_destroyed.png',
    [RHINO_DEFAULT] : 'img/rhino_default.png',
    [RHINO_LIFT] : 'img/rhino_lift.png',
    [RHINO_LIFT_EAT1] : 'img/rhino_lift_eat_1.png',
    [RHINO_LIFT_EAT2]: 'img/rhino_lift_eat_2.png',
    [RHINO_LIFT_EAT3] : 'img/rhino_lift_eat_3.png',
    [RHINO_LIFT_EAT4] : 'img/rhino_lift_eat_4.png',
    [RHINO_LIFT_MOUTH_OPEN] : 'img/rhino_lift_mouth_open.png',
    [RHINO_RUN_LEFT] : 'img/rhino_run_left.png',
    [RHINO_RUN_LEFT2] : 'img/rhino_run_left_2.png',
    [RHINO_RUN_RIGHT] : 'img/rhino_run_right.png',
    [RHINO_RUN_RIGHT2] : 'img/rhino_run_right_2.png'
};

export const DESTROY_OBSTACLE = {
    [TREE] : TREE_DESTROYED,
    [TREE_DESTROYED] : TREE_DESTROYED,
    [TREE_CLUSTER] : TREE_CLUSTER_DESTROYED,
    [TREE_CLUSTER_DESTROYED] : TREE_CLUSTER_DESTROYED,
    [ROCK1] : ROCK1_DESTROYED,
    [ROCK1_DESTROYED] : ROCK1_DESTROYED,
    [ROCK2] : ROCK2_DESTROYED,
    [ROCK2_DESTROYED] : ROCK2_DESTROYED,
    [JUMP_RAMP] : JUMP_RAMP_DESTROYED,
    [JUMP_RAMP_DESTROYED] : JUMP_RAMP_DESTROYED
}

export const SKIER_DIRECTIONS = {
    LEFT : 0,
    LEFT_DOWN : 1,
    DOWN : 2,
    RIGHT_DOWN : 3,
    RIGHT : 4
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const SKIER_JUMPING = {
    JUMP1 : 0,
    JUMP2 : 1,
    JUMP3 : 2,
    JUMP4 : 3,
    JUMP5 : 4
}

export const SKIER_JUMPING_ASSET = {
    [SKIER_JUMPING.JUMP1] : SKIER_JUMP1,
    [SKIER_JUMPING.JUMP2] : SKIER_JUMP2,
    [SKIER_JUMPING.JUMP3] : SKIER_JUMP3,
    [SKIER_JUMPING.JUMP4] : SKIER_JUMP4,
    [SKIER_JUMPING.JUMP5] : SKIER_JUMP5
}

export const SKIER_STATE = {
    CRASHED : 0,
    SKIING : 1,
    JUMPING : 2,
    EATEN : 3
}

export const RHINO_MOTION_TOGGLE = {
    MOTION1 : 0,
    MOTION2 : 1
}

//Used to toggle between the two motions, where it doesn't really matter which is shown
export const RHINO_RUN_UP_OR_DOWN_OR_LEFTMOTION_ASSET = {
    [RHINO_MOTION_TOGGLE.MOTION1] : RHINO_RUN_LEFT,
    [RHINO_MOTION_TOGGLE.MOTION2] : RHINO_RUN_LEFT2
}

//Used to toggle between the two motions, where it doesn't really matter which is shown
export const RHINO_RUN_RIGHT_MOTION_ASSET = {
    [RHINO_MOTION_TOGGLE.MOTION1] : RHINO_RUN_RIGHT,
    [RHINO_MOTION_TOGGLE.MOTION2] : RHINO_RUN_RIGHT2
}

export const RHINO_EAT = {
    LIFT : 0,
    LIFT_MOUTH_OPEN : 1,
    EAT1 : 2,
    EAT2 : 3,
    EAT3 : 4,
    EAT4 : 5,
    DEFAULT : 6
}

export const RHINO_EAT_ASSET = {
    [RHINO_EAT.LIFT] : RHINO_LIFT,
    [RHINO_EAT.LIFT_MOUTH_OPEN] : RHINO_LIFT_MOUTH_OPEN,
    [RHINO_EAT.EAT1] : RHINO_LIFT_EAT1,
    [RHINO_EAT.EAT2] : RHINO_LIFT_EAT2,
    [RHINO_EAT.EAT3] : RHINO_LIFT_EAT3,
    [RHINO_EAT.EAT4] : RHINO_LIFT_EAT4,
    [RHINO_EAT.DEFAULT] : RHINO_DEFAULT
}

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    SPACE : 32,
    R : 82
};