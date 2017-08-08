//Only run the code after the document is ready.
$(document).ready(function() {

    //Need to wait until AJAX call has succeeded before we can do anything.
    getData().success(function(data) {
        manageData(data);
    });

    //Call the getQuote function when the button is clicked, and update link addresses.
    $('#get-quote').on('click', function() {

        $(".well").fadeOut(500);

        getData().success(function(data) {
            manageData(data);
            $(".well").fadeIn(500);
        });

    });
});

function manageData(data) {
    //Put the quote data into its own variable so we can edit it.
    var quote = data.shift();

    var quoteContent = getQuoteContent(quote);
    var quoteAuthor = getQuoteAuthor(quote);
    var tweetIntent = getTweetIntent(quoteContent, quoteAuthor);
    writeData(quoteContent, quoteAuthor, tweetIntent);
}

//Function makes an AJAX call to a quotes API.
function getData() {
    return $.ajax({
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        dataType: 'json',
        cache: false
    });
}

function getQuoteContent(data) {
    //The content of the quote.
    var quoteContent = data.content.replace(/\n/, "");
    var quoteContent = "<span class=\"big-quote\">\"</span>" + quoteContent.replace(/<p>|<\/p>/g, "").trim() + "\"";
    return quoteContent;
}

function getQuoteAuthor(data) {
    //The author of the quote.
    var quoteAuthor = "- " + data.title;
    return quoteAuthor;
}

function getTweetIntent(quoteContent, quoteAuthor) {

    //Encode for URL.
    quoteContent = quoteContent.replace(/<span class="big-quote">"<\/span>/g, "\"");
    quoteContent = quoteContent.replace(/<strong>|<\/strong>/, "");
    quoteContent = quoteContent.replace(/[!'()*]/g, escape);
    quoteContent = quoteContent.replace(/&#8216;/g, "\'");
    quoteContent = quoteContent.replace(/&#8217;/g, "\'");
    quoteContent = quoteContent.replace(/&#8220;/g, "\"");
    quoteContent = quoteContent.replace(/&#8221;/g, "\"");
    quoteContent = quoteContent.replace(/&#8211;/g, "--");
    quoteContent = quoteContent.replace(/&#8230;/g, "...");

    //webAddress.replace(/…/g, "%E2%80%A6");
    var webAddress = encodeURIComponent(quoteContent);
    webAddress += "+" + encodeURIComponent(quoteAuthor);

    //Return the full web address for the tweet intent.
    return "https://twitter.com/intent/tweet?text=" + webAddress;
}

function writeData(quoteContent, quoteAuthor, tweetIntent) {
    $('#quote-content').html(quoteContent);
    $('#quote-title').html(quoteAuthor);
    $("#tweet-intent").attr("href", tweetIntent);
}