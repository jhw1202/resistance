window.App = {}
App.Models = {}
$(document).ready(function(){
  $("#start-game").click(function(){

  })
})

var Game = Backbone.Model.extend({
  initialize: function(gameData){
    this.numPlayers = gameData.numPlayers
    this.numSpies = this.getNumSpies()
    this.numResistance = this.numPlayers - this.numSpies
    this.resistanceScore = 0
    this.spyScore = 0
  },

  getNumSpies: function(){
    switch(this.numPlayers)
    {
    case 5:
      this.numSpies = 2
      break
    case 6:
      this.numSpies = 2
      break
    case 7:
      this.numSpies = 3
      break
    case 8:
      this.numSpies = 3
      break
    case 9:
      this.numSpies = 3
      break
    case 10:
      this.numSpies = 4
      break
    }
  }
})

var Mission = Backbone.Model.extend({
  initialize: function(missionData){
    this.missionNum = missionData.missionNum
    this.numPlayers = App.Models.Game.numPlayers
    this.failsRequired = this.failsRequired()
  },

  failsRequired: function() {
    var failsRequired
    numPlayers = this.numPlayers
    missionNum = this.missionNum
    missionDataAsString = this.dataTostring()
    if(this.numPlayers === 5 || this.numPlayers === 6) {
      failsRequired = 1
    }
    else if(missionNum === 4) {
      if(numPlayers >= 7) {
        failsRequired = 2
      }
    }
    else {
      failsRequired = 1
    }
    return failsRequired
  }
})

var Round = Backbone.Model.extend({
  initialize: function(roundData) {
    this.members = roundData.members
  }
})

// Player:
//   -team

// Game:
//   -resistanceScore
//   -spyScore
//   -rejectionCount(in a row)
//   -currentLeader
//   -#of resistance
//   -# of spies


// Mission
//   -# of players
//   -status
//   -# of fails required

// Round Vote

// Mission Vote
