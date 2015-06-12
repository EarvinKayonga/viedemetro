(function() {
  'use strict';
  angular.module('starter').factory('DatabaseService', function() {

    var Database = (function() {

      // CONSTRUCTOR

      function Database() {

        Parse.initialize("pWm8epqgF2aiTmPqM0qeGm1aPHF73wW5jCe1LXfC", "6ZkBvTc8jvqts6UVHIAPSFgYL8qtrugUCcF2A00f");
        Database.prototype.db = [];
      }


      // ABSTRACT

      Database.prototype.update = function(callback) {
        var anecdote = Parse.Object.extend("anecdote");
        var Anecdote = new Parse.Query(anecdote);
        Anecdote.descending("createdAt");
        Anecdote.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              Database.prototype.db[i] = results[i];
              Database.prototype.db[i].date = {};
              Database.prototype.db[i].date = Database.prototype.db[i].createdAt.toString().split(/\s+/);
            }
            callback(Database.prototype.db);
          },
          error: function(error) {

          }
        });
      }
      Database.prototype.top = function(callback) {
        var top = [];
        var trelo = Parse.Object.extend("anecdote");
        var toto = new Parse.Query(trelo);
        toto.descending("point");
        toto.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              top[i] = results[i];
              top[i].date = {};
              top[i].date = top[i].createdAt.toString().split(/\s+/);
            }
            callback(top);
          },
          error: function(error) {

          }
        });


      }

      Database.prototype.envoyer = function(text, metro, name, mail) {
        var Anecdote = Parse.Object.extend("anecdote");
        var anecdote = new Anecdote();
        metro = metro.toLowerCase();
        metro = metro.charAt(0).toUpperCase() + metro.substr(1);
        anecdote.set("commentaires", text);
        anecdote.set("station", metro);
        anecdote.set("point", 1);
        anecdote.set("user_id", name);

        anecdote.save(null, {
          success: function(anecdote) {
            //Password Generation
            var code = "";
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-!";
            for (var i = 0, n = charset.length; i < 8; i++) {
              code += charset.charAt(Math.floor(Math.random() * n));
            }
            // User Registration
            var Person = Parse.Object.extend("person");
            var user = new Person();
            user.set("username", name);
            user.set("email", mail);
            user.save(null, {
              success: function(res) {

              },
              error: function(err) {

              }
            });

          },
          error: function(anecdote, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.

          }
        });

      }

      Database.prototype.votes = function(upordown, objectId, point) {
        if (upordown === 'up') {
          var Anecdote = Parse.Object.extend("anecdote");
          var anecdote = new Anecdote();
          anecdote.set("objectId", objectId);
          anecdote.set("point", point + 1);
          anecdote.save(null, {
            success: function(anecdote) {

            }
          });


        } else if (upordown === 'down') {
          var Anecdote = Parse.Object.extend("anecdote");
          var anecdote = new Anecdote();
          anecdote.set("objectId", objectId);
          anecdote.set("point", point - 1);
          anecdote.save(null, {
            success: function(anecdote) {

            }
          });

        }
      }

      Database.prototype.getbyStation = function(station, cbSuccess) {
        var tab = [];
        var caca = Parse.Object.extend("anecdote");
        var query = new Parse.Query(caca);
        query.equalTo("station", arg);
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              tab[i] = results[i];
              tab[i].date = {};
              tab[i].date = tab[i].createdAt.toString().split(/\s+/);
            }
            cbSuccess(tab);
          },
          error: function(error) {}
        });
      }

      Database.prototype.execute = function(query, params, cbSuccess, cbError) {

        if (!params) {
          params = [];
        }

        if (!cbSuccess) {
          cbSuccess = function(result) {}
        }

        if (!cbError) {
          cbError = function(error) {
            console.log('db error : %s ', error.message);
          }
        }

        Database.prototype.db.transaction(function(tx) {
          tx.executeSql(query, params, function(tx, result) {
              cbSuccess(result);
            },
            function(tx, error) {
              cbError(error);
            });
        });
      }


      Database.prototype.insert = function(table_name, fields_ar, values_ar) {

        var query = "INSERT INTO " + table_name + " (";

        for (var i = 0; i < fields_ar.length; i++) {
          query += fields_ar[i] + ",";
        }

        query = query.slice(0, -1) + ")";
        query += " VALUES (" + Array(fields_ar.length + 1).join("?,").slice(0, -1) + ")";

        this.execute(query, values_ar);
      }


      Database.prototype.removeWithId = function(table_name, id, callback) {

        var query = "DELETE FROM " + table_name + " WHERE id = " + id + " ;";
        this.execute(query, [], function() {
          callback();
        });
      }



      return Database;
    })();

    return new Database;
  });
})();
