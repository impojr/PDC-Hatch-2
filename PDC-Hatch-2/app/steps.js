import {user} from"user-profile";
import * as userActivity from"user-activity";

function getDailyGoal(){
  return userActivity.goals.steps || 10000;
}

export function getDailySteps(){
  return userActivity.today.adjusted.steps || 0;
}

export function getGoalPercentageMet(){
  var t = getDailySteps()/getDailyGoal();
  return t>1&&(t=1),t
}

export function getDailyGoalWidth(){
  return 236 * getGoalPercentageMet()
}

export function getDailyPercent(){
  var t = getGoalPercentageMet();
  return Math.floor(100*t)
}