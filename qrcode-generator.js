// ==UserScript==
// @name         二维码生成器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  按下 Shift+Alt+Q 生成当前网址或选中内容的二维码
// @author       You
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

;(function () {
  'use strict'

  // ==QRCode Library Start==
  /**
   * Minified by jsDelivr using Terser v5.39.0.
   * Original file: https://cdn.jsdelivr.net/npm/qrcode-generator@1.5.0/qrcode.min.js
   *
   * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
   */
  var qrcode = (function () {
    var t = function (t, r) {
      var e = t,
        n = g[r],
        o = null,
        i = 0,
        a = null,
        u = [],
        f = {},
        c = function (t, r) {
          ;(o = (function (t) {
            for (var r = new Array(t), e = 0; e < t; e += 1) {
              r[e] = new Array(t)
              for (var n = 0; n < t; n += 1) r[e][n] = null
            }
            return r
          })((i = 4 * e + 17))),
            l(0, 0),
            l(i - 7, 0),
            l(0, i - 7),
            s(),
            h(),
            d(t, r),
            e >= 7 && v(t),
            null == a && (a = p(e, n, u)),
            w(a, r)
        },
        l = function (t, r) {
          for (var e = -1; e <= 7; e += 1) if (!(t + e <= -1 || i <= t + e)) for (var n = -1; n <= 7; n += 1) r + n <= -1 || i <= r + n || (o[t + e][r + n] = (0 <= e && e <= 6 && (0 == n || 6 == n)) || (0 <= n && n <= 6 && (0 == e || 6 == e)) || (2 <= e && e <= 4 && 2 <= n && n <= 4))
        },
        h = function () {
          for (var t = 8; t < i - 8; t += 1) null == o[t][6] && (o[t][6] = t % 2 == 0)
          for (var r = 8; r < i - 8; r += 1) null == o[6][r] && (o[6][r] = r % 2 == 0)
        },
        s = function () {
          for (var t = B.getPatternPosition(e), r = 0; r < t.length; r += 1)
            for (var n = 0; n < t.length; n += 1) {
              var i = t[r],
                a = t[n]
              if (null == o[i][a]) for (var u = -2; u <= 2; u += 1) for (var f = -2; f <= 2; f += 1) o[i + u][a + f] = -2 == u || 2 == u || -2 == f || 2 == f || (0 == u && 0 == f)
            }
        },
        v = function (t) {
          for (var r = B.getBCHTypeNumber(e), n = 0; n < 18; n += 1) {
            var a = !t && 1 == ((r >> n) & 1)
            o[Math.floor(n / 3)][(n % 3) + i - 8 - 3] = a
          }
          for (n = 0; n < 18; n += 1) {
            a = !t && 1 == ((r >> n) & 1)
            o[(n % 3) + i - 8 - 3][Math.floor(n / 3)] = a
          }
        },
        d = function (t, r) {
          for (var e = (n << 3) | r, a = B.getBCHTypeInfo(e), u = 0; u < 15; u += 1) {
            var f = !t && 1 == ((a >> u) & 1)
            u < 6 ? (o[u][8] = f) : u < 8 ? (o[u + 1][8] = f) : (o[i - 15 + u][8] = f)
          }
          for (u = 0; u < 15; u += 1) {
            f = !t && 1 == ((a >> u) & 1)
            u < 8 ? (o[8][i - u - 1] = f) : u < 9 ? (o[8][15 - u - 1 + 1] = f) : (o[8][15 - u - 1] = f)
          }
          o[i - 8][8] = !t
        },
        w = function (t, r) {
          for (var e = -1, n = i - 1, a = 7, u = 0, f = B.getMaskFunction(r), c = i - 1; c > 0; c -= 2)
            for (6 == c && (c -= 1); ; ) {
              for (var g = 0; g < 2; g += 1)
                if (null == o[n][c - g]) {
                  var l = !1
                  u < t.length && (l = 1 == ((t[u] >>> a) & 1)), f(n, c - g) && (l = !l), (o[n][c - g] = l), -1 == (a -= 1) && ((u += 1), (a = 7))
                }
              if ((n += e) < 0 || i <= n) {
                ;(n -= e), (e = -e)
                break
              }
            }
        },
        p = function (t, r, e) {
          for (var n = A.getRSBlocks(t, r), o = b(), i = 0; i < e.length; i += 1) {
            var a = e[i]
            o.put(a.getMode(), 4), o.put(a.getLength(), B.getLengthInBits(a.getMode(), t)), a.write(o)
          }
          var u = 0
          for (i = 0; i < n.length; i += 1) u += n[i].dataCount
          if (o.getLengthInBits() > 8 * u) throw 'code length overflow. (' + o.getLengthInBits() + '>' + 8 * u + ')'
          for (o.getLengthInBits() + 4 <= 8 * u && o.put(0, 4); o.getLengthInBits() % 8 != 0; ) o.putBit(!1)
          for (; !(o.getLengthInBits() >= 8 * u || (o.put(236, 8), o.getLengthInBits() >= 8 * u)); ) o.put(17, 8)
          return (function (t, r) {
            for (var e = 0, n = 0, o = 0, i = new Array(r.length), a = new Array(r.length), u = 0; u < r.length; u += 1) {
              var f = r[u].dataCount,
                c = r[u].totalCount - f
              ;(n = Math.max(n, f)), (o = Math.max(o, c)), (i[u] = new Array(f))
              for (var g = 0; g < i[u].length; g += 1) i[u][g] = 255 & t.getBuffer()[g + e]
              e += f
              var l = B.getErrorCorrectPolynomial(c),
                h = k(i[u], l.getLength() - 1).mod(l)
              for (a[u] = new Array(l.getLength() - 1), g = 0; g < a[u].length; g += 1) {
                var s = g + h.getLength() - a[u].length
                a[u][g] = s >= 0 ? h.getAt(s) : 0
              }
            }
            var v = 0
            for (g = 0; g < r.length; g += 1) v += r[g].totalCount
            var d = new Array(v),
              w = 0
            for (g = 0; g < n; g += 1) for (u = 0; u < r.length; u += 1) g < i[u].length && ((d[w] = i[u][g]), (w += 1))
            for (g = 0; g < o; g += 1) for (u = 0; u < r.length; u += 1) g < a[u].length && ((d[w] = a[u][g]), (w += 1))
            return d
          })(o, n)
        }
      ;(f.addData = function (t, r) {
        var e = null
        switch ((r = r || 'Byte')) {
          case 'Numeric':
            e = M(t)
            break
          case 'Alphanumeric':
            e = x(t)
            break
          case 'Byte':
            e = m(t)
            break
          case 'Kanji':
            e = L(t)
            break
          default:
            throw 'mode:' + r
        }
        u.push(e), (a = null)
      }),
        (f.isDark = function (t, r) {
          if (t < 0 || i <= t || r < 0 || i <= r) throw t + ',' + r
          return o[t][r]
        }),
        (f.getModuleCount = function () {
          return i
        }),
        (f.make = function () {
          if (e < 1) {
            for (var t = 1; t < 40; t++) {
              for (var r = A.getRSBlocks(t, n), o = b(), i = 0; i < u.length; i++) {
                var a = u[i]
                o.put(a.getMode(), 4), o.put(a.getLength(), B.getLengthInBits(a.getMode(), t)), a.write(o)
              }
              var g = 0
              for (i = 0; i < r.length; i++) g += r[i].dataCount
              if (o.getLengthInBits() <= 8 * g) break
            }
            e = t
          }
          c(
            !1,
            (function () {
              for (var t = 0, r = 0, e = 0; e < 8; e += 1) {
                c(!0, e)
                var n = B.getLostPoint(f)
                ;(0 == e || t > n) && ((t = n), (r = e))
              }
              return r
            })()
          )
        })
      var y = function (t) {
        for (var r = '', e = 0; e < t.length; e += 1) {
          var n = t.charAt(e)
          switch (n) {
            case '<':
              r += '&lt;'
              break
            case '>':
              r += '&gt;'
              break
            case '&':
              r += '&amp;'
              break
            case '"':
              r += '&quot;'
              break
            default:
              r += n
          }
        }
        return r
      }
      return f
    }
    ;(t.stringToBytes = (t.stringToBytesFuncs = {
      default: function (t) {
        for (var r = [], e = 0; e < t.length; e += 1) {
          var n = t.charCodeAt(e)
          r.push(255 & n)
        }
        return r
      }
    }).default),
      (t.createStringToBytes = function (t, r) {
        var e = (function () {
            for (
              var e = S(t),
                n = function () {
                  var t = e.read()
                  if (-1 == t) throw 'eof'
                  return t
                },
                o = 0,
                i = {};
              ;

            ) {
              var a = e.read()
              if (-1 == a) break
              var u = n(),
                f = (n() << 8) | n()
              ;(i[String.fromCharCode((a << 8) | u)] = f), (o += 1)
            }
            if (o != r) throw o + ' != ' + r
            return i
          })(),
          n = '?'.charCodeAt(0)
        return function (t) {
          for (var r = [], o = 0; o < t.length; o += 1) {
            var i = t.charCodeAt(o)
            if (i < 128) r.push(i)
            else {
              var a = e[t.charAt(o)]
              'number' == typeof a ? ((255 & a) == a ? r.push(a) : (r.push(a >>> 8), r.push(255 & a))) : r.push(n)
            }
          }
          return r
        }
      })
    var r,
      e,
      n,
      o,
      i,
      a = 1,
      u = 2,
      f = 4,
      c = 8,
      g = { L: 1, M: 0, Q: 3, H: 2 },
      l = 0,
      h = 1,
      s = 2,
      v = 3,
      d = 4,
      w = 5,
      p = 6,
      y = 7,
      B =
        ((r = [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170]
        ]),
        (e = 1335),
        (n = 7973),
        (i = function (t) {
          for (var r = 0; 0 != t; ) (r += 1), (t >>>= 1)
          return r
        }),
        ((o = {}).getBCHTypeInfo = function (t) {
          for (var r = t << 10; i(r) - i(e) >= 0; ) r ^= e << (i(r) - i(e))
          return 21522 ^ ((t << 10) | r)
        }),
        (o.getBCHTypeNumber = function (t) {
          for (var r = t << 12; i(r) - i(n) >= 0; ) r ^= n << (i(r) - i(n))
          return (t << 12) | r
        }),
        (o.getPatternPosition = function (t) {
          return r[t - 1]
        }),
        (o.getMaskFunction = function (t) {
          switch (t) {
            case l:
              return function (t, r) {
                return (t + r) % 2 == 0
              }
            case h:
              return function (t, r) {
                return t % 2 == 0
              }
            case s:
              return function (t, r) {
                return r % 3 == 0
              }
            case v:
              return function (t, r) {
                return (t + r) % 3 == 0
              }
            case d:
              return function (t, r) {
                return (Math.floor(t / 2) + Math.floor(r / 3)) % 2 == 0
              }
            case w:
              return function (t, r) {
                return ((t * r) % 2) + ((t * r) % 3) == 0
              }
            case p:
              return function (t, r) {
                return (((t * r) % 2) + ((t * r) % 3)) % 2 == 0
              }
            case y:
              return function (t, r) {
                return (((t * r) % 3) + ((t + r) % 2)) % 2 == 0
              }
            default:
              throw 'bad maskPattern:' + t
          }
        }),
        (o.getErrorCorrectPolynomial = function (t) {
          for (var r = k([1], 0), e = 0; e < t; e += 1) r = r.multiply(k([1, C.gexp(e)], 0))
          return r
        }),
        (o.getLengthInBits = function (t, r) {
          if (1 <= r && r < 10)
            switch (t) {
              case a:
                return 10
              case u:
                return 9
              case f:
              case c:
                return 8
              default:
                throw 'mode:' + t
            }
          else if (r < 27)
            switch (t) {
              case a:
                return 12
              case u:
                return 11
              case f:
                return 16
              case c:
                return 10
              default:
                throw 'mode:' + t
            }
          else {
            if (!(r < 41)) throw 'type:' + r
            switch (t) {
              case a:
                return 14
              case u:
                return 13
              case f:
                return 16
              case c:
                return 12
              default:
                throw 'mode:' + t
            }
          }
        }),
        (o.getLostPoint = function (t) {
          for (var r = t.getModuleCount(), e = 0, n = 0; n < r; n += 1)
            for (var o = 0; o < r; o += 1) {
              for (var i = 0, a = t.isDark(n, o), u = -1; u <= 1; u += 1) if (!(n + u < 0 || r <= n + u)) for (var f = -1; f <= 1; f += 1) o + f < 0 || r <= o + f || (0 == u && 0 == f) || (a == t.isDark(n + u, o + f) && (i += 1))
              i > 5 && (e += 3 + i - 5)
            }
          for (n = 0; n < r - 1; n += 1)
            for (o = 0; o < r - 1; o += 1) {
              var c = 0
              t.isDark(n, o) && (c += 1), t.isDark(n + 1, o) && (c += 1), t.isDark(n, o + 1) && (c += 1), t.isDark(n + 1, o + 1) && (c += 1), (0 != c && 4 != c) || (e += 3)
            }
          for (n = 0; n < r; n += 1) for (o = 0; o < r - 6; o += 1) t.isDark(n, o) && !t.isDark(n, o + 1) && t.isDark(n, o + 2) && t.isDark(n, o + 3) && t.isDark(n, o + 4) && !t.isDark(n, o + 5) && t.isDark(n, o + 6) && (e += 40)
          for (o = 0; o < r; o += 1) for (n = 0; n < r - 6; n += 1) t.isDark(n, o) && !t.isDark(n + 1, o) && t.isDark(n + 2, o) && t.isDark(n + 3, o) && t.isDark(n + 4, o) && !t.isDark(n + 5, o) && t.isDark(n + 6, o) && (e += 40)
          var g = 0
          for (o = 0; o < r; o += 1) for (n = 0; n < r; n += 1) t.isDark(n, o) && (g += 1)
          return (e += (Math.abs((100 * g) / r / r - 50) / 5) * 10)
        }),
        o),
      C = (function () {
        for (var t = new Array(256), r = new Array(256), e = 0; e < 8; e += 1) t[e] = 1 << e
        for (e = 8; e < 256; e += 1) t[e] = t[e - 4] ^ t[e - 5] ^ t[e - 6] ^ t[e - 8]
        for (e = 0; e < 255; e += 1) r[t[e]] = e
        var n = {
          glog: function (t) {
            if (t < 1) throw 'glog(' + t + ')'
            return r[t]
          },
          gexp: function (r) {
            for (; r < 0; ) r += 255
            for (; r >= 256; ) r -= 255
            return t[r]
          }
        }
        return n
      })()
    function k(t, r) {
      if (void 0 === t.length) throw t.length + '/' + r
      var e = (function () {
          for (var e = 0; e < t.length && 0 == t[e]; ) e += 1
          for (var n = new Array(t.length - e + r), o = 0; o < t.length - e; o += 1) n[o] = t[o + e]
          return n
        })(),
        n = {
          getAt: function (t) {
            return e[t]
          },
          getLength: function () {
            return e.length
          },
          multiply: function (t) {
            for (var r = new Array(n.getLength() + t.getLength() - 1), e = 0; e < n.getLength(); e += 1) for (var o = 0; o < t.getLength(); o += 1) r[e + o] ^= C.gexp(C.glog(n.getAt(e)) + C.glog(t.getAt(o)))
            return k(r, 0)
          },
          mod: function (t) {
            if (n.getLength() - t.getLength() < 0) return n
            for (var r = C.glog(n.getAt(0)) - C.glog(t.getAt(0)), e = new Array(n.getLength()), o = 0; o < n.getLength(); o += 1) e[o] = n.getAt(o)
            for (o = 0; o < t.getLength(); o += 1) e[o] ^= C.gexp(C.glog(t.getAt(o)) + r)
            return k(e, 0).mod(t)
          }
        }
      return n
    }
    var A = (function () {
        var t = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12, 7, 37, 13],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
          ],
          r = function (t, r) {
            var e = {}
            return (e.totalCount = t), (e.dataCount = r), e
          },
          e = {}
        return (
          (e.getRSBlocks = function (e, n) {
            var o = (function (r, e) {
              switch (e) {
                case g.L:
                  return t[4 * (r - 1) + 0]
                case g.M:
                  return t[4 * (r - 1) + 1]
                case g.Q:
                  return t[4 * (r - 1) + 2]
                case g.H:
                  return t[4 * (r - 1) + 3]
                default:
                  return
              }
            })(e, n)
            if (void 0 === o) throw 'bad rs block @ typeNumber:' + e + '/errorCorrectionLevel:' + n
            for (var i = o.length / 3, a = [], u = 0; u < i; u += 1) for (var f = o[3 * u + 0], c = o[3 * u + 1], l = o[3 * u + 2], h = 0; h < f; h += 1) a.push(r(c, l))
            return a
          }),
          e
        )
      })(),
      b = function () {
        var t = [],
          r = 0,
          e = {
            getBuffer: function () {
              return t
            },
            getAt: function (r) {
              var e = Math.floor(r / 8)
              return 1 == ((t[e] >>> (7 - (r % 8))) & 1)
            },
            put: function (t, r) {
              for (var n = 0; n < r; n += 1) e.putBit(1 == ((t >>> (r - n - 1)) & 1))
            },
            getLengthInBits: function () {
              return r
            },
            putBit: function (e) {
              var n = Math.floor(r / 8)
              t.length <= n && t.push(0), e && (t[n] |= 128 >>> r % 8), (r += 1)
            }
          }
        return e
      },
      M = function (t) {
        var r = a,
          e = t,
          n = {
            getMode: function () {
              return r
            },
            getLength: function (t) {
              return e.length
            },
            write: function (t) {
              for (var r = e, n = 0; n + 2 < r.length; ) t.put(o(r.substring(n, n + 3)), 10), (n += 3)
              n < r.length && (r.length - n == 1 ? t.put(o(r.substring(n, n + 1)), 4) : r.length - n == 2 && t.put(o(r.substring(n, n + 2)), 7))
            }
          },
          o = function (t) {
            for (var r = 0, e = 0; e < t.length; e += 1) r = 10 * r + i(t.charAt(e))
            return r
          },
          i = function (t) {
            if ('0' <= t && t <= '9') return t.charCodeAt(0) - '0'.charCodeAt(0)
            throw 'illegal char :' + t
          }
        return n
      },
      x = function (t) {
        var r = u,
          e = t,
          n = {
            getMode: function () {
              return r
            },
            getLength: function (t) {
              return e.length
            },
            write: function (t) {
              for (var r = e, n = 0; n + 1 < r.length; ) t.put(45 * o(r.charAt(n)) + o(r.charAt(n + 1)), 11), (n += 2)
              n < r.length && t.put(o(r.charAt(n)), 6)
            }
          },
          o = function (t) {
            if ('0' <= t && t <= '9') return t.charCodeAt(0) - '0'.charCodeAt(0)
            if ('A' <= t && t <= 'Z') return t.charCodeAt(0) - 'A'.charCodeAt(0) + 10
            switch (t) {
              case ' ':
                return 36
              case '$':
                return 37
              case '%':
                return 38
              case '*':
                return 39
              case '+':
                return 40
              case '-':
                return 41
              case '.':
                return 42
              case '/':
                return 43
              case ':':
                return 44
              default:
                throw 'illegal char :' + t
            }
          }
        return n
      },
      m = function (r) {
        var e = f,
          n = t.stringToBytes(r),
          o = {
            getMode: function () {
              return e
            },
            getLength: function (t) {
              return n.length
            },
            write: function (t) {
              for (var r = 0; r < n.length; r += 1) t.put(n[r], 8)
            }
          }
        return o
      },
      L = function (r) {
        var e = c,
          n = t.stringToBytesFuncs.SJIS
        if (!n) throw 'sjis not supported.'
        !(function () {
          var t = n('友')
          if (2 != t.length || 38726 != ((t[0] << 8) | t[1])) throw 'sjis not supported.'
        })()
        var o = n(r),
          i = {
            getMode: function () {
              return e
            },
            getLength: function (t) {
              return ~~(o.length / 2)
            },
            write: function (t) {
              for (var r = o, e = 0; e + 1 < r.length; ) {
                var n = ((255 & r[e]) << 8) | (255 & r[e + 1])
                if (33088 <= n && n <= 40956) n -= 33088
                else {
                  if (!(57408 <= n && n <= 60351)) throw 'illegal char at ' + (e + 1) + '/' + n
                  n -= 49472
                }
                ;(n = 192 * ((n >>> 8) & 255) + (255 & n)), t.put(n, 13), (e += 2)
              }
              if (e < r.length) throw 'illegal char at ' + (e + 1)
            }
          }
        return i
      },
      D = function () {
        var t = [],
          r = {
            writeByte: function (r) {
              t.push(255 & r)
            },
            writeShort: function (t) {
              r.writeByte(t), r.writeByte(t >>> 8)
            },
            writeBytes: function (t, e, n) {
              ;(e = e || 0), (n = n || t.length)
              for (var o = 0; o < n; o += 1) r.writeByte(t[o + e])
            },
            writeString: function (t) {
              for (var e = 0; e < t.length; e += 1) r.writeByte(t.charCodeAt(e))
            },
            toByteArray: function () {
              return t
            },
            toString: function () {
              var r = ''
              r += '['
              for (var e = 0; e < t.length; e += 1) e > 0 && (r += ','), (r += t[e])
              return (r += ']')
            }
          }
        return r
      },
      S = function (t) {
        var r = t,
          e = 0,
          n = 0,
          o = 0,
          i = {
            read: function () {
              for (; o < 8; ) {
                if (e >= r.length) {
                  if (0 == o) return -1
                  throw 'unexpected end of file./' + o
                }
                var t = r.charAt(e)
                if (((e += 1), '=' == t)) return (o = 0), -1
                t.match(/^\s$/) || ((n = (n << 6) | a(t.charCodeAt(0))), (o += 6))
              }
              var i = (n >>> (o - 8)) & 255
              return (o -= 8), i
            }
          },
          a = function (t) {
            if (65 <= t && t <= 90) return t - 65
            if (97 <= t && t <= 122) return t - 97 + 26
            if (48 <= t && t <= 57) return t - 48 + 52
            if (43 == t) return 62
            if (47 == t) return 63
            throw 'c:' + t
          }
        return i
      },
      I = function (t, r, e) {
        for (
          var n = (function (t, r) {
              var e = t,
                n = r,
                o = new Array(t * r),
                i = {
                  setPixel: function (t, r, n) {
                    o[r * e + t] = n
                  },
                  write: function (t) {
                    t.writeString('GIF87a'),
                      t.writeShort(e),
                      t.writeShort(n),
                      t.writeByte(128),
                      t.writeByte(0),
                      t.writeByte(0),
                      t.writeByte(0),
                      t.writeByte(0),
                      t.writeByte(0),
                      t.writeByte(255),
                      t.writeByte(255),
                      t.writeByte(255),
                      t.writeString(','),
                      t.writeShort(0),
                      t.writeShort(0),
                      t.writeShort(e),
                      t.writeShort(n),
                      t.writeByte(0)
                    var r = a(2)
                    t.writeByte(2)
                    for (var o = 0; r.length - o > 255; ) t.writeByte(255), t.writeBytes(r, o, 255), (o += 255)
                    t.writeByte(r.length - o), t.writeBytes(r, o, r.length - o), t.writeByte(0), t.writeString(';')
                  }
                },
                a = function (t) {
                  for (var r = 1 << t, e = 1 + (1 << t), n = t + 1, i = u(), a = 0; a < r; a += 1) i.add(String.fromCharCode(a))
                  i.add(String.fromCharCode(r)), i.add(String.fromCharCode(e))
                  var f,
                    c,
                    g,
                    l = D(),
                    h =
                      ((f = l),
                      (c = 0),
                      (g = 0),
                      {
                        write: function (t, r) {
                          if (t >>> r != 0) throw 'length over'
                          for (; c + r >= 8; ) f.writeByte(255 & ((t << c) | g)), (r -= 8 - c), (t >>>= 8 - c), (g = 0), (c = 0)
                          ;(g |= t << c), (c += r)
                        },
                        flush: function () {
                          c > 0 && f.writeByte(g)
                        }
                      })
                  h.write(r, n)
                  var s = 0,
                    v = String.fromCharCode(o[s])
                  for (s += 1; s < o.length; ) {
                    var d = String.fromCharCode(o[s])
                    ;(s += 1), i.contains(v + d) ? (v += d) : (h.write(i.indexOf(v), n), i.size() < 4095 && (i.size() == 1 << n && (n += 1), i.add(v + d)), (v = d))
                  }
                  return h.write(i.indexOf(v), n), h.write(e, n), h.flush(), l.toByteArray()
                },
                u = function () {
                  var t = {},
                    r = 0,
                    e = {
                      add: function (n) {
                        if (e.contains(n)) throw 'dup key:' + n
                        ;(t[n] = r), (r += 1)
                      },
                      size: function () {
                        return r
                      },
                      indexOf: function (r) {
                        return t[r]
                      },
                      contains: function (r) {
                        return void 0 !== t[r]
                      }
                    }
                  return e
                }
              return i
            })(t, r),
            o = 0;
          o < r;
          o += 1
        )
          for (var i = 0; i < t; i += 1) n.setPixel(i, o, e(i, o))
        var a = D()
        n.write(a)
        for (
          var u = (function () {
              var t = 0,
                r = 0,
                e = 0,
                n = '',
                o = {},
                i = function (t) {
                  n += String.fromCharCode(a(63 & t))
                },
                a = function (t) {
                  if (t < 0);
                  else {
                    if (t < 26) return 65 + t
                    if (t < 52) return t - 26 + 97
                    if (t < 62) return t - 52 + 48
                    if (62 == t) return 43
                    if (63 == t) return 47
                  }
                  throw 'n:' + t
                }
              return (
                (o.writeByte = function (n) {
                  for (t = (t << 8) | (255 & n), r += 8, e += 1; r >= 6; ) i(t >>> (r - 6)), (r -= 6)
                }),
                (o.flush = function () {
                  if ((r > 0 && (i(t << (6 - r)), (t = 0), (r = 0)), e % 3 != 0)) for (var o = 3 - (e % 3), a = 0; a < o; a += 1) n += '='
                }),
                (o.toString = function () {
                  return n
                }),
                o
              )
            })(),
            f = a.toByteArray(),
            c = 0;
          c < f.length;
          c += 1
        )
          u.writeByte(f[c])
        return u.flush(), 'data:image/gif;base64,' + u
      }
    return t
  })()
  // ==QRCode Library End==
  // 配置项
  const BORDER_WIDTH = '6px' // 二维码配置项：根据内容长度自动选择尺寸
  const QR_CONFIG = {
    L: { sizes: [256, 384, 512, 640], thresholds: [0, 260, 620, 1170] },
    M: { sizes: [256, 384, 512, 640], thresholds: [0, 200, 500, 915] },
    Q: { sizes: [256, 384, 512, 640], thresholds: [0, 150, 370, 680] },
    H: { sizes: [256, 384, 512, 640], thresholds: [0, 115, 280, 520] }
  }
  // 默认纠错等级，可切换
  let QR_ERROR_LEVEL = 'M'

  // 根据内容长度和当前纠错等级选择二维码尺寸
  function getAutoQRSize(textLength) {
    const conf = QR_CONFIG[QR_ERROR_LEVEL]
    for (let i = conf.thresholds.length - 1; i >= 0; i--) {
      if (textLength >= conf.thresholds[i]) {
        return conf.sizes[i]
      }
    }
    return conf.sizes[0]
  }
  // 添加样式
  GM_addStyle(`
        #gm-qrcode-container-enhanced {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.65);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2147483647;
            cursor: pointer;
        }
        #gm-qrcode-box-enhanced {
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            text-align: center;
            cursor: default;
            position: relative;
            background-color: white;
        }
        #gm-qrcode-title-enhanced {
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 15px 0;
            color: #333;
        }
        #gm-qrcode-canvas-wrapper-enhanced {
            padding: ${BORDER_WIDTH};
            border-radius: 5px;
            display: inline-block;
            line-height: 0;
            background-color: white;
        }
        #gm-qrcode-close-btn-enhanced {
            position: absolute;
            top: -12px;
            right: -12px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            cursor: pointer;
            border: 2px solid white;
            background-color: #333;
            color: white;
            transition: background-color 0.2s;
        }
        #gm-qrcode-close-btn-enhanced:hover {
            background-color: #ff4d4d;
        }
        #gm-qrcode-content-enhanced {
            font-size: 12px;
            color: #666;
            margin-top: 10px;
            word-break: break-all;
            max-height: 60px;
            overflow-y: auto;
        }
        #gm-qrcode-float-btn-enhanced {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2147483647;
            background: #333;
            color: #fff;
            padding: 12px 18px;
            border-radius: 8px 0 0 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0.85;
            user-select: none;
            transition: background 0.2s, opacity 0.2s;
        }
        #gm-qrcode-float-btn-enhanced:hover {
            background: #ff4d4d;
            opacity: 1;
        }
    `)

  // 移除深色模式适配样式，始终黑底白图标
  GM_addStyle(`
      #gm-qrcode-float-btn-enhanced {
        background: #222 !important;
        color: #fff !important;
      }
      #gm-qrcode-float-btn-enhanced .gm-qrcode-float-btn-icon path {
        fill: #fff !important;
      }
      #gm-qrcode-float-btn-enhanced:hover {
        background: #ff4d4d !important;
        color: #fff !important;
      }
    `)

  // 获取选中的文本
  function getSelectedText() {
    if (window.getSelection) {
      return window.getSelection().toString()
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange().text
    }
    return ''
  }
  // 创建二维码
  function createQRCode(text, title) {
    // 移除已存在的二维码容器
    const existingContainer = document.getElementById('gm-qrcode-container-enhanced')
    if (existingContainer) {
      existingContainer.remove()
    }

    // 创建容器
    const container = document.createElement('div')
    container.id = 'gm-qrcode-container-enhanced'

    // 创建弹窗盒子
    const box = document.createElement('div')
    box.id = 'gm-qrcode-box-enhanced'

    // 创建标题
    const titleElement = document.createElement('div')
    titleElement.id = 'gm-qrcode-title-enhanced'
    titleElement.textContent = title

    // 创建二维码包装器
    const wrapper = document.createElement('div')
    wrapper.id = 'gm-qrcode-canvas-wrapper-enhanced'

    // 设置白边宽度
    const BORDER = 8
    // 动态选择二维码尺寸
    const QR_SIZE = getAutoQRSize(text.length)
    // 创建canvas元素，尺寸包含白边
    const qrCanvas = document.createElement('canvas')
    qrCanvas.width = QR_SIZE + BORDER * 2
    qrCanvas.height = QR_SIZE + BORDER * 2
    qrCanvas.style.width = qrCanvas.width + 'px'
    qrCanvas.style.height = qrCanvas.height + 'px'
    qrCanvas.style.display = 'block'

    // 创建关闭按钮
    const closeBtn = document.createElement('div')
    closeBtn.id = 'gm-qrcode-close-btn-enhanced'
    closeBtn.innerHTML = '×'

    // 创建内容显示区域
    const contentDiv = document.createElement('div')
    contentDiv.id = 'gm-qrcode-content-enhanced'
    contentDiv.textContent = text.length > 100 ? text.substring(0, 100) + '...' : text
    // 动态设置内容区宽度与二维码一致
    contentDiv.style.width = QR_SIZE + 'px'

    // 本地生成二维码
    try {
      // 依赖 qrcode-generator 库
      // 纠错等级：L，M（默认），Q，H
      // 强制使用 UTF-8 字节模式，解决中文二维码乱码

      // 添加UTF-8编码函数
      qrcode.stringToBytesFuncs = qrcode.stringToBytesFuncs || {}
      qrcode.stringToBytesFuncs['UTF-8'] = function (str) {
        var bytes = []
        for (var i = 0; i < str.length; i++) {
          var charCode = str.charCodeAt(i)
          if (charCode < 0x80) {
            bytes.push(charCode)
          } else if (charCode < 0x800) {
            bytes.push(0xc0 | (charCode >> 6))
            bytes.push(0x80 | (charCode & 0x3f))
          } else if (charCode < 0xd800 || charCode >= 0xe000) {
            bytes.push(0xe0 | (charCode >> 12))
            bytes.push(0x80 | ((charCode >> 6) & 0x3f))
            bytes.push(0x80 | (charCode & 0x3f))
          } else {
            // 处理代理对 (surrogate pairs)
            i++
            var nextCharCode = str.charCodeAt(i)
            var codePoint = 0x10000 + (((charCode & 0x3ff) << 10) | (nextCharCode & 0x3ff))
            bytes.push(0xf0 | (codePoint >> 18))
            bytes.push(0x80 | ((codePoint >> 12) & 0x3f))
            bytes.push(0x80 | ((codePoint >> 6) & 0x3f))
            bytes.push(0x80 | (codePoint & 0x3f))
          }
        }
        return bytes
      }

      // 设置使用UTF-8编码
      qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8']
      var qr = qrcode(0, QR_ERROR_LEVEL)
      qr.addData(text, 'Byte')
      qr.make()
      var ctx = qrCanvas.getContext('2d')
      // cellSize 保持浮点数，二维码始终铺满 QR_SIZE 区域
      var cellSize = QR_SIZE / qr.getModuleCount()
      var offset = BORDER // 只用白边偏移
      // 先绘制白色背景
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height)
      for (var row = 0; row < qr.getModuleCount(); row++) {
        for (var col = 0; col < qr.getModuleCount(); col++) {
          ctx.fillStyle = qr.isDark(row, col) ? '#000' : '#fff'
          ctx.fillRect(offset + col * cellSize, offset + row * cellSize, cellSize, cellSize)
        }
      }
      wrapper.appendChild(qrCanvas)
    } catch (e) {
      wrapper.innerHTML = '<div style="width: ' + QR_SIZE + 'px; height: ' + QR_SIZE + 'px; display: flex; align-items: center; justify-content: center; background: #f0f0f0; color: #666;">二维码生成失败</div>'
    }

    box.appendChild(titleElement)
    box.appendChild(wrapper)
    box.appendChild(contentDiv)
    box.appendChild(closeBtn)
    container.appendChild(box)
    document.body.appendChild(container)

    // 添加事件监听器
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation()
      container.remove()
    })

    container.addEventListener('click', function (e) {
      if (e.target === container) {
        container.remove()
      }
    })

    // 阻止弹窗内部点击事件冒泡
    box.addEventListener('click', function (e) {
      e.stopPropagation()
    })

    // 添加键盘事件监听
    const keyHandler = function (e) {
      if (e.key === 'Escape') {
        container.remove()
        document.removeEventListener('keydown', keyHandler)
      }
    }
    document.addEventListener('keydown', keyHandler)
  }

  // 添加右侧中部按钮
  function addQRCodeButton() {
    if (document.getElementById('gm-qrcode-float-btn-enhanced')) return
    const btn = document.createElement('div')
    btn.id = 'gm-qrcode-float-btn-enhanced'
    btn.innerHTML = `
      <svg class="gm-qrcode-float-btn-icon" width="24" height="24" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <path d="M384 928 192 928c-52.928 0-96-43.072-96-96l0-192c0-52.928 43.072-96 96-96l192 0c52.928 0 96 43.072 96 96l0 192C480 884.928 436.928 928 384 928zM192 608c-17.632 0-32 14.336-32 32l0 192c0 17.664 14.368 32 32 32l192 0c17.632 0 32-14.336 32-32l0-192c0-17.664-14.368-32-32-32L192 608zM736 896c-17.696 0-32-14.304-32-32l0-64c0-17.696 14.304-32 32-32s32 14.304 32 32l0 64C768 881.696 753.696 896 736 896zM864 896c-17.696 0-32-14.304-32-32l0-96c0-17.696 14.304-32 32-32s32 14.304 32 32l0 96C896 881.696 881.696 896 864 896zM864 672c-17.696 0-32-14.304-32-32l0-64c0-17.696 14.304-32 32-32s32 14.304 32 32l0 64C896 657.696 881.696 672 864 672zM736 736c-17.696 0-32-14.304-32-32l0-128c0-17.696 14.304-32 32-32s32 14.304 32 32l0 128C768 721.696 753.696 736 736 736zM608 896c-17.696 0-32-14.304-32-32l0-128c0-17.696 14.304-32 32-32s32 14.304 32 32l0 128C640 881.696 625.696 896 608 896zM608 640c-17.696 0-32-14.304-32-32l0-32c0-17.696 14.304-32 32-32s32 14.304 32 32l0 32C640 625.696 625.696 640 608 640zM320 800 256 800c-17.664 0-32-14.304-32-32l0-64c0-17.696 14.336-32 32-32l64 0c17.664 0 32 14.304 32 32l0 64C352 785.696 337.664 800 320 800zM384 480 192 480c-52.928 0-96-43.072-96-96L96 192c0-52.928 43.072-96 96-96l192 0c52.928 0 96 43.072 96 96l0 192C480 436.928 436.928 480 384 480zM192 160C174.368 160 160 174.368 160 192l0 192c0 17.632 14.368 32 32 32l192 0c17.632 0 32-14.368 32-32L416 192c0-17.632-14.368-32-32-32L192 160zM320 352 256 352c-17.664 0-32-14.336-32-32L224 256c0-17.664 14.336-32 32-32l64 0c17.664 0 32 14.336 32 32l0 64C352 337.664 337.664 352 320 352zM832 480l-192 0c-52.928 0-96-43.072-96-96L544 192c0-52.928 43.072-96 96-96l192 0c52.928 0 96 43.072 96 96l0 192C928 436.928 884.928 480 832 480zM640 160c-17.664 0-32 14.368-32 32l0 192c0 17.632 14.336 32 32 32l192 0c17.664 0 32-14.368 32-32L864 192c0-17.632-14.336-32-32-32L640 160zM768 352l-64 0c-17.696 0-32-14.336-32-32L672 256c0-17.664 14.304-32 32-32l64 0c17.696 0 32 14.336 32 32l0 64C800 337.664 785.696 352 768 352z" fill="currentColor"></path>
      </svg>
    `
    btn.title = '点击生成二维码 (同 Shift+Alt+Q)'
    btn.style.position = 'fixed'
    btn.style.right = '0'
    btn.style.top = '50%'
    btn.style.transform = 'translateY(-50%)'
    btn.style.zIndex = '2147483647'
    btn.style.background = '#333'
    btn.style.color = '#fff'
    btn.style.padding = '12px 18px'
    btn.style.borderRadius = '8px 0 0 8px'
    btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
    btn.style.fontSize = '16px'
    btn.style.fontWeight = 'bold'
    btn.style.cursor = 'pointer'
    btn.style.opacity = '0.85'
    btn.style.userSelect = 'none'
    btn.style.transition = 'background 0.2s, opacity 0.2s'
    btn.onmouseenter = () => {
      btn.style.background = '#ff4d4d'
      btn.style.opacity = '1'
    }
    btn.onmouseleave = () => {
      btn.style.background = '#333'
      btn.style.opacity = '0.85'
    }
    btn.onclick = function (e) {
      e.preventDefault()
      e.stopPropagation()
      const selectedText = getSelectedText().trim()
      if (selectedText) {
        createQRCode(selectedText, '选中内容二维码')
      } else {
        createQRCode(window.location.href, '当前网址二维码')
      }
    }
    document.body.appendChild(btn)
  }
  // 页面加载后添加按钮
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addQRCodeButton)
  } else {
    addQRCodeButton()
  }

  // 键盘事件监听
  document.addEventListener('keydown', function (e) {
    // 检查是否按下了 Shift + Alt + Q
    if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'q') {
      e.preventDefault()
      e.stopPropagation()

      const selectedText = getSelectedText().trim()

      if (selectedText) {
        // 如果有选中内容，为选中内容生成二维码
        createQRCode(selectedText, '选中内容二维码')
      } else {
        // 如果没有选中内容，为当前网址生成二维码
        createQRCode(window.location.href, '当前网址二维码')
      }
    }
  })

  // 监听选区变化，动态调整二维码按钮位置和样式
  function updateQRCodeButtonPosition() {
    const btn = document.getElementById('gm-qrcode-float-btn-enhanced')
    if (!btn) return
    const sel = window.getSelection()
    const selectedText = sel && sel.toString().trim()
    if (selectedText) {
      // 有选中内容，按钮跟随选区最后一行最后一个字，若该节点被吸顶/吸底则按钮也吸附
      let rect = null,
        anchorNode = null,
        anchorOffset = null,
        anchorElem = null
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0)
        anchorNode = range.endContainer
        anchorOffset = range.endOffset

        // 尝试将 range 收缩到末尾一个字符
        let endRange = range.cloneRange()
        if (!endRange.collapsed && anchorNode.nodeType === 3 && anchorOffset > 0) {
          endRange.setStart(anchorNode, anchorOffset - 1)
        }
        rect = endRange.getBoundingClientRect()
        // 若末尾字符不可用（如选中的是图片或空白），则回退用原range
        if ((!rect || rect.width === 0) && range.getBoundingClientRect) {
          rect = range.getBoundingClientRect()
        }
        // 获取锚定元素（吸顶/吸底元素）
        if (anchorNode.nodeType === 3) {
          anchorElem = anchorNode.parentElement
        } else if (anchorNode.nodeType === 1) {
          anchorElem = anchorNode
        }
      }
      // 检查锚定元素是否吸附（fixed/sticky）
      let isFixedOrSticky = false,
        anchorRect = null
      if (anchorElem) {
        const style = window.getComputedStyle(anchorElem)
        if (style.position === 'fixed' || style.position === 'sticky') {
          isFixedOrSticky = true
          anchorRect = anchorElem.getBoundingClientRect()
        }
      }
      if (rect && rect.width >= 0 && rect.height >= 0) {
        if (isFixedOrSticky && anchorRect) {
          // 吸顶/吸底时，按钮用fixed定位，锚定在元素右下角
          btn.style.position = 'fixed'
          btn.style.left = Math.min(anchorRect.right + 8, window.innerWidth - 36) + 'px'
          btn.style.top = Math.min(anchorRect.bottom + 8, window.innerHeight - 36) + 'px'
        } else {
          // 正常跟随选区
          btn.style.position = 'absolute'
          const scrollX = window.scrollX || window.pageXOffset
          const scrollY = window.scrollY || window.pageYOffset
          btn.style.left = Math.min(rect.right + 8 + scrollX, scrollX + window.innerWidth - 36) + 'px'
          btn.style.top = Math.min(rect.bottom + 8 + scrollY, scrollY + window.innerHeight - 36) + 'px'
        }
        btn.style.right = ''
        btn.style.transform = 'none'
        btn.style.width = '32px'
        btn.style.height = '32px'
        btn.style.padding = '0'
        btn.style.borderRadius = '8px'
        btn.style.display = 'flex'
        btn.style.alignItems = 'center'
        btn.style.justifyContent = 'center'
        btn.style.fontSize = '18px'
        btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18)'
        btn.style.opacity = '1'
        btn.style.background = '#222'
      }
    } else {
      // 无选中内容，恢复原样
      btn.style.position = 'fixed'
      btn.style.right = '0'
      btn.style.top = '50%'
      btn.style.left = ''
      btn.style.transform = 'translateY(-50%)'
      btn.style.width = ''
      btn.style.height = ''
      btn.style.padding = '12px 18px'
      btn.style.borderRadius = '8px 0 0 8px'
      btn.style.display = ''
      btn.style.alignItems = ''
      btn.style.justifyContent = ''
      btn.style.fontSize = '16px'
      btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
      btn.style.opacity = '0.85'
      btn.style.background = ''
    }
  }
  document.addEventListener('selectionchange', updateQRCodeButtonPosition)
  // 页面加载后也要初始化一次
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateQRCodeButtonPosition)
  } else {
    updateQRCodeButtonPosition()
  }
  // 监听滚动和窗口变化，保证按钮实时跟随
  window.addEventListener('scroll', updateQRCodeButtonPosition, true)
  window.addEventListener('resize', updateQRCodeButtonPosition, true)

  console.log('二维码生成器已加载，按 Shift+Alt+Q 生成二维码')
})()
