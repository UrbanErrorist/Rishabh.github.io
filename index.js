var SUDOKU = function(r) {
    "use strict";
    var n = function() {
        this.values = null
    };
    return n.DIGITS = "123456789", n.cross = function(r, n) {
        var t = [],
            e = 0,
            i = 0;
        for (e in r)
            for (i in n) t.push(r[e] + n[i]);
        return t
    }, n.member = function(r, n) {
        var t = 0,
            e = n.length;
        for (t = 0; e > t; t += 1)
            if (r === n[t]) return !0;
        return !1
    }, n.CELL_COUNT = 9, n.ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"], n.COLS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], n.SQUARES = n.cross(n.ROWS, n.COLS), n.UNITLIST = function() {
        var r = [],
            t = 0;
        for (t = 0; t < n.CELL_COUNT; t++) r.push(n.cross(n.ROWS, [n.COLS[t]])), r.push(n.cross([n.ROWS[t]], n.COLS));
        var e = [
                ["A", "B", "C"],
                ["D", "E", "F"],
                ["G", "H", "I"]
            ],
            i = [
                ["1", "2", "3"],
                ["4", "5", "6"],
                ["7", "8", "9"]
            ],
            o = 3,
            s = 0,
            S = 0;
        for (s = 0; o > s; s++)
            for (S = 0; o > S; S++) r.push(n.cross(e[s], i[S]));
        return r
    }(), n.UNITS = function() {
        var r = {},
            t = 0,
            e = null,
            i = n.SQUARES.length,
            o = 0,
            s = null,
            S = n.UNITLIST.length;
        for (t = 0; i > t; t += 1)
            for (e = n.SQUARES[t], r[e] = [], o = 0; S > o; o += 1) s = n.UNITLIST[o], n.member(e, s) && r[e].push(s);
        return r
    }(), n.PEERS = function() {
        var r = {},
            t = 0,
            e = n.SQUARES.length,
            i = null;
        for (t = 0; e > t; t++) {
            i = n.SQUARES[t], r[i] = {};
            for (var o in n.UNITS[i]) {
                var s = n.UNITS[i][o];
                for (var S in s) s[S] !== i && (r[i][s[S]] = !0)
            }
        }
        return r
    }(), n.tests = function() {
        console.assert(81 === n.SQUARES.length), console.assert(27 === n.UNITLIST.length);
        for (var r = 0; r < n.SQUARES.length; r++) console.assert(3 === n.UNITS[n.SQUARES[r]].length), console.assert(20 === Object.keys(n.PEERS[n.SQUARES[r]]).length);
        var t = function(r, t) {
            var e = r.length,
                i = t.length,
                o = 0;
            if (e !== i) return !1;
            for (o = 0; e > o; o += 1)
                if (!n.member(r[o], t)) return !1;
            return !0
        };
        console.assert(t(n.UNITS.G5[0], ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"])), console.assert(t(n.UNITS.G5[1], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"])), console.assert(t(n.UNITS.G5[2], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"])), console.assert(t(Object.keys(n.PEERS.E3), ["D1", "D2", "D3", "E1", "E2", "F1", "F2", "F3", "A3", "B3", "C3", "G3", "H3", "I3", "E4", "E5", "E6", "E7", "E8", "E9"]))
    }, n.copy = function(r) {
        var n = {};
        for (var t in r) n[t] = r[t];
        return n
    }, n.prototype.resetGrid = function() {
        var r = 0,
            t = n.SQUARES.length,
            e = null,
            i = {};
        for (r = 0; t > r; r += 1) e = n.SQUARES[r], i[e] = n.DIGITS;
        return i
    }, n.prototype.initializeGrid = function(r, t) {
        var e = 0,
            i = n.SQUARES.length,
            o = 0,
            s = null;
        if (t.length !== i) return !1;
        for (e = 0; i > e; e += 1)
            if (o = t[e], s = n.SQUARES[e], o && n.DIGITS.indexOf(o) >= 0 && !this.assign(r, s, o)) return !1;
        return r
    }, n.prototype.assign = function(r, n, t) {
        var e = 0,
            i = r[n],
            o = !0;
        for (e = 0; e < i.length; e += 1) i.charAt(e) !== t && (o &= this.eliminate(r, n, i.charAt(e)) ? !0 : !1);
        return o ? r : !1
    }, n.prototype.eliminate = function(r, t, e) {
        var i = 0,
            o = 0,
            s = null,
            S = null,
            l = null,
            u = 0,
            f = 0,
            a = null,
            h = !0;
        if (-1 === r[t].indexOf(e)) return !0;
        if (r[t] = r[t].replace(e, ""), 0 === r[t].length) return !1;
        if (1 === r[t].length) {
            for (var c in n.PEERS[t]) h &= this.eliminate(r, c, r[t]) ? !0 : !1;
            if (!h) return !1
        }
        for (s = n.UNITS[t], o = s.length, i = 0; o > i; i += 1) {
            for (l = [], S = s[i], f = S.length, u = 0; f > u; u += 1) a = S[u], -1 !== r[a].indexOf(e) && l.push(a);
            if (0 === l.length) return !1;
            if (1 === l.length && !this.assign(r, l[0], e)) return !1
        }
        return r
    }, n.prototype.search = function(r) {
        if (!r) return !1;
        var t = 10,
            e = 1,
            i = null;
        for (var o in n.SQUARES) r[n.SQUARES[o]].length > e && (e = r[n.SQUARES[o]].length), r[n.SQUARES[o]].length > 1 && r[n.SQUARES[o]].length < t && (t = r[n.SQUARES[o]].length, i = n.SQUARES[o]);
        if (1 == e) return r;
        for (var s = 0; s < r[i].length; s++) {
            var S = this.search(this.assign(n.copy(r), i, r[i].charAt(s)));
            if (S) return S
        }
        return !1
    }, n.prototype.solve = function(r) {
        var n = this.resetGrid();
        return n = this.initializeGrid(n, r), n = this.search(n), n ? this.serialize(n) : !1
    }, n.prototype.serialize = function(r) {
        var n, t = [];
        for (n in r) t.push(r[n]);
        return t
    }, r.Puzzle = n, r
}(SUDOKU || {});

