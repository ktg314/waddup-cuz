function fetchPhotos() {
    // get the dive where the images should go
    var $tn_div = $("#thumbs");
    // just in case there's anything still in the thumbnails div, clear it out
    $tn_div.empty();

    // retrieve images from the database
    $endpoint = $path_to_backend + 'getPhotos.php?grp_id=314159';
    $.getJSON($endpoint, function(data) {
        jQuery.each(data, function(key, val) {
            // append the images to the div, and make them clickable for details
            $("<img />")
                .attr("src", $path_to_backend + val.tn_src)
                .attr("id", val.id)
                .appendTo($tn_div)
                .attr("class", "tn")
                .wrap('<a href="viewPhoto.html?id=' + val.id + '"></a>');
        });
    });
};

// Using images like checkboxes. Used pieces from https://stackoverflow.com/questions/30663562/use-images-like-checkboxes
function getSelectablePhotos3() {
    var $tn_div = $("#test3");
    $tn_div.empty();
    // retrieve images from the database
    $endpoint = $path_to_backend + 'getPhotos.php?grp_id=314159';
    $.getJSON($endpoint, function(data) {
        jQuery.each(data, function(key, val) {
          $("<img />")
              .attr("class", "checkable")
              .attr("src", $path_to_backend + val.tn_src)
              .attr("id", val.id)
              .appendTo($tn_div)
              .wrap("<span class='fancychecks'>")
              .parent()
              .click(function() {
                  $(this).toggleClass("checked");
                });
        });
    });
};

function getAllExistingTags() {
  //get all pictures
  //make hashset / dictionary of all the Tags
  //sort and print / show to viewer // allow for clicking?
  //  first picture can be first in dictionary, get thumbnail (tn_src)
  // if so, keep track of what photo ids are apart of it
  // dictionary contents:
  // tags name: photoIds
  // ex: summer2019: [12, 13, 38, 41]
  // retrieve images from the database
  $endpoint = $path_to_backend + 'getPhotos.php?grp_id=314159';
  var dict = {};
  $.getJSON($endpoint, function(data) {
      jQuery.each(data, function(key, val) {
          var res = JSON.parse(val.description);
          var tags = res["tags"];
          var id = val.id;

          for (tag in tags) {
            if (tag in dict) {
              dict[tag].push(id);
            } else {
              dict[tag] = [id];
            }
          }

      });
  });
  console.log(dict);
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function logit(grp_id, user_id, event_text) {
    $.ajax({
        url: $path_to_backend + 'logEvent.php',
        type: 'POST',
        data: {
            grp_id: grp_id,
            user_id: user_id,
            event: event_text
        }
    }).done(function(data, textStatus, jqXHR){
        //console.log(data);
        //console.log(textStatus);
    });
}

var myIP = 0;

function getIP() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        myIP = (JSON.parse(JSON.stringify(data, null, 2))).ip;
    });
}

function ip2int(ip) {
    return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
}

function int2ip(ipInt) {
    return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
}
