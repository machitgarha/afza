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
                calc = eval(calc).toString();
                if (calc === "Infinity") {
                    badOperation();
                    calc = "";
                }
                $res.text(calc);
                break;

            default:
                let isLastNum = parseInt(lastChar).toString() === lastChar,
                    isCurNum = parseInt(curChar).toString() === curChar,
                    append = true;

                if (curChar === ".") {
                    isCurNum = true;

                    let getBack = calc.length - 1;
                    while (getBack >= 0 && calc.charAt(getBack) !== " ") {
                        if (calc.charAt(getBack) === ".") {
                            append = false;
                            break;
                        }
                        getBack--;
                    }
                }

                if (lastChar === ".")
                    isLastNum = true;

                if (!isLastNum && !isCurNum)
                    $res.text(calc = calc.slice(0, -2));
                // By Mohammad Amin Chitgarha ;)

                if (append)
                    calc += (isCurNum && isLastNum && lastChar !== null
                        ? "" : " ") + curChar;

                $res.text(calc);
                lastChar = curChar;

                break;
        }
    });

    let isMouseDown = false;
    $clearButton.on("mousedown", function () {
        clearText(40, null);
        isMouseDown = true;
    });
    $clearButton.on("mouseup", function () {
        isMouseDown = false;
    });

    function clearText(timeout, prevTimeoutId) {
        if (prevTimeoutId !== null)
            clearTimeout(prevTimeoutId);

        let x = setTimeout(function () {
            if (isMouseDown) {
                $res.text(calc = calc.slice(0, -1));
                if (calc.charAt(calc.length - 1) === " ")
                    $res.text(calc = calc.slice(0, -1));
                lastChar = calc.charAt(calc.length - 1);
                clearText(150, x);
            }
        }, timeout);
    }

    function badOperation() {
        alert("Bad operation, try again!");
    }
});