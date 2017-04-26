$(function() {
    // utility function to load the json from a remote location
    function loadJson() {
        // limited time so I'm just going to proxy this request directly from github
        $.getJSON( "https://crossorigin.me/https://raw.githubusercontent.com/allylabs/fed-coding-challenge/master/code-test.json", function(data) {
            var rowCounter = 0;
            $.each(data, function(key, val) {
                // even, including 0
                var rowColor;

                if(rowCounter %2 === 0) {
                    rowColor = "ratesEvenRow";
                } else {
                    rowColor = "ratesOddRow";
                }

                // This type of thing is why frontend frameworks are so useful.
                var row = "" +
                    '<div class="row ratesRow ' + rowColor + '">' +
                        "<div class='col-xs-6'><span class='pull-left'>" + val.name + "</span></div>" +
                        "<div class='col-xs-3'><span class='pull-right'>" + val.apy + " %</span></div>" +
                        "<div class='col-xs-3'><span class='pull-right'>$" + val.earnings + "</span></div>" +
                    "</div>";

                $(".ratesTable").append(row);

                rowCounter++;
            });
        });
    }

    // utility function to setup the event listener for the tabs section
    function setupTabs() {
        // initially modify the selected tab padding (will always initially be 1)
        var currentTab = $('.current');
        currentTab.css('padding-top', '1.5em');
        currentTab.css('margin-right', '-0.275em');

        // Another instance where a library would be useful.
        $('ul.tabs li').click(function() {
            var tab_id = $(this).attr('data-tab');
            var unselectedTab = $('ul.tabs li');

            // if the tab is tab-2 we need the special case of applying a left border based on the comp
            if(tab_id === 'tab-2') {
                $(this).addClass('tabLeftBorder');
            } else {
                unselectedTab.removeClass('tabLeftBorder');
                unselectedTab.css('margin-right', '-0.275em');
            }

            unselectedTab.removeClass('current');
            unselectedTab.css('padding-top', '0.5em');
            $(this).css('padding-top', '1.5em');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#"+tab_id).addClass('current');
        });
    }

    // utility function to setup the event listener for the login button
    function setupLoginButton() {
        // as part of init, we can just automatically disable both the overlay and modal in case for some reason it is active
        var loginModal = $("#loginModal");
        loginModal.css('opacity', '0');
        loginModal.css('z-index', '-10');

        var overlay = $('#overlay');
        overlay.css('display', 'none');
        overlay.css('z-index', '-10');

        $("#loginButton").click(function() {
            // when you click the login button, you need to fire the modal
            var loginModal = $("#loginModal");
            loginModal.css('opacity', '1');
            loginModal.css('z-index', '999');

            var overlay = $('#overlay');
            overlay.css('display', 'block');
            overlay.css('z-index', '999');
        });
    }

    function setupModalCloseButton() {
        $(".closeButton").click(function() {
            // hide the modal and overlay when the close button is clicked
            var loginModal = $("#loginModal");
            loginModal.css('opacity', '0');
            loginModal.css('z-index', '-10');

            var overlay = $('#overlay');
            overlay.css('display', 'none');
            overlay.css('z-index', '-10');
        });
    }

    // initialize everything in one place
    function init() {
        loadJson();
        setupTabs();
        setupLoginButton();
        setupModalCloseButton();
    }

    init();
});
