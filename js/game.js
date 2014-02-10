window.App = {}
App.Models = {}
App.current = {}
$(document).ready(function(){
  $("#start-game").click(function(){
    $('.landing').hide()
    $(".num-of-players").show()
  })

  $("#submit-num-players").click(function(){
    $(".num-of-players").hide()
    var numPlayers = parseInt($("#num-players option:selected").val())
    App.current.game = new App.Models.Game({numPlayers: numPlayers})
  })
})

App.Models.Game = Backbone.Model.extend({
  initialize: function(gameData){
    this.numPlayers = gameData.numPlayers
    this.numSpies = this.getNumSpies()
    this.numResistance = this.numPlayers - this.numSpies
    this.resistanceScore = 0
    this.spyScore = 0
    this.rejectionCount = 0
  },

  resetRejection: function() {
    this.rejectionCount = 0
  },

  addRejection: function() {
    this.rejectionCount += 1
  },

  getNumSpies: function(){
    var numSpies
    switch(this.numPlayers)
    {
    case 5:
      numSpies = 2
      break
    case 6:
      numSpies = 2
      break
    case 7:
      numSpies = 3
      break
    case 8:
      numSpies = 3
      break
    case 9:
      numSpies = 3
      break
    case 10:
      numSpies = 4
      break
    }
    return numSpies
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
  initialize: function() {
  },

  approved: function() {
    App.Models.Game.resetRejection()
  },

  denied: function() {
    App.Models.Game.addRejection()
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
