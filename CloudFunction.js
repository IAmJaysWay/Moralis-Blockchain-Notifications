Moralis.Cloud.beforeSave("NewDonations", async (request) =>{

    const confirmed = request.object.get("confirmed");
    const amount = request.object.get("amount");
    const from = request.object.get("from");
    let msg = `New donation of ${amount} MATIC, from ${from}!`;
    
    if(confirmed){
      
        let dataEmail = {
            app_id: 123, //From OneSignal
            contents: {"en": "Notification"},
            included_segments: [], //Array of OneSignal Segements you wish to send sms to
            name: "Email",
            email_body: msg,
            email_subject: "New Donation Received"
        }
        
        let data = {
           app_id: 123,//From OneSignal
           contents: {"en": msg},
           included_segments: [], //Array of OneSignal Segements you wish to send sms to
           name: "SMS",
           sms_from: 123//Your from SMS set up in Twilio
        }
    
        Moralis.Cloud.httpRequest({
              method: "POST",
              url: "https://onesignal.com/api/v1/notifications",
              body: data,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' //Add Rest API Key from OneSignal
              }
            })
            
        Moralis.Cloud.httpRequest({
              method: "POST",
              url: "https://onesignal.com/api/v1/notifications",
              body: dataEmail,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' // Add Rest API Key from OneSignal
              }
            })
      
    }
      
})