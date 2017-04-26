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
        $('ul.tabs li').click(function(){
            var tab_id = $(this).attr('data-tab');
            var unselectedTab = $('ul.tabs li');

            // if the tab is tab-2 we need the special case of applying a left border based on the comp
            if(tab_id === 'tab-2') {
                $(this).addClass('tabLeftBorder');
            } else {
                unselectedTab.removeClass('tabLeftBorder');
            }

            unselectedTab.removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#"+tab_id).addClass('current');
        });
    }

    // initialize everything in one place
    function init() {
        loadJson();
        setupTabs();
    }

    init();
});
