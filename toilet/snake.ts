function start() {
    return { color: "#3d00a6" }
  }
  
  let up = 'up';
  let down = 'down';
  let left = 'left';
  let right = 'right';
  let max = 9;
  let min = 0;
  let turningPoint = {
    x : max - 1,
    y : max
  };
  
  function getHead (you) {
    return you.body[0];
  }
  
  function getCurrentDirection (state) {
    if (state.turn === 1) { return right }
    let body = state.you.body;
    let deltaX = body[0].x - body[1].x;
    let deltaY = body[0].y - body[1].y;
    if (deltaX === 0) {
      return ~deltaY ? down : up;
    }
    return ~deltaX ? right : left;
  }
  
  
  //Toilet-snake
  //This snake travels to the edges of the board and spirals inwards until it kills itself.
  function move(state) {
    console.log(state);
    let head = getHead(state.you);
    let currentDirection = getCurrentDirection(state);
    
    if (head.x === turningPoint.x && head.y === turningPoint.y) {
      turningPoint.x--;
      turningPoint.y--;
      max--;
      min++;
      return { move : up };
    }
    
    if ((currentDirection === left && head.x !== min) ||
      (currentDirection === right && head.x !== max) ||
      (currentDirection === up && head.y !== min) || 
      (currentDirection === down && head.y !== max)) {
      return { move : currentDirection };
    }
  
    if (head.x === max) {
      if (head.y === min) {
        return { move : left };
      }
      return { move : up };
    }
    
    if (head.x === min) {
      if (head.y === max) {
        return { move : right };
      }
      return { move : down };
    }
    
    return { move : right };
  }