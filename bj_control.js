		var ShuffledDeck = [];
		// var CurrentCard = 0;
		var Player = new Array(new Array(0, 0, 0, 0, 0, 0, 0),
		  new Array(0, 0, 0, 0, 0, 0, 0),
		  new Array(0, 0, 0, 0, 0, 0, 0),
		  new Array(0, 0, 0, 0, 0, 0, 0));
		//var CompPlayer1 = new Array(6);
		//var CompPlayer2 = new Array(6);
		var CompPlayer = new Array(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
		  new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
		  new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
		  new Array(0, 0, 0, 0, 0, 0, 0, 0, 0));

		const CompPlayerAction = [
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S'],
		  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'S', 'S', 'S', 'S']
		];
		var Dealer = new Array(6);
		var PlayCount = new Array(0, 0, 0, 0);
		var DealCount = 0
		var CompPlayCount = new Array(0, 0, 0, 0);
		var PlayerScore = new Array(3);
		var DealerScore = 0
		var CompPlayerScore = new Array(3);
		var gBank = 200
		var gBet = new Array(5, 5, 0, 0);
		var GameOver = true;
		var StartGame = false;
		var SessionOver = false;
		var numDecks = 1;
		var numCards = 51;
		var SplitHand = 1;
		var ActiveSplit = false;
		var ActiveHands = 1;
		var needToShuffle = true;
		var shufflePoint = 45;
		var DoneShowHole = false;
		var numCompPlayers = 2;
		var dealerUpCard = 0;
		var dealRoundCounter = 0; //to falcilitate showing each card as it's dealt
		var dealRoundDelay = 500;
		var currCompPlayer = 0;
		var HandsNotBusted = 3; //count active hands when no player splits

		$(document).ready(function() {
		  enableDisableControlButtons("load");
		});

		function newGame() {
		  console.log("newGame");
		  enableDisableControlButtons("newGame");
		  numCards = getNumDecks();
			if (numCards === 0) {
				enableDisableControlButtons("load");
				return;
			}
		  startShuffleProcess();
		  GameOver = false;
		  StartGame = true;
		  gBank = 200;
		  gBet = [5, 5, 0, 0];
		  displayBet(gBet[SplitHand]);
		  displayBank(gBank);
		  readoutDisplay("Go Mets Bitches!")
		  clearAllFrames();
		  // don't auto deal on new game so player can change initial bet
		  //deal();
		}

		function getNumDecks() {
		  var numOfCards = 51;
		  do {
		    validResponse = false;
		    deckCount = prompt("How many decks to play with? 1 to 8.", 1);
				if (deckCount === null) {
					//cancel was pressed
					numOfCards = 0;
					return numOfCards;
				}
		    if (deckCount >= 1 && deckCount <= 8) {
		      validResponse = true;
		    }
		  } while (!validResponse);

		  switch (parseInt(deckCount)) {
		    case 1:
		      numOfCards = 51;
		      break;
		    case 2:
		      numOfCards = 103;
		      break;
		    case 3:
		      numOfCards = 155;
		      break;
		    case 4:
		      numOfCards = 207;
		      break;
		    case 5:
		      numOfCards = 259;
		      break;
		    case 6:
		      numOfCards = 311;
		      break;
		    case 7:
		      numOfCards = 363;
		      break;
		    case 8:
		      numOfCards = 415;
		      break;
		    default:
		      numOfCards = 51;
		  }
		  if (deckCount == 1) {
		    shufflePoint = 32;
		  } else {
		    shufflePoint = Math.round(numOfCards * .8);
		  }
			numDecks = parseInt(deckCount);
		  return numOfCards;
		}

		function startShuffleProcess() {
		  CardDeck = array_fill(0, numCards);
		  RandNum = new randomNumberGenerator();
		  ShuffledDeck = shuffle_deck(RandNum, CardDeck, numCards);
		  CurrentCard = 0;
		  needToShuffle = false;
		}

		function deal() {
		  if (!StartGame)
		    return;
		  if (needToShuffle) {
		    alert('Shuffle!');
		    startShuffleProcess();
		  }

		  enableDisableControlButtons("initDeal");

		  SplitHand = 1;
		  ActiveHands = 1;
		  PlayCount[SplitHand] = 1;
		  DealCount = 1;
		  //	Bank = 200
		  //	Bet = 10
		  PlayerScore[1] = 0;
		  PlayerScore[2] = 0;
		  PlayerScore[3] = 0;
		  DealerScore = 0;
		  ActiveSplit = false;
		  readoutDisplay(" ");
		  GameOver = false;
		  CompPlayCount[1] = 1;
		  CompPlayCount[2] = 1;
		  CompPlayerScore[1] = 0;
		  CompPlayerScore[2] = 0;
		  dealerUpCard = 0;
		  HandsNotBusted = 3;
		  //added bet code
		  gBet[SplitHand] = getBet(gBank);
		  if (gBet[SplitHand] == 0) {
		    //invalid bet
		    enableDisableControlButtons("endHand");
		    return;

		  }

		  updateScore("player", PlayerScore[SplitHand]);
		  updateDealerScore("dealer", DealerScore);
		  clearAllFrames();
		  updatePlayerFrameVisibility(1);

		  dealRoundCounter = 1;
		  setTimeout(function() {
		    clearAllFrames(dealRoundInit);
		  }, dealRoundDelay);

		}

		function dealRoundInit() {
		  //dealRoundCounter = 1;
		  $(".cardarea").removeClass("activeHand");
		  switch (dealRoundCounter) {
		    case 1:
		      //comp player 1
		      playerTurn = "comp_player1";
		      break;
		    case 2:
		      //comp player 2
		      playerTurn = "comp_player2";
		      break;
		    case 3:
		      //player
		      playerTurn = "player";
		      break;
		    case 4:
		      //dealer face up
		      playerTurn = "dealer";
		      break;
		    case 5:
		      //comp player 1
		      playerTurn = "comp_player1";
		      break;
		    case 6:
		      //comp player 2
		      playerTurn = "comp_player2";
		      break;
		    case 7:
		      //player
		      playerTurn = "player";
		      break;
		    case 8:
		      //dealer face down
		      playerTurn = "dealer";
		      break;
		    default:
		      playerTurn = "comp_player1";
		      break;

		  }
		  $("." + playerTurn).addClass("activeHand");

		  setTimeout(dealRound, dealRoundDelay);
		}

		function dealRound() {
		  var playerTurn = "";
		  var compPlayer = 0;


		  switch (dealRoundCounter) {
		    case 1:
		      //comp player 1
		      playerTurn = "comp_player1";
		      compPlayer = 1;
		      $("." + playerTurn).addClass("activeHand");
		      dealComputerPlayer(playerTurn, compPlayer);
		      break;
		    case 2:
		      //comp player 2
		      playerTurn = "comp_player2";
		      compPlayer = 2;
		      dealComputerPlayer(playerTurn, compPlayer);
		      break;
		    case 3:
		      //player
		      playerTurn = "player";
		      dealPlayer(playerTurn);
		      break;
		    case 4:
		      //dealer face up
		      playerTurn = "dealer";
		      dealDealer(playerTurn, false);
		      break;
		    case 5:
		      //comp player 1
		      playerTurn = "comp_player1";
		      compPlayer = 1;
		      dealComputerPlayer(playerTurn, compPlayer);
		      break;
		    case 6:
		      //comp player 2
		      playerTurn = "comp_player2";
		      compPlayer = 2;
		      dealComputerPlayer(playerTurn, compPlayer);
		      break;
		    case 7:
		      //player
		      playerTurn = "player";
		      dealPlayer(playerTurn);
		      break;
		    case 8:
		      //dealer face down
		      playerTurn = "dealer";
		      dealDealer(playerTurn, true);
		      break;
		    default:
		      evaluateDealerHand();
		      return;
		      break;

		  }
		  dealRoundCounter++;
		  setTimeout(dealRoundInit, dealRoundDelay);
		}

		function dealComputerPlayer(playerTurn, cp) {
		  CardName = showCard(playerTurn);
		  CompPlayer[cp][CompPlayCount[cp]] = CardName;
		  CompPlayCount[cp]++;
		  CompPlayerScore[cp] = calcScore(CompPlayer[cp], CompPlayCount[cp], playerTurn);
		}

		function dealPlayer(playerTurn) {
		  CardName = showCard("player");
		  Player[SplitHand][PlayCount[SplitHand]] = CardName;
		  PlayCount[SplitHand]++;
		  PlayerScore[SplitHand] = calcScore(Player, PlayCount[SplitHand], "player");
		  updateScore("player", PlayerScore[SplitHand]);
		}

		function dealDealer(playerTurn, isHoleCard) {
		  CardName = showCard("dealer", isHoleCard);
		  Dealer[DealCount] = CardName;
		  DealCount++;
		  if (!isHoleCard) {
		    dealerUpCard = calcScore(Dealer, DealCount, "dealer");
				updateDealerScore("dealer", dealerUpCard);
		  }
		  DealerScore = calcScore(Dealer, DealCount, "dealer");
		}

		function evaluateDealerHand() {

		  if (DealerScore == 21) {
		    setTimeout(function() {
		      clearFrame("dealer", showDealerCardsWithBJInit);
		    }, dealRoundDelay);
		  } else {
		    playComputerPlayersHands();
		  }
		}

		function showDealerCardsWithBJInit() {
		  setTimeout(function() {
		    showDealerCards(evaluateDealerHandBJ);
		  }, dealRoundDelay);

		}

		function showDealerCards(callback) {
		  for (Count = 1; Count < DealCount; Count++) {

		    DisplayCard = "./Images/" + Dealer[Count];
		    ShowCard = '<IMG SRC= "' + DisplayCard + '">';
		    $(".dealer").append(ShowCard);

		  }
		  if (callback && typeof(callback) === "function") {
		    callback();
		  }

		}

		function evaluateDealerHandBJ() {
		  DealerScore = calcScore(Dealer, DealCount, "dealer");
		  readoutDisplay("Dealer Blackjack!");
		  gBank = updateBank("Dealer", gBank, gBet[SplitHand]);
		  GameOver = true;

		  if (gBank <= 0) {
		    readoutDisplay("Dealer Blackjack! You Lose! Try Again.");
		    endGame();
		  } else {
		    endHand();
		  }


		}

		function evaluatePlayerHandBJ() {
		  if (PlayerScore[SplitHand] == 21) {
		    if (HandsNotBusted > 0) {
		      playerStand();
		    } else {
		      readoutDisplay("Player Blackjack!");
		      gBank = updateBank("Player", gBank, (Math.round(gBet[SplitHand] * 1.5)));
		      GameOver = true;
		      endHand();
		    }
		  } else {
		    enableDisableControlButtons("playerInitPlay");

		  }
		}

		function playComputerPlayersHands() {
		  if (numCompPlayers > 0) {
		    currCompPlayer = 1;
		    setTimeout(function() {
		      playCompPlayersHand(currCompPlayer);
		    }, dealRoundDelay);
		  }
		}

		function playCompPlayersHand(compPlayer) {
		  var action;
		  $(".cardarea").removeClass("activeHand");
		  if (compPlayer === 1) {
		    $(".comp_player1").addClass("activeHand");
		  } else if (compPlayer === 2) {
		    $(".comp_player2").addClass("activeHand");
		  }

		  if (compPlayer > numCompPlayers) {
		    $(".player").addClass("activeHand");
		    evaluatePlayerHandBJ();
		    return;
		  }
		  switch (compPlayer) {
		    case 1:
		      playerTurn = "comp_player1";
		      break;
		    case 2:
		      playerTurn = "comp_player2";
		      break;
		    case 3:
		      playerTurn = "comp_player3";
		      break;
		    default:
		      playerTurn = "comp_player1";
		  }


		  action = determineCompAction(dealerUpCard, CompPlayerScore[compPlayer]);
		  if (action == "Hit") {


		    CardName = showCard(playerTurn);
		    CompPlayer[compPlayer][CompPlayCount[compPlayer]] = CardName;


		    CompPlayCount[compPlayer]++;
		    CompPlayerScore[compPlayer] = calcScore(CompPlayer[compPlayer], CompPlayCount[compPlayer], playerTurn);
		    if (CompPlayerScore[compPlayer] <= 21) {
		      setTimeout(function() {
		        playCompPlayersHand(compPlayer);
		      }, dealRoundDelay);
		    } else {
		      currCompPlayer++;
		      HandsNotBusted--;
		      setTimeout(function() {
		        playCompPlayersHand(currCompPlayer);
		      }, dealRoundDelay);
		    }
		  } else {
		    currCompPlayer++;
		    setTimeout(function() {
		      playCompPlayersHand(currCompPlayer);
		    }, dealRoundDelay);
		  }
		}

		function determineCompAction(dealerUpCard, compScore) {

		  var ca = CompPlayerAction[dealerUpCard][compScore];
		  if (ca == "H")
		    return "Hit";
		  else
		    return "Stand";

		}

		function playerHit() {
		  var playerTurn = "player";

		  if (GameOver)
		    return;

		  enableDisableControlButtons("playerHit");

		  switch (SplitHand) {
		    case 1:
		      playerTurn = "player";
		      break;
		    case 2:
		      playerTurn = "player2";
		      break;
		    case 3:
		      playerTurn = "player3";
		      break;
		    default:
		      playerTurn = "player";
		  }

		  CardName = showCard(playerTurn);
		  Player[SplitHand][PlayCount[SplitHand]] = CardName;
		  PlayCount[SplitHand]++;
		  PlayerScore[SplitHand] = calcScore(Player, PlayCount[SplitHand], "player");

		  updateScore("player", PlayerScore[SplitHand]);
		  if (PlayerScore[SplitHand] > 21) {
		    if (!ActiveSplit) {
		      //enableDisableControlButtons("endHand");
		      HandsNotBusted--;
		      if (HandsNotBusted > 0) {
		        setTimeout(playerStand, dealRoundDelay);
		      } else {
		        //endHand();
		        clearFrame("dealer");
		        showDealerCards();
		        readoutDisplay("Player Busts!");
		        gBank = updateBank("Dealer", gBank, gBet[SplitHand]);
		        GameOver = true;
		        if (gBank <= 0) {
		          readoutDisplay("Player Busts! You Lose! Try Again.");
		          endGame();
		        } else {
		          endHand();
		        }

		      }
		    } else {
		      SplitHand++;
		      ActiveHands--;
		      if (ActiveHands < 1) {
		        endSplitHand();
		      } else {
		        playerHit();
		        highlightActiveSplitHand();
		        enableDisableControlButtons("playerInitPlay");
		      }
		    }
		  }
		}

		function playerStand() {
		  if (GameOver) {
		    return;
		  }

		  enableDisableControlButtons("playerStand");
		  if (!ActiveSplit) {
		    GameOver = true;
		    DealerScore = calcScore(Dealer, DealCount, "dealer");
		    updateDealerScore("dealer", DealerScore);

		    setTimeout(function() {
		      clearFrame("dealer", showDealerCards, playDealerHandInit);
		    }, dealRoundDelay);

		  } else {
		    SplitHand++;
		    ActiveHands--;
		    if (ActiveHands < 1) {
		      endSplitHand();
		    } else {
		      if (singleCardHit()) {
		        takeOneCard();
		      } else {
		        playerHit();
		        highlightActiveSplitHand();
		        enableDisableControlButtons("playerInitPlay");

		      }
		    }
		  }
		}

		function playDealerHandInit() {
		  $(".cardarea").removeClass("activeHand");
		  $(".dealer").addClass("activeHand");
		  setTimeout(playDealerHand, dealRoundDelay);
		}

		function playDealerHand() {
		  if (DealerScore < 17) {
		    CardName = showCard("dealer");
		    Dealer[DealCount] = CardName;
		    DealCount++;
		    DealerScore = calcScore(Dealer, DealCount, "dealer");
		    updateDealerScore("dealer", DealerScore);
		    setTimeout(playDealerHandInit, dealRoundDelay);
		  } else {
		    if (!ActiveSplit) {
		      evaluateGame();

		    } else {
		      if (ActiveHands < 1) {
		        setTimeout(evaluateSplitHands, dealRoundDelay);
		      }
		    }
		  }
		}

		function evaluateGame() {
		  if (PlayerScore[SplitHand] > 21) {
		    readoutDisplay("Player Busts!");
		    gBank = updateBank("Dealer", gBank, gBet[SplitHand]);
		  } else if (PlayerScore[SplitHand] === 21 && PlayCount[SplitHand] === 3) {
		    readoutDisplay("Player Blackjack!");
		    gBank = updateBank("Player", gBank, (Math.round(gBet[SplitHand] * 1.5)));
		  } else if (DealerScore > 21) {
		    readoutDisplay("Dealer Busts!");
		    gBank = updateBank("Player", gBank, gBet[SplitHand]);
		  } else if (DealerScore > PlayerScore[SplitHand]) {
		    readoutDisplay("Dealer Wins!");
		    gBank = updateBank("Dealer", gBank, gBet[SplitHand]);
		  } else if (DealerScore < PlayerScore[SplitHand]) {
		    readoutDisplay("Player Wins!");
		    gBank = updateBank("Player", gBank, gBet[SplitHand]);
		  } else if (DealerScore == PlayerScore[SplitHand]) {
		    readoutDisplay("Push!");
		    gBank = updateBank("Tie", gBank, gBet[SplitHand]);
		  }
		  if (gBank <= 0) {
		    readoutDisplay("Dealer Wins! You Lose! Try Again.");
		    endGame();
		  } else {
		    endHand();
		  }

		}

		function array_fill(StartVal, StopVal) {
		  RetArray = new Array(StopVal - StartVal);
		  for (Count = StartVal; Count <= StopVal; Count++) {
		    RetArray[Count] = Count;
		  }
		  return RetArray;
		}

		function shuffle_deck(RandNum, CardDeck, numOfCards) {
		  Finish = numOfCards;
		  Start = 0;
		  Count = Finish - Start + 1;
		  for (i = 0; i <= Finish; i++) {
		    val = RandNum.next() + "";
		    rand = val.substring(4, 6);
		    j = rand % Count + Start;
		    t = CardDeck[i];
		    CardDeck[i] = CardDeck[j];
		    CardDeck[j] = t;
		  }
		  //TESTING: create valid split deck
		  // CardDeck[2] = CardDeck[6];

		  return CardDeck;
		}

		function card_face(val) {
		  valx = val % 13;
		  if (valx == 0) Face = "A";
		  if (valx == 1) Face = "2";
		  if (valx == 2) Face = "3";
		  if (valx == 3) Face = "4";
		  if (valx == 4) Face = "5";
		  if (valx == 5) Face = "6";
		  if (valx == 6) Face = "7";
		  if (valx == 7) Face = "8";
		  if (valx == 8) Face = "9";
		  if (valx == 9) Face = "10";
		  if (valx == 10) Face = "J";
		  if (valx == 11) Face = "Q";
		  if (valx == 12) Face = "K";
		  Suit = card_suit(val);
		  return Face + Suit
		}

		function card_suit(val) {
		  Suit = "";
			console.log(val);

		  valx = (val/numDecks) / 13 + "";
			console.log(valx);
		  valx = valx.substring(0, 1);
			console.log(valx);
		  if (valx == 0) Suit = "S";
		  if (valx == 1) Suit = "C";
		  if (valx == 2) Suit = "H";
		  if (valx == 3) Suit = "D";
		  return Suit;
		}

		function calcScore(DealtCards, NumCards, Turn) {
		  Score = 0;
		  for (Count = 1; Count < NumCards; Count++) {
		    if (Turn == "player")
		      CardValue = DealtCards[SplitHand][Count].substring(0, 1);
		    else
		      CardValue = DealtCards[Count].substring(0, 1);

		    if (CardValue != "A") {
		      if (CardValue == "1") Score += 10;
		      if (CardValue == "2") Score += 2;
		      if (CardValue == "3") Score += 3;
		      if (CardValue == "4") Score += 4;
		      if (CardValue == "5") Score += 5;
		      if (CardValue == "6") Score += 6;
		      if (CardValue == "7") Score += 7;
		      if (CardValue == "8") Score += 8;
		      if (CardValue == "9") Score += 9;
		      if (CardValue == "J") Score += 10;
		      if (CardValue == "Q") Score += 10;
		      if (CardValue == "K") Score += 10;
		    }
		  }
		  for (Count = 1; Count < NumCards; Count++) {
		    Aces = 0
		    if (Turn == "player")
		      CardValue = DealtCards[SplitHand][Count].substring(0, 1);
		    else
		      CardValue = DealtCards[Count].substring(0, 1);

		    if (CardValue == "A") {
		      Aces++;
		      if (Score > 10)
		        Score += 1;
		      else
		        Score += 11;
		    }
		  }
		  return Score;
		}

		function showCard(Turn, isHoleCard = false) {

		  DisplayCard = card_face(ShuffledDeck[CurrentCard]);
		  CardName = DisplayCard.toUpperCase() + ".JPG";
		  CurrentCard++;
		  if (CurrentCard >= shufflePoint) {
		    needToShuffle = true;
		  }

		  if (isHoleCard) {
		    DisplayCard = "./Images/" + "CARDBACK.JPG";
		  } else {
		    DisplayCard = "./Images/" + CardName;
		  }
		  ShowCard = '<IMG SRC= "' + DisplayCard + '">';
		  $("." + Turn).append(ShowCard);
		  return CardName;
		}

		function updateScore(ScoreBox, Score) {
		  $("input[name='playerscore']").val(Score);
		}

		function updateDealerScore(ScoreBox, Score) {
		  $("input[name='dealerscore']").val(Score);
		}

		function displayBank(Bank) {
		  $("input[name='Bank']").val(Bank);
		}

		function displayBet(Bet) {
		  $("input[name='Bet']").val(Bet);
		}

		function readoutDisplay(Text) {
		  $(".readout h1").text(Text);
		}

		function nextRandomNumber() {
		  var Hi = this.seed / this.Q;
		  var Lo = this.seed % this.Q;
		  var Test = this.A * Lo - this.R * Hi;
		  if (Test > 0)
		    this.seed = Test;
		  else
		    this.seed = Test + this.M;
		  return (this.seed * this.oneOverM);
		}

		function randomNumberGenerator() {
		  var D = new Date();
		  this.seed = 2345678901 +
		    (D.getSeconds() * 0xFFFFFF) +
		    (D.getMinutes() * 0xFFFF);
		  this.A = 48271;
		  this.M = 2147483647;
		  this.Q = this.M / this.A;
		  this.R = this.M % this.A;
		  this.oneOverM = 1.0 / this.M;
		  this.next = nextRandomNumber;
		}

		function getBet(Bank) {
		  var iBet = 0;

		  iBet = gBet[0];

		  if (iBet < 1 || iBet > Bank) {
		    alert('Idiot, Bet between 1 and Bankroll.');
		    iBet = 0;
		  }

		  displayBet(iBet);

		  return iBet
		}

		function updateBank(winner, Bank, Bet) {
		  switch (winner) {
		    case "Player":
		      Bank = eval(Bank) + eval(Bet);
		      break;
		    case "Dealer":
		      Bank = Bank - Bet;
		      break;
		    default:
		      //tie - no action
		      break;
		  }

		  displayBank(Bank);
		  if (Bank < 1)
		    SessionOver = true;
		  return Bank

		}

		function changeBetValue() {
		  // if (SplitHand != 1)
		  //   return;
			var newBet;
			// gBet[SplitHand] = prompt("Input your bet.", 1);
			newBet = prompt("Input your bet.", gBet[SplitHand]);
			if (newBet !== null) {
				gBet[SplitHand] = newBet;
				displayBet(gBet[SplitHand]);
				/* use gBet0 for splits is case of double down */
				gBet[0] = gBet[SplitHand];

			}
		}

		function playerDoubleDown() {
		  var doubleYes = doubleBet(gBet[SplitHand], gBank);
		  if (doubleYes) {
		    takeOneCard();
		  }
		}

		function doubleBet(dBet, dBank) {

		  var dblBet = dBet * 2;
		  oneCard = true;

		  // you can only double on first two cards
		  if (PlayCount[SplitHand] != 3) {
		    alert("You can only double down on the first two cards. Idiot!");
		    oneCard = false;
		    return oneCard;
		  }

		  //double for less?
		  if (dblBet > dBank) {
		    do {
		      validResponse = false;
		      doubleLess = prompt("You don't have enough money to double down. Double for less? Y/N ", "Y");
		      if (doubleLess == "Y" || doubleLess == "y" || doubleLess == "N" || doubleLess == "n") {
		        validResponse = true;
		      }
		    } while (!validResponse);

		    if (doubleLess == "Y" || doubleLess == "y") {
		      dblBet = dBank;
		    } else {
		      dblBet = dBet;
		      oneCard = false;
		    }
		  }

		  gBet[SplitHand] = dblBet;
		  //displayBet(dblBet);
		  return oneCard
		}

		function takeOneCard() {
		  var currSplitHand = SplitHand;
		  playerHit();

		  //if player busts the stand will be taken care of in playerHit
		  if (PlayerScore[currSplitHand] <= 21) {
		    setTimeout(playerStand, dealRoundDelay);
		    //playerStand();
		  }
		}

		function playerSplit() {
		  var validSplit = false;
		  var value = " ";
		  validSplit = isSplitValid(Player);
		  if (!validSplit) {
		    return;
		  }

		  ActiveSplit = true;
		  ActiveHands++;

		  /* remove card value and picture from current array*/
		  /*put card value and picture in split array , SplitHand +1
		  /*recalculate score */
		  makeTwoHands();

		  // if splitting aces only allow 1 card per split hand
		  if (singleCardHit()) {
		    takeOneCard();
		  } else {
		    /*deal current array a card */
		    playerHit();
		    /*highlight active hand */
		    highlightActiveSplitHand();
		    enableDisableControlButtons("playerInitPlay");

		  }


		  /*when done playing current hand, SplitHand + 1 gets dealt card
		  /*recalculate score, play hand*/
		}

		function isSplitValid(SplitCards) {
		  var splitValid = false;
		  var card1 = 0;
		  var card2 = 0;
		  var playCntNbr = 0;

		  /*can only split 2x for a total of three hands*/
		  if (ActiveHands >= 3) {
		    splitValid = false;
		    alert('You can only split 2x for a total of 3 hands.');
		    return splitValid;
		  } else {
		    splitValid = true;
		  }
		  /*can only split with first two cards in deal */
		  if (PlayCount[SplitHand] > 3) {
		    splitValid = false;
		    alert('You can only split on first 2 cards of hand.');
		    return splitValid;
		  } else {
		    splitValid = true;
		  }
		  /*must have enough money to split*/
		  if (gBank / 2 < gBet[SplitHand]) {
		    splitValid = false;
		    alert('You do not have enough money to split.');
		  }
		  /*check of values are equal */
		  playCntNbr = PlayCount[SplitHand];
		  card1 = SplitCards[SplitHand][playCntNbr - 1].substring(0, 1);
		  card2 = SplitCards[SplitHand][playCntNbr - 2].substring(0, 1);

		  if (card1 == card2)
		    splitValid = true;
		  else {
		    /*		splitValid = false;*/
		    splitValid = false;
		    alert('Cards must be equal value to split');
		  }
		  return splitValid;
		}

		function makeTwoHands() {
		  var splitCard = "init";
		  var boolSkipFrame = false;
		  var currFrame = "";
		  var nextFrame = "";

		  boolSkipFrame = false;


		  switch (SplitHand) {
		    case 1:
		      currFrame = "player";
		      if (ActiveHands > 2) { //frame 2 already has split had dealt/ this is from split of 1st hand again
		        nextFrame = "player3";
		        boolSkipFrame = true;
		        updatePlayerFrameVisibility(3);
		      } else {
		        nextFrame = "player2";
		        updatePlayerFrameVisibility(2);
		      }
		      break;
		    case 2:
		      currFrame = "player2";
		      nextFrame = "player3";
		      updatePlayerFrameVisibility(3);
		      break;
		    case 3:
		      currFrame = "player3";
		      updatePlayerFrameVisibility(3);
		      break;
		    default:
		      currFrame = "player";
		      nextFrame = "player2";
		      updatePlayerFrameVisibility(2);
		  }


		  clearFrame(currFrame);
		  /* get 2nd card from current hand and move to 1st card of next hand*/
		  splitCard = Player[SplitHand][2];
		  if (boolSkipFrame)
		    Player[eval(SplitHand + 2)][1] = splitCard;
		  else
		    Player[eval(SplitHand + 1)][1] = splitCard;


		  Player[SplitHand][2] = " ";
		  /* recalculate scores, show score of active hand*/
		  /* current hand now has one less card and split hand has 1 card*/
		  PlayCount[SplitHand] = PlayCount[SplitHand] - 1;
		  if (boolSkipFrame) {
		    Player[eval(SplitHand + 2)][1] = splitCard;
		    PlayCount[eval(SplitHand + 2)] = 2;
		  } else {
		    Player[eval(SplitHand + 1)][1] = splitCard;
		    PlayCount[eval(SplitHand + 1)] = 2;
		  }

		  PlayerScore[SplitHand] = calcScore(Player, PlayCount[SplitHand], "player");
		  if (boolSkipFrame)
		    PlayerScore[eval(SplitHand + 2)] = calcScore(Player, PlayCount[eval(SplitHand + 2)], "player");
		  else
		    PlayerScore[eval(SplitHand + 1)] = calcScore(Player, PlayCount[eval(SplitHand + 1)], "player");

		  updateScore("player", PlayerScore[SplitHand]);
		  /* display cards for both hands */
		  showCardSplit(currFrame, SplitHand, 1);
		  if (boolSkipFrame)
		    showCardSplit(nextFrame, eval(SplitHand + 2), 1);
		  else
		    showCardSplit(nextFrame, eval(SplitHand + 1), 1);

		  /* add bet to split hand */
		  if (boolSkipFrame)
		    gBet[eval(SplitHand + 2)] = gBet[0];
		  else
		    gBet[eval(SplitHand + 1)] = gBet[0];
		}

		function showCardSplit(SplitFrame, SpHand, CardNum) {

		  CardName = Player[SpHand][CardNum];
		  DisplayCard = "./Images/" + CardName;
		  ShowCard = '<IMG SRC= "' + DisplayCard + '">';
		  $("." + SplitFrame).append(ShowCard);

		}

		function highlightActiveSplitHand() {
		  $(".cardarea").removeClass("activeHand");
		  switch (SplitHand) {
		    case 1:
		      /*frame player active */
		      $(".player").addClass("activeHand");
		      break;
		    case 2:
		      /*frame player2 active */
		      $(".player2").addClass("activeHand");
		      break;
		    case 3:
		      /*frame player3 active */
		      $(".player3").addClass("activeHand");
		      break;
		    default:
		      /*frame player active */
		      $(".player").addClass("activeHand");
		  }
		}

		function endSplitHand() {

		  GameOver = true;

		  DealerScore = calcScore(Dealer, DealCount, "dealer");

		  setTimeout(function() {
		    clearFrame("dealer", showDealerCards, playDealerHandInit);
		  }, dealRoundDelay);
		}

		function evaluateSplitHands() {
		  /* evaluate all hands and adjust bank accordingly */
		  var splitReadout = "Split- ";

		  console.log(SplitHand);

		  for (SplitCount = 1; SplitCount < SplitHand; SplitCount++) {
		    if (PlayerScore[SplitCount] === 21 && PlayCount[SplitCount] === 3) {
		      splitReadout = splitReadout + " Hand " + SplitCount + ": Player Blackjack! ";
		      gBank = updateBank("Dealer", gBank, (Math.round(gBet[SplitCount] * 1.5)));
		      continue;
		    }
		    if (PlayerScore[SplitCount] > 21) {
		      splitReadout = splitReadout + " Hand " + SplitCount + ": Player Busts! ";
		      gBank = updateBank("Dealer", gBank, gBet[SplitCount]);
		      continue;
		    }
		    if (DealerScore > 21) {
		      splitReadout = splitReadout + " Hand " + SplitCount + ": Dealer Busts! ";
		      gBank = updateBank("Player", gBank, gBet[SplitCount]);
		      continue;
		    }
		    if (DealerScore > PlayerScore[SplitCount]) {
		      splitReadout = splitReadout + " Hand " + SplitCount + ": Dealer Wins! ";
		      gBank = updateBank("Dealer", gBank, gBet[SplitCount]);
		      continue;
		    }
		    if (DealerScore < PlayerScore[SplitCount]) {
		      splitReadout = splitReadout + " Hand " + SplitCount + ": Player Wins! ";
		      gBank = updateBank("Player", gBank, gBet[SplitCount]);
		      continue;
		    }
		    if (DealerScore == PlayerScore[SplitCount]) {
		      splitReadout = splitReadout + " Hand " + SplitCount + ": Push! ";
		      gBank = updateBank("Tie", gBank, gBet[SplitCount]);
		      continue;
		    }
		  }

		  if (gBank <= 0) {
		    splitReadout += " You Lose! Try Again."
		    endGame();
		  } else {
		    endHand();
		  }

		  readoutDisplay(splitReadout);
		}

		function clearAllFrames(callback) {
		  $(".player img").remove();
		  $(".player2 img").remove();
		  $(".player3 img").remove();
		  $(".comp_player1 img").remove();
		  $(".comp_player2 img").remove();
		  $(".dealer img").remove();
		  if (callback && typeof(callback) === "function") {
		    callback();
		  }
		}

		function clearFrame(whichFrame, callback) {
		  $("." + whichFrame + " img").remove();
		  if (callback && typeof(callback) === "function") {
		    if (arguments[2] !== "undefined") {
		      callback(arguments[2])
		    } else {
		      callback();
		    }
		  }
		}

		function writeDealerFrame(whichCard) {
		  clearFrame("dealer");
		  for (Count = 1; Count <= whichCard; Count++) {
		    ShowCard = '<IMG SRC="./Images/"' + Dealer[Count] + '">';
		    $(".dealer").append(ShowCard);

		  }
		}

		function endHand() {
		  $(".cardarea").removeClass("activeHand");
		  enableDisableControlButtons("endHand");
		}

		function endGame() {
		  $(".cardarea").removeClass("activeHand");
		  enableDisableControlButtons("load");
		}

		function enableDisableControlButtons(process) {
		  switch (process) {
		    case "load":
		      $("input[name='Deal']").prop('disabled', true);
		      $("input[name='Hit']").prop('disabled', true);
		      $("input[name='Stand']").prop('disabled', true);
		      $("input[name='DoubleDown']").prop('disabled', true);
		      $("input[name='Split']").prop('disabled', true);
		      $("input[name='NewGame']").prop('disabled', false);
		      $("input[name='ChangeBet']").prop('disabled', true);
		      break;
		    case "newGame":
		      $("input[name='Deal']").prop('disabled', false);
		      $("input[name='Hit']").prop('disabled', true);
		      $("input[name='Stand']").prop('disabled', true);
		      $("input[name='DoubleDown']").prop('disabled', true);
		      $("input[name='Split']").prop('disabled', true);
		      $("input[name='NewGame']").prop('disabled', true);
		      $("input[name='ChangeBet']").prop('disabled', false);
		      break;
		    case "initDeal":
		      $("input[name='Deal']").prop('disabled', true);
		      $("input[name='Hit']").prop('disabled', true);
		      $("input[name='Stand']").prop('disabled', true);
		      $("input[name='DoubleDown']").prop('disabled', true);
		      $("input[name='Split']").prop('disabled', true);
		      $("input[name='NewGame']").prop('disabled', true);
		      $("input[name='ChangeBet']").prop('disabled', true);
		      break;
		    case "playerInitPlay":
		      $("input[name='Deal']").prop('disabled', true);
		      $("input[name='Hit']").prop('disabled', false);
		      $("input[name='Stand']").prop('disabled', false);
		      $("input[name='DoubleDown']").prop('disabled', false);
		      $("input[name='Split']").prop('disabled', false);
		      $("input[name='NewGame']").prop('disabled', true);
		      $("input[name='ChangeBet']").prop('disabled', true);
		      break;
		    case "playerHit":
		      $("input[name='Deal']").prop('disabled', true);
		      $("input[name='Hit']").prop('disabled', false);
		      $("input[name='Stand']").prop('disabled', false);
		      $("input[name='DoubleDown']").prop('disabled', true);
		      $("input[name='Split']").prop('disabled', true);
		      $("input[name='NewGame']").prop('disabled', true);
		      $("input[name='ChangeBet']").prop('disabled', true);
		      break;
		    case "playerStand":
		      $("input[name='Deal']").prop('disabled', true);
		      $("input[name='Hit']").prop('disabled', true);
		      $("input[name='Stand']").prop('disabled', true);
		      $("input[name='DoubleDown']").prop('disabled', true);
		      $("input[name='Split']").prop('disabled', true);
		      $("input[name='NewGame']").prop('disabled', true);
		      $("input[name='ChangeBet']").prop('disabled', true);
		      break;
		    case "endHand":
		      $("input[name='Deal']").prop('disabled', false);
		      $("input[name='Hit']").prop('disabled', true);
		      $("input[name='Stand']").prop('disabled', true);
		      $("input[name='DoubleDown']").prop('disabled', true);
		      $("input[name='Split']").prop('disabled', true);
		      $("input[name='NewGame']").prop('disabled', false);
		      $("input[name='ChangeBet']").prop('disabled', false);
		      break;
		    default:
		      $("input[name='Deal']").prop('disabled', false);
		      $("input[name='Hit']").prop('disabled', false);
		      $("input[name='Stand']").prop('disabled', false);
		      $("input[name='DoubleDown']").prop('disabled', false);
		      $("input[name='Split']").prop('disabled', false);
		      $("input[name='NewGame']").prop('disabled', false);
		      $("input[name='ChangeBet']").prop('disabled', false);
		      break;

		  }

		}

		function updatePlayerFrameVisibility(option) {
		  switch (option) {
		    case 1:
		      $(".player").addClass("block");
		      $(".player2").addClass("block");
		      $(".player3").addClass("block");
		      $(".player2").addClass("hidden");
		      $(".player3").addClass("hidden");
		      $(".player").removeClass("inline-half");
		      $(".player2").removeClass("inline-half");
		      $(".player3").removeClass("inline-half");
		      $(".player").removeClass("inline-third");
		      $(".player2").removeClass("inline-third");
		      $(".player3").removeClass("inline-third");
		      break;
		    case 2:
		      $(".player").removeClass("block");
		      $(".player2").removeClass("block");
		      $(".player2").removeClass("hidden");
		      $(".player").addClass("inline-half");
		      $(".player2").addClass("inline-half");
		      break;
		    case 3:
		      $(".player").removeClass("block");
		      $(".player2").removeClass("block");
		      $(".player3").removeClass("block");
		      $(".player2").removeClass("hidden");
		      $(".player3").removeClass("hidden");
		      $(".player").removeClass("inline-half");
		      $(".player2").removeClass("inline-half");
		      $(".player3").removeClass("inline-half");
		      $(".player").addClass("inline-third");
		      $(".player2").addClass("inline-third");
		      $(".player3").addClass("inline-third");
		      break;
		    default:
		      break;
		  }
		}

		function singleCardHit() {
		  var value = "";
		  value = Player[SplitHand][1].substring(0, 1);
		  if (value === "A") {
		    return true;
		  } else {
		    return false;
		  }
		}
		function getFuncName() {
		  return getFuncName.caller.name
		}


		function showPlayerScore() {
			if ($("input[name='showPS']").prop("checked")) {
				$("input[name='playerscore']").removeClass("hidden-text")
			} else {
				$("input[name='playerscore']").addClass("hidden-text")
			}
		}
		function showDealerScore() {
			if ($("input[name='showDS']").prop("checked")) {
				$("input[name='dealerscore']").removeClass("hidden-text")
			} else {
				$("input[name='dealerscore']").addClass("hidden-text")
			}
		}
