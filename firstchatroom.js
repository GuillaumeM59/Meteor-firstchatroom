Messages = new Mongo.Collection('messages');





if (Meteor.isClient) {

  Template.messages.helpers({
    messages: function () {
      return Messages.find();
    }
  });

  Template.messages.events({
    'keypress textarea': function(e, instance) {
        if (e.keyCode== 13) {
          e.preventDefault();
          var value = instance.find('textarea').value;
          instance.find('textarea').value = '';

          Messages.insert({
            message:value,
            timestamp: new Date(),
            user: Meteor.userId()
          });
        }
    }
  });

  Template.message.helpers({
      user:function() {
        return Meteor.users.findOne({_id: this.user});
      },

      time: function() {
        moment.locale('fr');
        return moment(this.timestamp).format('DD-MM-YYYY HH:mm');
      }

  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
