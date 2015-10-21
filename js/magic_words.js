magicWords = new (function() {
    var data = {
        phabroot: 'http://10.4.3.65/'
    }

    var magicWords = [
        {
            'match': /{(T[0-9]+)}/g,
            'replace': '[$1](' + data.phabroot + '$1)'
        },
        {
            'match': /{PHAB}/g,
            'replace': data.phabroot
        },
        {
            'match': /@([0-9a-z._-]*[0-9a-z_-])/gi,
            'replace': '[@$1](' + data.phabroot + 'p/$1)'
        }
    ];

    this.process = function(input) {
        var output = input;
        for (var i = 0; i < magicWords.length; ++i) {
            var magicWord = magicWords[i];
            output = output.replace(magicWord.match, magicWord.replace);
        }
        return output;
    }
})();
