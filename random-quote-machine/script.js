//Only run the code after the document is ready.
$(document).ready(function() {

    //Need to wait until AJAX call has succeeded before we can do anything.
    getData().success(function(data) {

        //Put the quote data into its own variable so we can edit it.
        var quote = data.shift();

        var quoteContent = getQuoteContent(quote);
        var quoteAuthor = getQuoteAuthor(quote);
        var tweetIntent = getTweetIntent(quoteContent, quoteAuthor);
        writeData(quoteContent, quoteAuthor, tweetIntent);

    });

    //Call the getQuote function when the button is clicked, and update link addresses.
    $('#get-quote').on('click', function() {
        getData().success(function(data) {

            //Put the quote data into its own variable so we can edit it.
            var quote = data.shift();

            var quoteContent = getQuoteContent(quote);
            var quoteAuthor = getQuoteAuthor(quote);
            var tweetIntent = getTweetIntent(quoteContent, quoteAuthor);
            writeData(quoteContent, quoteAuthor, tweetIntent);

        });
    });
});

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
    var quoteContent = "\"" + quoteContent.replace(/<p>|<\/p>/g, "").trim() + "\"";
    console.log(quoteContent);
    return quoteContent;
}

function getQuoteAuthor(data) {
    //The author of the quote.
    var quoteAuthor = "- " + data.title;
    return quoteAuthor;
}

function getTweetIntent(quoteContent, quoteAuthor) {

    //Encode for URL.
    var webAddress = encodeURIComponent(quoteContent);
    webAddress += "+" + encodeURIComponent(quoteAuthor);
    webAddress.replace(/'/, "%27");
    console.log(webAddress);

    //Return the full web address for the tweet intent.
    return "https://twitter.com/intent/tweet?text=" + webAddress;
}

function writeData(quoteContent, quoteAuthor, tweetIntent) {
    $('#quote-content').html(quoteContent);
    $('#quote-title').html(quoteAuthor);
    $("#tweet-intent").attr("href", tweetIntent);
}