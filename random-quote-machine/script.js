//Only run the code after the document is ready.
$(document).ready(function() {

    //Initial call of the function to open the page with a quote.
    getQuote();

    //Call the getQuote function when the button is clicked.
    $('#get-quote').on('click', function() {
        getQuote();
    });

});

//Function makes an AJAX call to a quotes API and inserts the data into our HTML.
function getQuote() {
    $.ajax({
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
            var post = data.shift(); // The data is an array of posts. Grab the first one.

            //The content of the quote.
            var quoteContent = "\"" + post.content.replace(/<p>|<\/p>/g, "") + "\"";
            $('#quote-content').html(quoteContent);

            //The author of the quote.
            var quoteAuthor = "- " + post.title;
            $('#quote-title').text(quoteAuthor);
        },
        cache: false
    });
}