function getEmails() {
  var label = GmailApp.getUserLabelByName("*GIVE LABEL NAME*");
  var threads = label.getThreads();
  (if you want whole gmail inbox list, use:
  var threads = GmailApp.getInboxThreads() )

  var sheetId = '*SHEETID*'
  var sheetName = 'SHEETNAME'
  var ws = SpreadsheetApp.openById(sheetId)
  var ss = ws.getSheetByName(sheetName)
  
  if(ss.getLastRow()<=1){
    var lastMsg = 0
  }
  else{
    var lastMsg = ss.getRange("A"+ss.getLastRow()).getValue()
  }


  for (var i=0; i<threads.length; i++){
    var messages = threads [i].getMessages()
    var msgCount = threads [i].getMessageCount()

    if(threads[i].getLastMessageDate()<=lastMsg)
      return
    else{
      for (var j=0; j <messages.length; j++){
      message = messages[j]
      if(message.getDate()<=lastMsg)
        exit()
      else{
        extractDetails(message, msgCount)
      }        
    }
    }
  }
    
  function extractDetails(message, msgCount){
    var msgText = message.getPlainBody()
    var msgDate = message.getDate()
    var msgSubject = message.getSubject()
    var msgSender = message.getFrom()
    ss.appendRow([msgDate, msgSubject, msgSender, msgText])
  }
  
ss.sort(1)

}
