function wikipediaSearch(e) {

    e = e || event;

    var body = document.querySelector("body"),
        input = document.getElementById("searchText"),
        previousSearch = "";

    e.preventDefault();

    var url = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=opensearch&search=" + input.value;

    var request = new XMLHttpRequest();

    request.open("GET", url);

    request.responseType = "json";

    if (previousSearch !== input.value) {

        request.send();

    }

    request.onload = function () {

        previousSearch = input.value;

        var searchResults = request.response;
        var results = document.querySelectorAll(".result");
        var notFound = document.getElementById("notFound");

        if (results.length) {

            results.forEach(function (element) {

                body.removeChild(element);

            });

        } else if (notFound) {

            body.removeChild(notFound);

        }

        if (searchResults[1].length) {

            searchResults[1].forEach(function (element, index) {

                var div = document.createElement("div");

                div.classList.add("result", "col-12", "col-sm-12", "col-md-6", "col-lg-4", "col-xl-3");

                var a = document.createElement("a");

                a.href = searchResults[3][index];
                a.target = "_blank";
                a.textContent = searchResults[1][index];

                div.appendChild(a);

                var p = document.createElement("p");

                p.textContent = searchResults[2][index];

                div.appendChild(p);

                document.getElementById("result").appendChild(div);
            });

        } else {

            var div = document.createElement("div");

            div.classList.add("noResult", "col-12", "col-sm-12", "col-md-12", "col-lg-12", "col-xl-12");

            var p = document.createElement("p");

            p.textContent = "No result found for \"" + input.value + "\"";

            div.appendChild(p);

            var subDiv = document.createElement("div");

            div.appendChild(subDiv);

            document.getElementById("noResult").appendChild(div);

        }

    }

}

window.onload = function () {

    input.focus();

};

document.getElementById("searchForm").addEventListener("submit", wikipediaSearch);