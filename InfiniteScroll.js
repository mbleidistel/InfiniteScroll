function InfiniteScroll(ImageDirectory)
{
    // Set image directory
    if ( ImageDirectory == undefined)
    {
        console.error("InfiniteScroll declared without ImageDirectory");
        return;
    }

    // Create scrolling div inside container
    var container = document.getElementById("infinite-scroll-container");
    if (container == undefined )
    {
        console.error("InfiniteScroll cannot find infinite-scroll class div");
        return;
    }
    container.innerHTML = "<div class='infinite-scroll'></div>";

    // Default variables
    this.image_directory = ImageDirectory;
    this.speed = "";
    this.totalWidth = 0;
    this.images = [];

    // Initialize
    this.Init();
}

InfiniteScroll.prototype.Init = function()
{
    var that = this;
    this._getJSON(this.image_directory + "/GetDirectory.php", function(files)
    {
        that.images = files;
        that._addImages();
    });
};

InfiniteScroll.prototype._addImages = function()
{
    if (this.images.length < 6 )
    {
        console.error("InfiniteScroll needs at least 6 images to work");
        return;
    }

    var scrollsection = document.getElementsByClassName("infinite-scroll")[0];
    if (scrollsection == undefined )
    {
        console.error("InfiniteScroll cannot find infinite-scroll class div");
        return;
    }

    var html = [];
    // Add all the images
    for ( var i=0; i < this.images.length; i++ )
    {
        var image = this.image_directory + "/" + this.images[i];
        html.push("<img = src='" + image +"'>");
    }
    // For the loop, repeate the first 4
    for ( var i=0; i < 4; i++ )
    {
        var image = this.image_directory + "/" + this.images[i];
        html.push("<img = src='" + image +"' alt='' />");
    }
    scrollsection.innerHTML = html.join('');
};

InfiniteScroll.prototype._getJSON = function(file, callback)
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function ()
    {
        if(request.readyState==4 && request.status==200)
        {
            if ( callback && typeof(callback) == 'function' )
                callback(JSON.parse(request.responseText));
        }
    };
    request.open("GET", file, false);
    request.send();
};