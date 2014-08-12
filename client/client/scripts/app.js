// YOUR CODE HERE:
var app = function() {

  var init = function() {
    fetch();
    setInterval(function() {
      fetch();
      cleaner();
    }, 50000);
  }

  var cleaner = function() {
    var n = $('.tbody').children();
    if(n.length > 50) {
      // console.log("nooo!");
      for(var i = 0; i < 48; i++) {
        // console.log($('tr').filter(":last"));
        $('tr').filter(":last").remove();
      }
    }
  }

  var fetch = function() {
    $.ajax({
      url: 'http://127.0.0.1:3000/classes/messages',
      dataType: 'json',
      success: displayMessage
    });
  }

  var Message = function(data) {
    this.username = data.username;
    this.text = data.text;
    this.room = data.roomname;
  }

  Message.prototype.printHTML = function() {
    var string = "<tr><td>" + this.username + "</td><td>@ " + this.room + "</td><td>" + this.text + "</td></tr>";
    return string;
  }

  var filter = function(data) {
  //return checker.test(data);
  return /\<|\>|\(.*\)|\=|TEST/.test(data) || (data === "") || (data === undefined);
}

var send = function() {
  var message = {};
  message.text = $('#text').val();
  var usr = window.location.search;
  message.username = usr.substring(10, usr.length);
  message.roomname = $('#room').val();
  $.ajax({
    // always use this url
    url: 'http://127.0.0.1:3000/1/classes/send',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
}

var bubbleData;

var prepMessage = function(data) {
  var messages = data.results, msg;
  console.log(messages);
  var clean = [];
  for(var i = 0; i < messages.length; i++) {
    msg = new Message(messages[i]);
    if(!filter(msg.text) && !filter(msg.username)) {
        //$(".tbody").prepend(msg.printHTML());
        clean.push(msg);
      }
    };
    return clean;
  };
  var filterMessages = function(id) {
    var collection = [];
    bubbleData.forEach(function(element) {
      if(element.room === id) {
        collection.push(element.printHTML());
      }
    })
    var htmlString = '<table>'+collection.join('')+'</table>'
    return htmlString;
  }

  var displayMessage = function(data) {
    bubbleData = prepMessage(data);
    var htmlString;
    window.display();
    $('.room').mouseenter(function(){
      var id = $(this).attr('id');
      htmlString = filterMessages(id)
      $('.room').avgrund({
        template: htmlString
      });
    })
    return;
    // makeBubbles(clean);
  }

  var getTemplate = function(){
    console.log('called');
  }

  var getBubbleData = function(callback){
    return bubbleData;
  }

  return {
    init : init,
    send : send,
    fetch : fetch,
    getBubbleData : getBubbleData,
    message : Message,
  };
}();

$(document).on('ready', function(){
  d3.select('svg')
  $('#send').on('click', function(event){
    event.preventDefault();
    app.send()
    $();
  });

  $('svg').on('click', function(event){
    event.preventDefault();
  });

  $('.room').avgrund();

})
