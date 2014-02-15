$(document).ready(function(){
  App.Models.Game = Backbone.Model.extend({
    initialize: function(gameData){
      this.numPlayers = gameData.numPlayers
      this.numSpies = this.getNumSpies()
      this.numResistance = this.numPlayers - this.numSpies
      this.resistanceScore = 0
      this.spyScore = 0
      this.rejectionCount = 0
      this.missionCount = 0
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
    },

    startRound: function(){
      this.missionCount++
      $(".mission-vote").show()
      this.currentMission = new App.Models.Mission({missionNum: this.missionCount})
      var currentLeader = App.current.players.currentLeader
      debugger
      $(".rejection-count").text(this.rejectionCount)
      $(".mission-number").text(this.missionCount)
      $(".mission-players-num").text(this.currentMission.numMembers)
      $(".fails-required").text(this.currentMission.failsRequired)
      $(".mission-leader").text(currentLeader.name)
    },

    continueRound: function() {
      var currentLeader = App.current.players.incrementLeader()
      this.rejectionCount++
      $(".rejection-count").text(this.rejectionCount)
      $(".mission-number").text(this.missionCount)
      $(".mission-leader").text(currentLeader.name)
    }
  })

  App.Models.Mission = Backbone.Model.extend({
    initialize: function(missionData){
      this.missionNum = missionData.missionNum
      this.failsRequired = this.failsRequired()
      this.numMembers = window.missionNumbers[App.current.game.numPlayers][this.missionNum]
    },

    failsRequired: function() {
      var failsRequired
      if(App.current.game.numPlayers === (5 || 6)) {
        failsRequired = 1
      }
      else if(missionNum === 4) {
        failsRequired = 2
      }
      return failsRequired
    }
  })

  App.Models.Player = Backbone.Model.extend({
    initialize: function(data) {
      this.name = data.name
      this.id = data.id
      this.identity = "resistance"
    },

    displayIdentity: function() {
      $(".find-out .name").text(this.name)
      $("p.identity").text("You are a " + this.identity)
      $(".find-out").show()
      $(".reveal-identity").show()

      $(".reveal-identity").click(function(){
        $(this).hide()
        $("p.identity").show()
      })
    }
  })

  App.Collections.Players = Backbone.Collection.extend({
    model: App.Models.Player,

    createSpies: function(numSpies) {
      var players = _.shuffle(this.models)
      var i = 0
      _.times(numSpies, function(){
        players[i].identity = "spy"
        i++
      })
      this.displayOrder = 1
    },

    displayIdentities: function(){
      if(this.displayOrder === this.models.length + 1) {
        debugger
        $(".find-out").hide()
        App.current.game.startRound()
        this.currentLeader = this.get(1)
      }
      else {
        this.get(this.displayOrder).displayIdentity()
        this.displayOrder++
      }
    },
    incrementLeader: function(){
      if(this.currentLeader.id === this.models.length){
        this.currentLeader = this.get(1)
      }
      else {
        this.currentLeader = this.get(this.currentLeader.id + 1)
      }
      return this.currentLeader
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

})
