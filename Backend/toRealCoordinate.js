var coords = {

}

module.exports = {
    toRealCoordinate: function (c1, c2) {

        c1 = c1.toString()
        c2 = c2.toString()

        var x1 = undefined
        var y1 = undefined
        var x2 = undefined
        var y2 = undefined

        //if the last digit of the ID is 0, the x1 value will be -5
        //if the first digit of the ID is 9, y1 = -5
        //if c1 has only one digit, y1 = 5 (c1.length()==1)

        ////////////////////
        //COORDINATE 1

        //depending on the last digit of c1 --> set x1 value
        //take the last char and convert it into INT
        switch (parseInt(c1.slice(-1))) {
            case 0:
                x1 = -5
                break; i
            case 1:
                x1 = -4
                break;
            case 2:
                x1 = -3
                break;
            case 3:
                x1 = -2
                break;
            case 4:
                x1 = -1
                break;
            case 5:
                x1 = 1
                break;
            case 6:
                x1 = 2
                break;
            case 7:
                x1 = 3
                break;
            case 8:
                x1 = 4
                break;
            case 9:
                x1 = 5
                break;
        }

        // example, if the first value is 2 --> set y1 value to 3
        //if it is a two digit number
        if (c1.length > 1) {
            switch (parseInt(c1.charAt(0))) {
                case 1:
                    y1 = 4
                    break;
                case 2:
                    y1 = 3
                    break;
                case 3:
                    y1 = 2
                    break;
                case 4:
                    y1 = 1
                    break;
                case 5:
                    y1 = -1
                    break;
                case 6:
                    y1 = -2
                    break;
                case 7:
                    y1 = -3
                    break;
                case 8:
                    y1 = -4
                    break;
                case 9:
                    y1 = -5
                    break;
            }
        }

        //if there is only one digit, y1 --> 5 (since 0 to 9 are on the top op the grid, all with the y value = 5)
        if (c1.length == 1) {
            y1 = 5
        }


        //////////////
        //COORDINATE 2
        switch (parseInt(c2.slice(-1))) {
            case 0:
                x2 = -5
                break;
            case 1:
                x2 = -4
                break;
            case 2:
                x2 = -3
                break;
            case 3:
                x2 = -2
                break;
            case 4:
                x2 = -1
                break;
            case 5:
                x2 = 1
                break;
            case 6:
                x2 = 2
                break;
            case 7:
                x2 = 3
                break;
            case 8:
                x2 = 4
                break;
            case 9:
                x2 = 5
                break;
        }

        if (c2.length > 1) {
            switch (parseInt(c2.charAt(0))) {
                case 1:
                    y2 = 4
                    break;
                case 2:
                    y2 = 3
                    break;
                case 3:
                    y2 = 2
                    break;
                case 4:
                    y2 = 1
                    break;
                case 5:
                    y2 = -1
                    break;
                case 6:
                    y2 = -2
                    break;
                case 7:
                    y2 = -3
                    break;
                case 8:
                    y2 = -4
                    break;
                case 9:
                    y2 = -5
                    break;
            }
        }

        //if there is only one digit, y2 --> 5
        if (c2.length == 1) {
            y2 = 5
        }

        //console.log("x1: " + x1 + " y1: " + y1 + " x2: " + x2 + " y2: " + y2)

        var coords = {
            X1: x1,
            X2: x2,
            Y1: y1,
            Y2: y2
        }

        return coords
    },

}