$(document).ready(function () {
    let $res = $("section#res section"),
        $tableKeys = $("table#keys td"),
        $clearButton = $("button#clear"),
        lastChar = null,
        calc = "";

    $res.on("mousewheel", function (event) {
        let dx = event.deltaX,
            fac = event.deltaFactor;
        if (dx !== 0)
            $(this).scrollLeft(dx * fac + $(this).scrollLeft());
    });

    $tableKeys.on("click", function () {
        let curChar = $(this).text();

        switch (curChar) {
            case "=":
                $res.text(calc = eval(calc).toString());
                break;

            default:
                let isLastNum = parseInt(lastChar).toString() === lastChar,
                    isCurNum = parseInt(curChar).toString() === curChar;

                if (curChar === ".")
                    isCurNum = true;
                if (lastChar === ".")
                    isLastNum = true;

                if (!isLastNum && !isCurNum)
                    $res.text(calc = calc.slice(0, -2));

                calc += (isCurNum && isLastNum && lastChar !== null ? "" : " ")
                    + curChar;

                $res.text(calc);
                lastChar = curChar;

                break;
        }
    });

    $clearButton.on("click", function () {
        $res.text(calc = calc.slice(0, -1));
    });
});