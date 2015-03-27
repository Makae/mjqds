/**
 * Makae JQuery Development Script for debugging jQuery-Applications.
 *
 * It allows to get insights in listeners registered
 * to different elements on the page
 *
 * @author: M.Käser
 * @date: 20.11.2014
 *
 */
var makae_jqds;
(function() {
  var init = function(event) {

    var $ = typeof jQuery != 'undefined' ? jQuery :
            $ ? $ : null;

    if(!$)
      return console.warn("Makae: No jQuery on this Site!");

    makae_jqds = {

      listListeners : function(selector, event_types) {
        var listeners = this.getListeners(selector, event_types);
        var i = 1;
        for(var l in listeners) {
          console.log("Object " + (i++) + ":");
          for(var t in listeners[l]) {
            console.log(t);
            console.log(listeners[l][t]);
            console.log(" ");
          }
          console.log(" ");
        }
      },

      printListeners : function(selector, event_types) {
        var listeners = this.getListeners(selector, event_types);
        for(var l in listeners) {
          var i = 1;
          console.log("Object " + (i++) + ":");
          for(var t in listeners[l]) {
            console.log(t);
            for(var i in listeners[l][t]) {
              console.log(listeners[l][t][i]);
            }
            console.log(" ");
          }
            console.log(" ");
        }
      },

      getListeners : function(selector, event_types) {
        var objEvents = this.getObjectEvents(selector, event_types);
        var listeners = [];
        for(var n in objEvents)
          listeners[n] = objEvents[n].events;
        return listeners;
      },

      getObjectEvents : function(selector, event_types) {
        var elements = $(selector);
        var found_elements = [];

        for(var i = 0; i < elements.length; i++) {
          var element = elements.get(i);

          found_elements.push({
            'element' : element,
            'events' : this.getEvents(element, event_types)
          });
        }
        return found_elements;
      },

      getEvents : function(element, event_types) {
        var event_types = typeof event_types == 'undefined' ? null :
                         typeof event_types != 'array' ? [event_types] : event_types;
        var events = $._data(element).events;
        var found_events = {};

        for(var k in events) {
          if(-1 !== $.inArray(k, event_types) || null == event_types) {
            found_events[k] = [];
            for(var n in events[k]) {
              if(!isNaN(n))
                found_events[k].push(events[k][n].handler);
            }
          }
        }

        return found_events;
      }
    };
  };

  var $ = typeof jQuery != 'undefined' ? jQuery : $ ? $ : null;
  if($ || document.readyState == "complete" || document.readyState == "loaded")
    init();
  else {
    var retries = 10;
    window.addEventListener("load", function() {
      var $ = typeof jQuery != 'undefined' ? jQuery : $ ? $ : null;
      if($) {
        init();
        return;
      }

      if(retries-- > 0) {
        setTimeout(arguments.callee, 200)
      } else
        init();
    });
  }
})();