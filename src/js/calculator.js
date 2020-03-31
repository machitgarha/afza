/*
 * Copyright 2020 Mohammad Amin Chitgarha
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

$(document).ready(function () {
    let $resultField = $("section#scroll section"),
        $tableKeys = $("table#keys td"),
        $clearButton = $("button#clear"),
        lastChar = null,
        calc = "",
        myScroll = new IScroll('#scroll', {
            mouseWheel: true,
            scrollX: true,
            scrollY: false
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
                $resultField.text(calc);
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
                    $resultField.text(calc = calc.slice(0, -2));

                if (append)
                    calc += (isCurNum && isLastNum && lastChar !== null ? "" : " ") + curChar;

                $resultField.text(calc);
                myScroll.refresh();
                lastChar = curChar;

                break;
        }
    });

    let isMouseDown = false;
    $clearButton.on("click", function () {
        clearText(1, null, true);
        myScroll.refresh();
    });
    $clearButton.on("mousedown touchstart", function () {
        clearText(100);
        isMouseDown = true;
    });
    $clearButton.on("mouseup touchend", function () {
        isMouseDown = false;
    });

    function clearText(timeout, prevTimeoutId, isClicked) {
        if (prevTimeoutId !== null)
            clearTimeout(prevTimeoutId);
        if (isClicked === null)
            isClicked = false;

        let x = setTimeout(function () {
            if (isMouseDown || isClicked) {
                $resultField.text(calc = calc.slice(0, -1));
                if (calc.charAt(calc.length - 1) === " ")
                    $resultField.text(calc = calc.slice(0, -1));
                lastChar = calc.charAt(calc.length - 1);
            }
            if (isMouseDown)
                clearText(timeout, x);
        }, timeout);
    }

    function badOperation() {
        alert("Bad operation, try again!");
    }
});