var SUDOKU = function(i) {
    return i.Controller = function(i, e) {
        this.model = i, this.view = e
    }, i.Controller.prototype.init = function() {
        this.view.init(), this.view.render(), this.view.bind(this.view.EVENTS.SOLVE, this.solve.bind(this)), this.view.bind(this.view.EVENTS.RESET, this.reset.bind(this))
    }, i.Controller.prototype.parse = function() {
        var e = this.view.getGrid(),
            t = void 0,
            o = [],
            s = 0,
            r = 0;
        for (s = 0; s < i.CELL_COUNT; s += 1)
            for (r = 0; r < i.CELL_COUNT; r += 1) t = e[9 * s + r], o.push(t.value);
        return o
    }, i.Controller.prototype.solve = function() {
        var i = this.parse(),
            e = this.model.solve(i);
        e ? (this.view.displayMessage("Solution found!"), this.view.render(e)) : this.view.displayMessage("This puzzle cannot be solved")
    }, i.Controller.prototype.reset = function() {
        this.view.render()
    }, i
}(SUDOKU || {});

var SUDOKU = function(e, t) {
    return e.View = function(e) {
        this.wrapperElementId = e, this.handlers = {}
    }, e.View.prototype.EVENTS = {
        SOLVE: "solve",
        RESET: "reset"
    }, e.View.prototype.init = function() {
        var n, i, r, s, a, l, o, d, p;
        for (n = t.getElementById(this.wrapperElementId), i = t.createElement("div"), r = [], o = 0; o < e.CELL_COUNT; o += 1) {
            for (s = [], a = t.createElement("div"), r[o] = s, d = 0; d < e.CELL_COUNT; d += 1) l = t.createElement("input"), l.setAttribute("maxlength", 1), l.setAttribute("type", "tel"), p = "scell ", 0 === o ? p += "topborder " : (o + 1) % 3 === 0 && (p += "botborder "), 0 === d ? p += "leftborder " : (d + 1) % 3 === 0 && (p += "rightborder "), l.setAttribute("class", p), l.addEventListener("change", this.handleInput.bind(this)), a.appendChild(l), s[d] = l;
            i.appendChild(a)
        }
        n.appendChild(i), this.setupEventHandlers()
    }, e.View.prototype.setupEventHandlers = function() {
        var e = t.getElementById("solve_button");
        e.addEventListener("click", this.handleSolve.bind(this));
        var n = t.getElementById("reset_button");
        n.addEventListener("click", this.handleReset.bind(this))
    }, e.View.prototype.render = function(e) {
        var n = 0,
            i = t.getElementsByClassName("scell"),
            r = i.length;
        for (n = 0; r > n; n += 1) e ? i[n].value = e[n] : i[n].value = ""
    }, e.View.prototype.getGrid = function() {
        return t.getElementsByClassName("scell")
    }, e.View.prototype.bind = function(e, t) {
        this.handlers[e] = t
    }, e.View.prototype.handleSolve = function() {
        this.handlers[this.EVENTS.SOLVE]()
    }, e.View.prototype.handleReset = function() {
        this.handlers[this.EVENTS.RESET]()
    }, e.View.prototype.handleInput = function(e) {
        var t = e.target.value;
        isNaN(parseInt(t, 10)) && ("" !== t && this.displayMessage("Enter an integer"), e.target.value = "")
    }, e.View.prototype.displayMessage = function(e) {
        var n = t.getElementById("message");
        n.innerHTML = e, setTimeout(function() {
            n.innerHTML = ""
        }, 3e3)
    }, e
}(SUDOKU || {}, document);

var SUDOKU = function(e) {
    return e.CELL_COUNT = 9, e.App = function(e) {
        this.model = new SUDOKU.Puzzle, this.view = new SUDOKU.View(e), this.controller = new SUDOKU.Controller(this.model, this.view), this.controller.init()
    }, e.App.prototype.reset = function() {
        this.model.reset(), this.view.render()
    }, e
}(SUDOKU || {});


var sudoku = new SUDOKU.App("puzzle_wrapper");
