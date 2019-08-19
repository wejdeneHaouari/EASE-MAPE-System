//tealium universal tag - utag.loader ut4.0.201906201530, Copyright 2019 Tealium.com Inc. All Rights Reserved.
var utag_condload = false;
try {
    (function () {
        function ul(src, a, b) {
            a = document;
            b = a.createElement('script');
            b.language = 'javascript';
            b.type = 'text/javascript';
            b.src = src;
            a.getElementsByTagName('head')[0].appendChild(b)
        };
        if (("" + document.cookie).match("utag_env_ieeexplore_main=(\/\/tags\.tiqcdn\.com\/utag\/ieeexplore\/[^\S;]*)")) {
            if (RegExp.$1.indexOf("/prod/") === -1) {
                var s = RegExp.$1;
                while (s.indexOf("%") != -1) {
                    s = decodeURIComponent(s);
                }
                s = s.replace(/\.\./g, "");
                ul(s);
                utag_condload = true;
                __tealium_default_path = '//tags.tiqcdn.com/utag/ieeexplore/main/prod/';
            }
        }
    })();
} catch (e) {
}
;
try {
    (function (a, b, c) {
        if (typeof utag_data == 'undefined') utag_data = {};
        a = location.pathname.split('/');
        b = (a.length > 9) ? 9 : a.length;
        for (c = 1; c < b; c++) {
            utag_data['_pathname' + c] = (typeof a[c] != 'undefined') ? a[c] : ''
        }
    })();
} catch (e) {
}
;
if (typeof utag == "undefined" && !utag_condload) {
    var utag = {
        id: "ieeexplore.main", o: {}, sender: {}, send: {}, rpt: {ts: {a: new Date()}}, dbi: [], db_log: [], loader: {
            q: [],
            lc: 0,
            f: {},
            p: 0,
            ol: 0,
            wq: [],
            lq: [],
            bq: {},
            bk: {},
            rf: 0,
            ri: 0,
            rp: 0,
            rq: [],
            ready_q: [],
            sendq: {"pending": 0},
            run_ready_q: function () {
                for (var i = 0; i < utag.loader.ready_q.length; i++) {
                    utag.DB("READY_Q:" + i);
                    try {
                        utag.loader.ready_q[i]()
                    } catch (e) {
                        utag.DB(e)
                    }
                    ;
                }
            },
            lh: function (a, b, c) {
                a = "" + location.hostname;
                b = a.split(".");
                c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\./.test(a)) ? 3 : 2;
                return b.splice(b.length - c, c).join(".");
            },
            WQ: function (a, b, c, d, g) {
                utag.DB('WQ:' + utag.loader.wq.length);
                try {
                    if (utag.udoname && utag.udoname.indexOf(".") < 0) {
                        utag.ut.merge(utag.data, window[utag.udoname], 0);
                    }
                    if (utag.cfg.load_rules_at_wait) {
                        utag.handler.LR(utag.data);
                    }
                } catch (e) {
                    utag.DB(e)
                }
                ;d = 0;
                g = [];
                for (a = 0; a < utag.loader.wq.length; a++) {
                    b = utag.loader.wq[a];
                    b.load = utag.loader.cfg[b.id].load;
                    if (b.load == 4) {
                        this.f[b.id] = 0;
                        utag.loader.LOAD(b.id)
                    } else if (b.load > 0) {
                        g.push(b);
                        d++;
                    } else {
                        this.f[b.id] = 1;
                    }
                }
                for (a = 0; a < g.length; a++) {
                    utag.loader.AS(g[a]);
                }
                if (d == 0) {
                    utag.loader.END();
                }
            },
            AS: function (a, b, c, d) {
                utag.send[a.id] = a;
                if (typeof a.src == 'undefined') {
                    a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
                }
                a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v ? utag.cfg.template + a.v : utag.cfg.v);
                utag.rpt['l_' + a.id] = a.src;
                b = document;
                this.f[a.id] = 0;
                if (a.load == 2) {
                    utag.DB("Attach sync: " + a.src);
                    a.uid = a.id;
                    b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
                    if (typeof a.cb != 'undefined') a.cb();
                } else if (a.load == 1 || a.load == 3) {
                    if (b.createElement) {
                        c = 'utag_ieeexplore.main_' + a.id;
                        if (!b.getElementById(c)) {
                            d = {src: a.src, id: c, uid: a.id, loc: a.loc}
                            if (a.load == 3) {
                                d.type = "iframe"
                            }
                            ;
                            if (typeof a.cb != 'undefined') d.cb = a.cb;
                            utag.ut.loader(d);
                        }
                    }
                }
            },
            GV: function (a, b, c) {
                b = {};
                for (c in a) {
                    if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
                }
                return b
            },
            OU: function (a, b, c, d, f) {
                try {
                    if (typeof utag.data['cp.OPTOUTMULTI'] != 'undefined') {
                        c = utag.loader.cfg;
                        a = utag.ut.decode(utag.data['cp.OPTOUTMULTI']).split('|');
                        for (d = 0; d < a.length; d++) {
                            b = a[d].split(':');
                            if (b[1] * 1 !== 0) {
                                if (b[0].indexOf('c') == 0) {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tcat == b[0].substring(1)) c[f].load = 0
                                    }
                                } else if (b[0] * 1 == 0) {
                                    utag.cfg.nocookie = true
                                } else {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tid == b[0]) c[f].load = 0
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            },
            RDdom: function (o) {
                var d = document || {}, l = location || {};
                o["dom.referrer"] = d.referrer;
                o["dom.title"] = "" + d.title;
                o["dom.domain"] = "" + l.hostname;
                o["dom.query_string"] = ("" + l.search).substring(1);
                o["dom.hash"] = ("" + l.hash).substring(1);
                o["dom.url"] = "" + d.URL;
                o["dom.pathname"] = "" + l.pathname;
                o["dom.viewport_height"] = window.innerHeight || (d.documentElement ? d.documentElement.clientHeight : 960);
                o["dom.viewport_width"] = window.innerWidth || (d.documentElement ? d.documentElement.clientWidth : 960);
            },
            RDcp: function (o, b, c, d) {
                b = utag.loader.RC();
                for (d in b) {
                    if (d.match(/utag_(.*)/)) {
                        for (c in utag.loader.GV(b[d])) {
                            o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
                        }
                    }
                }
                for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
                    if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
                }
            },
            RDqp: function (o, a, b, c) {
                a = location.search + (location.hash + '').replace("#", "&");
                if (utag.cfg.lowerqp) {
                    a = a.toLowerCase()
                }
                ;
                if (a.length > 1) {
                    b = a.substring(1).split('&');
                    for (a = 0; a < b.length; a++) {
                        c = b[a].split("=");
                        if (c.length > 1) {
                            o["qp." + c[0]] = utag.ut.decode(c[1])
                        }
                    }
                }
            },
            RDmeta: function (o, a, b, h) {
                a = document.getElementsByTagName("meta");
                for (b = 0; b < a.length; b++) {
                    try {
                        h = a[b].name || a[b].getAttribute("property") || "";
                    } catch (e) {
                        h = "";
                        utag.DB(e)
                    }
                    ;
                    if (utag.cfg.lowermeta) {
                        h = h.toLowerCase()
                    }
                    ;
                    if (h != "") {
                        o["meta." + h] = a[b].content
                    }
                }
            },
            RDva: function (o) {
                var readAttr = function (o, l) {
                    var a = "", b;
                    a = localStorage.getItem(l);
                    if (!a || a == "{}") return;
                    b = utag.ut.flatten({va: JSON.parse(a)});
                    utag.ut.merge(o, b, 1);
                }
                try {
                    readAttr(o, "tealium_va");
                    readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"]);
                } catch (e) {
                    utag.DB(e)
                }
            },
            RDut: function (o, a) {
                o["ut.domain"] = utag.cfg.domain;
                o["ut.version"] = utag.cfg.v;
                o["ut.event"] = a || "view";
                o["ut.visitor_id"] = o["cp.utag_main_v_id"];
                o["ut.session_id"] = o["cp.utag_main_ses_id"];
                try {
                    o["ut.account"] = utag.cfg.utid.split("/")[0];
                    o["ut.profile"] = utag.cfg.utid.split("/")[1];
                    o["ut.env"] = utag.cfg.path.split("/")[6];
                } catch (e) {
                    utag.DB(e)
                }
            },
            RDses: function (o, a, c) {
                a = (new Date()).getTime();
                c = (a + parseInt(utag.cfg.session_timeout)) + "";
                if (!o["cp.utag_main_ses_id"]) {
                    o["cp.utag_main_ses_id"] = a + "";
                    o["cp.utag_main__ss"] = "1";
                    o["cp.utag_main__sn"] = (1 + parseInt(o["cp.utag_main__sn"] || 0)) + "";
                } else {
                    o["cp.utag_main__ss"] = "0";
                }
                o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
                o["cp.utag_main__st"] = c;
                utag.loader.SC("utag_main", {
                    "_sn": (o["cp.utag_main__sn"] || 1),
                    "_ss": o["cp.utag_main__ss"],
                    "_st": c,
                    "ses_id": (o["cp.utag_main_ses_id"] || a) + ";exp-session",
                    "_pn": o["cp.utag_main__pn"] + ";exp-session"
                });
            },
            RDpv: function (o) {
                if (typeof utag.pagevars == "function") {
                    utag.DB("Read page variables");
                    utag.pagevars(o);
                }
            },
            RD: function (o, a) {
                utag.DB("utag.loader.RD");
                utag.DB(o);
                utag.loader.RDcp(o);
                if (!utag.loader.rd_flag) {
                    utag.loader.rd_flag = 1;
                    o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
                    o["cp.utag_main__pn"] = (1 + parseInt(o["cp.utag_main__pn"] || 0)) + "";
                    utag.loader.SC("utag_main", {"v_id": o["cp.utag_main_v_id"]});
                    utag.loader.RDses(o);
                }
                if (a && !utag.cfg.noview) utag.loader.RDses(o);
                utag.loader.RDqp(o);
                utag.loader.RDmeta(o);
                utag.loader.RDdom(o);
                utag.loader.RDut(o, a || "view");
                utag.loader.RDpv(o);
                utag.loader.RDva(o);
            },
            RC: function (a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
                o = {};
                b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
                r = /^(.*?)=(.*)$/;
                s = /^(.*);exp-(.*)$/;
                t = (new Date()).getTime();
                for (c = 0; c < b.length; c++) {
                    if (b[c].match(r)) {
                        ck = RegExp.$1;
                        cv = RegExp.$2;
                    }
                    e = utag.ut.decode(cv);
                    if (typeof ck != "undefined") {
                        if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
                            e = cv.split("$");
                            g = [];
                            j = {};
                            for (f = 0; f < e.length; f++) {
                                try {
                                    g = e[f].split(":");
                                    if (g.length > 2) {
                                        g[1] = g.slice(1).join(":");
                                    }
                                    v = "";
                                    if (("" + g[1]).indexOf("~") == 0) {
                                        h = g[1].substring(1).split("|");
                                        for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                                        v = h
                                    } else v = utag.ut.decode(g[1]);
                                    j[g[0]] = v;
                                } catch (er) {
                                    utag.DB(er)
                                }
                                ;
                            }
                            o[ck] = {};
                            for (f in utag.loader.GV(j)) {
                                if (j[f] instanceof Array) {
                                    n = [];
                                    for (m = 0; m < j[f].length; m++) {
                                        if (j[f][m].match(s)) {
                                            k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                            if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                                        }
                                    }
                                    j[f] = n.join("|");
                                } else {
                                    j[f] = "" + j[f];
                                    if (j[f].match(s)) {
                                        k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                        j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                                    }
                                }
                                if (j[f]) o[ck][f] = j[f];
                            }
                        } else if (utag.cl[ck] || utag.cl['_all_']) {
                            o[ck] = e
                        }
                    }
                }
                return (a) ? (o[a] ? o[a] : {}) : o;
            },
            SC: function (a, b, c, d, e, f, g, h, i, j, k, x, v) {
                if (!a) return 0;
                if (a == "utag_main" && utag.cfg.nocookie) return 0;
                v = "";
                var date = new Date();
                var exp = new Date();
                exp.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
                x = exp.toGMTString();
                if (c && c == "da") {
                    x = "Thu, 31 Dec 2009 00:00:00 GMT";
                } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
                    if (typeof b != "object") {
                        v = b
                    }
                } else {
                    d = utag.loader.RC(a, 0);
                    for (e in utag.loader.GV(b)) {
                        f = "" + b[e];
                        if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
                            g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
                            if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
                            f = RegExp.$1 + ";exp-" + g;
                        }
                        if (c == "i") {
                            if (d[e] == null) d[e] = f;
                        } else if (c == "d") delete d[e]; else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f; else if (c == "ap" || c == "au") {
                            if (d[e] == null) d[e] = f; else {
                                if (d[e].indexOf("|") > 0) {
                                    d[e] = d[e].split("|")
                                }
                                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                                g.push(f);
                                if (c == "au") {
                                    h = {};
                                    k = {};
                                    for (i = 0; i < g.length; i++) {
                                        if (g[i].match(/^(.*);exp-(.*)$/)) {
                                            j = RegExp.$1;
                                        }
                                        if (typeof k[j] == "undefined") {
                                            k[j] = 1;
                                            h[g[i]] = 1;
                                        }
                                    }
                                    g = [];
                                    for (i in utag.loader.GV(h)) {
                                        g.push(i);
                                    }
                                }
                                d[e] = g
                            }
                        } else d[e] = f;
                    }
                    h = new Array();
                    for (g in utag.loader.GV(d)) {
                        if (d[g] instanceof Array) {
                            for (c = 0; c < d[g].length; c++) {
                                d[g][c] = encodeURIComponent(d[g][c])
                            }
                            h.push(g + ":~" + d[g].join("|"))
                        } else h.push((g + ":").replace(/[\,\$\;\?]/g, "") + encodeURIComponent(d[g]))
                    }
                    if (h.length == 0) {
                        h.push("");
                        x = ""
                    }
                    v = (h.join("$"));
                }
                document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
                return 1
            },
            LOAD: function (a, b, c, d) {
                if (!utag.loader.cfg) {
                    return
                }
                if (this.ol == 0) {
                    if (utag.loader.cfg[a].block && utag.loader.cfg[a].cbf) {
                        this.f[a] = 1;
                        delete utag.loader.bq[a];
                    }
                    for (b in utag.loader.GV(utag.loader.bq)) {
                        if (utag.loader.cfg[a].load == 4 && utag.loader.cfg[a].wait == 0) {
                            utag.loader.bk[a] = 1;
                            utag.DB("blocked: " + a);
                        }
                        utag.DB("blocking: " + b);
                        return;
                    }
                    utag.loader.INIT();
                    return;
                }
                utag.DB('utag.loader.LOAD:' + a);
                if (this.f[a] == 0) {
                    this.f[a] = 1;
                    if (utag.cfg.noview != true) {
                        if (utag.loader.cfg[a].send) {
                            utag.DB("SENDING: " + a);
                            try {
                                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                                    utag.DB("utag.loader.LOAD:sendq: " + a);
                                    while (d = utag.loader.sendq[a].shift()) {
                                        utag.DB(d);
                                        utag.sender[a].send(d.event, utag.handler.C(d.data));
                                        utag.loader.sendq.pending--;
                                    }
                                } else {
                                    utag.sender[a].send('view', utag.handler.C(utag.data));
                                }
                                utag.rpt['s_' + a] = 0;
                            } catch (e) {
                                utag.DB(e);
                                utag.rpt['s_' + a] = 1;
                            }
                        }
                    }
                    if (utag.loader.rf == 0) return;
                    for (b in utag.loader.GV(this.f)) {
                        if (this.f[b] == 0 || this.f[b] == 2) return
                    }
                    utag.loader.END();
                }
            },
            EV: function (a, b, c, d) {
                if (b == "ready") {
                    if (!utag.data) {
                        try {
                            utag.cl = {'_all_': 1};
                            utag.loader.initdata();
                            utag.loader.RD(utag.data);
                        } catch (e) {
                            utag.DB(e)
                        }
                        ;
                    }
                    if ((document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading") setTimeout(c, 1); else {
                        utag.loader.ready_q.push(c);
                        var RH;
                        if (utag.loader.ready_q.length <= 1) {
                            if (document.addEventListener) {
                                RH = function () {
                                    document.removeEventListener("DOMContentLoaded", RH, false);
                                    utag.loader.run_ready_q()
                                };
                                if (!utag.cfg.dom_complete) document.addEventListener("DOMContentLoaded", RH, false);
                                window.addEventListener("load", utag.loader.run_ready_q, false);
                            } else if (document.attachEvent) {
                                RH = function () {
                                    if (document.readyState === "complete") {
                                        document.detachEvent("onreadystatechange", RH);
                                        utag.loader.run_ready_q()
                                    }
                                };
                                document.attachEvent("onreadystatechange", RH);
                                window.attachEvent("onload", utag.loader.run_ready_q);
                            }
                        }
                    }
                } else {
                    if (a.addEventListener) {
                        a.addEventListener(b, c, false)
                    } else if (a.attachEvent) {
                        a.attachEvent(((d == 1) ? "" : "on") + b, c)
                    }
                }
            },
            END: function (b, c, d, e, v, w) {
                if (this.ended) {
                    return
                }
                ;this.ended = 1;
                utag.DB("loader.END");
                b = utag.data;
                if (utag.handler.base && utag.handler.base != '*') {
                    e = utag.handler.base.split(",");
                    for (d = 0; d < e.length; d++) {
                        if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
                    }
                } else if (utag.handler.base == '*') {
                    utag.ut.merge(utag.handler.df, b, 1);
                }
                utag.rpt['r_0'] = "t";
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
                utag.rpt.ts['s'] = new Date();
                v = ".tiqcdn.com";
                w = utag.cfg.path.indexOf(v);
                if (w > 0 && b["cp.utag_main__ss"] == 1 && !utag.cfg.no_session_count) utag.ut.loader({
                    src: utag.cfg.path.substring(0, w) + v + "/ut" + "ag/tiqapp/ut" + "ag.v.js?a=" + utag.cfg.utid + (utag.cfg.nocookie ? "&nocookie=1" : "&cb=" + (new Date).getTime()),
                    id: "tiqapp"
                })
                if (utag.cfg.noview != true) utag.handler.RE('view', b, "end");
                utag.handler.INIT();
            }
        }, DB: function (a, b) {
            if (utag.cfg.utagdb === false) {
                return;
            } else if (typeof utag.cfg.utagdb == "undefined") {
                b = document.cookie + '';
                utag.cfg.utagdb = ((b.indexOf('utagdb=true') >= 0) ? true : false);
            }
            if (utag.cfg.utagdb === true) {
                var t;
                if (utag.ut.typeOf(a) == "object") {
                    t = utag.handler.C(a)
                } else {
                    t = a
                }
                utag.db_log.push(t);
                try {
                    if (!utag.cfg.noconsole) console.log(t)
                } catch (e) {
                }
            }
        }, RP: function (a, b, c) {
            if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
                b = [];
                for (c in utag.loader.GV(a)) {
                    if (c != 'src') b.push(c + '=' + escape(a[c]))
                }
                this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
            }
        }, view: function (a, c, d) {
            return this.track({event: 'view', data: a, cfg: {cb: c, uids: d}})
        }, link: function (a, c, d) {
            return this.track({event: 'link', data: a, cfg: {cb: c, uids: d}})
        }, track: function (a, b, c, d) {
            if (typeof a == "string") a = {event: a, data: b, cfg: {cb: c}};
            for (d in utag.loader.GV(utag.o)) {
                try {
                    utag.o[d].handler.trigger(a.event || "view", a.data || a, a.cfg)
                } catch (e) {
                    utag.DB(e)
                }
                ;
            }
            if (a.cfg && a.cfg.cb) try {
                a.cfg.cb()
            } catch (e) {
                utag.DB(e)
            }
            ;
            return true
        }, handler: {
            base: "", df: {}, o: {}, send: {}, iflag: 0, INIT: function (a, b, c) {
                utag.DB('utag.handler.INIT');
                if (utag.initcatch) {
                    utag.initcatch = 0;
                    return
                }
                this.iflag = 1;
                a = utag.loader.q.length;
                if (a > 0) {
                    utag.DB("Loader queue");
                    for (b = 0; b < a; b++) {
                        c = utag.loader.q[b];
                        utag.handler.trigger(c.a, c.b, c.c)
                    }
                }
            }, test: function () {
                return 1
            }, LR: function (b) {
                utag.DB("Load Rules");
                for (var d in utag.loader.GV(utag.cond)) {
                    utag.cond[d] = false;
                }
                utag.DB(b);
                utag.loader.loadrules(b);
                utag.DB(utag.cond);
                utag.loader.initcfg();
                utag.loader.OU();
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
            }, RE: function (a, b, c, d, e, f, g) {
                if (c != "alr" && !this.cfg_extend) {
                    return 0;
                }
                utag.DB("RE: " + c);
                if (c == "alr") utag.DB("All Tags EXTENSIONS");
                utag.DB(b);
                if (typeof this.extend != "undefined") {
                    g = 0;
                    for (d = 0; d < this.extend.length; d++) {
                        try {
                            e = 0;
                            if (typeof this.cfg_extend != "undefined") {
                                f = this.cfg_extend[d];
                                if (typeof f.count == "undefined") f.count = 0;
                                if (f[a] == 0 || (f.once == 1 && f.count > 0) || f[c] == 0) {
                                    e = 1
                                } else {
                                    if (f[c] == 1) {
                                        g = 1
                                    }
                                    ;f.count++
                                }
                            }
                            if (e != 1) {
                                this.extend[d](a, b);
                                utag.rpt['ex_' + d] = 0
                            }
                        } catch (er) {
                            utag.DB(er);
                            utag.rpt['ex_' + d] = 1;
                            utag.ut.error({e: er.message, s: utag.cfg.path + 'utag.js', l: d, t: 'ge'});
                        }
                    }
                    utag.DB(b);
                    return g;
                }
            }, trigger: function (a, b, c, d, e, f) {
                utag.DB('trigger:' + a + (c && c.uids ? ":" + c.uids.join(",") : ""));
                b = b || {};
                utag.DB(b);
                if (!this.iflag) {
                    utag.DB("trigger:called before tags loaded");
                    for (d in utag.loader.f) {
                        if (!(utag.loader.f[d] === 1)) utag.DB('Tag ' + d + ' did not LOAD')
                    }
                    utag.loader.q.push({a: a, b: utag.handler.C(b), c: c});
                    return;
                }
                utag.ut.merge(b, this.df, 0);
                utag.loader.RD(b, a);
                utag.cfg.noview = false;

                function sendTag(a, b, d) {
                    try {
                        if (typeof utag.sender[d] != "undefined") {
                            utag.DB("SENDING: " + d);
                            utag.sender[d].send(a, utag.handler.C(b));
                            utag.rpt['s_' + d] = 0;
                        } else if (utag.loader.cfg[d].load != 2 && utag.loader.cfg[d].s2s != 1) {
                            utag.loader.sendq[d] = utag.loader.sendq[d] || [];
                            utag.loader.sendq[d].push({"event": a, "data": utag.handler.C(b)});
                            utag.loader.sendq.pending++;
                            utag.loader.AS({id: d, load: 1});
                        }
                    } catch (e) {
                        utag.DB(e)
                    }
                }

                if (c && c.uids) {
                    this.RE(a, b, "alr");
                    for (f = 0; f < c.uids.length; f++) {
                        d = c.uids[f];
                        sendTag(a, b, d);
                    }
                } else if (utag.cfg.load_rules_ajax) {
                    this.RE(a, b, "blr");
                    this.LR(b);
                    this.RE(a, b, "alr");
                    for (f = 0; f < utag.loader.cfgsort.length; f++) {
                        d = utag.loader.cfgsort[f];
                        if (utag.loader.cfg[d].load && utag.loader.cfg[d].send) {
                            sendTag(a, b, d);
                        }
                    }
                } else {
                    this.RE(a, b, "alr");
                    for (d in utag.loader.GV(utag.sender)) {
                        sendTag(a, b, d);
                    }
                }
                this.RE(a, b, "end");
            }, C: function (a, b, c) {
                b = {};
                for (c in utag.loader.GV(a)) {
                    if (a[c] instanceof Array) {
                        b[c] = a[c].slice(0)
                    } else {
                        b[c] = a[c]
                    }
                }
                return b
            }
        }, ut: {
            pad: function (a, b, c, d) {
                a = "" + ((a - 0).toString(16));
                d = '';
                if (b > a.length) {
                    for (c = 0; c < (b - a.length); c++) {
                        d += '0'
                    }
                }
                return "" + d + a
            }, vi: function (t, a, b) {
                if (!utag.v_id) {
                    a = this.pad(t, 12);
                    b = "" + Math.random();
                    a += this.pad(b.substring(2, b.length), 16);
                    try {
                        a += this.pad((navigator.plugins.length ? navigator.plugins.length : 0), 2);
                        a += this.pad(navigator.userAgent.length, 3);
                        a += this.pad(document.URL.length, 4);
                        a += this.pad(navigator.appVersion.length, 3);
                        a += this.pad(screen.width + screen.height + parseInt((screen.colorDepth) ? screen.colorDepth : screen.pixelDepth), 5)
                    } catch (e) {
                        utag.DB(e);
                        a += "12345"
                    }
                    ;utag.v_id = a;
                }
                return utag.v_id
            }, hasOwn: function (o, a) {
                return o != null && Object.prototype.hasOwnProperty.call(o, a)
            }, isEmptyObject: function (o, a) {
                for (a in o) {
                    if (utag.ut.hasOwn(o, a)) return false
                }
                return true
            }, isEmpty: function (o) {
                var t = utag.ut.typeOf(o);
                if (t == "number") {
                    return isNaN(o)
                } else if (t == "boolean") {
                    return false
                } else if (t == "string") {
                    return o.length === 0
                } else return utag.ut.isEmptyObject(o)
            }, typeOf: function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            }, flatten: function (o) {
                var a = {};

                function r(c, p) {
                    if (Object(c) !== c || c instanceof Array) {
                        a[p] = c;
                    } else {
                        if (utag.ut.isEmptyObject(c)) {
                        } else {
                            for (var d in c) {
                                r(c[d], p ? p + "." + d : d);
                            }
                        }
                    }
                }

                r(o, "");
                return a;
            }, merge: function (a, b, c, d) {
                if (c) {
                    for (d in utag.loader.GV(b)) {
                        a[d] = b[d]
                    }
                } else {
                    for (d in utag.loader.GV(b)) {
                        if (typeof a[d] == "undefined") a[d] = b[d]
                    }
                }
            }, decode: function (a, b) {
                b = "";
                try {
                    b = decodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                }
                ;
                if (b == "") {
                    b = unescape(a)
                }
                ;
                return b
            }, encode: function (a, b) {
                b = "";
                try {
                    b = encodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                }
                ;
                if (b == "") {
                    b = escape(a)
                }
                ;
                return b
            }, error: function (a, b, c) {
                if (typeof utag_err != "undefined") {
                    utag_err.push(a)
                }
            }, loader: function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {"height": "1", "width": "1", "style": "display:none"}, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id
                }
                ;
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l])
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b)
                        }
                    }
                }
            }
        }
    };
    utag.o['ieeexplore.main'] = utag;
    utag.cfg = {
        template: "ut4.41.",
        load_rules_ajax: true,
        load_rules_at_wait: false,
        lowerqp: false,
        noconsole: false,
        session_timeout: 1800000,
        readywait: 0,
        noload: 0,
        domain: utag.loader.lh(),
        path: "//tags.tiqcdn.com/utag/ieeexplore/main/prod/",
        utid: "ieeexplore/main/201906201530"
    };
    utag.cfg.v = utag.cfg.template + "201906201530";
    utag.cond = {};
    utag.pagevars = function (ud) {
        ud = ud || utag.data;
        try {
            ud['js_page.global.document.metadata.isGetArticle'] = global.document.metadata.isGetArticle
        } catch (e) {
            utag.DB(e)
        }
        ;
    };
    utag.loader.initdata = function () {
        try {
            utag.data = (typeof utag_data != 'undefined') ? utag_data : {};
            utag.udoname = 'utag_data';
        } catch (e) {
            utag.data = {};
            utag.DB('idf:' + e);
        }
    };
    utag.loader.loadrules = function (_pd, _pc) {
        var d = _pd || utag.data;
        var c = _pc || utag.cond;
        for (var l in utag.loader.GV(c)) {
            switch (l) {
            }
        }
    };
    utag.pre = function () {
        utag.loader.initdata();
        utag.pagevars();
        try {
            utag.loader.RD(utag.data)
        } catch (e) {
            utag.DB(e)
        }
        ;utag.loader.loadrules();
    };
    utag.loader.GET = function () {
        utag.cl = {'_all_': 1};
        utag.pre();
        utag.handler.extend = [function (a, b, c, d, e, f, g) {
            d = b['ut.env'];
            if (typeof d == 'undefined') return;
            c = [{'prod': 'ieeexplore.prod'}, {'qa': 'ieeexplore.dev'}, {'dev': 'ieeexplore.dev'}];
            var m = false;
            for (e = 0; e < c.length; e++) {
                for (f in c[e]) {
                    if (d == f) {
                        b['s_account'] = c[e][f];
                        m = true
                    }
                    ;
                }
                ;
                if (m) break
            }
            ;
            if (!m) b['s_account'] = '';
        }, function (a, b) {
            utag.ut.merge(b, utag.data, 0);
            utag.ut.merge(utag.data, b, 1);
        }, function (a, b) {
            try {
                if (1) {
                    b['account_interactions'] = '';
                    b['book_interactions'] = '';
                    b['courses_interactions'] = '';
                    b['html_interactions'] = '';
                    b['settings_interactions'] = '';
                    b['virtual_journal_interactions'] = ''
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['ut.event'].toString().indexOf('view') > -1) {
                    b['browse_by_number_interactions'] = '';
                    b['browse_by_title_interactions'] = '';
                    b['browse_by_tabs_interactions'] = '';
                    b['interaction_category'] = ''
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (1) {
                    b['ibm_cookie_domain'] = b['dom.domain']
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (1) {
                    try {
                        b['dom.pathname'] = window.location.pathname
                    } catch (e) {
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (utag.data['qp.utagdb']) {
                    if (utag.data['qp.utagdb'].match(/1|true/i)) {
                        document.cookie = 'utagdb=true';
                        utag.data['cp.utagdb'] = 'true';
                        utag.cfg.utagdb = true;
                    } else {
                        document.cookie = 'utagdb=false';
                        utag.data['cp.utagdb'] = 'false';
                        utag.cfg.utagdb = false;
                    }
                }
                if (utag.cfg.path.indexOf('/prod/') === -1 && (typeof utag.data['cp.utagdb'] === 'undefined' || utag.data['cp.utagdb'] === 'true')) {
                    document.cookie = 'utagdb=true';
                    utag.cfg.utagdb = true;
                }
            } catch (e) {
                utag.DB('Tealium Debugging Tools Failed: ' + e);
            }
        }, function (a, b) {
            try {
                if (typeof b['user_id'] != 'undefined' && b['user_id'] != '') {
                    try {
                        b['unique_user_id'] = utag.data.user_id + window.navigator.userAgent.replace(/\D+/g, '') + (getCookie('ipCheck') != null ? getCookie('ipCheck').replace(/\./g, '') : '')
                    } catch (e) {
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (typeof b['user_institution_id'] != 'undefined' && b['user_institution_id'] != '') {
                    try {
                        b['user_institution_id_unique'] = utag.data.user_institution_id + window.navigator.userAgent.replace(/\D+/g, '') + (getCookie('ipCheck') != null ? getCookie('ipCheck').replace(/\./g, '') : '')
                    } catch (e) {
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['user_type'] == 'Anonymous' && b['ut.event'] == 'view')) {
                    b['registerID'] = b['anonymousID'];
                    b['unique_registerID'] = b['anonymousID'];
                    b['ibm_event'] = 'registration'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['user_type'] == 'Guest' && b['ut.event'] == 'view' && typeof b['user_institution_id'] == 'undefined') || (b['user_type'] == 'Member' && typeof b['user_institution_id'] == 'undefined' && b['ut.event'] == 'view') || (b['user_type'] == 'Guest' && typeof b['user_institution_id'] != 'undefined' && b['user_institution_id'] == '' && b['ut.event'] == 'view') || (b['user_type'] == 'Member' && b['ut.event'] == 'view' && typeof b['user_institution_id'] != 'undefined' && b['user_institution_id'] == '')) {
                    b['registerID'] = b['user_id'];
                    b['unique_registerID'] = b['unique_user_id'];
                    b['ibm_event'] = 'registration'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((typeof b['user_institution_id'] != 'undefined' && b['ut.event'] == 'view' && b['user_type'] == 'Institute')) {
                    b['registerID'] = b['user_institution_id'];
                    b['unique_registerID'] = b['user_institution_id_unique'];
                    b['ibm_event'] = 'registration'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['interaction_category'].toString().indexOf('navigation') > -1) {
                    b['navigation_interactions'] = b['link_name']
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['search_results_count'] == '0' && typeof b['search_keyword'] != 'undefined' && b['search_keyword'] != '' && b['ut.event'].toString().indexOf('view') > -1 && b['sheet_type'].toString().toLowerCase().indexOf('Search'.toLowerCase()) > -1)) {
                    b['link_name'] = b['search_keyword'];
                    b['link_category'] = 'Zero Results';
                    b['event_name'] = 'zero_results'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((typeof b['search_search_within'] != 'undefined' && b['sheet_type'].toString().toLowerCase().indexOf('search'.toLowerCase()) > -1 && /First Name.+:|Last Name.+:/i.test(b['search_search_within']))) {
                    try {
                        b['search_keyword'] = (function () {
                            function isAuthor(query) {
                                return ((/First Name.+:/).test(query) || (/Last Name.+:/).test(query))
                            };
                            return utag.data.search_search_within.filter(isAuthor).join('|').replace(/"/g, '')
                        })();
                    } catch (e) {
                    }
                    ;
                    try {
                        b['search_search_within'] = (function () {
                            function isNotAuthor(query) {
                                return (!(/First Name.+:/).test(query) && !(/Last Name.+:/).test(query))
                            };
                            return utag.data.search_search_within.filter(isNotAuthor).join(',').replace(/"/g, '')
                        })();
                    } catch (e) {
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((typeof b['search_search_within'] != 'undefined' && /Publication Title.+:|Volume.+:|Issue.+:|Start Page.+:|DOI.+:|Article Page Number.+:|Document Title.+:|Authors.+:|Publication_Year.+:|End Page.+:/i.test(b['search_search_within']) && b['sheet_type'].toString().toLowerCase().indexOf('search'.toLowerCase()) > -1)) {
                    try {
                        b['search_keyword'] = (function () {
                            function isKeyWord(query) {
                                return ((/Publication Title.+:/).test(query) || (/Volume.+:/).test(query) || (/Issue.+:/).test(query) || (/Start Page.+:/).test(query) || (/DOI.+:/).test(query) || (/Article Page Number.+:/).test(query) || (/Document Title.+:/).test(query) || (/Authors.+:/).test(query) || (/Publication_Year.+:/).test(query) || (/End Page.+:/).test(query))
                            };
                            return utag.data.search_search_within.filter(isKeyWord).join('|').replace(/"/g, '');
                        })();
                    } catch (e) {
                    }
                    ;
                    try {
                        b['search_search_within'] = (function () {
                            function isNotKeyWord(query) {
                                return (!(/Publication Title.+:/).test(query) && !(/Volume.+:/).test(query) && !(/Issue.+:/).test(query) && !(/Start Page.+:/).test(query) && !(/DOI.+:/).test(query) && !(/Article Page Number.+:/).test(query) && !(/Document Title.+:/).test(query) && !(/Authors.+:/).test(query) && !(/Publication_Year.+:/).test(query) && !(/End Page.+:/).test(query))
                            };var newSearchWithin = utag.data.search_search_within.filter(isNotKeyWord).join(',').replace(/"/g, '');
                            return newSearchWithin
                        })();
                    } catch (e) {
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b, c, d) {
            try {
                if ((typeof b['search_search_within'] != 'undefined' && typeof b['search_search_within'] != 'undefined' && b['search_search_within'] != '' && typeof b['search_keyword'] != 'undefined' && typeof b['search_keyword'] != 'undefined' && b['search_keyword'] != '')) {
                    c = [b['search_keyword'], b['search_search_within']];
                    b['search_keyword'] = c.join('_')
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (1) {
                    utag_data.refinements = [];
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((typeof b['refinement_name'] != 'undefined' && b['refinement_name'].toString().toLowerCase().indexOf('Content Type'.toLowerCase()) > -1 && b['event_name'] == 'search_refinement' && b['ut.event'] == 'link' && b['sheet_type'].toString().toLowerCase().indexOf('search'.toLowerCase()) > -1)) {
                    try {
                        b['link_name'] = utag.data.refinement_name + ":" + b.refinement_content_type
                    } catch (e) {
                    }
                    ;b['link_category'] = 'Search Refinement';
                    b['interaction_category'] = 'search_refinement'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((typeof b['refinement_name'] != 'undefined' && b['refinement_name'].toString().toLowerCase().indexOf('Publisher'.toLowerCase()) > -1 && b['event_name'] == 'search_refinement' && b['ut.event'] == 'link' && b['sheet_type'].toString().toLowerCase().indexOf('Search'.toLowerCase()) > -1) || (typeof b['refinement_name'] != 'undefined' && b['refinement_name'].toString().toLowerCase().indexOf('Topic'.toLowerCase()) > -1 && b['event_name'] == 'search_refinement' && b['ut.event'] == 'link') || (typeof b['refinement_name'] != 'undefined' && b['refinement_name'].toString().toLowerCase().indexOf('Book Type'.toLowerCase()) > -1 && b['event_name'] == 'search_refinement' && b['ut.event'] == 'link') || (typeof b['refinement_name'] != 'undefined' && b['refinement_name'].toString().toLowerCase().indexOf('Standard Status'.toLowerCase()) > -1 && b['event_name'] == 'search_refinement' && b['ut.event'] == 'link') || (typeof b['refinement_name'] != 'undefined' && b['refinement_name'].toString().toLowerCase().indexOf('Standard Type'.toLowerCase()) > -1 && b['event_name'] == 'search_refinement' && b['ut.event'] == 'link') || (typeof b['refinement_name'] != 'undefined' && b['ut.event'] == 'link' && b['event_name'] == 'search_refinement' && /Standard Modifier|Standard SubType|Supplemental Items/.test(b['refinement_name']))) {
                    try {
                        b['link_name'] = utag.data.refinement_name + ":" + (function () {
                            jQuery('[data-tealium_data="{"refinementName": "' + utag.data.refinement_name + '"}"]').closest('section').children('.refinement-content').find('.ng-not-empty').parent().find('[ng-bind-html="::item.name"]').each(function () {
                                utag_data.refinements.push($(this).text())
                            });
                            return utag_data.refinements.join('|')
                        })()
                    } catch (e) {
                    }
                    ;b['link_category'] = 'Search Refinement';
                    b['interaction_category'] = 'search_refinement'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((typeof b['refinement_name'] != 'undefined' && b['refinement_name'].toString().toLowerCase().indexOf('Publisher'.toLowerCase()) < 0 && b['refinement_name'].toString().toLowerCase().indexOf('Topic'.toLowerCase()) < 0 && b['refinement_name'].toString().toLowerCase().indexOf('Book Type'.toLowerCase()) < 0 && b['refinement_name'].toString().toLowerCase().indexOf('Standard Status'.toLowerCase()) < 0 && b['refinement_name'].toString().toLowerCase().indexOf('Standard Type'.toLowerCase()) < 0 && b['refinement_name'].toString().toLowerCase().indexOf('Content Type'.toLowerCase()) < 0 && b['event_name'] == 'search_refinement' && b['ut.event'] == 'link' && b['refinement_name'].toString().toLowerCase().indexOf('Standard Modifier'.toLowerCase()) < 0 && b['refinement_name'].toString().toLowerCase().indexOf('Supplemental Items'.toLowerCase()) < 0 && b['refinement_name'].toString().toLowerCase().indexOf('Standard SubType'.toLowerCase()) < 0)) {
                    b['link_name'] = b['refinement_name'];
                    b['link_category'] = 'Search Refinement';
                    b['interaction_category'] = 'search_refinement'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['interaction_category'].toString().indexOf('search_refinement') > -1) {
                    b['refinement_interactions'] = b['link_name']
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (1) {
                    var pubSearchArr = decodeURIComponent(location.search).split('&');
                    var searchWithinArr = pubSearchArr.filter(findSearchWithin)

                    function findSearchWithin(parameter) {
                        return (/searchWithin/).test(parameter)
                    }

                    if ((/Browse Journals & Magazines/).test(jQuery('.breadcrumbs a').eq(0).text()) && searchWithinArr.length >= 1) {
                        var pubIssue = 'pubSearch'
                        if ((/Early Access/).test(jQuery('#nav-article li.active a').text())) {
                            pubIssue = jQuery('#jrnl-issue-hdr h3').text().replace(/\n|\t|\r|\f/g, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
                        } else {
                            pubIssue = jQuery('#jrnl-issue-hdr .heading').text().replace(/\n|\t|\r|\f/g, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
                        }
                        var searchWithin = searchWithinArr.join('|').replace(/searchWithin=/g, '');
                        utag_data.search_search_within = pubIssue + '_' + searchWithin;
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['interaction_category'].toString().indexOf('advanced_search') > -1) {
                    b['adv_search_interactions'] = b['link_name']
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['interaction_category'].toString().indexOf('searchbar') > -1) {
                    b['searchbar_interactions'] = b['link_name']
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['interaction_category'] == 'search') {
                    b['search_results_interactions'] = b['link_name']
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b, c, d) {
            try {
                if (b['interaction_category'].toString().indexOf('account') > -1) {
                    c = [b['link_category'], b['link_name']];
                    b['account_interactions'] = c.join(':')
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b, c, d) {
            try {
                if (b['interaction_category'].toString().indexOf('books') > -1) {
                    c = [b['link_category'], b['link_name']];
                    b['book_interactions'] = c.join(':')
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b, c, d) {
            try {
                if (b['interaction_category'].toString().indexOf('settings') > -1) {
                    c = [b['link_category'], b['link_name']];
                    b['settings_interactions'] = c.join(':')
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((typeof b['_pathname1'] != 'undefined' && b['_pathname1'] == 'courses')) {
                    b['browse_content_type'] = b['_pathname1']
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['dom.pathname'].toString().indexOf('/courses/') > -1 && b['link_category'].toString().toLowerCase().indexOf('Courses'.toLowerCase()) > -1)) {
                    b['interaction_category'] = 'courses'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b, c, d) {
            try {
                if ((b['link_category'].toString().toLowerCase().indexOf('courses'.toLowerCase()) > -1 && b['interaction_category'].toString().indexOf('courses') > -1)) {
                    c = [b['link_category'], b['link_name']];
                    b['courses_interactions'] = c.join(':')
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['link_name'].toString().indexOf('left_Download PDF') > -1 && b['ut.event'].toString().indexOf('link') > -1)) {
                    b['html_usage'] = 'pdf_download'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['event_name'].toString().indexOf('iq_widget_display') > -1 && b['iq_widget_length'] == '0' && b['ut.event'].toString().indexOf('link') > -1)) {
                    b['link_name'] = 'iQ_widget_no_results';
                    b['link_category'] = 'dynamic html'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['event_name'].toString().indexOf('iq_widget_display') > -1 && b['ut.event'].toString().indexOf('link') > -1 && b['iq_widget_length'] != '0')) {
                    try {
                        b['link_name'] = 'iQ_widget_display:' + utag.data.iq_widget_length
                    } catch (e) {
                    }
                    ;b['link_category'] = 'dynamic html'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['link_category'].toString().toLowerCase().indexOf('html'.toLowerCase()) > -1) {
                    b['interaction_category'] = 'html'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b, c, d) {
            try {
                if (b['link_category'].toString().toLowerCase().indexOf('html'.toLowerCase()) > -1) {
                    c = [b['link_category'], b['link_name']];
                    b['html_interactions'] = c.join(':')
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b, c, d) {
            try {
                if ((b['dom.pathname'].toString().indexOf('/virtual-journals/') > -1 && b['interaction_category'].toString().indexOf('virtual_journals') > -1 && b['ut.event'].toString().indexOf('link') > -1)) {
                    c = [b['link_category'], b['link_name']];
                    b['virtual_journal_interactions'] = c.join(':')
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['dom.pathname'].toString().indexOf('/virtual-journals/') > -1 && b['link_category'].toString().toLowerCase().indexOf('Browse Journals & Magazines_Tabs'.toLowerCase()) > -1 && b['ut.event'].toString().indexOf('link') > -1)) {
                    b['interaction_category'] = 'virtual_journals'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b, c, d) {
            try {
                if (b['interaction_category'].toString().indexOf('standards') > -1) {
                    c = [b['link_category'], b['link_name']];
                    b['standards_interactions'] = c.join(':')
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['js_page.global.document.metadata.isGetArticle'] == 'true') {
                    b['document_access'] = 'GET'
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['publisher'].toString().toLowerCase().indexOf('publisher'.toLowerCase()) > -1) {
                    try {
                        b['publisher'] = ''
                    } catch (e) {
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (1) {
                    utag.data.refinement_name = "";
                    utag.data.event_name = "";
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (b['sheet_type'].toString().indexOf('dynamic html') > -1) {
                    try {
                        b['open_access'] = jQuery('.icon-access-open-access').length >= 1 ? 'true' : 'false'
                    } catch (e) {
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        utag.handler.cfg_extend = [{"alr": 1, "bwq": 0, "end": 0, "blr": 0, "id": "386"}, {
            "alr": 0,
            "id": "58",
            "bwq": 0,
            "blr": 1,
            "end": 0
        }, {"end": 0, "blr": 0, "bwq": 0, "id": "374", "alr": 1}, {
            "id": "391",
            "bwq": 0,
            "blr": 0,
            "end": 0,
            "alr": 1
        }, {"bwq": 0, "end": 0, "blr": 1, "id": "302", "alr": 0}, {
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "id": "46",
            "alr": 1
        }, {"end": 0, "blr": 0, "bwq": 0, "id": "22", "alr": 1}, {
            "id": "77",
            "blr": 1,
            "end": 0,
            "bwq": 0,
            "alr": 0
        }, {"alr": 0, "end": 0, "blr": 1, "bwq": 0, "id": "69"}, {
            "alr": 0,
            "end": 0,
            "blr": 1,
            "bwq": 0,
            "id": "93"
        }, {"alr": 0, "bwq": 0, "end": 0, "blr": 1, "id": "96"}, {
            "alr": 0,
            "id": "97",
            "blr": 1,
            "end": 0,
            "bwq": 0
        }, {"alr": 1, "bwq": 0, "end": 0, "blr": 0, "id": "377"}, {
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "id": "78",
            "alr": 1
        }, {"bwq": 0, "end": 0, "blr": 0, "id": "62", "alr": 1}, {
            "end": 0,
            "blr": 0,
            "bwq": 0,
            "id": "63",
            "alr": 1
        }, {"id": "426", "blr": 0, "end": 0, "bwq": 0, "alr": 1}, {
            "id": "352",
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "alr": 1
        }, {"id": "358", "bwq": 0, "blr": 0, "end": 0, "alr": 1}, {
            "end": 0,
            "blr": 0,
            "bwq": 0,
            "id": "81",
            "alr": 1
        }, {"alr": 1, "end": 0, "blr": 0, "bwq": 0, "id": "82"}, {
            "alr": 1,
            "end": 0,
            "blr": 0,
            "bwq": 0,
            "id": "378"
        }, {"alr": 1, "end": 0, "blr": 0, "bwq": 0, "id": "309"}, {
            "id": "380",
            "bwq": 0,
            "blr": 0,
            "end": 0,
            "alr": 1
        }, {"bwq": 0, "end": 0, "blr": 0, "id": "379", "alr": 1}, {
            "alr": 1,
            "id": "381",
            "blr": 0,
            "end": 0,
            "bwq": 0
        }, {"alr": 1, "end": 0, "blr": 0, "bwq": 0, "id": "367"}, {
            "alr": 1,
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "id": "363"
        }, {"alr": 1, "id": "362", "bwq": 0, "blr": 0, "end": 0}, {
            "alr": 0,
            "id": "33",
            "bwq": 0,
            "blr": 0,
            "end": 1
        }, {"alr": 1, "id": "359", "bwq": 0, "blr": 0, "end": 0}, {
            "alr": 1,
            "id": "361",
            "blr": 0,
            "end": 0,
            "bwq": 0
        }, {"alr": 1, "bwq": 0, "end": 0, "blr": 0, "id": "382"}, {
            "alr": 1,
            "id": "423",
            "bwq": 0,
            "blr": 0,
            "end": 0
        }, {"end": 0, "blr": 0, "bwq": 0, "id": "424", "alr": 1}, {
            "id": "384",
            "bwq": 0,
            "blr": 0,
            "end": 0,
            "alr": 1
        }, {"bwq": 0, "end": 0, "blr": 0, "id": "372", "alr": 1}, {
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "id": "369",
            "alr": 1
        }, {"end": 0, "blr": 0, "bwq": 0, "id": "385", "alr": 1}, {
            "id": "373",
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "alr": 1
        }, {"alr": 1, "end": 0, "blr": 0, "bwq": 0, "id": "355"}, {
            "alr": 1,
            "end": 0,
            "blr": 0,
            "bwq": 0,
            "id": "390"
        }, {"alr": 0, "bwq": 0, "end": 1, "blr": 0, "id": "401"}, {
            "alr": 1,
            "id": "417",
            "blr": 0,
            "end": 0,
            "bwq": 0
        }];
        utag.loader.initcfg = function () {
            utag.loader.cfg = {
                "33": {load: 4, send: 1, v: 201802201911, wait: 0, tid: 1191},
                "32": {load: 1, send: 1, v: 201906201530, wait: 1, tid: 19063}
            };
            utag.loader.cfgsort = ["33", "32"];
        }
        utag.loader.initcfg();
    }
    if (typeof utag_cfg_ovrd != 'undefined') {
        for (var i in utag.loader.GV(utag_cfg_ovrd)) utag.cfg[i] = utag_cfg_ovrd[i]
    }
    ;utag.loader.PINIT = function (a, b, c) {
        utag.DB("Pre-INIT");
        if (utag.cfg.noload) {
            return;
        }
        try {
            this.GET();
            if (utag.handler.RE('view', utag.data, "blr")) {
                utag.handler.LR(utag.data);
            }
        } catch (e) {
            utag.DB(e)
        }
        ;a = this.cfg;
        c = 0;
        for (b in this.GV(a)) {
            if (a[b].block == 1 || (a[b].load > 0 && (typeof a[b].src != 'undefined' && a[b].src != ''))) {
                a[b].block = 1;
                c = 1;
                this.bq[b] = 1;
            }
        }
        if (c == 1) {
            for (b in this.GV(a)) {
                if (a[b].block) {
                    a[b].id = b;
                    if (a[b].load == 4) a[b].load = 1;
                    a[b].cb = function () {
                        var d = this.uid;
                        utag.loader.cfg[d].cbf = 1;
                        utag.loader.LOAD(d)
                    };
                    this.AS(a[b]);
                }
            }
        }
        if (c == 0) this.INIT();
    };
    utag.loader.INIT = function (a, b, c, d, e) {
        utag.DB('utag.loader.INIT');
        if (this.ol == 1) return -1; else this.ol = 1;
        if (utag.cfg.noview != true) utag.handler.RE('view', utag.data, "alr");
        utag.rpt.ts['i'] = new Date();
        d = this.cfgsort;
        for (a = 0; a < d.length; a++) {
            e = d[a];
            b = this.cfg[e];
            b.id = e;
            if (b.block != 1 && b.s2s != 1) {
                if (utag.loader.bk[b.id] || ((utag.cfg.readywait || utag.cfg.noview) && b.load == 4)) {
                    this.f[b.id] = 0;
                    utag.loader.LOAD(b.id)
                } else if (b.wait == 1 && utag.loader.rf == 0) {
                    utag.DB('utag.loader.INIT: waiting ' + b.id);
                    this.wq.push(b)
                    this.f[b.id] = 2;
                } else if (b.load > 0) {
                    utag.DB('utag.loader.INIT: loading ' + b.id);
                    this.lq.push(b);
                    this.AS(b);
                }
            }
        }
        if (this.wq.length > 0) utag.loader.EV('', 'ready', function (a) {
            if (utag.loader.rf == 0) {
                utag.DB('READY:utag.loader.wq');
                utag.loader.rf = 1;
                utag.loader.WQ();
            }
        }); else if (this.lq.length > 0) utag.loader.rf = 1; else if (this.lq.length == 0) utag.loader.END();
        return 1
    };
    utag.loader.EV('', 'ready', function (a) {
        if (utag.loader.efr != 1) {
            utag.loader.efr = 1;
            try {
                (function (window) {
                    var BlockAdBlock = function (options) {
                        this._options = {
                            checkOnLoad: false,
                            resetOnEnd: false,
                            loopCheckTime: 50,
                            loopMaxNumber: 5,
                            baitClass: 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
                            baitStyle: 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;',
                            debug: false
                        };
                        this._var = {
                            version: '3.2.0',
                            bait: null,
                            checking: false,
                            loop: null,
                            loopNumber: 0,
                            event: {detected: [], notDetected: []}
                        };
                        if (options !== undefined) {
                            this.setOption(options);
                        }
                        var self = this;
                        var eventCallback = function () {
                            setTimeout(function () {
                                if (self._options.checkOnLoad === true) {
                                    if (self._options.debug === true) {
                                        self._log('onload->eventCallback', 'A check loading is launched');
                                    }
                                    if (self._var.bait === null) {
                                        self._creatBait();
                                    }
                                    setTimeout(function () {
                                        self.check();
                                    }, 1);
                                }
                            }, 1);
                        };
                        if (window.addEventListener !== undefined) {
                            window.addEventListener('load', eventCallback, false);
                        } else {
                            window.attachEvent('onload', eventCallback);
                        }
                    };
                    BlockAdBlock.prototype._options = null;
                    BlockAdBlock.prototype._var = null;
                    BlockAdBlock.prototype._bait = null;
                    BlockAdBlock.prototype._log = function (method, message) {
                        console.log('[BlockAdBlock][' + method + '] ' + message);
                    };
                    BlockAdBlock.prototype.setOption = function (options, value) {
                        if (value !== undefined) {
                            var key = options;
                            options = {};
                            options[key] = value;
                        }
                        for (var option in options) {
                            this._options[option] = options[option];
                            if (this._options.debug === true) {
                                this._log('setOption', 'The option "' + option + '" he was assigned to "' + options[option] + '"');
                            }
                        }
                        return this;
                    };
                    BlockAdBlock.prototype._creatBait = function () {
                        var bait = document.createElement('div');
                        bait.setAttribute('class', this._options.baitClass);
                        bait.setAttribute('style', this._options.baitStyle);
                        this._var.bait = window.document.body.appendChild(bait);
                        this._var.bait.offsetParent;
                        this._var.bait.offsetHeight;
                        this._var.bait.offsetLeft;
                        this._var.bait.offsetTop;
                        this._var.bait.offsetWidth;
                        this._var.bait.clientHeight;
                        this._var.bait.clientWidth;
                        if (this._options.debug === true) {
                            this._log('_creatBait', 'Bait has been created');
                        }
                    };
                    BlockAdBlock.prototype._destroyBait = function () {
                        window.document.body.removeChild(this._var.bait);
                        this._var.bait = null;
                        if (this._options.debug === true) {
                            this._log('_destroyBait', 'Bait has been removed');
                        }
                    };
                    BlockAdBlock.prototype.check = function (loop) {
                        if (loop === undefined) {
                            loop = true;
                        }
                        if (this._options.debug === true) {
                            this._log('check', 'An audit was requested ' + (loop === true ? 'with a' : 'without') + ' loop');
                        }
                        if (this._var.checking === true) {
                            if (this._options.debug === true) {
                                this._log('check', 'A check was canceled because there is already an ongoing');
                            }
                            return false;
                        }
                        this._var.checking = true;
                        if (this._var.bait === null) {
                            this._creatBait();
                        }
                        var self = this;
                        this._var.loopNumber = 0;
                        if (loop === true) {
                            this._var.loop = setInterval(function () {
                                self._checkBait(loop);
                            }, this._options.loopCheckTime);
                        }
                        setTimeout(function () {
                            self._checkBait(loop);
                        }, 1);
                        if (this._options.debug === true) {
                            this._log('check', 'A check is in progress ...');
                        }
                        return true;
                    };
                    BlockAdBlock.prototype._checkBait = function (loop) {
                        var detected = false;
                        if (this._var.bait === null) {
                            this._creatBait();
                        }
                        if (window.document.body.getAttribute('abp') !== null || this._var.bait.offsetParent === null || this._var.bait.offsetHeight == 0 || this._var.bait.offsetLeft == 0 || this._var.bait.offsetTop == 0 || this._var.bait.offsetWidth == 0 || this._var.bait.clientHeight == 0 || this._var.bait.clientWidth == 0) {
                            detected = true;
                        }
                        if (window.getComputedStyle !== undefined) {
                            var baitTemp = window.getComputedStyle(this._var.bait, null);
                            if (baitTemp.getPropertyValue('display') == 'none' || baitTemp.getPropertyValue('visibility') == 'hidden') {
                                detected = true;
                            }
                        }
                        if (this._options.debug === true) {
                            this._log('_checkBait', 'A check (' + (this._var.loopNumber + 1) + '/' + this._options.loopMaxNumber + ' ~' + (1 + this._var.loopNumber * this._options.loopCheckTime) + 'ms) was conducted and detection is ' + (detected === true ? 'positive' : 'negative'));
                        }
                        if (loop === true) {
                            this._var.loopNumber++;
                            if (this._var.loopNumber >= this._options.loopMaxNumber) {
                                this._stopLoop();
                            }
                        }
                        if (detected === true) {
                            this._stopLoop();
                            this._destroyBait();
                            this.emitEvent(true);
                            if (loop === true) {
                                this._var.checking = false;
                            }
                        } else if (this._var.loop === null || loop === false) {
                            this._destroyBait();
                            this.emitEvent(false);
                            if (loop === true) {
                                this._var.checking = false;
                            }
                        }
                    };
                    BlockAdBlock.prototype._stopLoop = function (detected) {
                        clearInterval(this._var.loop);
                        this._var.loop = null;
                        this._var.loopNumber = 0;
                        if (this._options.debug === true) {
                            this._log('_stopLoop', 'A loop has been stopped');
                        }
                    };
                    BlockAdBlock.prototype.emitEvent = function (detected) {
                        if (this._options.debug === true) {
                            this._log('emitEvent', 'An event with a ' + (detected === true ? 'positive' : 'negative') + ' detection was called');
                        }
                        var fns = this._var.event[(detected === true ? 'detected' : 'notDetected')];
                        for (var i in fns) {
                            if (this._options.debug === true) {
                                this._log('emitEvent', 'Call function ' + (parseInt(i) + 1) + '/' + fns.length);
                            }
                            if (fns.hasOwnProperty(i)) {
                                fns[i]();
                            }
                        }
                        if (this._options.resetOnEnd === true) {
                            this.clearEvent();
                        }
                        return this;
                    };
                    BlockAdBlock.prototype.clearEvent = function () {
                        this._var.event.detected = [];
                        this._var.event.notDetected = [];
                        if (this._options.debug === true) {
                            this._log('clearEvent', 'The event list has been cleared');
                        }
                    };
                    BlockAdBlock.prototype.on = function (detected, fn) {
                        this._var.event[(detected === true ? 'detected' : 'notDetected')].push(fn);
                        if (this._options.debug === true) {
                            this._log('on', 'A type of event "' + (detected === true ? 'detected' : 'notDetected') + '" was added');
                        }
                        return this;
                    };
                    BlockAdBlock.prototype.onDetected = function (fn) {
                        return this.on(true, fn);
                    };
                    BlockAdBlock.prototype.onNotDetected = function (fn) {
                        return this.on(false, fn);
                    };
                    window.BlockAdBlock = BlockAdBlock;
                    if (typeof (utag.ut.blockAdBlock) === 'undefined') {
                        utag.ut.blockAdBlock = new BlockAdBlock({checkOnLoad: true, resetOnEnd: true});
                        utag.ut.blockAdBlock.onDetected(function () {
                            window.utag.link({
                                "event_name": "ads_blocked",
                                "adblock": "enabled",
                                "link_text": "ads_blocked"
                            });
                        });
                        setTimeout(function () {
                            utag.ut.blockAdBlock.check();
                        }, 800);
                    }
                })(window);
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (typeof utag.runonce == 'undefined') utag.runonce = {};
                utag.jdh = function (h, i, j, k) {
                    h = utag.jdhc.length;
                    if (h == 0) window.clearInterval(utag.jdhi); else {
                        for (i = 0; i < h; i++) {
                            j = utag.jdhc[i];
                            k = jQuery(j.i).is(":visible") ? 1 : 0;
                            if (k != j.s) {
                                if (j.e == (j.s = k)) jQuery(j.i).trigger(j.e ? "afterShow" : "afterHide")
                            }
                        }
                    }
                };
                utag.jdhi = window.setInterval(utag.jdh, 250);
                utag.jdhc = [];
                if (1) {
                    if (typeof utag.runonce[21] == 'undefined') {
                        utag.runonce[21] = 1;
                        jQuery('.stats-toolbar-menu').on('mousedown', 'li li a', function (e) {
                            utag.link({
                                "link_category": 'Xplnav',
                                "link_name": 'Xplnav_' + jQuery(this).parents('.Toolbar-item').children('a').text().trim() + '_' + jQuery(this).text().trim(),
                                "interaction_category": 'navigation'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[270] == 'undefined') {
                        utag.runonce[270] = 1;
                        jQuery(' .stats-browsebytopic-menu').on('mousedown', 'a', function (e) {
                            utag.link({
                                "link_category": 'Xplnav',
                                "link_name": 'Xplnav_Browse_Topics_' + jQuery(this).text(),
                                "interaction_category": 'navigation'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[296] == 'undefined') {
                        utag.runonce[296] = 1;
                        jQuery(document.body).on('mousedown', '.stats-what-can-i-access a', function (e) {
                            utag.link({
                                "link_name": 'Xplnav_My Settings_What can I access',
                                "link_category": 'Xplnav',
                                "interaction_category": 'navigation'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[49] == 'undefined') {
                        utag.runonce[49] = 1;
                        jQuery(document.body).on('mousedown', '.stats-metanav .stats-extLink a, .stats-mnEvLinks a', function (e) {
                            utag.link({
                                "link_category": 'Universal Navigation',
                                "link_name": 'Unav_' + jQuery(this).text(),
                                "interaction_category": 'navigation'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[181] == 'undefined') {
                        utag.runonce[181] = 1;
                        jQuery('.stats-footer').on('mousedown', 'a.stats-Footer_P_SignIn-or-Welcome', function (e) {
                            utag.link({
                                "link_name": 'Footer_' + jQuery(this).text(),
                                "link_category": 'Footer',
                                "interaction_category": 'navigation'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[182] == 'undefined') {
                        utag.runonce[182] = 1;
                        jQuery('.stats-footer').on('mousedown', 'a.stats-Footer_CreateAcct', function (e) {
                            utag.link({
                                "link_name": 'Footer_CreateAcct',
                                "link_category": 'Footer',
                                "interaction_category": 'navigation'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[183] == 'undefined') {
                        utag.runonce[183] = 1;
                        jQuery('.stats-footer').on('mousedown', 'ul.Footer-list a', function (e) {
                            utag.link({
                                "link_name": 'Footer_' + jQuery(this).text(),
                                "link_category": 'Footer',
                                "interaction_category": 'navigation'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[184] == 'undefined') {
                        utag.runonce[184] = 1;
                        jQuery('.stats-footer').on('mousedown', 'div.Footer-bottom li a', function (e) {
                            utag.link({
                                "link_name": 'Footer_Bottom_' + jQuery(this).text(),
                                "link_category": 'Footer',
                                "interaction_category": 'navigation'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                try {
                    if (1) {
                        try {
                            var skip = false
                            var observer = new MutationObserver(function (mutations) {
                                mutations.forEach(function (mutation) {
                                    window.mutation = mutation;
                                    if (((/Notification/).test(mutation.target.attributes.class.nodeValue)) && skip == false) {
                                        if (jQuery('#personal-sign-in .Notification')[0].hasAttribute('data-notify-state')) {
                                            utag.data.link_name = '';
                                            utag.data.link_category = '';
                                            utag.link({
                                                'ibm_event': 'concurrency',
                                                'element_id': 'concurrency',
                                                'element_category': 'error',
                                                'event_name': 'concurrency',
                                                'link_text': 'concurrency'
                                            })
                                            setTimeout(observerDisconnect(), 1000);
                                            skip = true;
                                        }
                                    }
                                })
                            });
                            jQuery('.stats-Unav_Per_SignIn').on('mousedown', function () {
                                var element = jQuery(event.target);
                                var target = document.querySelector('#personal-sign-in .Notification');
                                var config = {attributes: true};
                                observer.observe(target, config);
                            });

                            function observerDisconnect() {
                                observer.disconnect();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[51] == 'undefined') {
                        utag.runonce[51] = 1;
                        jQuery('.stats-search-page').on('mousedown', '.stats-applyRefinements-section button.stats-applyRefinements-button', function (e) {
                            utag.link({
                                "refinement_name": jQuery(this).data("tealium_data").refinementName,
                                "event_name": 'search_refinement',
                                "link_text": 'grab search_refinement_name'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[399] == 'undefined') {
                        utag.runonce[399] = 1;
                        jQuery(document.body).on('mousedown', '#facet-Year button.zoomIn', function (e) {
                            utag.link({
                                "refinement_name": 'Year',
                                "event_name": 'search_refinement',
                                "link_text": 'search_refinement_year'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[357] == 'undefined') {
                        utag.runonce[357] = 1;
                        jQuery(document.body).on('mousedown', '.facet-ctype-apply-btn', function (e) {
                            utag.link({
                                "refinement_name": "Content Type",
                                "event_name": "search_refinement",
                                "link_text": "search_refinement_content_type",
                                "refinement_content_type": (function () {
                                    jQuery('.facet-ctype-option-checkbox.ng-dirty').each(function () {
                                        utag_data.refinements.push($(this).parent().text().trim().split(/(\s\()/)[0])
                                    });
                                    return utag_data.refinements.join('|');
                                })()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[416] == 'undefined') {
                        utag.runonce[416] = 1;
                        jQuery(document.body).on('mousedown', '.filter-popover-opt-text', function (e) {
                            utag.link({
                                "link_name": "Show:" + jQuery(this).text(),
                                "link_category": 'Search Refinement',
                                "interaction_category": 'search_refinement'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[174] == 'undefined') {
                        utag.runonce[174] = 1;
                        jQuery('div#AdvancedSearchPage').on('mousedown', 'div#advanced-search span#advKeywordSrch', function (e) {
                            utag.link({
                                "link_name": 'Adv_Keyword_search',
                                "link_category": 'Adv_Srch',
                                "interaction_category": 'advanced_search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[175] == 'undefined') {
                        utag.runonce[175] = 1;
                        jQuery('div#AdvancedSearchPage').on('mousedown', 'a.stats-Adv_Citation_search', function (e) {
                            utag.link({
                                "link_name": 'Adv_Citation_search',
                                "link_category": 'Adv_Srch',
                                "interaction_category": 'advanced_search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[176] == 'undefined') {
                        utag.runonce[176] = 1;
                        jQuery('div#AdvancedSearchPage').on('mousedown', 'a.stats-Adv_Command_search', function (e) {
                            utag.link({
                                "link_name": 'Adv_Command_search_' + jQuery(this).parents(".commandSearchMainDiv").find("input[name=srch_interface_radio]:checked").val(),
                                "link_category": 'Adv_Srch',
                                "interaction_category": 'advanced_search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[173] == 'undefined') {
                        utag.runonce[173] = 1;
                        jQuery('div#AdvancedSearchPage').on('mousedown', 'a.stats-Adv_Srch_Preferences', function (e) {
                            utag.link({
                                "link_name": 'Adv_Srch_Preferences',
                                "link_category": 'Adv_Srch',
                                "interaction_category": 'advanced_search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[177] == 'undefined') {
                        utag.runonce[177] = 1;
                        jQuery('.stats-search-non-ng').on('mousedown', 'h2.Search-count a', function (e) {
                            utag.link({
                                "link_name": 'Searchbar_all_items',
                                "link_category": 'Searchbar',
                                "interaction_category": 'searchbar'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.url'].toString().indexOf('.jsp') < 0) {
                    if (typeof utag.runonce[178] == 'undefined') {
                        utag.runonce[178] = 1;
                        jQuery(document.body).on('mousedown', '.stats-search-submit', function (e) {
                            utag.link({
                                "link_name": 'Searchbar_' + jQuery('.stats-search-type-dropdown').children('[selected]').attr('label').replace('All', 'Basic') + ' Search' + (jQuery('.stats-search-within-publication').find('input')[0].checked ? '_Within Publication' : ''),
                                "link_category": 'Searchbar',
                                "interaction_category": 'searchbar'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.url'].toString().indexOf('.jsp') > -1) {
                    if (typeof utag.runonce[353] == 'undefined') {
                        utag.runonce[353] = 1;
                        jQuery('.stats-search-non-ng').on('mousedown', '.stats-search-submit', function (e) {
                            utag.link({
                                "link_name": 'Searchbar_' + jQuery('.stats-search-type-dropdown').val().replace('#search-', '').replace(/\w\S*/g, function (txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                                }) + ' Search' + (jQuery('.stats-search-within-publication').find('input').length > 0 ? jQuery('.stats-search-within-publication').find('input')[0].checked ? '_Within Publication' : '' : ''),
                                "link_category": 'Searchbar',
                                "interaction_category": 'searchbar'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[179] == 'undefined') {
                        utag.runonce[179] = 1;
                        jQuery('.stats-search-non-ng').on('mousedown', '.stats-search-menu a#authorSearch', function (e) {
                            utag.link({
                                "link_name": 'Searchbar_Adv_Srch',
                                "link_category": 'Searchbar',
                                "interaction_category": 'searchbar'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[180] == 'undefined') {
                        utag.runonce[180] = 1;
                        jQuery('.stats-search-non-ng').on('mousedown', '.stats-search-menu.Search-option ul a', function (e) {
                            utag.link({
                                "link_name": 'Searchbar_Other_' + jQuery(this).text(),
                                "link_category": 'Searchbar',
                                "interaction_category": 'searchbar'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/search') < 0) {
                    if (typeof utag.runonce[117] == 'undefined') {
                        utag.runonce[117] = 1;
                        jQuery(document.body).on('mousedown', '.stats-BrowseResults_SrchWithin', function (e) {
                            utag.link({
                                "link_name": jQuery(this).text() + '_SearchWithin',
                                "link_category": jQuery('title').text().replace(/ /g, '_') + '_SearchWithin',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[185] == 'undefined') {
                        utag.runonce[185] = 1;
                        jQuery('.stats-search-page').on('mousedown', '.stats-SearchResults_DocResult_ViewMedia a', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_DocResult_ViewMedia',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[186] == 'undefined') {
                        utag.runonce[186] = 1;
                        jQuery('.stats-search-page').on('mousedown', '.stats-SearchResults_DocResult_Exit_ReqPermission a', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_DocResult_Exit_ReqPermission',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[187] == 'undefined') {
                        utag.runonce[187] = 1;
                        jQuery('.stats-search-page').on('mousedown', '.stats-SearchResults_DocResult_ViewMore a', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_DocResult_ViewMore',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[189] == 'undefined') {
                        utag.runonce[189] = 1;
                        jQuery(document.body).on('mousedown', 'a.stats-SearchResults_History', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_History',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[190] == 'undefined') {
                        utag.runonce[190] = 1;
                        jQuery(document.body).on('mousedown', 'button.stats-SearchResults_Citation_Download', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_Citation_Download_Format_' + jQuery('#Citations .form-group input[aria-checked="true"]').eq(0).val() + '_Included_' + jQuery('#Citations .form-group input[aria-checked="true"]').eq(1).val(),
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/search/') > -1) {
                    if (typeof utag.runonce[191] == 'undefined') {
                        utag.runonce[191] = 1;
                        jQuery(document.body).on('mousedown', 'button.stats-search-ppct', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_ExportCollabratec',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[192] == 'undefined') {
                        utag.runonce[192] = 1;
                        jQuery(document.body).on('mousedown', 'a.stats-ppct-notification', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_ViewInCollabratec',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[307] == 'undefined') {
                        utag.runonce[307] = 1;
                        jQuery('.stats-search-page').on('mousedown', '.search-result-algorithm-link', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_DocResult_ViewAlgorithm',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[193] == 'undefined') {
                        utag.runonce[193] = 1;
                        jQuery(document.body).on('mousedown', 'button.stats-SearchResults_SetAlert', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_SetAlert',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[195] == 'undefined') {
                        utag.runonce[195] = 1;
                        jQuery('.stats-search-page').on('mousedown', 'button.stats-SearchResults_SrchWithin', function (e) {
                            utag.link({
                                "link_name": 'SearchResults_SrchWithin',
                                "link_category": 'SearchResults',
                                "interaction_category": 'search'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[98] == 'undefined') {
                        utag.runonce[98] = 1;
                        jQuery(document.body).on('mousedown', '.modalWindowRegisterSignIn .listBullet a', function (e) {
                            utag.link({
                                "link_category": 'Create Account Modal 1',
                                "link_name": jQuery(this).text(),
                                "interaction_category": 'account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[101] == 'undefined') {
                        utag.runonce[101] = 1;
                        jQuery(document.body).on('mousedown', 'input.stats-CreateAcct_SignIn', function (e) {
                            utag.link({
                                "link_category": 'Create Account Modal 1',
                                "link_name": jQuery(this).attr("title"),
                                "interaction_category": 'account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[102] == 'undefined') {
                        utag.runonce[102] = 1;
                        jQuery(document.body).on('mousedown', 'input.stats-CreateAcct_Start', function (e) {
                            utag.link({
                                "link_category": 'Create Account Modal 1',
                                "link_name": jQuery(this).attr("title"),
                                "interaction_category": 'account',
                                "event_name": 'account_init'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[103] == 'undefined') {
                        utag.runonce[103] = 1;
                        jQuery(document.body).on('mousedown', 'a.stats-CreateAcct_Cancel', function (e) {
                            utag.link({
                                "link_category": 'Create Account Modal 1',
                                "link_name": jQuery(this).text(),
                                "interaction_category": 'account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[104] == 'undefined') {
                        utag.runonce[104] = 1;
                        jQuery(document.body).on('mousedown', '#xplore_REGISTRATION-xplore_REGISTRATION_STEP2 a', function (e) {
                            utag.link({"link_category": 'Create Account Modal 2', "link_name": jQuery(this).text()})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[105] == 'undefined') {
                        utag.runonce[105] = 1;
                        jQuery(document.body).on('mousedown', 'input.stats-CreateAcct_complete', function (e) {
                            utag.link({
                                "link_category": 'Create Account Modal 2',
                                "link_name": jQuery(this).attr("title"),
                                "interaction_category": 'account',
                                "event_name": 'account_complete'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[106] == 'undefined') {
                        utag.runonce[106] = 1;
                        jQuery(document.body).on('mousedown', '#personal-sign-in a, #personal-sign-in button', function (e) {
                            utag.link({
                                "link_category": 'Personal Sign In modal',
                                "link_name": 'Unav_Per_' + jQuery(this).text(),
                                "interaction_category": 'account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[108] == 'undefined') {
                        utag.runonce[108] = 1;
                        jQuery(document.body).on('mousedown', '.stats-Forgot_PWD_Cont', function (e) {
                            utag.link({
                                "link_name": 'Forgot_PWD_Cont',
                                "link_category": 'Forgot Password Modal',
                                "interaction_category": 'account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[109] == 'undefined') {
                        utag.runonce[109] = 1;
                        jQuery(document.body).on('mousedown', '.Modal-container form a[class*="stats-Inst"]', function (e) {
                            utag.link({
                                "link_name": jQuery(this).text(),
                                "link_category": 'Institutional Sign In',
                                "interaction_category": 'account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[274] == 'undefined') {
                        utag.runonce[274] = 1;
                        jQuery(document.body).on('mousedown', '.Modal-container form button[class*="stats-Inst"]', function (e) {
                            utag.link({
                                "link_name": jQuery(this).attr('class').split('stats-')[1],
                                "link_category": 'Institutional Sign In',
                                "interaction_category": 'account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[110] == 'undefined') {
                        utag.runonce[110] = 1;
                        jQuery(document.body).on('mousedown', 'a.stats-Inst_SI_Athens,a.stats-Inst_SI_Shibboleth', function (e) {
                            utag.link({
                                "link_name": jQuery(this).data("tealium_data").text,
                                "link_category": 'Institutional Sign In',
                                "interaction_category": 'account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if ((utag.data['dom.pathname'].toString().indexOf('/search') < 0 && utag.data['sheet_type'].toString().toLowerCase().indexOf('browse'.toLowerCase()) > -1)) {
                    if (typeof utag.runonce[116] == 'undefined') {
                        utag.runonce[116] = 1;
                        jQuery(document.body).on('mousedown', '.tab-nav a', function (e) {
                            utag.link({
                                "link_name": jQuery(this).text() + '_Tab',
                                "link_category": jQuery('.browse-header').text().trim() + '_Tabs',
                                "interaction_category": 'browse_by_tabs',
                                "browse_by_tabs_interactions": jQuery('.browse-header').text().trim() + '_Tabs:' + jQuery(this).text()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/browse/standards') > -1) {
                    if (typeof utag.runonce[133] == 'undefined') {
                        utag.runonce[133] = 1;
                        jQuery(document.body).on('mousedown', '.stats-browse-standards-ics_codesList li a', function (e) {
                            utag.link({
                                "link_name": 'Browse_Stds_byICSCode_' + jQuery('.pure-button-active').text() + '_' + jQuery(this).text(),
                                "link_category": 'Browse_BookPublisher_MIT_TitleSearch',
                                "interaction_category": 'browse_by_tabs',
                                "browse_by_tabs_interactions": 'Browse_BookPublisher_MIT_TitleSearch' + ':' + 'Browse_Stds_byICSCode_' + jQuery('.pure-button-active').text() + '_' + jQuery(this).text()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/search') < 0) {
                    if (typeof utag.runonce[118] == 'undefined') {
                        utag.runonce[118] = 1;
                        jQuery(document.body).on('mousedown', '.browse-list-item a', function (e) {
                            utag.link({
                                "link_name": jQuery('title').text().replace(/ /g, '_') + (jQuery('.publisher-tabs .pure-button-active').length >= 1 ? '_' + jQuery('.publisher-tabs .pure-button-active').text() : '') + ((/\d/).test(jQuery(this).text()) ? '_NumSearch' : '_AlphaSearch') + '_' + jQuery(this).text(),
                                "link_category": jQuery('title').text().replace(/ /g, '_') + '_Search',
                                "interaction_category": 'browse_by_number',
                                "browse_by_number_interactions": jQuery('title').text().replace(/ /g, '_') + (jQuery('.publisher-tabs .pure-button-active').length >= 1 ? '_' + jQuery('.publisher-tabs .pure-button-active').text() : '') + ((/\d/).test(jQuery(this).text()) ? '_NumSearch' : '_AlphaSearch') + '_' + jQuery(this).text()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/search') < 0) {
                    if (typeof utag.runonce[119] == 'undefined') {
                        utag.runonce[119] = 1;
                        jQuery(document.body).on('mousedown', '.stats-BrowseSubheading a', function (e) {
                            utag.link({
                                "link_name": jQuery('title').text().replace(/ /g, '_') + '_' + jQuery(this).text(),
                                "link_category": jQuery('title').text().replace(/ /g, '_') + '_Alert/Title_List',
                                "interaction_category": 'browse by title',
                                "browse_by_title_interactions": 'jQuery(\'title\').text().replace(/ /g,\'_\') + \'_Alert/Title_List:\' + jQuery(\'title\').text().replace(/ /g,\'_\')'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/browse/books/publisher/') > -1) {
                    if (typeof utag.runonce[121] == 'undefined') {
                        utag.runonce[121] = 1;
                        jQuery(document.body).on('mousedown', '.List-item-publisher a', function (e) {
                            utag.link({
                                "link_name": jQuery('title').text().replace(/ /g, '_') + '_' + jQuery(this).hasClass('uppercase') ? jQuery(this).text() : jQuery(this).children('img').attr('alt'),
                                "link_category": jQuery('title').text().replace(/ /g, '_') + '_Publisher',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/xpl/mitpress') > -1 || utag.data['dom.pathname'].toString().indexOf('/xpl/wileyieeepress') > -1 || utag.data['dom.pathname'].toString().indexOf('/xpl/wileytelecom') > -1) {
                    if (typeof utag.runonce[122] == 'undefined') {
                        utag.runonce[122] = 1;
                        jQuery(document.body).on('mousedown', '.stats-publisher_results-filter a', function (e) {
                            utag.link({
                                "link_name": jQuery('title').text().replace(/ /g, '_') + '_' + jQuery(this).text(),
                                "link_category": jQuery('title').text().replace(/ /g, '_') + '_byTopicSearch',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/xpl/mitpress') > -1 || utag.data['dom.pathname'].toString().indexOf('/xpl/wileyieeepress') > -1 || utag.data['dom.pathname'].toString().indexOf('/xpl/wileytelecom') > -1) {
                    if (typeof utag.runonce[123] == 'undefined') {
                        utag.runonce[123] = 1;
                        jQuery(document.body).on('mousedown', '.stats-publisher_links-learnMore a', function (e) {
                            utag.link({
                                "link_name": jQuery('title').text().replace(/ /g, '_') + '_Exit_' + jQuery(this).text(),
                                "link_category": jQuery('title').text().replace(/ /g, '_') + '_Exit',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if ((utag.data['dom.pathname'].toString().indexOf('/xpl/seriesLanding.jsp') > -1 && utag.data['dom.query_string'].toString().indexOf('Morgan') > -1)) {
                    if (typeof utag.runonce[124] == 'undefined') {
                        utag.runonce[124] = 1;
                        jQuery(document.body).on('mousedown', '.tab-menu-static a', function (e) {
                            utag.link({
                                "link_name": 'Browse_BookPublisher_M&C_' + '_' + jQuery(this).text().trim() + '_',
                                "link_category": 'Browse_BookPublisher_M&C_Tabs',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if ((utag.data['dom.pathname'].toString().indexOf('/xpl/seriesLanding.jsp') > -1 && utag.data['dom.query_string'].toString().indexOf('Morgan') > -1)) {
                    if (typeof utag.runonce[125] == 'undefined') {
                        utag.runonce[125] = 1;
                        jQuery(document.body).on('mousedown', '.stats-publisher-bookSeries_quickLinks a', function (e) {
                            utag.link({
                                "link_name": 'Browse_BookPublisher_M&C_AboutTab_Exit' + '_' + jQuery(this).text(),
                                "link_category": 'Browse_BookPublisher_M&C__AboutTab_Exits',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if ((utag.data['dom.pathname'].toString().indexOf('/xpl/seriesLanding.jsp') > -1 && utag.data['dom.query_string'].toString().indexOf('Morgan') > -1)) {
                    if (typeof utag.runonce[127] == 'undefined') {
                        utag.runonce[127] = 1;
                        jQuery(document.body).on('mousedown', '.stats-publisher-browseTheSeries_MorganClaypool a', function (e) {
                            utag.link({
                                "link_name": 'Browse_BookPublisher_M&C_BrowseSeriesTab_' + '_' + jQuery(this).text(),
                                "link_category": 'Browse_BookPublisher_M&C_BrowseSeriesTab',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if ((utag.data['dom.pathname'].toString().indexOf('/xpl/seriesLanding.jsp') > -1 && utag.data['dom.query_string'].toString().indexOf('Morgan') > -1)) {
                    if (typeof utag.runonce[128] == 'undefined') {
                        utag.runonce[128] = 1;
                        jQuery(document.body).on('mousedown', '.stats-articleRecord-authors a', function (e) {
                            utag.link({
                                "link_name": 'Browse_BookPublisher_M&C_BrowseSeriesTab_' + jQuery('.breadcrumb a').eq(2).text().replace('Synthesis Lectures on ', '') + '_TitlesTab_AuthorSearch',
                                "link_category": 'Browse_BookPublisher_M&C_TitlesTab_AuthorSearch',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if ((utag.data['dom.pathname'].toString().indexOf('/xpl/seriesLanding.jsp') > -1 && utag.data['dom.query_string'].toString().indexOf('Morgan') > -1)) {
                    if (typeof utag.runonce[129] == 'undefined') {
                        utag.runonce[129] = 1;
                        jQuery(document.body).on('mousedown', 'a.stats-book-PDF', function (e) {
                            utag.link({
                                "link_name": 'Browse_BookPublisher_M&C_BrowseSeriesTab_' + jQuery('.breadcrumb a').eq(2).text().replace('Synthesis Lectures on ', '') + '_TitlesTab_PDFDnId',
                                "link_category": 'Browse_BookPublisher_M&C_TitlesTab_PDFDnId',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/xpl/mitpress') > -1) {
                    if (typeof utag.runonce[130] == 'undefined') {
                        utag.runonce[130] = 1;
                        jQuery(document.body).on('mousedown', 'a.stats-Browse_BookPublisher_MIT_NewlyPublished', function (e) {
                            utag.link({
                                "link_name": 'Browse_BookPublisher_MIT_NewlyPublished',
                                "link_category": 'Browse_BookPublisher_MIT_NewlyPublished',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/xpl/mitpress') > -1) {
                    if (typeof utag.runonce[294] == 'undefined') {
                        utag.runonce[294] = 1;
                        jQuery(document.body).on('mousedown', '#mitBooks-results-list a', function (e) {
                            utag.link({
                                "link_name": 'Browse_BookPublisher_MIT_Featured',
                                "link_category": 'Browse_BookPublisher_MIT_Featured',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/xpl/wileyieeepress') > -1) {
                    if (typeof utag.runonce[131] == 'undefined') {
                        utag.runonce[131] = 1;
                        jQuery(document.body).on('mousedown', '.stats-Browse_BookPublisher_Wiley_NewTitlesSearch,.stats-Browse_BookPublisher_Wiley_AllTitlesSearch', function (e) {
                            utag.link({
                                "link_name": jQuery(this).attr('class').replace('stats-', ''),
                                "link_category": 'Browse_BookPublisher_IEEE_TitleSearch',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['content_type'].toString().indexOf('Books & eBooks') > -1) {
                    if (typeof utag.runonce[298] == 'undefined') {
                        utag.runonce[298] = 1;
                        jQuery(document.body).on('mousedown', '#nav-article a', function (e) {
                            utag.link({
                                "link_name": 'Books & eBooks_' + jQuery(this).text().trim() + '_Tab',
                                "link_category": 'Books & eBooks',
                                "interaction_category": 'books'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[134] == 'undefined') {
                        utag.runonce[134] = 1;
                        jQuery(document.body).on('mousedown', '.stats-mySettings-contentAlerts_tabs a', function (e) {
                            utag.link({
                                "link_name": 'AlertSignUp_' + jQuery('this').text() + '_Tab',
                                "link_category": 'AlertSignUp_Tabs',
                                "interaction_category": 'settings'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[135] == 'undefined') {
                        utag.runonce[135] = 1;
                        jQuery(document.body).on('mousedown', '.stats-mySettings-contentAlerts_tabs_resetUpdateBar input[name="Update"]', function (e) {
                            utag.link({
                                "link_name": 'AlertSignUp_' + jQuery('.stats-mySettings-contentAlerts_tabs li.selected a').text() + '_Update',
                                "link_category": 'AlertSignUp_Update',
                                "interaction_category": 'settings'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[136] == 'undefined') {
                        utag.runonce[136] = 1;
                        jQuery(document.body).on('mousedown', '.stats-mySettings-contentAlerts_JM_pubTitle', function (e) {
                            utag.link({
                                "link_name": jQuery(this).attr(href),
                                "link_category": 'AlertSignUp_J&M_AbsHome',
                                "interaction_category": 'settings'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[137] == 'undefined') {
                        utag.runonce[137] = 1;
                        jQuery(document.body).on('mousedown', '.stats-mySettings-contentAlerts_JM_latestIssue', function (e) {
                            utag.link({
                                "link_name": jQuery(this).attr(href),
                                "link_category": 'AlertSignUp_J&M_AbsCurrentIssue',
                                "interaction_category": 'settings'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[138] == 'undefined') {
                        utag.runonce[138] = 1;
                        jQuery(document.body).on('mousedown', '.stats-mySettings-contentAlerts_JM_rssFeed', function (e) {
                            utag.link({
                                "link_name": jQuery(this).attr(href),
                                "link_category": 'AlertSignUp_J&M_RSSFeed',
                                "interaction_category": 'settings'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[139] == 'undefined') {
                        utag.runonce[139] = 1;
                        jQuery(document.body).on('mousedown', '.stats-SearchAlerts_RunSearch,.stats-SearchAlerts_actionLinks a', function (e) {
                            utag.link({
                                "link_name": 'SearchAlerts_' + jQuery(this).is('.stats-SearchAlerts_RunSearch') ? 'RunSearch' : jQuery(this).text().trim() + '_' + jQuery(this).parents('tr').find('.stats-SearchAlerts_RunSearch').text().trim(),
                                "link_category": 'SearchAlerts',
                                "interaction_category": 'settings'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[140] == 'undefined') {
                        utag.runonce[140] = 1;
                        jQuery(document.body).on('mousedown', '.stats-Preferences_Update input', function (e) {
                            utag.link({
                                "link_name": 'Preferences_Update',
                                "link_category": 'Preferences',
                                "interaction_category": 'settings'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[141] == 'undefined') {
                        utag.runonce[141] = 1;
                        jQuery(document.body).on('mousedown', '.stats-Preferences_Note a', function (e) {
                            utag.link({
                                "link_name": 'Preferences_ViewHelp',
                                "link_category": 'Preferences',
                                "interaction_category": 'settings'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                try {
                    if (1) {
                        try {
                            window.getCourseName = function () {
                                var courseData = jQuery("div.stats-Browse_Courses_CoursePg-signup-container").data("tealium_data");
                                if (typeof (courseData) != "object") {
                                    function courseNameFix(match, p1, p2) {
                                        return match.replace(p1, "'" + p2 + "'");
                                    };newCourseData = courseData.replace(/courseName": ".*("(.+)").+}/g, courseNameFix);
                                    return JSON.parse(newCourseData).courseName
                                } else {
                                    return jQuery("div.stats-Browse_Courses_CoursePg-signup-container").data("tealium_data").courseName
                                }
                            }
                        } catch (error) {
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[150] == 'undefined') {
                        utag.runonce[150] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_MyCourses', function (e) {
                            utag.link({"link_name": 'Browse_Courses_MyCourses', "link_category": 'Browse_Courses'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[151] == 'undefined') {
                        utag.runonce[151] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_TitleList', function (e) {
                            utag.link({"link_name": 'Browse_Courses_TitleList', "link_category": 'Browse_Courses'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[152] == 'undefined') {
                        utag.runonce[152] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_home_category', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_' + jQuery(this).data("tealium_data").categoryName,
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[392] == 'undefined') {
                        utag.runonce[392] = 1;
                        jQuery(document.body).on('mousedown', '.course-programs a.course-program', function (e) {
                            utag.link({
                                "link_name": 'Course_Programs:' + jQuery(this).text().trim(),
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[153] == 'undefined') {
                        utag.runonce[153] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_Catlist-category', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_Catlist_' + jQuery(this).text().trim(),
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[154] == 'undefined') {
                        utag.runonce[154] = 1;
                        jQuery('.stats-course').on('mousedown', ' a.stats-Browse_Courses_Catlist-topic', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_Catlist_' + jQuery(this).data("tealium_data").categoryName + '_' + jQuery(this).text().trim(),
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[155] == 'undefined') {
                        utag.runonce[155] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_CatPg', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CatPg_' + jQuery(this).data("tealium_data").categoryName + '_Featured_' + jQuery(this).data("tealium_data").topicName,
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[156] == 'undefined') {
                        utag.runonce[156] = 1;
                        jQuery('.stats-course').on('mousedown', 'div.stats-Browse_Courses_CatPg-topic', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CatPg_' + jQuery(this).data("tealium_data").categoryName + '_' + jQuery(this).data("tealium_data").topicName,
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[157] == 'undefined') {
                        utag.runonce[157] = 1;
                        jQuery('.stats-course').on('mousedown', 'div.stats-Browse_Courses_CatPg-level', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CatPg_' + jQuery(this).data("tealium_data").categoryName + '_Level',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[158] == 'undefined') {
                        utag.runonce[158] = 1;
                        jQuery('.stats-course').on('mousedown', 'div.stats-Browse_Courses_CatPg-duration', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CatPg_' + jQuery(this).data("tealium_data").categoryName + '_Length',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[159] == 'undefined') {
                        utag.runonce[159] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_CourseDesc_ViewDetails_ViaImage', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CourseDesc_ViewDetails_ViaImage',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[160] == 'undefined') {
                        utag.runonce[160] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_CourseDesc_ViewDetails_ViaImage', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_ CourseDesc _ViewDetails_ViaTitle',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[161] == 'undefined') {
                        utag.runonce[161] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_CourseDesc_ViewDetails_ViaViewMore', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_ CourseDesc _ViewDetails_ViaViewMore',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[162] == 'undefined') {
                        utag.runonce[162] = 1;
                        jQuery(document.body).on('mousedown', '.modalWindowWrapper #modalWindowSignInBtn,.stats-Browse_Courses_CoursePg-Flyout_SignIn', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + utag.data.course_category_name + '_' + getCourseName() + '_signin',
                                "link_category": 'Browse_Courses',
                                "video_state": 'load',
                                "video_status": '0',
                                "video_position": '0',
                                "video_name": jQuery('title').text(),
                                "video_category": utag.data.course_sub_category || utag.data.course_category_name
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[163] == 'undefined') {
                        utag.runonce[163] = 1;
                        jQuery('.stats-course').on('mousedown', 'button.stats-course-start-nosignin', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parents("div.stats-Browse_Courses_CoursePg-signup-container").data("tealium_data").categoryName + '_' + getCourseName() + '_start_without_signin',
                                "link_category": 'Browse_Courses',
                                "video_state": 'load',
                                "video_status": '0',
                                "video_position": '0',
                                "video_name": jQuery('title').text(),
                                "video_category": utag.data.course_sub_category || utag.data.course_category_name
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[164] == 'undefined') {
                        utag.runonce[164] = 1;
                        jQuery('.stats-course').on('mousedown', 'span.stats-Browse_Courses_CoursePg-DnldNotes', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parent().data("tealium_data").categoryName + '_' + jQuery(this).parent().data("tealium_data").courseName + '_DnldNotes',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[165] == 'undefined') {
                        utag.runonce[165] = 1;
                        jQuery('.stats-course').on('mousedown', 'input.stats-Browse_Courses_CoursePg-Flyout_SignIn', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").categoryName + '_' + Query(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").courseName + '_Flyout_SignIn',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[166] == 'undefined') {
                        utag.runonce[166] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_CoursePg-Flyout_SignIn_Forgot_UP', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").categoryName + '_' + Query(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").courseName + '_Flyout_SignIn_Forgot_UP',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[167] == 'undefined') {
                        utag.runonce[167] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_CoursePg-Flyout_SignIn_Forgot_UP', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").categoryName + '_' + Query(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").courseName + '_Flyout_SignIn_Forgot_Inst_UP',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[168] == 'undefined') {
                        utag.runonce[168] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_CoursePg-Flyout_SignIn_Other_Auth_Options', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").categoryName + '_' + Query(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").courseName + '_Flyout_SignIn_Other_Auth_Options',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[169] == 'undefined') {
                        utag.runonce[169] = 1;
                        jQuery('.stats-course').on('mousedown', 'a.stats-Browse_Courses_CoursePg-Flyout_Membership', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").categoryName + '_' + Query(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").courseName + '_Flyout_Membership',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[170] == 'undefined') {
                        utag.runonce[170] = 1;
                        jQuery('.stats-course').on('mousedown', 'input.stats-Browse_Courses_CoursePg-Flyout_AddtoCart', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").categoryName + '_' + Query(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").courseName + '_Flyout_AddtoCart',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[171] == 'undefined') {
                        utag.runonce[171] = 1;
                        jQuery('.stats-course').on('mousedown', ' a.stats-Browse_Courses_CoursePg-Flyout_LearnMore', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + jQuery(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").categoryName + '_' + Query(this).parents("div.stats-Browse_Courses_CoursePg-Flyout_container").data("tealium_data").courseName + '_Flyout_LearnMore',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                    if (typeof utag.runonce[172] == 'undefined') {
                        utag.runonce[172] = 1;
                        jQuery('.stats-course').on('mousedown', 'button.stats-course-start', function (e) {
                            utag.link({
                                "link_name": 'Browse_Courses_CoursePg_' + utag.data.course_category_name + '_' + getCourseName() + '_start',
                                "link_category": 'Browse_Courses'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[112] == 'undefined') {
                        utag.runonce[112] = 1;
                        jQuery(document.body).on('mousedown', '#download_citations_form input[alt="Download Citations"]', function (e) {
                            utag.link({
                                "link_name": utag_data.content_type + 'LeftNav_Citation_Download_' + jQuery.map(jQuery('.Inputs input:checked'), function (element) {
                                    return jQuery(element).next().text()
                                }).join('_'), "link_category": utag_data.content_type + 'LeftNav_Citation_Download'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[199] == 'undefined') {
                        utag.runonce[199] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-document-banner button', function (e) {
                            utag.link({
                                "link_name": 'header_' + jQuery(this).text().trim(),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[200] == 'undefined') {
                        utag.runonce[200] = 1;
                        jQuery('div.stats-document').on('mousedown', '.header-rel-art-list a', function (e) {
                            utag.link({
                                "link_name": 'related_art_top' + (jQuery(this).siblings('.editors-choice-icon').length >= 1 ? '_editors_choice' : ''),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[201] == 'undefined') {
                        utag.runonce[201] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-document-authors-banner div.stats-document-authors-banner-authorsContainer a', function (e) {
                            utag.link({
                                "link_name": 'header_author_search' + jQuery(this).text(),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[202] == 'undefined') {
                        utag.runonce[202] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-document-abstract-publishedIn a', function (e) {
                            utag.link({"link_name": 'publishedin_link_abstab', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[203] == 'undefined') {
                        utag.runonce[203] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-document-abstract-doi a', function (e) {
                            utag.link({"link_name": 'doi_link_abstact', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[204] == 'undefined') {
                        utag.runonce[204] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-document-relatedArticles a', function (e) {
                            utag.link({
                                "link_name": 'related_art_footer' + (jQuery(this).children('.icon-editors-choice').length >= 1 ? '_editors_choice' : ''),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[205] == 'undefined') {
                        utag.runonce[205] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-document-container-fullTextSection div.stats-keywords-container a', function (e) {
                            utag.link({
                                "link_name": 'Keywords_section_' + jQuery(this).data("tealium_data").keywordType + '_search',
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[206] == 'undefined') {
                        utag.runonce[206] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-document-container-fullTextSection div.stats-author-container a', function (e) {
                            utag.link({"link_name": 'authors_section_authorsearch', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[207] == 'undefined') {
                        utag.runonce[207] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-document-readFullTextArrow-container a', function (e) {
                            utag.link({"link_name": 'read_doc_link', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[209] == 'undefined') {
                        utag.runonce[209] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-document-snippetText-readMoreLink-container a', function (e) {
                            utag.link({"link_name": 'read_doc_link', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[210] == 'undefined') {
                        utag.runonce[210] = 1;
                        jQuery(document.body).on('mousedown', '#glance-hdr .tab-menu li', function (e) {
                            utag.link({
                                "link_name": jQuery(this).text().trim() + '_Tab',
                                "link_category": utag_data.sheet_type + '_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[299] == 'undefined') {
                        utag.runonce[299] = 1;
                        jQuery(document.body).on('mousedown', '#email-popup .submit-popup .submit', function (e) {
                            utag.link({
                                "link_name": utag_data.content_type + 'LeftNav_emaildoc',
                                "link_category": utag_data.content_type
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[211] == 'undefined') {
                        utag.runonce[211] = 1;
                        jQuery(document.body).on('mousedown', '.ArticlePage .section.pdf a', function (e) {
                            utag.link({
                                "link_name": 'DownloadPDF',
                                "link_category": 'static html',
                                "html_usage": 'pdf_download'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[212] == 'undefined') {
                        utag.runonce[212] = 1;
                        jQuery(document.body).on('mousedown', '.ArticlePage .jump-open a', function (e) {
                            utag.link({"link_name": 'JumpNav', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[213] == 'undefined') {
                        utag.runonce[213] = 1;
                        jQuery(document.body).on('mousedown', '.ArticlePage #article-nav a', function (e) {
                            utag.link({
                                "link_name": jQuery(this).text().trim() + '_ArticleNav',
                                "link_category": 'static html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[214] == 'undefined') {
                        utag.runonce[214] = 1;
                        jQuery(document.body).on('mousedown', '.ArticlePage a.all', function (e) {
                            utag.link({"link_name": 'Figure_ViewAll', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[215] == 'undefined') {
                        utag.runonce[215] = 1;
                        jQuery(document.body).on('mousedown', '#FiguresPage .tools a', function (e) {
                            utag.link({
                                "link_name": 'FigurePg_' + jQuery(this).text().replace(/ /g, ''),
                                "link_category": 'static html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[216] == 'undefined') {
                        utag.runonce[216] = 1;
                        jQuery(document.body).on('mousedown', '#FiguresPage #article-nav ul li.new_page a', function (e) {
                            utag.link({"link_name": 'FigurePg_ViewFullText', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[217] == 'undefined') {
                        utag.runonce[217] = 1;
                        jQuery(document.body).on('mousedown', '#FiguresPage .jump-open a', function (e) {
                            utag.link({"link_name": 'FigurePg_JumpNav', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[218] == 'undefined') {
                        utag.runonce[218] = 1;
                        jQuery(document.body).on('mousedown', '#text-sizer span', function (e) {
                            utag.link({
                                "link_name": 'LeftNav_Text_' + jQuery(this).text(),
                                "link_category": 'static html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[219] == 'undefined') {
                        utag.runonce[219] = 1;
                        jQuery(document.body).on('mousedown', '.atm-i #at_hover a', function (e) {
                            utag.link({
                                "link_name": 'LeftNav_Share_' + jQuery(this).text(),
                                "link_category": 'static html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[220] == 'undefined') {
                        utag.runonce[220] = 1;
                        jQuery(document.body).on('mousedown', '.article-tools a.export-ppct-details,.article-tools .stats-permission a,.article-tools .tl-print a', function (e) {
                            utag.link({
                                "link_name": 'LeftNav_' + (jQuery(this).text() || jQuery(this).attr('alt')),
                                "link_category": utag_data.content_type
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[221] == 'undefined') {
                        utag.runonce[221] = 1;
                        jQuery(document.body).on('mousedown', 'span#email-article', function (e) {
                            utag.link({"link_name": 'LeftNav_Email', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[222] == 'undefined') {
                        utag.runonce[222] = 1;
                        jQuery(document.body).on('mousedown', '#keywords a', function (e) {
                            utag.link({
                                "link_name": 'KeywordsSection_' + jQuery(this).parent().find('h3').text() + '_Search',
                                "link_category": 'static html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[223] == 'undefined') {
                        utag.runonce[223] = 1;
                        jQuery(document.body).on('mousedown', '#authors .author h3 a', function (e) {
                            utag.link({"link_name": 'AuthorSection_AuthorNameSearch', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[224] == 'undefined') {
                        utag.runonce[224] = 1;
                        jQuery(document.body).on('mousedown', '#authors .author .footer a', function (e) {
                            utag.link({"link_name": 'AuthorSection_MoreByAuthor', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[225] == 'undefined') {
                        utag.runonce[225] = 1;
                        jQuery(document.body).on('mousedown', '.glance-abstract #journalTitle a', function (e) {
                            utag.link({"link_name": 'AbstractTab_ViewPubHomepg', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[226] == 'undefined') {
                        utag.runonce[226] = 1;
                        jQuery(document.body).on('mousedown', '.glance-abstract #issueDate a', function (e) {
                            utag.link({"link_name": 'AbstractTab_ViewIssueTOC', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[227] == 'undefined') {
                        utag.runonce[227] = 1;
                        jQuery(document.body).on('mousedown', '.glance-authors h3 a', function (e) {
                            utag.link({"link_name": 'AuthorsTab_AuthorNameSearch', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[228] == 'undefined') {
                        utag.runonce[228] = 1;
                        jQuery(document.body).on('mousedown', '.glance-authors .more a', function (e) {
                            utag.link({"link_name": 'AuthorsTab_AboutAuthor', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[229] == 'undefined') {
                        utag.runonce[229] = 1;
                        jQuery(document.body).on('mousedown', '.glance-authors .all a', function (e) {
                            utag.link({"link_name": 'AuthorsTab_ViewAll', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[230] == 'undefined') {
                        utag.runonce[230] = 1;
                        jQuery(document.body).on('mousedown', '.glance-figures .all a', function (e) {
                            utag.link({"link_name": 'FiguresTab_ViewAll', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[231] == 'undefined') {
                        utag.runonce[231] = 1;
                        jQuery(document.body).on('mousedown', '.glance-figures .all a', function (e) {
                            utag.link({
                                "link_name": 'MultiMediaTab_' + jQuery(this).text(),
                                "link_category": 'static html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[232] == 'undefined') {
                        utag.runonce[232] = 1;
                        jQuery(document.body).on('mousedown', '.glance-cited-by .body a', function (e) {
                            utag.link({"link_name": 'ReferenceTab_ ViewAbstract', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[233] == 'undefined') {
                        utag.runonce[233] = 1;
                        jQuery(document.body).on('mousedown', '.glance-cited-by .footer a.abstract_link', function (e) {
                            utag.link({"link_name": 'ReferenceTab_QuickAbs', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[234] == 'undefined') {
                        utag.runonce[234] = 1;
                        jQuery(document.body).on('mousedown', '.glance-cited-by .footer a:not(.abstract_link)', function (e) {
                            utag.link({"link_name": 'ReferenceTab_ShowInContext', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[235] == 'undefined') {
                        utag.runonce[235] = 1;
                        jQuery(document.body).on('mousedown', '.glance-cited-by .all a', function (e) {
                            utag.link({"link_name": 'ReferenceTab_ViewAll', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[236] == 'undefined') {
                        utag.runonce[236] = 1;
                        jQuery(document.body).on('mousedown', '.glance-cited-by .body a', function (e) {
                            utag.link({"link_name": 'CitedByTab_ ViewAbstract', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[237] == 'undefined') {
                        utag.runonce[237] = 1;
                        jQuery(document.body).on('mousedown', '.glance-cited-by .footer a', function (e) {
                            utag.link({"link_name": 'CitedByTab_QuickAbs', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[238] == 'undefined') {
                        utag.runonce[238] = 1;
                        jQuery(document.body).on('mousedown', '.glance-cited-by .all a', function (e) {
                            utag.link({"link_name": 'CitedByTab_ViewAll', "link_category": 'static html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[239] == 'undefined') {
                        utag.runonce[239] = 1;
                        jQuery(document.body).on('mousedown', '.glance-keywords .block a', function (e) {
                            utag.link({
                                "link_name": 'KeywordsTab_' + jQuery(this).parent().find('h3').text() + '_Search',
                                "link_category": 'static html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[240] == 'undefined') {
                        utag.runonce[240] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-manage-alerts-link-container a', function (e) {
                            utag.link({"link_name": jQuery(this).text().trim(), "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().toLowerCase().indexOf('virtual-journals'.toLowerCase()) < 0) {
                    if (typeof utag.runonce[243] == 'undefined') {
                        utag.runonce[243] = 1;
                        jQuery(document.body).on('mousedown', '.stats-download-citations-button-download', function (e) {
                            utag.link({
                                "link_name": 'dnldCitation_' + 'include_' + jQuery("div.stats-download-citations button:button").parents(".stats-download-citations").find("div.stats-download-citations-radioButtons-container section.stats-include input:radio[name=citations-format]:checked").val() + ':output_' + jQuery("div.stats-download-citations button:button").parents(".stats-download-citations").find("div.stats-download-citations-radioButtons-container section.stats-output input:radio[name=download-format]:checked").val(),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[244] == 'undefined') {
                        utag.runonce[244] = 1;
                        jQuery(document.body).on('mousedown', '.stats-email-popover-button-send', function (e) {
                            utag.link({"link_name": 'email_doc', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[245] == 'undefined') {
                        utag.runonce[245] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-sip-modal-rightrail a', function (e) {
                            utag.link({
                                "link_name": 'Purch_tab_' + jQuery(this).text(),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[246] == 'undefined') {
                        utag.runonce[246] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-sip-purchase-discount-container a', function (e) {
                            utag.link({
                                "link_name": 'Purch_tab_' + jQuery(this).text(),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[247] == 'undefined') {
                        utag.runonce[247] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-sip-purchase-button-container button.sip-purchase-cart-button', function (e) {
                            utag.link({
                                "link_name": 'Purch_tab_' + jQuery(this).text(),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[248] == 'undefined') {
                        utag.runonce[248] = 1;
                        jQuery(document.body).on('mousedown', '.sip-signin-action-link', function (e) {
                            utag.link({
                                "link_name": 'signin_tab_' + jQuery(this).text(),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[249] == 'undefined') {
                        utag.runonce[249] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-sip-signin-actions-container button.sip-signin-button:not(.sso)', function (e) {
                            utag.link({"link_name": 'signin_tab_signin_button', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[250] == 'undefined') {
                        utag.runonce[250] = 1;
                        jQuery(document.body).on('mousedown', 'a.logo-shibboleth,a.logo-athens', function (e) {
                            utag.link({
                                "link_name": 'signin_other_tab_' + jQuery(this).attr("title"),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[251] == 'undefined') {
                        utag.runonce[251] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-sip-signin-sso-browse a', function (e) {
                            utag.link({
                                "link_name": 'signin_other_tab_browse_institutions',
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[252] == 'undefined') {
                        utag.runonce[252] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-sip-signin-actions-container button.sip-signin-button.sso', function (e) {
                            utag.link({"link_name": 'signin_other_tab_signin_button', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[263] == 'undefined') {
                        utag.runonce[263] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-citations-carousel-container div.stats-carousel-items div.stats-citation-link-container a', function (e) {
                            utag.link({
                                "link_name": 'citations_' + jQuery('div.stats-citations-carousel-container div.stats-carousel-items div.stats-citation-link-container a').parents('div.stats-citations-carousel-container').data("tealium_data").citationsByType + '_' + jQuery(this).text().trim(),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[268] == 'undefined') {
                        utag.runonce[268] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-citations-publisher-ieee div.stats-citations-links-container a', function (e) {
                            utag.link({
                                "link_name": jQuery(this).attr('class').replace(/\-/g, '_').replace('stats_', '').replace('link', 'section'),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[269] == 'undefined') {
                        utag.runonce[269] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-citations-publisher-nonIeee div.stats-citations-links-container a', function (e) {
                            utag.link({
                                "link_name": 'htmldoc_' + jQuery(this).attr('class').replace(/\-/g, '_').replace('stats_', '').replace('link', 'section'),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[295] == 'undefined') {
                        utag.runonce[295] = 1;
                        jQuery(document.body).on('mousedown', 'a.google-scholar', function (e) {
                            utag.link({"link_name": 'metrics_tab_google_scholar', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[306] == 'undefined') {
                        utag.runonce[306] = 1;
                        jQuery(document.body).on('mousedown', '.algorithm-view-link', function (e) {
                            utag.link({
                                "link_name": 'algorithm_' + utag.data.document_id,
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[402] == 'undefined') {
                        utag.runonce[402] = 1;
                        jQuery(document.body).on('mousedown', '.browse-toc-div .toc-container a', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": "leftNav_doc_section_" + jQuery(this).text().trim()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['sheet_name'].toString().toLowerCase().indexOf('Dynamic html doc detail'.toLowerCase()) > -1) {
                    if (typeof utag.runonce[403] == 'undefined') {
                        utag.runonce[403] = 1;
                        jQuery(document.body).on('mousedown', '.browse-pub-tab a.document-tab-link', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": "leftNav_" + jQuery(this).text().trim()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/document/') > -1) {
                    if (typeof utag.runonce[404] == 'undefined') {
                        utag.runonce[404] = 1;
                        jQuery(document.body).on('mousedown', '.doc-actions-link', function (e) {
                            utag.link({
                                "link_name": jQuery(this).is('.stats-document-lh-action-downloadPdf_3') ? 'action_icon_pdf_signin' : jQuery(this).is('.stats-document-lh-action-downloadPdf_2') ? 'action_icon_pdf_view' : ('action_icon_' + jQuery(this).find('.icon').attr('class').split('-')[jQuery(this).find('.icon').attr('class').split('-').length - 1]),
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[405] == 'undefined') {
                        utag.runonce[405] = 1;
                        jQuery(document.body).on('mousedown', '.header-rel-art-action a', function (e) {
                            utag.link({"link_category": 'dynamic HTML', "link_name": 'related_article_view_all'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('/document/') > -1) {
                    if (typeof utag.runonce[408] == 'undefined') {
                        utag.runonce[408] = 1;
                        jQuery(document.body).on('mousedown', '.tooltip-inner button', function (e) {
                            utag.link({"link_category": 'dynamic html', "link_name": 'search_within_document'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[409] == 'undefined') {
                        utag.runonce[409] = 1;
                        jQuery(document.body).on('mousedown', '#authors a[href*="/search"]', function (e) {
                            utag.link({"link_name": 'authors_accordion_author_search', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[410] == 'undefined') {
                        utag.runonce[410] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-figures-signIn-container a.stats-figures-signInToView', function (e) {
                            utag.link({"link_name": 'figures_accordion_signin', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[411] == 'undefined') {
                        utag.runonce[411] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-figure a.stats-figure-viewInContext', function (e) {
                            utag.link({
                                "link_name": 'figures_accordion_view_in_context',
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[412] == 'undefined') {
                        utag.runonce[412] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-figure a.stats-figure-viewFullSizeImage', function (e) {
                            utag.link({
                                "link_name": 'figures_accordion_view_full_size',
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[413] == 'undefined') {
                        utag.runonce[413] = 1;
                        jQuery(document.body).on('mousedown', '#keywords a', function (e) {
                            utag.link({
                                "link_name": 'keywords_tab_keywords_search_' + jQuery(this).data("tealium_data").keywordType,
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[414] == 'undefined') {
                        utag.runonce[414] = 1;
                        jQuery('div.stats-document').on('mousedown', 'div.stats-metrics-citations a', function (e) {
                            utag.link({
                                "link_name": 'metrics_accordion_' + jQuery(this).data("tealium_data").citationsIn,
                                "link_category": 'dynamic HTML'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[415] == 'undefined') {
                        utag.runonce[415] = 1;
                        jQuery(document.body).on('mousedown', 'div.stats-cmap-map-list-container a', function (e) {
                            utag.link({
                                "link_name": 'references_accordion_CitMap_article_link',
                                "link_category": 'dynamic html'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[418] == 'undefined') {
                        utag.runonce[418] = 1;
                        jQuery(document.body).on('mousedown', '.iq-plus-graph a,.iq-plus-graph button', function (e) {
                            utag.link({"link_name": 'iQ_widget_expand', "link_category": 'dynamic html'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (typeof utag.data['sheet_name'] == 'undefined' || utag.data['sheet_name'].toString().toLowerCase().indexOf('Dynamic html doc detail'.toLowerCase()) < 0) {
                    if (typeof utag.runonce[429] == 'undefined') {
                        utag.runonce[429] = 1;
                        jQuery(document.body).on('mousedown', '.browse-pub-tab a.document-tab-link', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": "tabs_" + jQuery(this).text().trim()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[430] == 'undefined') {
                        utag.runonce[430] = 1;
                        jQuery(document.body).on('mousedown', 'a:contains("View Full Aims & Scope")', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:' + jQuery('.title-container').text().trim() + ':' + jQuery(this).text().trim()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[434] == 'undefined') {
                        utag.runonce[434] = 1;
                        jQuery(document.body).on('mousedown', '.tabs-section-header div', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:home tabs:' + jQuery(this).text().trim()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[435] == 'undefined') {
                        utag.runonce[435] = 1;
                        jQuery(document.body).on('mousedown', '.u-flex-justify-end a', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:home tabs:view all:' + jQuery('.tabs-section-header .tab-highlight').text().trim()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[436] == 'undefined') {
                        utag.runonce[436] = 1;
                        jQuery(document.body).on('mousedown', '.related-magazines a', function (e) {
                            utag.link({"link_category": 'dynamic html', "link_name": 'journal:Related Journals'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[432] == 'undefined') {
                        utag.runonce[432] = 1;
                        jQuery(document.body).on('mousedown', '.get-issue-link.row', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:Get Entire Issue Now:' + jQuery('.title-container').text().trim() + ':' + jQuery('.u-m-1 p b').text() + ':' + jQuery('.Dashboard-header span span:nth-child(2)').text()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[433] == 'undefined') {
                        utag.runonce[433] = 1;
                        jQuery(document.body).on('mousedown', '.journal-list-item li[_ngcontent-c11]:nth-child(2) a', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:Submit Manuscript:left-side'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[437] == 'undefined') {
                        utag.runonce[437] = 1;
                        jQuery(document.body).on('mousedown', '.smpte-links li[_ngcontent-c9]:nth-child(4) a', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:SMPTE Submit Manuscript:right-side'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[438] == 'undefined') {
                        utag.runonce[438] = 1;
                        jQuery(document.body).on('mousedown', 'a.stats-jhp-submit-manuscript', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:Submit Manuscript:header'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[445] == 'undefined') {
                        utag.runonce[445] = 1;
                        jQuery(document.body).on('mousedown', '.issue-details-past-tabs.year a', function (e) {
                            utag.link({"link_category": 'dynamic html', "link_name": 'journal:Volume Year Select'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[446] == 'undefined') {
                        utag.runonce[446] = 1;
                        jQuery(document.body).on('mousedown', '.issue-list a', function (e) {
                            utag.link({"link_category": 'dynamic html', "link_name": 'journal:Volume Issue Select'})
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[439] == 'undefined') {
                        utag.runonce[439] = 1;
                        jQuery(document.body).on('mousedown', '#titleHistory a', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:Previous Titles:' + jQuery(this).text().trim() + ':' + jQuery('.title-container').text().trim()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[447] == 'undefined') {
                        utag.runonce[447] = 1;
                        jQuery(document.body).on('mousedown', '.journal-list-item:not(.list-margin) a', function (e) {
                            utag.link({
                                "link_category": 'dynamic html',
                                "link_name": 'journal:Author Resources:' + jQuery('.title-container').text().trim() + ':' + jQuery(this).text().trim()
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[272] == 'undefined') {
                        utag.runonce[272] = 1;
                        jQuery('#homePageTabs').on('mousedown', 'a', function (e) {
                            utag.link({
                                "link_name": 'homepage_tabs_' + jQuery(this).text().trim(),
                                "link_category": 'Homepage',
                                "homepage_tabs": jQuery(this).text().trim(),
                                "interaction_category": 'homepage_tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[273] == 'undefined') {
                        utag.runonce[273] = 1;
                        jQuery('#carousel-highlights').on('mousedown', 'a', function (e) {
                            utag.link({
                                "link_name": 'Carousel_pos#' + jQuery(this).parents('.Carousel-slide').index('.Carousel-slide') + '_' + jQuery(this).parents('.Carousel-info').find('.Carousel-header').text().trim() + '_' + jQuery(this).text().trim(),
                                "link_category": 'Homepage',
                                "homepage_carousel": '\'Carousel_pos#\' + jQuery(this).parents(\'.Carousel-slide\').index(\'.Carousel-slide\') + \'_\' + jQuery(this).parents(\'.Carousel-info\').find(\'.Carousel-header\').text().trim() + \'_\' + jQuery(this).text().trim()',
                                "interaction_category": 'homepage_carousel'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                try {
                    if (1) {
                        jQuery(document).on('mousedown', '.downloadpdf-predl-proceed-button', function (e) {
                            var element = jQuery(this);
                            utag.data.event_name = "";
                            var docIDNum = element.parents('.actionbar-downloadpdf-container').find('.downloadpdf-predl-checkbox:checked').length;
                            var bulk_downloads = []
                            jQuery('.result-item-align a[href*=document]').each(function (i) {
                                if (jQuery(this).parents('.List-results-items').find('[type="checkbox"]').is(':checked')) {
                                    var document = jQuery(this).attr('href').split('/')[jQuery(this).attr('href').split('/').findIndex(function (arr) {
                                        return (/\d/).test(arr)
                                    })]
                                    bulk_downloads.push(document)
                                }
                                if (i % 10 == 9) {
                                    return false
                                }
                            })
                            bulk_document_ids = bulk_downloads.join(',');
                            utag.data.link_name = '';
                            utag.data.link_category = '';
                            if (jQuery('.browse-pub-tab.active').length > 0) {
                                utag.link({
                                    'element_id': 'Bulk PDF Downloads',
                                    'element_category': 'Downloads',
                                    'pdf_downloads': docIDNum,
                                    'html_usage': 'pdf_bulk',
                                    'bulk_document_ids': bulk_document_ids,
                                    'link_name': jQuery('.title-container').text().trim() + ':pdf bulk download:' + jQuery('.browse-pub-tab.active a').text(),
                                    'link_category': 'dynamic html'
                                });
                                utag.data.bulk_document_ids = '';
                            } else if (jQuery('.title-container')) {
                                utag.link({
                                    'element_id': 'Bulk PDF Downloads',
                                    'element_category': 'Downloads',
                                    'pdf_downloads': docIDNum,
                                    'html_usage': 'pdf_bulk',
                                    'bulk_document_ids': bulk_document_ids,
                                    'link_name': jQuery('.title-container').text().trim() + ':pdf bulk download',
                                    'link_category': 'dynamic html'
                                });
                                utag.data.bulk_document_ids = '';
                            } else {
                                utag.link({
                                    'element_id': 'Bulk PDF Downloads',
                                    'element_category': 'Downloads',
                                    'pdf_downloads': docIDNum,
                                    'html_usage': 'pdf_bulk',
                                    'bulk_document_ids': bulk_document_ids
                                });
                                utag.data.bulk_document_ids = '';
                            }
                        });
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('browse/periodicals/virtual-journals') > -1) {
                    if (typeof utag.runonce[312] == 'undefined') {
                        utag.runonce[312] = 1;
                        jQuery(document.body).on('mousedown', '.journal-header-link', function (e) {
                            utag.link({
                                "link_name": "Browse_vj_view_" + jQuery(this).attr('href').split('/').reverse()[0] + "_vj_title",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().indexOf('browse/periodicals/virtual-journals') > -1) {
                    if (typeof utag.runonce[313] == 'undefined') {
                        utag.runonce[313] = 1;
                        jQuery(document.body).on('mousedown', '.view-link', function (e) {
                            utag.link({
                                "link_name": "Browse_vj_view_" + jQuery(this).attr('href').split('/').reverse()[0] + "_button",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[314] == 'undefined') {
                        utag.runonce[314] = 1;
                        jQuery(document.body).on('mousedown', '.widget-tabs>ul>li>a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_" + jQuery(this).text(),
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[315] == 'undefined') {
                        utag.runonce[315] = 1;
                        jQuery(document.body).on('mousedown', '.vj-home-view-aims', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_aims&scope",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[316] == 'undefined') {
                        utag.runonce[316] = 1;
                        jQuery(document.body).on('mousedown', '.vj-related-pub', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_" + jQuery('.widget-tabs .active a').text() + "view_related_jrnl",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[317] == 'undefined') {
                        utag.runonce[317] = 1;
                        jQuery(document.body).on('mousedown', '.vj-editor-details .vj-action-button', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_" + jQuery('.widget-tabs .active a').text() + "_view_message",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[318] == 'undefined') {
                        utag.runonce[318] = 1;
                        jQuery(document.body).on('mousedown', 'div[ui-view="footer"] .vj-editor-details a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_" + jQuery('.widget-tabs .active a').text() + "_author_search",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[319] == 'undefined') {
                        utag.runonce[319] = 1;
                        jQuery(document.body).on('mousedown', '.widget-tabs-nested>ul>li>a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_" + jQuery(this).text(),
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[320] == 'undefined') {
                        utag.runonce[320] = 1;
                        jQuery(document.body).on('mousedown', '.sip-modal-rightrail-link>a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_current_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_subscribe",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[321] == 'undefined') {
                        utag.runonce[321] = 1;
                        jQuery(document.body).on('mousedown', '.sip-signin-button:not(.sso)', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_current_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_signin",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[322] == 'undefined') {
                        utag.runonce[322] = 1;
                        jQuery(document.body).on('mousedown', '.form-action', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_current_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text().trim() + "_forgotpw",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[323] == 'undefined') {
                        utag.runonce[323] = 1;
                        jQuery(document.body).on('mousedown', '.sip-signin-sso-browse.stats-sip-signin-sso-browse>a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_current_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_Corp_signin_by_name",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[324] == 'undefined') {
                        utag.runonce[324] = 1;
                        jQuery(document.body).on('mousedown', '.logo-athens', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_current_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_OpenAthends_signin",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[325] == 'undefined') {
                        utag.runonce[325] = 1;
                        jQuery(document.body).on('mousedown', '.logo-shibboleth', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_current_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_Shibboleth_signin",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[326] == 'undefined') {
                        utag.runonce[326] = 1;
                        jQuery(document.body).on('mousedown', '.sip-signin-button.sso', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_current_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_Corp_signin",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[327] == 'undefined') {
                        utag.runonce[327] = 1;
                        jQuery(document.body).on('mousedown', '.vj-issue-details-editors a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_current_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_editors_author_search",
                                "link_category": 'Browse Journals & Magazines_Tabs',
                                "link_action": '2'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[329] == 'undefined') {
                        utag.runonce[329] = 1;
                        jQuery(document.body).on('mousedown', '.vj-issue-details-past-return>a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_" + jQuery('.widget-tabs .active a').text() + "_select_another_issue",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[330] == 'undefined') {
                        utag.runonce[330] = 1;
                        jQuery(document.body).on('mousedown', '.sip-modal-button', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_issue_" + jQuery('.vj-issue-details-title span:nth-of-type(1)').text() + "_abstract_view_issue",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[331] == 'undefined') {
                        utag.runonce[331] = 1;
                        jQuery(document.body).on('mousedown', '.vj-issue-full-editors a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_issue_" + jQuery('.vj-issue-title').text().split(' ')[1] + "_author_search",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[332] == 'undefined') {
                        utag.runonce[332] = 1;
                        jQuery(document.body).on('mousedown', '.vj-issue-rightrail-list li', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_issue_" + jQuery('.vj-issue-title').text().split(' ')[1] + "_rtnav_" + jQuery(this).text(),
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[333] == 'undefined') {
                        utag.runonce[333] = 1;
                        jQuery(document.body).on('mousedown', '.vj-issue-reference-content>a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_issue_" + jQuery('.vj-issue-title').text().split(' ')[1] + "_ref_doc_title_link",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[334] == 'undefined') {
                        utag.runonce[334] = 1;
                        jQuery(document.body).on('mousedown', '.vj-issue-reference-content>div.ng-scope>a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_issue_" + jQuery('.vj-issue-title').text().split(' ')[1] + "_ref_doc_doi_link",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[335] == 'undefined') {
                        utag.runonce[335] = 1;
                        jQuery(document.body).on('mousedown', '.vj-issue-reference-content a:contains("View Article")', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_issue_" + jQuery('.vj-issue-title').text().split(' ')[1] + "_ref_doc_view_article_link",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[336] == 'undefined') {
                        utag.runonce[336] = 1;
                        jQuery(document.body).on('mousedown', '.vj-issue-reference-content a:contains("PDF")', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_issue_" + jQuery('.vj-issue-title').text().split(' ')[1] + "_ref_doc_pdf_link",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[337] == 'undefined') {
                        utag.runonce[337] = 1;
                        jQuery(document.body).on('mousedown', '.vj-topic-abstract .vj-action-button', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_topics_goto_issue_" + jQuery(this).text().split(' ').reverse()[0] + "_" + jQuery(this).attr('ui-sref').split('\'')[1],
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[338] == 'undefined') {
                        utag.runonce[338] = 1;
                        jQuery(document.body).on('mousedown', '.widget-tabs-nested a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_about_" + jQuery(this).text(),
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[339] == 'undefined') {
                        utag.runonce[339] = 1;
                        jQuery(document.body).on('mousedown', '.vj-editor-details h2', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_about_author_search",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (/\/virtual-journals/.test(utag.data['dom.pathname'])) {
                    if (typeof utag.runonce[340] == 'undefined') {
                        utag.runonce[340] = 1;
                        jQuery(document.body).on('mousedown', '.vj-sponsoring-society a', function (e) {
                            utag.link({
                                "link_name": window.location.pathname.split('\/')[2] + "_vj_about_society_exit_link_" + jQuery(this).text().replace("http:\/\/", "").replace('\/', ""),
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[341] == 'undefined') {
                        utag.runonce[341] = 1;
                        jQuery(document.body).on('mousedown', '.list-comma a[href*="virtual-journals"]', function (e) {
                            utag.link({
                                "link_name": "Search_Results_artnum_" + (jQuery(this).parents('div.description').siblings('.List').find('a.icon-pdf[data-artnum]').attr('data-artnum') || utag_data._pathname2) + "_ref_in_" + jQuery(this).text() + "_link",
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (utag.data['dom.pathname'].toString().toLowerCase().indexOf('virtual-journals'.toLowerCase()) > -1) {
                    if (typeof utag.runonce[356] == 'undefined') {
                        utag.runonce[356] = 1;
                        jQuery(document.body).on('mousedown', '.vj-citation-download', function (e) {
                            utag.link({
                                "link_name": 'vj_' + window.location.pathname.split('\/')[2] + '_dnldCitation',
                                "link_category": 'Browse Journals & Magazines_Tabs'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[345] == 'undefined') {
                        utag.runonce[345] = 1;
                        jQuery(document.body).on('mousedown', '.get-list-item a', function (e) {
                            utag.link({
                                "link_name": 'GET_Standard_' + jQuery(this).text().trim(),
                                "link_category": 'GET_Program',
                                "interaction_category": 'standards'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[346] == 'undefined') {
                        utag.runonce[346] = 1;
                        jQuery(document.body).on('mousedown', 'a.get-series-link', function (e) {
                            utag.link({
                                "link_name": 'GET_Series_' + jQuery(this).text().trim(),
                                "link_category": 'GET_Program',
                                "interaction_category": 'standards'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[347] == 'undefined') {
                        utag.runonce[347] = 1;
                        jQuery(document.body).on('mousedown', 'a.document-get-program-learn-more', function (e) {
                            utag.link({
                                "link_name": 'GET_Learn_More_' + utag.data.document_id,
                                "link_category": 'GET_Program',
                                "interaction_category": 'standards'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                try {
                    if (1) {
                        jQuery('[modal-source="getProgram"] form').on('submit', function () {
                            utag.link({
                                'link_name': 'GET_Form_Submit',
                                'link_category': 'GET_Program',
                                'interaction_category': 'standards'
                            })
                        });
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[441] == 'undefined') {
                        utag.runonce[441] = 1;
                        jQuery(document.body).on('mousedown', '.source-container a:not(.view-def)', function (e) {
                            utag.link({
                                "link_name": jQuery(this).text(),
                                "link_category": 'Standards:Dictionary',
                                "interaction_category": 'standards'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[442] == 'undefined') {
                        utag.runonce[442] = 1;
                        jQuery(document.body).on('mousedown', '.accordion-header h3', function (e) {
                            utag.link({
                                "link_name": jQuery(this).text(),
                                "link_category": 'Standards:Dictionary',
                                "interaction_category": 'standards'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[443] == 'undefined') {
                        utag.runonce[443] = 1;
                        jQuery(document.body).on('mousedown', '.source-container a.view-def', function (e) {
                            utag.link({
                                "link_name": jQuery(this).siblings('a').text() + ':' + jQuery(this).text(),
                                "link_category": 'Standards:Dictionary',
                                "interaction_category": 'standards'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                if (1) {
                    if (typeof utag.runonce[383] == 'undefined') {
                        utag.runonce[383] = 1;
                        jQuery(document.body).on('click', '.Issue-pdf-button--subscribed', function (e) {
                            utag.link({
                                "document_id": jQuery(this).attr('href').split('?')[1].split('&')[jQuery(this).attr('href').split('?')[1].split('&').findIndex(function (arr) {
                                    return (/isnumber/).test(arr)
                                })].split('=')[1], "html_usage": 'issue_download', "link_text": 'issue download'
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
            try {
                try {
                    if (utag.data['dom.pathname'].toString().indexOf('/courses/') > -1) {
                        jQuery(document).on('mousedown', 'button.signin-button:not(.stats-course-start)', function (event) {
                            if ((/options$/i).test(jQuery(this).text())) {
                                utag.link({'denial': 'course', 'link_text': 'course denial'});
                            }
                        });
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
        }
    })
    if (utag.cfg.readywait || utag.cfg.waittimer) {
        utag.loader.EV('', 'ready', function (a) {
            if (utag.loader.rf == 0) {
                utag.loader.rf = 1;
                utag.cfg.readywait = 1;
                utag.DB('READY:utag.cfg.readywait');
                setTimeout(function () {
                    utag.loader.PINIT()
                }, utag.cfg.waittimer || 1);
            }
        })
    } else {
        utag.loader.PINIT()
    }
}
//tealium universal tag - utag.33 ut4.0.201906201530, Copyright 2019 Tealium.com Inc. All Rights Reserved.
!function e(t, i, n) {
    function r(s, o) {
        if (!i[s]) {
            if (!t[s]) {
                var l = "function" == typeof require && require;
                if (!o && l) return l(s, !0);
                if (a) return a(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var d = i[s] = {exports: {}};
            t[s][0].call(d.exports, function (e) {
                var i = t[s][1][e];
                return r(i || e)
            }, d, d.exports, e, t, i, n)
        }
        return i[s].exports
    }

    for (var a = "function" == typeof require && require, s = 0; s < n.length; s++) r(n[s]);
    return r
}({
    1: [function (e, t, i) {
        (function (i) {
            var n = e("./child/ChildVisitor"), r = e("./child/Message"), a = e("./child/makeChildMessageListener"),
                s = e("./utils/asyncParallelApply"), o = e("./utils/enums"), l = e("./utils/utils"),
                u = e("./utils/getDomain"), d = e("./units/version"), c = e("./units/crossDomain"),
                f = e("@adobe-mcid/visitor-js-shared/lib/ids/generateRandomID"), g = e("./units/makeCorsRequest"),
                p = e("./units/makeDestinationPublishing"), m = e("./utils/constants"), _ = function (e, t, n) {
                    function _(e) {
                        var t = e;
                        return function (e) {
                            var i = e || M.location.href;
                            try {
                                var n = S._extractParamFromUri(i, t);
                                if (n) return F.parsePipeDelimetedKeyValues(n)
                            } catch (e) {
                            }
                        }
                    }

                    function h(e) {
                        function t(e, t) {
                            e && e.match(m.VALID_VISITOR_ID_REGEX) && t(e)
                        }

                        t(e[b], S.setMarketingCloudVisitorID), S._setFieldExpire(L, -1), t(e[E], S.setAnalyticsVisitorID)
                    }

                    function C(e) {
                        e = e || {}, S._supplementalDataIDCurrent = e.supplementalDataIDCurrent || "", S._supplementalDataIDCurrentConsumed = e.supplementalDataIDCurrentConsumed || {}, S._supplementalDataIDLast = e.supplementalDataIDLast || "", S._supplementalDataIDLastConsumed = e.supplementalDataIDLastConsumed || {}
                    }

                    function D(e) {
                        function t(e, t, i) {
                            return i = i ? i += "|" : i, i += e + "=" + encodeURIComponent(t)
                        }

                        function i(e, i) {
                            var n = i[0], r = i[1];
                            return null != r && r !== w && (e = t(n, r, e)), e
                        }

                        var n = e.reduce(i, "");
                        return function (e) {
                            var t = F.getTimestampInSeconds();
                            return e = e ? e += "|" : e, e += "TS=" + t
                        }(n)
                    }

                    function I(e) {
                        var t = e.minutesToLive, i = "";
                        return (S.idSyncDisableSyncs || S.disableIdSyncs) && (i = i || "Error: id syncs have been disabled"), "string" == typeof e.dpid && e.dpid.length || (i = i || "Error: config.dpid is empty"), "string" == typeof e.url && e.url.length || (i = i || "Error: config.url is empty"), void 0 === t ? t = 20160 : (t = parseInt(t, 10), (isNaN(t) || t <= 0) && (i = i || "Error: config.minutesToLive needs to be a positive number")), {
                            error: i,
                            ttl: t
                        }
                    }

                    if (!n || n.split("").reverse().join("") !== e) throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");
                    var S = this;
                    S.version = "3.0.0";
                    var M = i, A = M.Visitor;
                    A.version = S.version, A.AuthState = o.AUTH_STATE, A.OptOut = o.OPT_OUT, M.s_c_in || (M.s_c_il = [], M.s_c_in = 0), S._c = "Visitor", S._il = M.s_c_il, S._in = M.s_c_in, S._il[S._in] = S, M.s_c_in++, S._log = {requests: []}, S.marketingCloudOrgID = e, S.cookieName = "AMCV_" + e, S.sessionCookieName = "AMCVS_" + e, S.cookieDomain = u(), S.cookieDomain === M.location.hostname && (S.cookieDomain = ""), S.loadSSL = M.location.protocol.toLowerCase().indexOf("https") >= 0, S.loadTimeout = 3e4, S.CORSErrors = [], S.marketingCloudServer = S.audienceManagerServer = "dpm.demdex.net", S.sdidParamExpiry = 30;
                    var v = M.document, y = null, b = "MCMID", O = "MCIDTS", T = "A", E = "MCAID", k = "AAM", L = "MCAAMB",
                        w = "NONE", P = function (e) {
                            return !Object.prototype[e]
                        }, R = g(S, V);
                    S.FIELDS = o.FIELDS, S.cookieRead = function (e) {
                        e = encodeURIComponent(e);
                        var t = (";" + v.cookie).split(" ").join(";"), i = t.indexOf(";" + e + "="),
                            n = i < 0 ? i : t.indexOf(";", i + 1);
                        return i < 0 ? "" : decodeURIComponent(t.substring(i + 2 + e.length, n < 0 ? t.length : n))
                    }, S.cookieWrite = function (e, t, i) {
                        var n, r = S.cookieLifetime;
                        if (t = "" + t, r = r ? ("" + r).toUpperCase() : "", i && "SESSION" !== r && "NONE" !== r) {
                            if (n = "" !== t ? parseInt(r || 0, 10) : -60) i = new Date, i.setTime(i.getTime() + 1e3 * n); else if (1 === i) {
                                i = new Date;
                                var a = i.getYear();
                                i.setYear(a + 2 + (a < 1900 ? 1900 : 0))
                            }
                        } else i = 0;
                        return e && "NONE" !== r ? (v.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + "; path=/;" + (i ? " expires=" + i.toGMTString() + ";" : "") + (S.cookieDomain ? " domain=" + S.cookieDomain + ";" : ""), S.cookieRead(e) === t) : 0
                    }, S.resetState = function (e) {
                        e ? S._mergeServerState(e) : C()
                    }, S._isAllowedDone = !1, S._isAllowedFlag = !1, S.isAllowed = function () {
                        return S._isAllowedDone || (S._isAllowedDone = !0, (S.cookieRead(S.cookieName) || S.cookieWrite(S.cookieName, "T", 1)) && (S._isAllowedFlag = !0)), S._isAllowedFlag
                    }, S.setMarketingCloudVisitorID = function (e) {
                        S._setMarketingCloudFields(e)
                    }, S._use1stPartyMarketingCloudServer = !1, S.getMarketingCloudVisitorID = function (e, t) {
                        if (S.isAllowed()) {
                            S.marketingCloudServer && S.marketingCloudServer.indexOf(".demdex.net") < 0 && (S._use1stPartyMarketingCloudServer = !0);
                            var i = S._getAudienceManagerURLData("_setMarketingCloudFields"), n = i.url;
                            return S._getRemoteField(b, n, e, t, i)
                        }
                        return ""
                    }, S.getVisitorValues = function (e, t) {
                        var i = {
                            MCMID: {fn: S.getMarketingCloudVisitorID, args: [!0], context: S},
                            MCOPTOUT: {fn: S.isOptedOut, args: [void 0, !0], context: S},
                            MCAID: {fn: S.getAnalyticsVisitorID, args: [!0], context: S},
                            MCAAMLH: {fn: S.getAudienceManagerLocationHint, args: [!0], context: S},
                            MCAAMB: {fn: S.getAudienceManagerBlob, args: [!0], context: S}
                        }, n = t && t.length ? F.pluck(i, t) : i;
                        s(n, e)
                    }, S._currentCustomerIDs = {}, S._customerIDsHashChanged = !1, S._newCustomerIDsHash = "", S.setCustomerIDs = function (e) {
                        function t() {
                            S._customerIDsHashChanged = !1
                        }

                        if (S.isAllowed() && e) {
                            S._readVisitor();
                            var i, n;
                            for (i in e) if (P(i) && (n = e[i])) if ("object" == typeof n) {
                                var r = {};
                                n.id && (r.id = n.id), void 0 != n.authState && (r.authState = n.authState), S._currentCustomerIDs[i] = r
                            } else S._currentCustomerIDs[i] = {id: n};
                            var a = S.getCustomerIDs(), s = S._getField("MCCIDH"), o = "";
                            s || (s = 0);
                            for (i in a) P(i) && (n = a[i], o += (o ? "|" : "") + i + "|" + (n.id ? n.id : "") + (n.authState ? n.authState : ""));
                            S._newCustomerIDsHash = S._hash(o), S._newCustomerIDsHash !== s && (S._customerIDsHashChanged = !0, S._mapCustomerIDs(t))
                        }
                    }, S.getCustomerIDs = function () {
                        S._readVisitor();
                        var e, t, i = {};
                        for (e in S._currentCustomerIDs) P(e) && (t = S._currentCustomerIDs[e], i[e] || (i[e] = {}), t.id && (i[e].id = t.id), void 0 != t.authState ? i[e].authState = t.authState : i[e].authState = A.AuthState.UNKNOWN);
                        return i
                    }, S.setAnalyticsVisitorID = function (e) {
                        S._setAnalyticsFields(e)
                    }, S.getAnalyticsVisitorID = function (e, t, i) {
                        if (!F.isTrackingServerPopulated() && !i) return S._callCallback(e, [""]), "";
                        if (S.isAllowed()) {
                            var n = "";
                            if (i || (n = S.getMarketingCloudVisitorID(function (t) {
                                S.getAnalyticsVisitorID(e, !0)
                            })), n || i) {
                                var r = i ? S.marketingCloudServer : S.trackingServer, a = "";
                                S.loadSSL && (i ? S.marketingCloudServerSecure && (r = S.marketingCloudServerSecure) : S.trackingServerSecure && (r = S.trackingServerSecure));
                                var s = {};
                                if (r) {
                                    var o = "http" + (S.loadSSL ? "s" : "") + "://" + r + "/id",
                                        l = "d_visid_ver=" + S.version + "&mcorgid=" + encodeURIComponent(S.marketingCloudOrgID) + (n ? "&mid=" + encodeURIComponent(n) : "") + (S.idSyncDisable3rdPartySyncing || S.disableThirdPartyCookies ? "&d_coppa=true" : ""),
                                        u = ["s_c_il", S._in, "_set" + (i ? "MarketingCloud" : "Analytics") + "Fields"];
                                    a = o + "?" + l + "&callback=s_c_il%5B" + S._in + "%5D._set" + (i ? "MarketingCloud" : "Analytics") + "Fields", s.corsUrl = o + "?" + l, s.callback = u
                                }
                                return s.url = a, S._getRemoteField(i ? b : E, a, e, t, s)
                            }
                        }
                        return ""
                    }, S.getAudienceManagerLocationHint = function (e, t) {
                        if (S.isAllowed()) {
                            if (S.getMarketingCloudVisitorID(function (t) {
                                S.getAudienceManagerLocationHint(e, !0)
                            })) {
                                var i = S._getField(E);
                                if (!i && F.isTrackingServerPopulated() && (i = S.getAnalyticsVisitorID(function (t) {
                                    S.getAudienceManagerLocationHint(e, !0)
                                })), i || !F.isTrackingServerPopulated()) {
                                    var n = S._getAudienceManagerURLData(), r = n.url;
                                    return S._getRemoteField("MCAAMLH", r, e, t, n)
                                }
                            }
                        }
                        return ""
                    }, S.getLocationHint = S.getAudienceManagerLocationHint, S.getAudienceManagerBlob = function (e, t) {
                        if (S.isAllowed()) {
                            if (S.getMarketingCloudVisitorID(function (t) {
                                S.getAudienceManagerBlob(e, !0)
                            })) {
                                var i = S._getField(E);
                                if (!i && F.isTrackingServerPopulated() && (i = S.getAnalyticsVisitorID(function (t) {
                                    S.getAudienceManagerBlob(e, !0)
                                })), i || !F.isTrackingServerPopulated()) {
                                    var n = S._getAudienceManagerURLData(), r = n.url;
                                    return S._customerIDsHashChanged && S._setFieldExpire(L, -1), S._getRemoteField(L, r, e, t, n)
                                }
                            }
                        }
                        return ""
                    }, S._supplementalDataIDCurrent = "", S._supplementalDataIDCurrentConsumed = {}, S._supplementalDataIDLast = "", S._supplementalDataIDLastConsumed = {}, S.getSupplementalDataID = function (e, t) {
                        S._supplementalDataIDCurrent || t || (S._supplementalDataIDCurrent = S._generateID(1));
                        var i = S._supplementalDataIDCurrent;
                        return S._supplementalDataIDLast && !S._supplementalDataIDLastConsumed[e] ? (i = S._supplementalDataIDLast, S._supplementalDataIDLastConsumed[e] = !0) : i && (S._supplementalDataIDCurrentConsumed[e] && (S._supplementalDataIDLast = S._supplementalDataIDCurrent, S._supplementalDataIDLastConsumed = S._supplementalDataIDCurrentConsumed, S._supplementalDataIDCurrent = i = t ? "" : S._generateID(1), S._supplementalDataIDCurrentConsumed = {}), i && (S._supplementalDataIDCurrentConsumed[e] = !0)), i
                    }, S.getOptOut = function (e, t) {
                        if (S.isAllowed()) {
                            var i = S._getAudienceManagerURLData("_setMarketingCloudFields"), n = i.url;
                            return S._getRemoteField("MCOPTOUT", n, e, t, i)
                        }
                        return ""
                    }, S.isOptedOut = function (e, t, i) {
                        if (S.isAllowed()) {
                            t || (t = A.OptOut.GLOBAL);
                            var n = S.getOptOut(function (i) {
                                var n = i === A.OptOut.GLOBAL || i.indexOf(t) >= 0;
                                S._callCallback(e, [n])
                            }, i);
                            return n ? n === A.OptOut.GLOBAL || n.indexOf(t) >= 0 : null
                        }
                        return !1
                    }, S._fields = null, S._fieldsExpired = null, S._hash = function (e) {
                        var t, i, n = 0;
                        if (e) for (t = 0; t < e.length; t++) i = e.charCodeAt(t), n = (n << 5) - n + i, n &= n;
                        return n
                    }, S._generateID = f, S._generateLocalMID = function () {
                        var e = S._generateID(0);
                        return N.isClientSideMarketingCloudVisitorID = !0, e
                    }, S._callbackList = null, S._callCallback = function (e, t) {
                        try {
                            "function" == typeof e ? e.apply(M, t) : e[1].apply(e[0], t)
                        } catch (e) {
                        }
                    }, S._registerCallback = function (e, t) {
                        t && (null == S._callbackList && (S._callbackList = {}), void 0 == S._callbackList[e] && (S._callbackList[e] = []), S._callbackList[e].push(t))
                    }, S._callAllCallbacks = function (e, t) {
                        if (null != S._callbackList) {
                            var i = S._callbackList[e];
                            if (i) for (; i.length > 0;) S._callCallback(i.shift(), t)
                        }
                    }, S._addQuerystringParam = function (e, t, i, n) {
                        var r = encodeURIComponent(t) + "=" + encodeURIComponent(i), a = F.parseHash(e),
                            s = F.hashlessUrl(e);
                        if (-1 === s.indexOf("?")) return s + "?" + r + a;
                        var o = s.split("?"), l = o[0] + "?", u = o[1];
                        return l + F.addQueryParamAtLocation(u, r, n) + a
                    }, S._extractParamFromUri = function (e, t) {
                        var i = new RegExp("[\\?&#]" + t + "=([^&#]*)"), n = i.exec(e);
                        if (n && n.length) return decodeURIComponent(n[1])
                    }, S._parseAdobeMcFromUrl = _(m.ADOBE_MC), S._parseAdobeMcSdidFromUrl = _(m.ADOBE_MC_SDID), S._attemptToPopulateSdidFromUrl = function (t) {
                        var i = S._parseAdobeMcSdidFromUrl(t), n = 1e9;
                        i && i.TS && (n = F.getTimestampInSeconds() - i.TS), i && i.SDID && i.MCORGID === e && n < S.sdidParamExpiry && (S._supplementalDataIDCurrent = i.SDID, S._supplementalDataIDCurrentConsumed.SDID_URL_PARAM = !0)
                    }, S._attemptToPopulateIdsFromUrl = function () {
                        var t = S._parseAdobeMcFromUrl();
                        if (t && t.TS) {
                            var i = F.getTimestampInSeconds(), n = i - t.TS;
                            if (Math.floor(n / 60) > m.ADOBE_MC_TTL_IN_MIN || t.MCORGID !== e) return;
                            h(t)
                        }
                    }, S._mergeServerState = function (e) {
                        if (e) try {
                            if (e = function (e) {
                                return F.isObject(e) ? e : JSON.parse(e)
                            }(e), e[S.marketingCloudOrgID]) {
                                var t = e[S.marketingCloudOrgID];
                                !function (e) {
                                    F.isObject(e) && S.setCustomerIDs(e)
                                }(t.customerIDs), C(t.sdid)
                            }
                        } catch (e) {
                            throw new Error("`serverState` has an invalid format.")
                        }
                    }, S._timeout = null, S._loadData = function (e, t, i, n) {
                        t = S._addQuerystringParam(t, "d_fieldgroup", e, 1), n.url = S._addQuerystringParam(n.url, "d_fieldgroup", e, 1), n.corsUrl = S._addQuerystringParam(n.corsUrl, "d_fieldgroup", e, 1), N.fieldGroupObj[e] = !0, n === Object(n) && n.corsUrl && "XMLHttpRequest" === R.corsMetadata.corsType && R.fireCORS(n, i, e)
                    }, S._clearTimeout = function (e) {
                        null != S._timeout && S._timeout[e] && (clearTimeout(S._timeout[e]), S._timeout[e] = 0)
                    }, S._settingsDigest = 0, S._getSettingsDigest = function () {
                        if (!S._settingsDigest) {
                            var e = S.version;
                            S.audienceManagerServer && (e += "|" + S.audienceManagerServer), S.audienceManagerServerSecure && (e += "|" + S.audienceManagerServerSecure), S._settingsDigest = S._hash(e)
                        }
                        return S._settingsDigest
                    }, S._readVisitorDone = !1, S._readVisitor = function () {
                        if (!S._readVisitorDone) {
                            S._readVisitorDone = !0;
                            var e, t, i, n, r, a, s = S._getSettingsDigest(), o = !1, l = S.cookieRead(S.cookieName),
                                u = new Date;
                            if (null == S._fields && (S._fields = {}), l && "T" !== l) for (l = l.split("|"), l[0].match(/^[\-0-9]+$/) && (parseInt(l[0], 10) !== s && (o = !0), l.shift()), l.length % 2 == 1 && l.pop(), e = 0; e < l.length; e += 2) t = l[e].split("-"), i = t[0], n = l[e + 1], t.length > 1 ? (r = parseInt(t[1], 10), a = t[1].indexOf("s") > 0) : (r = 0, a = !1), o && ("MCCIDH" === i && (n = ""), r > 0 && (r = u.getTime() / 1e3 - 60)), i && n && (S._setField(i, n, 1), r > 0 && (S._fields["expire" + i] = r + (a ? "s" : ""), (u.getTime() >= 1e3 * r || a && !S.cookieRead(S.sessionCookieName)) && (S._fieldsExpired || (S._fieldsExpired = {}), S._fieldsExpired[i] = !0)));
                            !S._getField(E) && F.isTrackingServerPopulated() && (l = S.cookieRead("s_vi")) && (l = l.split("|"), l.length > 1 && l[0].indexOf("v1") >= 0 && (n = l[1], e = n.indexOf("["), e >= 0 && (n = n.substring(0, e)), n && n.match(m.VALID_VISITOR_ID_REGEX) && S._setField(E, n)))
                        }
                    }, S._appendVersionTo = function (e) {
                        var t = "vVersion|" + S.version, i = e ? S._getCookieVersion(e) : null;
                        return i ? d.areVersionsDifferent(i, S.version) && (e = e.replace(m.VERSION_REGEX, t)) : e += (e ? "|" : "") + t, e
                    }, S._writeVisitor = function () {
                        var e, t, i = S._getSettingsDigest();
                        for (e in S._fields) P(e) && S._fields[e] && "expire" !== e.substring(0, 6) && (t = S._fields[e], i += (i ? "|" : "") + e + (S._fields["expire" + e] ? "-" + S._fields["expire" + e] : "") + "|" + t);
                        i = S._appendVersionTo(i), S.cookieWrite(S.cookieName, i, 1)
                    }, S._getField = function (e, t) {
                        return null == S._fields || !t && S._fieldsExpired && S._fieldsExpired[e] ? null : S._fields[e]
                    }, S._setField = function (e, t, i) {
                        null == S._fields && (S._fields = {}), S._fields[e] = t, i || S._writeVisitor()
                    }, S._getFieldList = function (e, t) {
                        var i = S._getField(e, t);
                        return i ? i.split("*") : null
                    }, S._setFieldList = function (e, t, i) {
                        S._setField(e, t ? t.join("*") : "", i)
                    }, S._getFieldMap = function (e, t) {
                        var i = S._getFieldList(e, t);
                        if (i) {
                            var n, r = {};
                            for (n = 0; n < i.length; n += 2) r[i[n]] = i[n + 1];
                            return r
                        }
                        return null
                    }, S._setFieldMap = function (e, t, i) {
                        var n, r = null;
                        if (t) {
                            r = [];
                            for (n in t) P(n) && (r.push(n), r.push(t[n]))
                        }
                        S._setFieldList(e, r, i)
                    }, S._setFieldExpire = function (e, t, i) {
                        var n = new Date;
                        n.setTime(n.getTime() + 1e3 * t), null == S._fields && (S._fields = {}), S._fields["expire" + e] = Math.floor(n.getTime() / 1e3) + (i ? "s" : ""), t < 0 ? (S._fieldsExpired || (S._fieldsExpired = {}), S._fieldsExpired[e] = !0) : S._fieldsExpired && (S._fieldsExpired[e] = !1), i && (S.cookieRead(S.sessionCookieName) || S.cookieWrite(S.sessionCookieName, "1"))
                    }, S._findVisitorID = function (e) {
                        return e && ("object" == typeof e && (e = e.d_mid ? e.d_mid : e.visitorID ? e.visitorID : e.id ? e.id : e.uuid ? e.uuid : "" + e), e && "NOTARGET" === (e = e.toUpperCase()) && (e = w), e && (e === w || e.match(m.VALID_VISITOR_ID_REGEX)) || (e = "")), e
                    }, S._setFields = function (e, t) {
                        if (S._clearTimeout(e), null != S._loading && (S._loading[e] = !1), N.fieldGroupObj[e] && N.setState(e, !1), "MC" === e) {
                            !0 !== N.isClientSideMarketingCloudVisitorID && (N.isClientSideMarketingCloudVisitorID = !1);
                            var i = S._getField(b);
                            if (!i || S.overwriteCrossDomainMCIDAndAID) {
                                if (!(i = "object" == typeof t && t.mid ? t.mid : S._findVisitorID(t))) {
                                    if (S._use1stPartyMarketingCloudServer && !S.tried1stPartyMarketingCloudServer) return S.tried1stPartyMarketingCloudServer = !0, void S.getAnalyticsVisitorID(null, !1, !0);
                                    i = S._generateLocalMID()
                                }
                                S._setField(b, i)
                            }
                            i && i !== w || (i = ""), "object" == typeof t && ((t.d_region || t.dcs_region || t.d_blob || t.blob) && S._setFields(k, t), S._use1stPartyMarketingCloudServer && t.mid && S._setFields(T, {id: t.id})), S._callAllCallbacks(b, [i])
                        }
                        if (e === k && "object" == typeof t) {
                            var n = 604800;
                            void 0 != t.id_sync_ttl && t.id_sync_ttl && (n = parseInt(t.id_sync_ttl, 10));
                            var r = x.getRegionAndCheckIfChanged(t, n);
                            S._callAllCallbacks("MCAAMLH", [r]);
                            var a = S._getField(L);
                            (t.d_blob || t.blob) && (a = t.d_blob, a || (a = t.blob), S._setFieldExpire(L, n), S._setField(L, a)), a || (a = ""), S._callAllCallbacks(L, [a]), !t.error_msg && S._newCustomerIDsHash && S._setField("MCCIDH", S._newCustomerIDsHash)
                        }
                        if (e === T) {
                            var s = S._getField(E);
                            s && !S.overwriteCrossDomainMCIDAndAID || (s = S._findVisitorID(t), s ? s !== w && S._setFieldExpire(L, -1) : s = w, S._setField(E, s)), s && s !== w || (s = ""), S._callAllCallbacks(E, [s])
                        }
                        if (S.idSyncDisableSyncs || S.disableIdSyncs) x.idCallNotProcesssed = !0; else {
                            x.idCallNotProcesssed = !1;
                            var o = {};
                            o.ibs = t.ibs, o.subdomain = t.subdomain, x.processIDCallData(o)
                        }
                        if (t === Object(t)) {
                            var l, u;
                            S.isAllowed() && (l = S._getField("MCOPTOUT")), l || (l = w, t.d_optout && t.d_optout instanceof Array && (l = t.d_optout.join(",")), u = parseInt(t.d_ottl, 10), isNaN(u) && (u = 7200), S._setFieldExpire("MCOPTOUT", u, !0), S._setField("MCOPTOUT", l)), S._callAllCallbacks("MCOPTOUT", [l])
                        }
                    }, S._loading = null, S._getRemoteField = function (e, t, i, n, r) {
                        var a, s = "", o = F.isFirstPartyAnalyticsVisitorIDCall(e), l = {MCAAMLH: !0, MCAAMB: !0};
                        if (S.isAllowed()) {
                            S._readVisitor(), s = S._getField(e, !0 === l[e]);
                            if (function () {
                                return (!s || S._fieldsExpired && S._fieldsExpired[e]) && (!S.disableThirdPartyCalls || o)
                            }()) {
                                if (e === b || "MCOPTOUT" === e ? a = "MC" : "MCAAMLH" === e || e === L ? a = k : e === E && (a = T), a) return !t || null != S._loading && S._loading[a] || (null == S._loading && (S._loading = {}), S._loading[a] = !0, S._loadData(a, t, function (t) {
                                    if (!S._getField(e)) {
                                        t && N.setState(a, !0);
                                        var i = "";
                                        e === b ? i = S._generateLocalMID() : a === k && (i = {error_msg: "timeout"}), S._setFields(a, i)
                                    }
                                }, r)), S._registerCallback(e, i), s || (t || S._setFields(a, {id: w}), "")
                            } else s || (e === b ? (S._registerCallback(e, i), s = S._generateLocalMID(), S.setMarketingCloudVisitorID(s)) : e === E ? (S._registerCallback(e, i), s = "", S.setAnalyticsVisitorID(s)) : (s = "", n = !0))
                        }
                        return e !== b && e !== E || s !== w || (s = "", n = !0), i && n && S._callCallback(i, [s]), s
                    }, S._setMarketingCloudFields = function (e) {
                        S._readVisitor(), S._setFields("MC", e)
                    }, S._mapCustomerIDs = function (e) {
                        S.getAudienceManagerBlob(e, !0)
                    }, S._setAnalyticsFields = function (e) {
                        S._readVisitor(), S._setFields(T, e)
                    }, S._setAudienceManagerFields = function (e) {
                        S._readVisitor(), S._setFields(k, e)
                    }, S._getAudienceManagerURLData = function (e) {
                        var t = S.audienceManagerServer, i = "", n = S._getField(b), r = S._getField(L, !0),
                            a = S._getField(E), s = a && a !== w ? "&d_cid_ic=AVID%01" + encodeURIComponent(a) : "";
                        if (S.loadSSL && S.audienceManagerServerSecure && (t = S.audienceManagerServerSecure), t) {
                            var o, l, u = S.getCustomerIDs();
                            if (u) for (o in u) P(o) && (l = u[o], s += "&d_cid_ic=" + encodeURIComponent(o) + "%01" + encodeURIComponent(l.id ? l.id : "") + (l.authState ? "%01" + l.authState : ""));
                            e || (e = "_setAudienceManagerFields");
                            var d = "http" + (S.loadSSL ? "s" : "") + "://" + t + "/id",
                                c = "d_visid_ver=" + S.version + "&d_rtbd=json&d_ver=2" + (!n && S._use1stPartyMarketingCloudServer ? "&d_verify=1" : "") + "&d_orgid=" + encodeURIComponent(S.marketingCloudOrgID) + "&d_nsid=" + (S.idSyncContainerID || 0) + (n ? "&d_mid=" + encodeURIComponent(n) : "") + (S.idSyncDisable3rdPartySyncing || S.disableThirdPartyCookies ? "&d_coppa=true" : "") + (!0 === y ? "&d_coop_safe=1" : !1 === y ? "&d_coop_unsafe=1" : "") + (r ? "&d_blob=" + encodeURIComponent(r) : "") + s,
                                f = ["s_c_il", S._in, e];
                            return i = d + "?" + c + "&d_cb=s_c_il%5B" + S._in + "%5D." + e, {
                                url: i,
                                corsUrl: d + "?" + c,
                                callback: f
                            }
                        }
                        return {url: i}
                    }, S.appendVisitorIDsTo = function (e) {
                        try {
                            var t = [[b, S._getField(b)], [E, S._getField(E)], ["MCORGID", S.marketingCloudOrgID]];
                            return S._addQuerystringParam(e, m.ADOBE_MC, D(t))
                        } catch (t) {
                            return e
                        }
                    }, S.appendSupplementalDataIDTo = function (e, t) {
                        if (!(t = t || S.getSupplementalDataID(F.generateRandomString(), !0))) return e;
                        try {
                            var i = D([["SDID", t], ["MCORGID", S.marketingCloudOrgID]]);
                            return S._addQuerystringParam(e, m.ADOBE_MC_SDID, i)
                        } catch (t) {
                            return e
                        }
                    };
                    var F = {
                        parseHash: function (e) {
                            var t = e.indexOf("#");
                            return t > 0 ? e.substr(t) : ""
                        }, hashlessUrl: function (e) {
                            var t = e.indexOf("#");
                            return t > 0 ? e.substr(0, t) : e
                        }, addQueryParamAtLocation: function (e, t, i) {
                            var n = e.split("&");
                            return i = null != i ? i : n.length, n.splice(i, 0, t), n.join("&")
                        }, isFirstPartyAnalyticsVisitorIDCall: function (e, t, i) {
                            if (e !== E) return !1;
                            var n;
                            return t || (t = S.trackingServer), i || (i = S.trackingServerSecure), !("string" != typeof (n = S.loadSSL ? i : t) || !n.length) && (n.indexOf("2o7.net") < 0 && n.indexOf("omtrdc.net") < 0)
                        }, isObject: function (e) {
                            return Boolean(e && e === Object(e))
                        }, removeCookie: function (e) {
                            document.cookie = encodeURIComponent(e) + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                        }, isTrackingServerPopulated: function () {
                            return !!S.trackingServer || !!S.trackingServerSecure
                        }, getTimestampInSeconds: function () {
                            return Math.round((new Date).getTime() / 1e3)
                        }, parsePipeDelimetedKeyValues: function (e) {
                            return e.split("|").reduce(function (e, t) {
                                var i = t.split("=");
                                return e[i[0]] = decodeURIComponent(i[1]), e
                            }, {})
                        }, generateRandomString: function (e) {
                            e = e || 5;
                            for (var t = "", i = "abcdefghijklmnopqrstuvwxyz0123456789"; e--;) t += i[Math.floor(Math.random() * i.length)];
                            return t
                        }, parseBoolean: function (e) {
                            return "true" === e || "false" !== e && null
                        }, replaceMethodsWithFunction: function (e, t) {
                            for (var i in e) e.hasOwnProperty(i) && "function" == typeof e[i] && (e[i] = t);
                            return e
                        }, pluck: function (e, t) {
                            return t.reduce(function (t, i) {
                                return e[i] && (t[i] = e[i]), t
                            }, Object.create(null))
                        }
                    };
                    S._helpers = F;
                    var x = p(S, A);
                    S._destinationPublishing = x, S.timeoutMetricsLog = [];
                    var V, N = {
                        isClientSideMarketingCloudVisitorID: null,
                        MCIDCallTimedOut: null,
                        AnalyticsIDCallTimedOut: null,
                        AAMIDCallTimedOut: null,
                        fieldGroupObj: {},
                        setState: function (e, t) {
                            switch (e) {
                                case"MC":
                                    !1 === t ? !0 !== this.MCIDCallTimedOut && (this.MCIDCallTimedOut = !1) : this.MCIDCallTimedOut = t;
                                    break;
                                case T:
                                    !1 === t ? !0 !== this.AnalyticsIDCallTimedOut && (this.AnalyticsIDCallTimedOut = !1) : this.AnalyticsIDCallTimedOut = t;
                                    break;
                                case k:
                                    !1 === t ? !0 !== this.AAMIDCallTimedOut && (this.AAMIDCallTimedOut = !1) : this.AAMIDCallTimedOut = t
                            }
                        }
                    };
                    S.isClientSideMarketingCloudVisitorID = function () {
                        return N.isClientSideMarketingCloudVisitorID
                    }, S.MCIDCallTimedOut = function () {
                        return N.MCIDCallTimedOut
                    }, S.AnalyticsIDCallTimedOut = function () {
                        return N.AnalyticsIDCallTimedOut
                    }, S.AAMIDCallTimedOut = function () {
                        return N.AAMIDCallTimedOut
                    }, S.idSyncGetOnPageSyncInfo = function () {
                        return S._readVisitor(), S._getField("MCSYNCSOP")
                    }, S.idSyncByURL = function (e) {
                        var t = I(e || {});
                        if (t.error) return t.error;
                        var i, n, r = e.url, a = encodeURIComponent, s = x;
                        return r = r.replace(/^https:/, "").replace(/^http:/, ""), i = l.encodeAndBuildRequest(["", e.dpid, e.dpuuid || ""], ","), n = ["ibs", a(e.dpid), "img", a(r), t.ttl, "", i], s.addMessage(n.join("|")), s.requestToProcess(), "Successfully queued"
                    }, S.idSyncByDataSource = function (e) {
                        return e === Object(e) && "string" == typeof e.dpuuid && e.dpuuid.length ? (e.url = "//dpm.demdex.net/ibs:dpid=" + e.dpid + "&dpuuid=" + e.dpuuid, S.idSyncByURL(e)) : "Error: config or config.dpuuid is empty"
                    }, S._getCookieVersion = function (e) {
                        e = e || S.cookieRead(S.cookieName);
                        var t = m.VERSION_REGEX.exec(e);
                        return t && t.length > 1 ? t[1] : null
                    }, S._resetAmcvCookie = function (e) {
                        var t = S._getCookieVersion();
                        t && !d.isLessThan(t, e) || F.removeCookie(S.cookieName)
                    }, S.setAsCoopSafe = function () {
                        y = !0
                    }, S.setAsCoopUnsafe = function () {
                        y = !1
                    }, S.init = function () {
                        !function () {
                            if (t && "object" == typeof t) {
                                S.configs = Object.create(null);
                                for (var e in t) P(e) && (S[e] = t[e], S.configs[e] = t[e]);
                                S.idSyncContainerID = S.idSyncContainerID || 0, y = "boolean" == typeof S.isCoopSafe ? S.isCoopSafe : F.parseBoolean(S.isCoopSafe), S.resetBeforeVersion && S._resetAmcvCookie(S.resetBeforeVersion), S._attemptToPopulateIdsFromUrl(), S._attemptToPopulateSdidFromUrl(), S._readVisitor();
                                var i = S._getField(O), n = Math.ceil((new Date).getTime() / m.MILLIS_PER_DAY);
                                S.idSyncDisableSyncs || S.disableIdSyncs || !x.canMakeSyncIDCall(i, n) || (S._setFieldExpire(L, -1), S._setField(O, n)), S.getMarketingCloudVisitorID(), S.getAudienceManagerLocationHint(), S.getAudienceManagerBlob(), S._mergeServerState(S.serverState)
                            } else S._attemptToPopulateIdsFromUrl(), S._attemptToPopulateSdidFromUrl()
                        }(), function () {
                            if (!S.idSyncDisableSyncs && !S.disableIdSyncs) {
                                x.checkDPIframeSrc();
                                var e = function () {
                                    var e = x;
                                    e.readyToAttachIframe() && e.attachIframe()
                                };
                                M.addEventListener("load", function () {
                                    A.windowLoaded = !0, e()
                                });
                                try {
                                    c.receiveMessage(function (e) {
                                        x.receiveMessage(e.data)
                                    }, x.iframeHost)
                                } catch (e) {
                                }
                            }
                        }(), function () {
                            S.whitelistIframeDomains && m.POST_MESSAGE_ENABLED && (S.whitelistIframeDomains = S.whitelistIframeDomains instanceof Array ? S.whitelistIframeDomains : [S.whitelistIframeDomains], S.whitelistIframeDomains.forEach(function (t) {
                                var i = new r(e, t), n = a(S, i);
                                c.receiveMessage(n, t)
                            }))
                        }()
                    }
                };
            _.getInstance = function (e, t) {
                if (!e) throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");
                e.indexOf("@") < 0 && (e += "@AdobeOrg");
                var r = function () {
                    var t = i.s_c_il;
                    if (t) for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (r && "Visitor" === r._c && r.marketingCloudOrgID === e) return r
                    }
                }();
                if (r) return r;
                var a = e, s = a.split("").reverse().join(""), o = new _(e, null, s);
                !function () {
                    i.s_c_il.splice(--i.s_c_in, 1)
                }();
                var u = l.getIeVersion();
                if ("number" == typeof u && u < 10) return o._helpers.replaceMethodsWithFunction(o, function () {
                });
                var d = o.isAllowed(), c = function () {
                    try {
                        return i.self !== i.parent
                    } catch (e) {
                        return !0
                    }
                }() && !d && i.parent ? new n(e, t, o, i.parent) : new _(e, t, s);
                return o = null, c.init(), c
            }, function () {
                function e() {
                    _.windowLoaded = !0
                }

                i.addEventListener ? i.addEventListener("load", e) : i.attachEvent && i.attachEvent("onload", e), _.codeLoadEnd = (new Date).getTime()
            }(), i.Visitor = _, t.exports = _
        }).call(this, "undefined" != typeof window && "undefined" != typeof global && window.global === global ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./child/ChildVisitor": 2,
        "./child/Message": 3,
        "./child/makeChildMessageListener": 4,
        "./units/crossDomain": 8,
        "./units/makeCorsRequest": 9,
        "./units/makeDestinationPublishing": 10,
        "./units/version": 11,
        "./utils/asyncParallelApply": 12,
        "./utils/constants": 14,
        "./utils/enums": 15,
        "./utils/getDomain": 16,
        "./utils/utils": 18,
        "@adobe-mcid/visitor-js-shared/lib/ids/generateRandomID": 19
    }], 2: [function (e, t, i) {
        (function (i) {
            e("../utils/polyfills");
            var n = e("./strategies/LocalVisitor"), r = e("./strategies/ProxyVisitor"),
                a = e("./strategies/PlaceholderVisitor"), s = e("../utils/callbackRegistryFactory"), o = e("./Message"),
                l = e("../utils/enums"), u = l.MESSAGES;
            t.exports = function (e, t, l, d) {
                function c(e) {
                    Object.assign(I, e)
                }

                function f(e) {
                    Object.assign(I.state, e), I.callbackRegistry.executeAll(I.state)
                }

                function g(e) {
                    if (!A.isInvalid(e)) {
                        M = !1;
                        var t = A.parse(e);
                        I.setStateAndPublish(t.state)
                    }
                }

                function p(e) {
                    !M && S && (M = !0, A.send(d, e))
                }

                function m() {
                    c(new n(l._generateID)), I.getMarketingCloudVisitorID(), I.callbackRegistry.executeAll(I.state, !0), i.removeEventListener("message", _)
                }

                function _(e) {
                    if (!A.isInvalid(e)) {
                        var t = A.parse(e);
                        M = !1, i.clearTimeout(this.timeout), i.removeEventListener("message", _), c(new r(I)), i.addEventListener("message", g), I.setStateAndPublish(t.state), I.callbackRegistry.hasCallbacks() && p(u.GETSTATE)
                    }
                }

                function h() {
                    S && postMessage ? (i.addEventListener("message", _), p(u.HANDSHAKE), this.timeout = setTimeout(m, 250)) : m()
                }

                function C() {
                    i.s_c_in || (i.s_c_il = [], i.s_c_in = 0), I._c = "Visitor", I._il = i.s_c_il, I._in = i.s_c_in, I._il[I._in] = I, i.s_c_in++
                }

                function D() {
                    function e(e) {
                        0 !== e.indexOf("_") && "function" == typeof l[e] && (I[e] = function () {
                        })
                    }

                    Object.keys(l).forEach(e), I.getSupplementalDataID = l.getSupplementalDataID
                }

                var I = this, S = t.whitelistParentDomain;
                I.state = {}, I.version = l.version, I.marketingCloudOrgID = e;
                var M = !1, A = new o(e, S);
                I.callbackRegistry = s(), I.init = function () {
                    C(), D(), c(new a(I)), h()
                }, I.findField = function (e, t) {
                    if (I.state[e]) return t(I.state[e]), I.state[e]
                }, I.messageParent = p, I.setStateAndPublish = f
            }
        }).call(this, "undefined" != typeof window && "undefined" != typeof global && window.global === global ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "../utils/callbackRegistryFactory": 13,
        "../utils/enums": 15,
        "../utils/polyfills": 17,
        "./Message": 3,
        "./strategies/LocalVisitor": 5,
        "./strategies/PlaceholderVisitor": 6,
        "./strategies/ProxyVisitor": 7
    }], 3: [function (e, t, i) {
        var n = e("../utils/enums"), r = n.MESSAGES, a = {0: "prefix", 1: "orgID", 2: "state"};
        t.exports = function (e, t) {
            this.parse = function (e) {
                try {
                    var t = {};
                    return e.data.split("|").forEach(function (e, i) {
                        if (void 0 !== e) {
                            t[a[i]] = 2 !== i ? e : JSON.parse(e)
                        }
                    }), t
                } catch (e) {
                }
            }, this.isInvalid = function (i) {
                var n = this.parse(i);
                if (!n || Object.keys(n).length < 2) return !0;
                var a = e !== n.orgID, s = !t || i.origin !== t, o = -1 === Object.keys(r).indexOf(n.prefix);
                return a || s || o
            }, this.send = function (i, n, r) {
                var a = n + "|" + e;
                r && r === Object(r) && (a += "|" + JSON.stringify(r));
                try {
                    i.postMessage(a, t)
                } catch (e) {
                }
            }
        }
    }, {"../utils/enums": 15}], 4: [function (e, t, i) {
        var n = e("../utils/enums"), r = e("../utils/utils"), a = n.MESSAGES, s = n.ALL_APIS, o = n.ASYNC_API_MAP,
            l = n.FIELDGROUP_TO_FIELD;
        t.exports = function (e, t) {
            function i() {
                var t = {};
                return Object.keys(s).forEach(function (i) {
                    var n = s[i], a = e[n]();
                    r.isValueEmpty(a) || (t[i] = a)
                }), t
            }

            function n() {
                var t = [];
                return e._loading && Object.keys(e._loading).forEach(function (i) {
                    if (e._loading[i]) {
                        var n = l[i];
                        t.push(n)
                    }
                }), t.length ? t : null
            }

            function u(t) {
                return function i(r) {
                    var a = n();
                    if (a) {
                        var s = o[a[0]];
                        e[s](i, !0)
                    } else t()
                }
            }

            function d(e, n) {
                var r = i();
                t.send(e, n, r)
            }

            function c(e) {
                g(e), d(e, a.HANDSHAKE)
            }

            function f(e) {
                u(function () {
                    d(e, a.PARENTSTATE)
                })()
            }

            function g(i) {
                function n(n) {
                    r.call(e, n), t.send(i, a.PARENTSTATE, {CUSTOMERIDS: e.getCustomerIDs()})
                }

                var r = e.setCustomerIDs;
                e.setCustomerIDs = n
            }

            return function (e) {
                if (!t.isInvalid(e)) {
                    (t.parse(e).prefix === a.HANDSHAKE ? c : f)(e.source)
                }
            }
        }
    }, {"../utils/enums": 15, "../utils/utils": 18}], 5: [function (e, t, i) {
        var n = e("../../utils/enums"), r = n.STATE_KEYS_MAP;
        t.exports = function (e) {
            function t() {
            }

            function i(t, i) {
                var n = this;
                return function () {
                    var t = e(0, r.MCMID), a = {};
                    return a[r.MCMID] = t, n.setStateAndPublish(a), i(t), t
                }
            }

            this.getMarketingCloudVisitorID = function (e) {
                e = e || t;
                var n = this.findField(r.MCMID, e), a = i.call(this, r.MCMID, e);
                return void 0 !== n ? n : a()
            }
        }
    }, {"../../utils/enums": 15}], 6: [function (e, t, i) {
        var n = e("../../utils/enums"), r = n.ASYNC_API_MAP;
        t.exports = function () {
            Object.keys(r).forEach(function (e) {
                this[r[e]] = function (t) {
                    this.callbackRegistry.add(e, t)
                }
            }, this)
        }
    }, {"../../utils/enums": 15}], 7: [function (e, t, i) {
        var n = e("../../utils/enums"), r = n.MESSAGES, a = n.ASYNC_API_MAP, s = n.SYNC_API_MAP;
        t.exports = function () {
            function e() {
            }

            function t(e, t) {
                var i = this;
                return function () {
                    return i.callbackRegistry.add(e, t), i.messageParent(r.GETSTATE), ""
                }
            }

            function i(i) {
                this[a[i]] = function (n) {
                    n = n || e;
                    var r = this.findField(i, n), a = t.call(this, i, n);
                    return void 0 !== r ? r : a()
                }
            }

            function n(t) {
                this[s[t]] = function () {
                    return this.findField(t, e) || {}
                }
            }

            Object.keys(a).forEach(i, this), Object.keys(s).forEach(n, this)
        }
    }, {"../../utils/enums": 15}], 8: [function (e, t, i) {
        (function (e) {
            var i = !!e.postMessage;
            t.exports = {
                postMessage: function (e, t, n) {
                    var r = 1;
                    t && (i ? n.postMessage(e, t.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : t && (n.location = t.replace(/#.*$/, "") + "#" + +new Date + r++ + "&" + e))
                }, receiveMessage: function (t, n) {
                    var r;
                    try {
                        i && (t && (r = function (e) {
                            if ("string" == typeof n && e.origin !== n || "[object Function]" === Object.prototype.toString.call(n) && !1 === n(e.origin)) return !1;
                            t(e)
                        }), e.addEventListener ? e[t ? "addEventListener" : "removeEventListener"]("message", r) : e[t ? "attachEvent" : "detachEvent"]("onmessage", r))
                    } catch (e) {
                    }
                }
            }
        }).call(this, "undefined" != typeof window && "undefined" != typeof global && window.global === global ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 9: [function (e, t, i) {
        (function (e) {
            t.exports = function (t, i) {
                return {
                    corsMetadata: function () {
                        var t = "none", i = !0;
                        return "undefined" != typeof XMLHttpRequest && XMLHttpRequest === Object(XMLHttpRequest) && ("withCredentials" in new XMLHttpRequest ? t = "XMLHttpRequest" : "undefined" != typeof XDomainRequest && XDomainRequest === Object(XDomainRequest) && (i = !1), Object.prototype.toString.call(e.HTMLElement).indexOf("Constructor") > 0 && (i = !1)), {
                            corsType: t,
                            corsCookiesEnabled: i
                        }
                    }(), getCORSInstance: function () {
                        return "none" === this.corsMetadata.corsType ? null : new e[this.corsMetadata.corsType]
                    }, fireCORS: function (i, n, r) {
                        function a(t) {
                            var n;
                            try {
                                if ((n = JSON.parse(t)) !== Object(n)) return void s.handleCORSError(i, null, "Response is not JSON")
                            } catch (e) {
                                return void s.handleCORSError(i, e, "Error parsing response as JSON")
                            }
                            try {
                                for (var r = i.callback, a = e, o = 0; o < r.length; o++) a = a[r[o]];
                                a(n)
                            } catch (e) {
                                s.handleCORSError(i, e, "Error forming callback function")
                            }
                        }

                        var s = this;
                        n && (i.loadErrorHandler = n);
                        try {
                            var o = this.getCORSInstance();
                            o.open("get", i.corsUrl + "&ts=" + (new Date).getTime(), !0), "XMLHttpRequest" === this.corsMetadata.corsType && (o.withCredentials = !0, o.timeout = t.loadTimeout, o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.onreadystatechange = function () {
                                4 === this.readyState && 200 === this.status && a(this.responseText)
                            }), o.onerror = function (e) {
                                s.handleCORSError(i, e, "onerror")
                            }, o.ontimeout = function (e) {
                                s.handleCORSError(i, e, "ontimeout")
                            }, o.send(), t._log.requests.push(i.corsUrl)
                        } catch (e) {
                            this.handleCORSError(i, e, "try-catch")
                        }
                    }, handleCORSError: function (e, i, n) {
                        t.CORSErrors.push({
                            corsData: e,
                            error: i,
                            description: n
                        }), e.loadErrorHandler && ("ontimeout" === n ? e.loadErrorHandler(!0) : e.loadErrorHandler(!1))
                    }
                }
            }
        }).call(this, "undefined" != typeof window && "undefined" != typeof global && window.global === global ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 10: [function (e, t, i) {
        (function (i) {
            var n = e("../utils/constants"), r = e("./crossDomain"), a = e("../utils/utils");
            t.exports = function (e, t) {
                var s = i.document;
                return {
                    THROTTLE_START: 3e4,
                    MAX_SYNCS_LENGTH: 649,
                    throttleTimerSet: !1,
                    id: null,
                    onPagePixels: [],
                    iframeHost: null,
                    getIframeHost: function (e) {
                        if ("string" == typeof e) {
                            var t = e.split("/");
                            return t[0] + "//" + t[2]
                        }
                    },
                    subdomain: null,
                    url: null,
                    getUrl: function () {
                        var t, i = "http://fast.",
                            n = "?d_nsid=" + e.idSyncContainerID + "#" + encodeURIComponent(s.location.href);
                        return this.subdomain || (this.subdomain = "nosubdomainreturned"), e.loadSSL && (i = e.idSyncSSLUseAkamai ? "https://fast." : "https://"), t = i + this.subdomain + ".demdex.net/dest5.html" + n, this.iframeHost = this.getIframeHost(t), this.id = "destination_publishing_iframe_" + this.subdomain + "_" + e.idSyncContainerID, t
                    },
                    checkDPIframeSrc: function () {
                        var t = "?d_nsid=" + e.idSyncContainerID + "#" + encodeURIComponent(s.location.href);
                        "string" == typeof e.dpIframeSrc && e.dpIframeSrc.length && (this.id = "destination_publishing_iframe_" + (e._subdomain || this.subdomain || (new Date).getTime()) + "_" + e.idSyncContainerID, this.iframeHost = this.getIframeHost(e.dpIframeSrc), this.url = e.dpIframeSrc + t)
                    },
                    idCallNotProcesssed: null,
                    doAttachIframe: !1,
                    startedAttachingIframe: !1,
                    iframeHasLoaded: null,
                    iframeIdChanged: null,
                    newIframeCreated: null,
                    originalIframeHasLoadedAlready: null,
                    regionChanged: !1,
                    timesRegionChanged: 0,
                    sendingMessages: !1,
                    messages: [],
                    messagesPosted: [],
                    messagesReceived: [],
                    messageSendingInterval: n.POST_MESSAGE_ENABLED ? null : 100,
                    jsonForComparison: [],
                    jsonDuplicates: [],
                    jsonWaiting: [],
                    jsonProcessed: [],
                    canSetThirdPartyCookies: !0,
                    receivedThirdPartyCookiesNotification: !1,
                    readyToAttachIframe: function () {
                        return !e.idSyncDisable3rdPartySyncing && (this.doAttachIframe || e._doAttachIframe) && (this.subdomain && "nosubdomainreturned" !== this.subdomain || e._subdomain) && this.url && !this.startedAttachingIframe
                    },
                    attachIframe: function () {
                        function e() {
                            n = s.createElement("iframe"), n.sandbox = "allow-scripts allow-same-origin", n.title = "Adobe ID Syncing iFrame", n.id = i.id, n.name = i.id + "_name", n.style.cssText = "display: none; width: 0; height: 0;", n.src = i.url, i.newIframeCreated = !0, t(), s.body.appendChild(n)
                        }

                        function t() {
                            n.addEventListener("load", function () {
                                n.className = "aamIframeLoaded", i.iframeHasLoaded = !0, i.requestToProcess()
                            })
                        }

                        this.startedAttachingIframe = !0;
                        var i = this, n = s.getElementById(this.id);
                        n ? "IFRAME" !== n.nodeName ? (this.id += "_2", this.iframeIdChanged = !0, e()) : (this.newIframeCreated = !1, "aamIframeLoaded" !== n.className ? (this.originalIframeHasLoadedAlready = !1, t()) : (this.originalIframeHasLoadedAlready = !0, this.iframeHasLoaded = !0, this.iframe = n, this.requestToProcess())) : e(), this.iframe = n
                    },
                    requestToProcess: function (t) {
                        function i() {
                            a.jsonForComparison.push(t), a.jsonWaiting.push(t), a.processSyncOnPage(t)
                        }

                        var r, a = this;
                        if (t === Object(t) && t.ibs) if (r = JSON.stringify(t.ibs || []), this.jsonForComparison.length) {
                            var s, o, l, u = !1;
                            for (s = 0, o = this.jsonForComparison.length; s < o; s++) if (l = this.jsonForComparison[s], r === JSON.stringify(l.ibs || [])) {
                                u = !0;
                                break
                            }
                            u ? this.jsonDuplicates.push(t) : i()
                        } else i();
                        if ((this.receivedThirdPartyCookiesNotification || !n.POST_MESSAGE_ENABLED || this.iframeHasLoaded) && this.jsonWaiting.length) {
                            var d = this.jsonWaiting.shift();
                            this.process(d), this.requestToProcess()
                        }
                        !e.idSyncDisableSyncs && this.iframeHasLoaded && this.messages.length && !this.sendingMessages && (this.throttleTimerSet || (this.throttleTimerSet = !0, setTimeout(function () {
                            a.messageSendingInterval = n.POST_MESSAGE_ENABLED ? null : 150
                        }, this.THROTTLE_START)), this.sendingMessages = !0, this.sendMessages())
                    },
                    getRegionAndCheckIfChanged: function (t, i) {
                        var n = e._getField("MCAAMLH"), r = t.d_region || t.dcs_region;
                        return n ? r && (e._setFieldExpire("MCAAMLH", i), e._setField("MCAAMLH", r), parseInt(n, 10) !== r && (this.regionChanged = !0, this.timesRegionChanged++, e._setField("MCSYNCSOP", ""), e._setField("MCSYNCS", ""), n = r)) : (n = r) && (e._setFieldExpire("MCAAMLH", i), e._setField("MCAAMLH", n)), n || (n = ""), n
                    },
                    processSyncOnPage: function (e) {
                        var t, i, n, r;
                        if ((t = e.ibs) && t instanceof Array && (i = t.length)) for (n = 0; n < i; n++) r = t[n], r.syncOnPage && this.checkFirstPartyCookie(r, "", "syncOnPage")
                    },
                    process: function (e) {
                        var t, i, n, r, s, o = encodeURIComponent, l = !1;
                        if ((t = e.ibs) && t instanceof Array && (i = t.length)) for (l = !0, n = 0; n < i; n++) r = t[n], s = [o("ibs"), o(r.id || ""), o(r.tag || ""), a.encodeAndBuildRequest(r.url || [], ","), o(r.ttl || ""), "", "", r.fireURLSync ? "true" : "false"], r.syncOnPage || (this.canSetThirdPartyCookies ? this.addMessage(s.join("|")) : r.fireURLSync && this.checkFirstPartyCookie(r, s.join("|")));
                        l && this.jsonProcessed.push(e)
                    },
                    checkFirstPartyCookie: function (t, i, r) {
                        var a = "syncOnPage" === r, s = a ? "MCSYNCSOP" : "MCSYNCS";
                        e._readVisitor();
                        var o, l, u = e._getField(s), d = !1, c = !1,
                            f = Math.ceil((new Date).getTime() / n.MILLIS_PER_DAY);
                        u ? (o = u.split("*"), l = this.pruneSyncData(o, t.id, f), d = l.dataPresent, c = l.dataValid, d && c || this.fireSync(a, t, i, o, s, f)) : (o = [], this.fireSync(a, t, i, o, s, f))
                    },
                    pruneSyncData: function (e, t, i) {
                        var n, r, a, s = !1, o = !1;
                        for (r = 0; r < e.length; r++) n = e[r], a = parseInt(n.split("-")[1], 10), n.match("^" + t + "-") ? (s = !0, i < a ? o = !0 : (e.splice(r, 1), r--)) : i >= a && (e.splice(r, 1), r--);
                        return {dataPresent: s, dataValid: o}
                    },
                    manageSyncsSize: function (e) {
                        if (e.join("*").length > this.MAX_SYNCS_LENGTH) for (e.sort(function (e, t) {
                            return parseInt(e.split("-")[1], 10) - parseInt(t.split("-")[1], 10)
                        }); e.join("*").length > this.MAX_SYNCS_LENGTH;) e.shift()
                    },
                    fireSync: function (t, i, n, r, a, s) {
                        var o = this;
                        if (t) {
                            if ("img" === i.tag) {
                                var l, u, d, c, f = i.url, g = e.loadSSL ? "https:" : "http:";
                                for (l = 0, u = f.length; l < u; l++) {
                                    d = f[l], c = /^\/\//.test(d);
                                    var p = new Image;
                                    p.addEventListener("load", function (t, i, n, r) {
                                        return function () {
                                            o.onPagePixels[t] = null, e._readVisitor();
                                            var s, l = e._getField(a), u = [];
                                            if (l) {
                                                s = l.split("*");
                                                var d, c, f;
                                                for (d = 0, c = s.length; d < c; d++) f = s[d], f.match("^" + i.id + "-") || u.push(f)
                                            }
                                            o.setSyncTrackingData(u, i, n, r)
                                        }
                                    }(this.onPagePixels.length, i, a, s)), p.src = (c ? g : "") + d, this.onPagePixels.push(p)
                                }
                            }
                        } else this.addMessage(n), this.setSyncTrackingData(r, i, a, s)
                    },
                    addMessage: function (t) {
                        var i = encodeURIComponent,
                            r = i(e._enableErrorReporting ? "---destpub-debug---" : "---destpub---");
                        this.messages.push((n.POST_MESSAGE_ENABLED ? "" : r) + t)
                    },
                    setSyncTrackingData: function (t, i, n, r) {
                        t.push(i.id + "-" + (r + Math.ceil(i.ttl / 60 / 24))), this.manageSyncsSize(t), e._setField(n, t.join("*"))
                    },
                    sendMessages: function () {
                        var e, t = this, i = "", r = encodeURIComponent;
                        this.regionChanged && (i = r("---destpub-clear-dextp---"), this.regionChanged = !1), this.messages.length ? n.POST_MESSAGE_ENABLED ? (e = i + r("---destpub-combined---") + this.messages.join("%01"), this.postMessage(e), this.messages = [], this.sendingMessages = !1) : (e = this.messages.shift(), this.postMessage(i + e), setTimeout(function () {
                            t.sendMessages()
                        }, this.messageSendingInterval)) : this.sendingMessages = !1
                    },
                    postMessage: function (e) {
                        r.postMessage(e, this.url, this.iframe.contentWindow), this.messagesPosted.push(e)
                    },
                    receiveMessage: function (e) {
                        var t, i = /^---destpub-to-parent---/;
                        "string" == typeof e && i.test(e) && (t = e.replace(i, "").split("|"), "canSetThirdPartyCookies" === t[0] && (this.canSetThirdPartyCookies = "true" === t[1], this.receivedThirdPartyCookiesNotification = !0, this.requestToProcess()), this.messagesReceived.push(e))
                    },
                    processIDCallData: function (i) {
                        (null == this.url || i.subdomain && "nosubdomainreturned" === this.subdomain) && ("string" == typeof e._subdomain && e._subdomain.length ? this.subdomain = e._subdomain : this.subdomain = i.subdomain || "", this.url = this.getUrl()), i.ibs instanceof Array && i.ibs.length && (this.doAttachIframe = !0), this.readyToAttachIframe() && (e.idSyncAttachIframeOnWindowLoad ? (t.windowLoaded || "complete" === s.readyState || "loaded" === s.readyState) && this.attachIframe() : this.attachIframeASAP()), "function" == typeof e.idSyncIDCallResult ? e.idSyncIDCallResult(i) : this.requestToProcess(i), "function" == typeof e.idSyncAfterIDCallResult && e.idSyncAfterIDCallResult(i)
                    },
                    canMakeSyncIDCall: function (t, i) {
                        return e._forceSyncIDCall || !t || i - t > n.DAYS_BETWEEN_SYNC_ID_CALLS
                    },
                    attachIframeASAP: function () {
                        function e() {
                            t.startedAttachingIframe || (s.body ? t.attachIframe() : setTimeout(e, 30))
                        }

                        var t = this;
                        e()
                    }
                }
            }
        }).call(this, "undefined" != typeof window && "undefined" != typeof global && window.global === global ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {"../utils/constants": 14, "../utils/utils": 18, "./crossDomain": 8}], 11: [function (e, t, i) {
        function n(e) {
            for (var t = /^\d+$/, i = 0, n = e.length; i < n; i++) if (!t.test(e[i])) return !1;
            return !0
        }

        function r(e, t) {
            for (; e.length < t.length;) e.push("0");
            for (; t.length < e.length;) t.push("0")
        }

        function a(e, t) {
            for (var i = 0; i < e.length; i++) {
                var n = parseInt(e[i], 10), r = parseInt(t[i], 10);
                if (n > r) return 1;
                if (r > n) return -1
            }
            return 0
        }

        function s(e, t) {
            if (e === t) return 0;
            var i = e.toString().split("."), s = t.toString().split(".");
            return n(i.concat(s)) ? (r(i, s), a(i, s)) : NaN
        }

        t.exports = {
            compare: s, isLessThan: function (e, t) {
                return s(e, t) < 0
            }, areVersionsDifferent: function (e, t) {
                return 0 !== s(e, t)
            }, isGreaterThan: function (e, t) {
                return s(e, t) > 0
            }, isEqual: function (e, t) {
                return 0 === s(e, t)
            }
        }
    }, {}], 12: [function (e, t, i) {
        t.exports = function (e, t) {
            function i(e) {
                return function (i) {
                    n[e] = i, r++, r === a && t(n)
                }
            }

            var n = {}, r = 0, a = Object.keys(e).length;
            Object.keys(e).forEach(function (t) {
                var n = e[t];
                if (n.fn) {
                    var r = n.args || [];
                    r.unshift(i(t)), n.fn.apply(n.context || null, r)
                }
            })
        }
    }, {}], 13: [function (e, t, i) {
        function n() {
            return {
                callbacks: {}, add: function (e, t) {
                    this.callbacks[e] = this.callbacks[e] || [];
                    var i = this.callbacks[e].push(t) - 1;
                    return function () {
                        this.callbacks[e].splice(i, 1)
                    }
                }, execute: function (e, t) {
                    if (this.callbacks[e]) {
                        t = void 0 === t ? [] : t, t = t instanceof Array ? t : [t];
                        try {
                            for (; this.callbacks[e].length;) {
                                var i = this.callbacks[e].shift();
                                "function" == typeof i ? i.apply(null, t) : i instanceof Array && i[1].apply(i[0], t)
                            }
                            delete this.callbacks[e]
                        } catch (e) {
                        }
                    }
                }, executeAll: function (e, t) {
                    (t || e && !r.isObjectEmpty(e)) && Object.keys(this.callbacks).forEach(function (t) {
                        var i = void 0 !== e[t] ? e[t] : "";
                        this.execute(t, i)
                    }, this)
                }, hasCallbacks: function () {
                    return Boolean(Object.keys(this.callbacks).length)
                }
            }
        }

        var r = e("./utils");
        t.exports = n
    }, {"./utils": 18}], 14: [function (e, t, i) {
        (function (e) {
            t.exports = {
                POST_MESSAGE_ENABLED: !!e.postMessage,
                DAYS_BETWEEN_SYNC_ID_CALLS: 1,
                MILLIS_PER_DAY: 864e5,
                ADOBE_MC: "adobe_mc",
                ADOBE_MC_SDID: "adobe_mc_sdid",
                VALID_VISITOR_ID_REGEX: /^[0-9a-fA-F\-]+$/,
                ADOBE_MC_TTL_IN_MIN: 5,
                VERSION_REGEX: /vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/
            }
        }).call(this, "undefined" != typeof window && "undefined" != typeof global && window.global === global ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 15: [function (e, t, i) {
        i.MESSAGES = {
            HANDSHAKE: "HANDSHAKE",
            GETSTATE: "GETSTATE",
            PARENTSTATE: "PARENTSTATE"
        }, i.STATE_KEYS_MAP = {
            MCMID: "MCMID",
            MCAID: "MCAID",
            MCAAMB: "MCAAMB",
            MCAAMLH: "MCAAMLH",
            MCOPTOUT: "MCOPTOUT",
            CUSTOMERIDS: "CUSTOMERIDS"
        }, i.ASYNC_API_MAP = {
            MCMID: "getMarketingCloudVisitorID",
            MCAID: "getAnalyticsVisitorID",
            MCAAMB: "getAudienceManagerBlob",
            MCAAMLH: "getAudienceManagerLocationHint",
            MCOPTOUT: "getOptOut"
        }, i.SYNC_API_MAP = {CUSTOMERIDS: "getCustomerIDs"}, i.ALL_APIS = {
            MCMID: "getMarketingCloudVisitorID",
            MCAAMB: "getAudienceManagerBlob",
            MCAAMLH: "getAudienceManagerLocationHint",
            MCOPTOUT: "getOptOut",
            MCAID: "getAnalyticsVisitorID",
            CUSTOMERIDS: "getCustomerIDs"
        }, i.FIELDGROUP_TO_FIELD = {MC: "MCMID", A: "MCAID", AAM: "MCAAMB"}, i.FIELDS = {
            MCMID: "MCMID",
            MCOPTOUT: "MCOPTOUT",
            MCAID: "MCAID",
            MCAAMLH: "MCAAMLH",
            MCAAMB: "MCAAMB"
        }, i.AUTH_STATE = {UNKNOWN: 0, AUTHENTICATED: 1, LOGGED_OUT: 2}, i.OPT_OUT = {GLOBAL: "global"}
    }, {}], 16: [function (e, t, i) {
        (function (e) {
            t.exports = function (t) {
                var i;
                if (!t && e.location && (t = e.location.hostname), i = t) if (/^[0-9.]+$/.test(i)) i = ""; else {
                    var n = ",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,et,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,nz,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,",
                        r = i.split("."), a = r.length - 1, s = a - 1;
                    if (a > 1 && r[a].length <= 2 && (2 === r[a - 1].length || n.indexOf("," + r[a] + ",") < 0) && s--, s > 0) for (i = ""; a >= s;) i = r[a] + (i ? "." : "") + i, a--
                }
                return i
            }
        }).call(this, "undefined" != typeof window && "undefined" != typeof global && window.global === global ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 17: [function (e, t, i) {
        Object.assign = Object.assign || function (e) {
            for (var t, i, n = 1; n < arguments.length; ++n) {
                i = arguments[n];
                for (t in i) Object.prototype.hasOwnProperty.call(i, t) && (e[t] = i[t])
            }
            return e
        }
    }, {}], 18: [function (e, t, i) {
        i.isObjectEmpty = function (e) {
            return e === Object(e) && 0 === Object.keys(e).length
        }, i.isValueEmpty = function (e) {
            return "" === e || i.isObjectEmpty(e)
        }, i.getIeVersion = function () {
            if (document.documentMode) return document.documentMode;
            for (var e = 7; e > 4; e--) {
                var t = document.createElement("div");
                if (t.innerHTML = "\x3c!--[if IE " + e + "]><span></span><![endif]--\x3e", t.getElementsByTagName("span").length) return t = null, e;
                t = null
            }
            return null
        }, i.encodeAndBuildRequest = function (e, t) {
            return e.map(encodeURIComponent).join(t)
        }
    }, {}], 19: [function (e, t, i) {
        t.exports = function (e) {
            var t, i, n = "0123456789", r = "", a = "", s = 8, o = 10, l = 10;
            if (1 == e) {
                for (n += "ABCDEF", t = 0; 16 > t; t++) i = Math.floor(Math.random() * s), r += n.substring(i, i + 1), i = Math.floor(Math.random() * s), a += n.substring(i, i + 1), s = 16;
                return r + "-" + a
            }
            for (t = 0; 19 > t; t++) i = Math.floor(Math.random() * o), r += n.substring(i, i + 1), 0 === t && 9 == i ? o = 3 : (1 == t || 2 == t) && 10 != o && 2 > i ? o = 10 : 2 < t && (o = 10), i = Math.floor(Math.random() * l), a += n.substring(i, i + 1), 0 === t && 9 == i ? l = 3 : (1 == t || 2 == t) && 10 != l && 2 > i ? l = 10 : 2 < t && (l = 10);
            return r + a
        }
    }, {}]
}, {}, [1]);
try {
    (function (id, loader) {
        window.utag.tagsettings = window.utag.tagsettings || {};
        window.utag.tagsettings.adobe = window.utag.tagsettings.adobe || {};
        var vAPI = window.utag.tagsettings.adobe.visitorAPI = window.utag.tagsettings.adobe.visitorAPI || (function () {
            function logger(msg) {
                utag.DB('[' + id + '] : ' + msg);
            }

            function Observer(orgId, config) {
                var observers = [], visitor = {}, demdex = null, instance = null,
                    regex = new RegExp('AMCV_' + window.encodeURIComponent(orgId) + '=.*?(;|$)'), active = false,
                    util = {
                        'hasOwn': function (o, a) {
                            return o !== null && Object.prototype.hasOwnProperty.call(o, a);
                        }
                    }, mTags = (function () {
                        var tags = [], tag, cfg = utag.loader.cfg, loadcond = {1: 1, 4: 1};
                        for (tag in cfg) {
                            if (!util.hasOwn(cfg, tag)) {
                                continue;
                            }
                            if (cfg[tag].tid === 1191 && loadcond[cfg[tag].load]) {
                                tags.push(tag);
                            }
                        }
                        return tags;
                    }());

                function mTagsLoaded() {
                    var loaded = true, id;
                    for (var i = 0, len = mTags.length; i < len; i++) {
                        id = mTags[i];
                        if (!utag.loader.f[id]) {
                            loaded = false;
                            break;
                        }
                    }
                    return loaded;
                }

                function notify(result) {
                    instance = result;
                    if (instance && instance.setCustomerIDs) {
                        var aliases, alias;
                        for (aliases in visitor) {
                            if (util.hasOwn(visitor, aliases)) {
                                alias = visitor[aliases];
                                if (alias.authState && Visitor.AuthState[alias.authState] !== undefined) {
                                    alias.authState = Visitor.AuthState[alias.authState];
                                }
                            }
                        }
                        instance.setCustomerIDs(visitor);
                    }
                    while (observers.length !== 0) {
                        var nextCallback = observers.shift();
                        nextCallback(instance);
                    }
                    return true;
                }

                this.sync = function (ids) {
                    var alias;
                    for (alias in ids) {
                        if (util.hasOwn(ids, alias)) {
                            if (!visitor[alias]) {
                                visitor[alias] = ids[alias];
                            }
                        }
                    }
                    return true;
                };
                this.subscribe = function (callback) {
                    var self = this;
                    if (instance !== null) {
                        return callback(instance);
                    } else {
                        observers.push(callback);
                        if (!active) {
                            logger('demdex org id [' + orgId + '] sync requested');
                            (function retry(retries) {
                                if (retries === 0) {
                                    logger('demdex org id [' + orgId + '] sync timed out!');
                                    active = false;
                                    return notify(undefined);
                                } else {
                                    active = true;
                                    if (regex.test(document.cookie) && mTagsLoaded()) {
                                        logger('demdex org id [' + orgId + '] sync completed');
                                        return notify(window.Visitor.getInstance(orgId));
                                    } else {
                                        if (window.Visitor && window.Visitor.getInstance) {
                                            if (config && !demdex) {
                                                demdex = window.Visitor.getInstance(orgId, config);
                                            }
                                        }
                                        window.setTimeout(function () {
                                            logger('demdex org id [' + orgId + '] sync, waiting...');
                                            retry(--retries);
                                        }, 25);
                                    }
                                }
                            }(80));
                        }
                    }
                    return true;
                };
            }

            function VisitorAPIWrapper() {
                var observers = {};
                this._version = '1.0';
                this.getInstance = function (orgId, callback, config, customerIds) {
                    if (!orgId) {
                        return callback(undefined);
                    }
                    orgId = !/@AdobeOrg$/.test(orgId) ? orgId + '@AdobeOrg' : orgId;
                    if (!observers[orgId]) {
                        if (!config) {
                            logger('demdex org id [' + orgId + '] sync error. marketing cloud tag missing demdex config');
                            return callback(undefined);
                        }
                        observers[orgId] = new Observer(orgId, config);
                    }
                    if (customerIds) {
                        observers[orgId].sync(customerIds);
                    }
                    observers[orgId].subscribe(callback);
                    return true;
                };
            }

            return new VisitorAPIWrapper();
        }());
        var u = {"id": id};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {"height": "1", "width": "1", "style": "display:none"}, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) return false;
            }
            return true;
        };
        u.ev = {"view": 1};
        u.initialized = false;
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.clearEmptyKeys = function (object) {
            for (var key in object) {
                if (object[key] === "" || object[key] === undefined) {
                    delete object[key];
                }
            }
            return object;
        };
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:33");
                utag.DB(b);
                var c, d, e, f;
                u.data = {
                    "adobe_org_id": "8E929CC25A1FB2B30A495C97", "config": {
                        "trackingServer": "metrics-ieeexplore.ieee.org",
                        "trackingServerSecure": "smetrics-ieeexplore.ieee.org",
                        "marketingCloudServer": "metrics-ieeexplore.ieee.org",
                        "marketingCloudServerSecure": "smetrics-ieeexplore.ieee.org",
                        "cookieDomain": (function () {
                            return utag.loader.RC('utag_main').vapi_domain || (function () {
                                var i = 0, d = document.domain, p = d.split('.'), s = '_vapi' + new Date().getTime();
                                while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) === -1) {
                                    d = p.slice(-1 - (++i)).join('.');
                                    document.cookie = s + '=' + s + ';domain=' + d + ';';
                                }
                                document.cookie = s + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + d + ';';
                                utag.loader.SC('utag_main', {'vapi_domain': d});
                                return d;
                            }());
                        }())
                    }, 'customer_ids': {}
                };
                utag.DB("send:33:EXTENSIONS");
                utag.DB(b);
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    }
                }
                utag.DB("send:33:MAPPINGS");
                utag.DB(u.data);
                if (!u.data.adobe_org_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated [adobe_org_id]");
                    return;
                }
                if (!u.initialized) {
                    u.initialized = !0;
                    vAPI.getInstance(u.data.adobe_org_id, function (instance) {
                    }, u.clearEmptyKeys(u.data.config), u.data.customer_ids);
                }
                utag.DB("send:33:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("33", "ieeexplore.main"));
} catch (error) {
    utag.DB(error);
}
(function () {
    if (typeof utag != 'undefined') {
        utag.initcatch = true;
        for (var i in utag.loader.GV(utag.loader.cfg)) {
            var b = utag.loader.cfg[i];
            if (b.load != 4) {
                utag.initcatch = false;
                break
            }
            ;
            if (b.wait == 1) {
                utag.initcatch = false;
                break
            }
        }
        ;
        if (utag.initcatch) utag.handler.INIT();
    }
})();