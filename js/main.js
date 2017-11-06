$(document).ready(function() {
    // Using YQL and JSONP

    var user = ['gsl', 'freecodecamp', 'test_channel', 'esl_sc2', 'imaqtpie', 'imstilldadaddy1985'];

    for (var i = 0; i < user.length; i++) {
        var streamsUrl = "https://wind-bow.gomix.me/twitch-api/streams/" + user[i] + "?callback=?";
        var usersUrl = "https://wind-bow.gomix.me/twitch-api/users/" + user[i] + "?callback=?";

        // building template for list
        // <li class=user[i]>
        //     <div><i class="fa fa-smile-o"></i></div>
        //     <div>user[i]</div>
        //     <div>checking...</div>
        // </li>
        $("ul").append(
            "<li class='" + user[i] + "'>" +
            "<div><i class='fa fa-smile-o'></i></div>" +
            "<div>" + user[i] + "</div>" +
            "<div>checking..</div>" +
            "</li>"
        );

        // Request logo url
        $.ajax({
            url: usersUrl,

            // The name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // Tell YQL what we want and that we want JSON
            data: {
                q: "select title,abstract,url from search.news where query=\"cat\"",
                format: "json"
            },

            // Work with the responseUsers
            success: function(responseUsers) {
                // server responseUsers
                // console.log(responseUsers);

                // Make list regarding the responseUsers.
                // If success getting logo image, change the fa-smile-o to logo
                if (responseUsers.logo) {
                    $("li." + responseUsers.name + " div:nth-child(1)").replaceWith("<div><img src='" + responseUsers.logo + "' alt='user logo' /></div>");
                }

                // If success getting display_name, change the user[i] to display_name
                if (responseUsers.display_name) {
                    $("li." + responseUsers.name + " div:nth-child(2)").replaceWith("<div>" + responseUsers.display_name + "</div>");
                }

            }
        }); // end of $.ajax


        $.ajax({
            url: streamsUrl,

            // The name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // Tell YQL what we want and that we want JSON
            data: {
                q: "select title,abstract,url from search.news where query=\"cat\"",
                format: "json"
            },

            // Work with the responseStreams
            success: function(responseStreams) {
                console.log(responseStreams); // server responseStreams

                // Make list regarding the responseStreams
                if (responseStreams.stream) {
                    // add class name as "online" on li tag
                    $("li." + responseStreams.stream.channel.name).addClass("online");

                    // change logo boundary color as green
                    $("li." + responseStreams.stream.channel.name + " img").css("border-color", "#00ca74");

                    // Change checking.. text to game info
                    $("li." + responseStreams.stream.channel.name + " div:nth-child(3)").replaceWith("<div>" + responseStreams.stream.channel.game + "</div>");
                } else {
                    // getting user name again from response object
                    var getSelfUrl = responseStreams._links.self;
                    var defineId = getSelfUrl.substring("https://api.twitch.tv/kraken/streams/".length);

                    // add class name as "offline" on li tag
                    $("li." + defineId).addClass("offline");

                    // Change checking.. test to offline
                    $("li." + defineId + " div:nth-child(3)").replaceWith("<div>offline</div>");
                }



            }
        }); // end of $.ajax
    } // end of for


    // nav functions
    // When 'all' button clicked, remove all 'online_hidden', 'offline_hidden'
    $('.button').click(function() {

        // When click selected button, do nothing
        if ($(this).hasClass('selected')) {
            console.log("do nothing");
        }

        // When click NOT selected button, change to selected
        if (!($(this).hasClass('selected'))) {
            // Remove all the 'selected' class
            $('.selected').removeClass('selected');

            // Add 'selected' class just the button clicked
            $(this).addClass('selected');
            console.log("selected");
        }

        // Change status of all list items
        var selectedBtn = $('.selected').text();
        console.log(selectedBtn);

        switch (selectedBtn) {
            case "all":
                console.log("case all: " + selectedBtn);
                $('.online_hidden, .offline_hidden').removeClass('online_hidden offline_hidden');
                break;
            case "online":
                console.log("case online: " + selectedBtn);
                $('.online').removeClass('online_hidden');
                $('.offline').addClass('offline_hidden');
                break;
            case "offline":
                console.log("case offline: " + selectedBtn);
                $('.offline').removeClass('offline_hidden');
                $('.online').addClass('online_hidden');
                break;
        }



    });

    // When 'online' button clicked, add class 'offline_hidden' to online items

    // When 'offline' button clicked, add clss 'online_hidden' to offline items






}); // end of document ready function
