! function(a) {
    "use strict";
    var b = function(a, c, d) {
            var e, f, g = document.createElement("img");
            if (g.onerror = c, g.onload = function() {
                    !f || d && d.noRevoke || b.revokeObjectURL(f), c && c(b.scale(g, d))
                }, b.isInstanceOf("Blob", a) || b.isInstanceOf("File", a)) e = f = b.createObjectURL(a), g._type = a.type;
            else {
                if ("string" != typeof a) return !1;
                e = a, d && d.crossOrigin && (g.crossOrigin = d.crossOrigin)
            }
            return e ? (g.src = e, g) : b.readFile(a, function(a) {
                var b = a.target;
                b && b.result ? g.src = b.result : c && c(a)
            })
        },
        c = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
    b.isInstanceOf = function(a, b) {
        return Object.prototype.toString.call(b) === "[object " + a + "]"
    }, b.transformCoordinates = function() {}, b.getTransformedOptions = function(a, b) {
        var c, d, e, f, g = b.aspectRatio;
        if (!g) return b;
        c = {};
        for (d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
        return c.crop = !0, e = a.naturalWidth || a.width, f = a.naturalHeight || a.height, e / f > g ? (c.maxWidth = f * g, c.maxHeight = f) : (c.maxWidth = e, c.maxHeight = e / g), c
    }, b.renderImageToCanvas = function(a, b, c, d, e, f, g, h, i, j) {
        return a.getContext("2d").drawImage(b, c, d, e, f, g, h, i, j), a
    }, b.hasCanvasOption = function(a) {
        return a.canvas || a.crop || a.aspectRatio
    }, b.scale = function(a, c) {
        c = c || {};
        var d, e, f, g, h, i, j, k, l, m = document.createElement("canvas"),
            n = a.getContext || b.hasCanvasOption(c) && m.getContext,
            o = a.naturalWidth || a.width,
            p = a.naturalHeight || a.height,
            q = o,
            r = p,
            s = function() {
                var a = Math.max((f || q) / q, (g || r) / r);
                a > 1 && (q *= a, r *= a)
            },
            t = function() {
                var a = Math.min((d || q) / q, (e || r) / r);
                1 > a && (q *= a, r *= a)
            };
        return n && (c = b.getTransformedOptions(a, c), j = c.left || 0, k = c.top || 0, c.sourceWidth ? (h = c.sourceWidth, void 0 !== c.right && void 0 === c.left && (j = o - h - c.right)) : h = o - j - (c.right || 0), c.sourceHeight ? (i = c.sourceHeight, void 0 !== c.bottom && void 0 === c.top && (k = p - i - c.bottom)) : i = p - k - (c.bottom || 0), q = h, r = i), d = c.maxWidth, e = c.maxHeight, f = c.minWidth, g = c.minHeight, n && d && e && c.crop ? (q = d, r = e, l = h / i - d / e, 0 > l ? (i = e * h / d, void 0 === c.top && void 0 === c.bottom && (k = (p - i) / 2)) : l > 0 && (h = d * i / e, void 0 === c.left && void 0 === c.right && (j = (o - h) / 2))) : ((c.contain || c.cover) && (f = d = d || f, g = e = e || g), c.cover ? (t(), s()) : (s(), t())), n ? (m.width = q, m.height = r, b.transformCoordinates(m, c), b.renderImageToCanvas(m, a, j, k, h, i, 0, 0, q, r)) : (a.width = q, a.height = r, a)
    }, b.createObjectURL = function(a) {
        return c ? c.createObjectURL(a) : !1
    }, b.revokeObjectURL = function(a) {
        return c ? c.revokeObjectURL(a) : !1
    }, b.readFile = function(a, b, c) {
        if (window.FileReader) {
            var d = new FileReader;
            if (d.onload = d.onerror = b, c = c || "readAsDataURL", d[c]) return d[c](a), d
        }
        return !1
    }, "function" == typeof define && define.amd ? define(function() {
        return b
    }) : a.loadImage = b
}(this),
function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["load-image"], a) : a(window.loadImage)
}(function(a) {
    "use strict";
    if (window.navigator && window.navigator.platform && /iP(hone|od|ad)/.test(window.navigator.platform)) {
        var b = a.renderImageToCanvas;
        a.detectSubsampling = function(a) {
            var b, c;
            return a.width * a.height > 1048576 ? (b = document.createElement("canvas"), b.width = b.height = 1, c = b.getContext("2d"), c.drawImage(a, -a.width + 1, 0), 0 === c.getImageData(0, 0, 1, 1).data[3]) : !1
        }, a.detectVerticalSquash = function(a, b) {
            var c, d, e, f, g, h = a.naturalHeight || a.height,
                i = document.createElement("canvas"),
                j = i.getContext("2d");
            for (b && (h /= 2), i.width = 1, i.height = h, j.drawImage(a, 0, 0), c = j.getImageData(0, 0, 1, h).data, d = 0, e = h, f = h; f > d;) g = c[4 * (f - 1) + 3], 0 === g ? e = f : d = f, f = e + d >> 1;
            return f / h || 1
        }, a.renderImageToCanvas = function(c, d, e, f, g, h, i, j, k, l) {
            if ("image/jpeg" === d._type) {
                var m, n, o, p, q = c.getContext("2d"),
                    r = document.createElement("canvas"),
                    s = 1024,
                    t = r.getContext("2d");
                if (r.width = s, r.height = s, q.save(), m = a.detectSubsampling(d), m && (e /= 2, f /= 2, g /= 2, h /= 2), n = a.detectVerticalSquash(d, m), m || 1 !== n) {
                    for (f *= n, k = Math.ceil(s * k / g), l = Math.ceil(s * l / h / n), j = 0, p = 0; h > p;) {
                        for (i = 0, o = 0; g > o;) t.clearRect(0, 0, s, s), t.drawImage(d, e, f, g, h, -o, -p, g, h), q.drawImage(r, 0, 0, s, s, i, j, k, l), o += s, i += k;
                        p += s, j += l
                    }
                    return q.restore(), c
                }
            }
            return b(c, d, e, f, g, h, i, j, k, l)
        }
    }
}),
function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["load-image"], a) : a(window.loadImage)
}(function(a) {
    "use strict";
    var b = a.hasCanvasOption,
        c = a.transformCoordinates,
        d = a.getTransformedOptions;
    a.hasCanvasOption = function(c) {
        return b.call(a, c) || c.orientation
    }, a.transformCoordinates = function(b, d) {
        c.call(a, b, d);
        var e = b.getContext("2d"),
            f = b.width,
            g = b.height,
            h = d.orientation;
        if (h && !(h > 8)) switch (h > 4 && (b.width = g, b.height = f), h) {
            case 2:
                e.translate(f, 0), e.scale(-1, 1);
                break;
            case 3:
                e.translate(f, g), e.rotate(Math.PI);
                break;
            case 4:
                e.translate(0, g), e.scale(1, -1);
                break;
            case 5:
                e.rotate(.5 * Math.PI), e.scale(1, -1);
                break;
            case 6:
                e.rotate(.5 * Math.PI), e.translate(0, -g);
                break;
            case 7:
                e.rotate(.5 * Math.PI), e.translate(f, -g), e.scale(-1, 1);
                break;
            case 8:
                e.rotate(-.5 * Math.PI), e.translate(-f, 0)
        }
    }, a.getTransformedOptions = function(b, c) {
        var e, f, g = d.call(a, b, c),
            h = g.orientation;
        if (!h || h > 8 || 1 === h) return g;
        e = {};
        for (f in g) g.hasOwnProperty(f) && (e[f] = g[f]);
        switch (g.orientation) {
            case 2:
                e.left = g.right, e.right = g.left;
                break;
            case 3:
                e.left = g.right, e.top = g.bottom, e.right = g.left, e.bottom = g.top;
                break;
            case 4:
                e.top = g.bottom, e.bottom = g.top;
                break;
            case 5:
                e.left = g.top, e.top = g.left, e.right = g.bottom, e.bottom = g.right;
                break;
            case 6:
                e.left = g.top, e.top = g.right, e.right = g.bottom, e.bottom = g.left;
                break;
            case 7:
                e.left = g.bottom, e.top = g.right, e.right = g.top, e.bottom = g.left;
                break;
            case 8:
                e.left = g.bottom, e.top = g.left, e.right = g.top, e.bottom = g.right
        }
        return g.orientation > 4 && (e.maxWidth = g.maxHeight, e.maxHeight = g.maxWidth, e.minWidth = g.minHeight, e.minHeight = g.minWidth, e.sourceWidth = g.sourceHeight, e.sourceHeight = g.sourceWidth), e
    }
}),
function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["load-image"], a) : a(window.loadImage)
}(function(a) {
    "use strict";
    var b = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
    a.blobSlice = b && function() {
        var a = this.slice || this.webkitSlice || this.mozSlice;
        return a.apply(this, arguments)
    }, a.metaDataParsers = {
        jpeg: {
            65505: []
        }
    }, a.parseMetaData = function(b, c, d) {
        d = d || {};
        var e = this,
            f = d.maxMetaDataSize || 262144,
            g = {},
            h = !(window.DataView && b && b.size >= 12 && "image/jpeg" === b.type && a.blobSlice);
        (h || !a.readFile(a.blobSlice.call(b, 0, f), function(b) {
            if (b.target.error) return console.log(b.target.error), void c(g);
            var f, h, i, j, k = b.target.result,
                l = new DataView(k),
                m = 2,
                n = l.byteLength - 4,
                o = m;
            if (65496 === l.getUint16(0)) {
                for (; n > m && (f = l.getUint16(m), f >= 65504 && 65519 >= f || 65534 === f);) {
                    if (h = l.getUint16(m + 2) + 2, m + h > l.byteLength) {
                        console.log("Invalid meta data: Invalid segment size.");
                        break
                    }
                    if (i = a.metaDataParsers.jpeg[f])
                        for (j = 0; j < i.length; j += 1) i[j].call(e, l, m, h, g, d);
                    m += h, o = m
                }!d.disableImageHead && o > 6 && (g.imageHead = k.slice ? k.slice(0, o) : new Uint8Array(k).subarray(0, o))
            } else console.log("Invalid JPEG file: Missing JPEG marker.");
            c(g)
        }, "readAsArrayBuffer")) && c(g)
    }
}),
function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["load-image", "load-image-meta"], a) : a(window.loadImage)
}(function(a) {
    "use strict";
    a.ExifMap = function() {
        return this
    }, a.ExifMap.prototype.map = {
        Orientation: 274
    }, a.ExifMap.prototype.get = function(a) {
        return this[a] || this[this.map[a]]
    }, a.getExifThumbnail = function(a, b, c) {
        var d, e, f;
        if (!c || b + c > a.byteLength) return void console.log("Invalid Exif data: Invalid thumbnail data.");
        for (d = [], e = 0; c > e; e += 1) f = a.getUint8(b + e), d.push((16 > f ? "0" : "") + f.toString(16));
        return "data:image/jpeg,%" + d.join("%")
    }, a.exifTagTypes = {
        1: {
            getValue: function(a, b) {
                return a.getUint8(b)
            },
            size: 1
        },
        2: {
            getValue: function(a, b) {
                return String.fromCharCode(a.getUint8(b))
            },
            size: 1,
            ascii: !0
        },
        3: {
            getValue: function(a, b, c) {
                return a.getUint16(b, c)
            },
            size: 2
        },
        4: {
            getValue: function(a, b, c) {
                return a.getUint32(b, c)
            },
            size: 4
        },
        5: {
            getValue: function(a, b, c) {
                return a.getUint32(b, c) / a.getUint32(b + 4, c)
            },
            size: 8
        },
        9: {
            getValue: function(a, b, c) {
                return a.getInt32(b, c)
            },
            size: 4
        },
        10: {
            getValue: function(a, b, c) {
                return a.getInt32(b, c) / a.getInt32(b + 4, c)
            },
            size: 8
        }
    }, a.exifTagTypes[7] = a.exifTagTypes[1], a.getExifValue = function(b, c, d, e, f, g) {
        var h, i, j, k, l, m, n = a.exifTagTypes[e];
        if (!n) return void console.log("Invalid Exif data: Invalid tag type.");
        if (h = n.size * f, i = h > 4 ? c + b.getUint32(d + 8, g) : d + 8, i + h > b.byteLength) return void console.log("Invalid Exif data: Invalid data offset.");
        if (1 === f) return n.getValue(b, i, g);
        for (j = [], k = 0; f > k; k += 1) j[k] = n.getValue(b, i + k * n.size, g);
        if (n.ascii) {
            for (l = "", k = 0; k < j.length && (m = j[k], "\x00" !== m); k += 1) l += m;
            return l
        }
        return j
    }, a.parseExifTag = function(b, c, d, e, f) {
        var g = b.getUint16(d, e);
        f.exif[g] = a.getExifValue(b, c, d, b.getUint16(d + 2, e), b.getUint32(d + 4, e), e)
    }, a.parseExifTags = function(a, b, c, d, e) {
        var f, g, h;
        if (c + 6 > a.byteLength) return void console.log("Invalid Exif data: Invalid directory offset.");
        if (f = a.getUint16(c, d), g = c + 2 + 12 * f, g + 4 > a.byteLength) return void console.log("Invalid Exif data: Invalid directory size.");
        for (h = 0; f > h; h += 1) this.parseExifTag(a, b, c + 2 + 12 * h, d, e);
        return a.getUint32(g, d)
    }, a.parseExifData = function(b, c, d, e, f) {
        if (!f.disableExif) {
            var g, h, i, j = c + 10;
            if (1165519206 === b.getUint32(c + 4)) {
                if (j + 8 > b.byteLength) return void console.log("Invalid Exif data: Invalid segment size.");
                if (0 !== b.getUint16(c + 8)) return void console.log("Invalid Exif data: Missing byte alignment offset.");
                switch (b.getUint16(j)) {
                    case 18761:
                        g = !0;
                        break;
                    case 19789:
                        g = !1;
                        break;
                    default:
                        return void console.log("Invalid Exif data: Invalid byte alignment marker.")
                }
                if (42 !== b.getUint16(j + 2, g)) return void console.log("Invalid Exif data: Missing TIFF marker.");
                h = b.getUint32(j + 4, g), e.exif = new a.ExifMap, h = a.parseExifTags(b, j, j + h, g, e), h && !f.disableExifThumbnail && (i = {
                    exif: {}
                }, h = a.parseExifTags(b, j, j + h, g, i), i.exif[513] && (e.exif.Thumbnail = a.getExifThumbnail(b, j + i.exif[513], i.exif[514]))), e.exif[34665] && !f.disableExifSub && a.parseExifTags(b, j, j + e.exif[34665], g, e), e.exif[34853] && !f.disableExifGps && a.parseExifTags(b, j, j + e.exif[34853], g, e)
            }
        }
    }, a.metaDataParsers.jpeg[65505].push(a.parseExifData)
}),
function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["load-image", "load-image-exif"], a) : a(window.loadImage)
}(function(a) {
    "use strict";
    a.ExifMap.prototype.tags = {
            256: "ImageWidth",
            257: "ImageHeight",
            34665: "ExifIFDPointer",
            34853: "GPSInfoIFDPointer",
            40965: "InteroperabilityIFDPointer",
            258: "BitsPerSample",
            259: "Compression",
            262: "PhotometricInterpretation",
            274: "Orientation",
            277: "SamplesPerPixel",
            284: "PlanarConfiguration",
            530: "YCbCrSubSampling",
            531: "YCbCrPositioning",
            282: "XResolution",
            283: "YResolution",
            296: "ResolutionUnit",
            273: "StripOffsets",
            278: "RowsPerStrip",
            279: "StripByteCounts",
            513: "JPEGInterchangeFormat",
            514: "JPEGInterchangeFormatLength",
            301: "TransferFunction",
            318: "WhitePoint",
            319: "PrimaryChromaticities",
            529: "YCbCrCoefficients",
            532: "ReferenceBlackWhite",
            306: "DateTime",
            270: "ImageDescription",
            271: "Make",
            272: "Model",
            305: "Software",
            315: "Artist",
            33432: "Copyright",
            36864: "ExifVersion",
            40960: "FlashpixVersion",
            40961: "ColorSpace",
            40962: "PixelXDimension",
            40963: "PixelYDimension",
            42240: "Gamma",
            37121: "ComponentsConfiguration",
            37122: "CompressedBitsPerPixel",
            37500: "MakerNote",
            37510: "UserComment",
            40964: "RelatedSoundFile",
            36867: "DateTimeOriginal",
            36868: "DateTimeDigitized",
            37520: "SubSecTime",
            37521: "SubSecTimeOriginal",
            37522: "SubSecTimeDigitized",
            33434: "ExposureTime",
            33437: "FNumber",
            34850: "ExposureProgram",
            34852: "SpectralSensitivity",
            34855: "PhotographicSensitivity",
            34856: "OECF",
            34864: "SensitivityType",
            34865: "StandardOutputSensitivity",
            34866: "RecommendedExposureIndex",
            34867: "ISOSpeed",
            34868: "ISOSpeedLatitudeyyy",
            34869: "ISOSpeedLatitudezzz",
            37377: "ShutterSpeedValue",
            37378: "ApertureValue",
            37379: "BrightnessValue",
            37380: "ExposureBias",
            37381: "MaxApertureValue",
            37382: "SubjectDistance",
            37383: "MeteringMode",
            37384: "LightSource",
            37385: "Flash",
            37396: "SubjectArea",
            37386: "FocalLength",
            41483: "FlashEnergy",
            41484: "SpatialFrequencyResponse",
            41486: "FocalPlaneXResolution",
            41487: "FocalPlaneYResolution",
            41488: "FocalPlaneResolutionUnit",
            41492: "SubjectLocation",
            41493: "ExposureIndex",
            41495: "SensingMethod",
            41728: "FileSource",
            41729: "SceneType",
            41730: "CFAPattern",
            41985: "CustomRendered",
            41986: "ExposureMode",
            41987: "WhiteBalance",
            41988: "DigitalZoomRatio",
            41989: "FocalLengthIn35mmFilm",
            41990: "SceneCaptureType",
            41991: "GainControl",
            41992: "Contrast",
            41993: "Saturation",
            41994: "Sharpness",
            41995: "DeviceSettingDescription",
            41996: "SubjectDistanceRange",
            42016: "ImageUniqueID",
            42032: "CameraOwnerName",
            42033: "BodySerialNumber",
            42034: "LensSpecification",
            42035: "LensMake",
            42036: "LensModel",
            42037: "LensSerialNumber",
            0: "GPSVersionID",
            1: "GPSLatitudeRef",
            2: "GPSLatitude",
            3: "GPSLongitudeRef",
            4: "GPSLongitude",
            5: "GPSAltitudeRef",
            6: "GPSAltitude",
            7: "GPSTimeStamp",
            8: "GPSSatellites",
            9: "GPSStatus",
            10: "GPSMeasureMode",
            11: "GPSDOP",
            12: "GPSSpeedRef",
            13: "GPSSpeed",
            14: "GPSTrackRef",
            15: "GPSTrack",
            16: "GPSImgDirectionRef",
            17: "GPSImgDirection",
            18: "GPSMapDatum",
            19: "GPSDestLatitudeRef",
            20: "GPSDestLatitude",
            21: "GPSDestLongitudeRef",
            22: "GPSDestLongitude",
            23: "GPSDestBearingRef",
            24: "GPSDestBearing",
            25: "GPSDestDistanceRef",
            26: "GPSDestDistance",
            27: "GPSProcessingMethod",
            28: "GPSAreaInformation",
            29: "GPSDateStamp",
            30: "GPSDifferential",
            31: "GPSHPositioningError"
        }, a.ExifMap.prototype.stringValues = {
            ExposureProgram: {
                0: "Undefined",
                1: "Manual",
                2: "Normal program",
                3: "Aperture priority",
                4: "Shutter priority",
                5: "Creative program",
                6: "Action program",
                7: "Portrait mode",
                8: "Landscape mode"
            },
            MeteringMode: {
                0: "Unknown",
                1: "Average",
                2: "CenterWeightedAverage",
                3: "Spot",
                4: "MultiSpot",
                5: "Pattern",
                6: "Partial",
                255: "Other"
            },
            LightSource: {
                0: "Unknown",
                1: "Daylight",
                2: "Fluorescent",
                3: "Tungsten (incandescent light)",
                4: "Flash",
                9: "Fine weather",
                10: "Cloudy weather",
                11: "Shade",
                12: "Daylight fluorescent (D 5700 - 7100K)",
                13: "Day white fluorescent (N 4600 - 5400K)",
                14: "Cool white fluorescent (W 3900 - 4500K)",
                15: "White fluorescent (WW 3200 - 3700K)",
                17: "Standard light A",
                18: "Standard light B",
                19: "Standard light C",
                20: "D55",
                21: "D65",
                22: "D75",
                23: "D50",
                24: "ISO studio tungsten",
                255: "Other"
            },
            Flash: {
                0: "Flash did not fire",
                1: "Flash fired",
                5: "Strobe return light not detected",
                7: "Strobe return light detected",
                9: "Flash fired, compulsory flash mode",
                13: "Flash fired, compulsory flash mode, return light not detected",
                15: "Flash fired, compulsory flash mode, return light detected",
                16: "Flash did not fire, compulsory flash mode",
                24: "Flash did not fire, auto mode",
                25: "Flash fired, auto mode",
                29: "Flash fired, auto mode, return light not detected",
                31: "Flash fired, auto mode, return light detected",
                32: "No flash function",
                65: "Flash fired, red-eye reduction mode",
                69: "Flash fired, red-eye reduction mode, return light not detected",
                71: "Flash fired, red-eye reduction mode, return light detected",
                73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                89: "Flash fired, auto mode, red-eye reduction mode",
                93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
            },
            SensingMethod: {
                1: "Undefined",
                2: "One-chip color area sensor",
                3: "Two-chip color area sensor",
                4: "Three-chip color area sensor",
                5: "Color sequential area sensor",
                7: "Trilinear sensor",
                8: "Color sequential linear sensor"
            },
            SceneCaptureType: {
                0: "Standard",
                1: "Landscape",
                2: "Portrait",
                3: "Night scene"
            },
            SceneType: {
                1: "Directly photographed"
            },
            CustomRendered: {
                0: "Normal process",
                1: "Custom process"
            },
            WhiteBalance: {
                0: "Auto white balance",
                1: "Manual white balance"
            },
            GainControl: {
                0: "None",
                1: "Low gain up",
                2: "High gain up",
                3: "Low gain down",
                4: "High gain down"
            },
            Contrast: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            Saturation: {
                0: "Normal",
                1: "Low saturation",
                2: "High saturation"
            },
            Sharpness: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            SubjectDistanceRange: {
                0: "Unknown",
                1: "Macro",
                2: "Close view",
                3: "Distant view"
            },
            FileSource: {
                3: "DSC"
            },
            ComponentsConfiguration: {
                0: "",
                1: "Y",
                2: "Cb",
                3: "Cr",
                4: "R",
                5: "G",
                6: "B"
            },
            Orientation: {
                1: "top-left",
                2: "top-right",
                3: "bottom-right",
                4: "bottom-left",
                5: "left-top",
                6: "right-top",
                7: "right-bottom",
                8: "left-bottom"
            }
        }, a.ExifMap.prototype.getText = function(a) {
            var b = this.get(a);
            switch (a) {
                case "LightSource":
                case "Flash":
                case "MeteringMode":
                case "ExposureProgram":
                case "SensingMethod":
                case "SceneCaptureType":
                case "SceneType":
                case "CustomRendered":
                case "WhiteBalance":
                case "GainControl":
                case "Contrast":
                case "Saturation":
                case "Sharpness":
                case "SubjectDistanceRange":
                case "FileSource":
                case "Orientation":
                    return this.stringValues[a][b];
                case "ExifVersion":
                case "FlashpixVersion":
                    return String.fromCharCode(b[0], b[1], b[2], b[3]);
                case "ComponentsConfiguration":
                    return this.stringValues[a][b[0]] + this.stringValues[a][b[1]] + this.stringValues[a][b[2]] + this.stringValues[a][b[3]];
                case "GPSVersionID":
                    return b[0] + "." + b[1] + "." + b[2] + "." + b[3]
            }
            return String(b)
        },
        function(a) {
            var b, c = a.tags,
                d = a.map;
            for (b in c) c.hasOwnProperty(b) && (d[c[b]] = b)
        }(a.ExifMap.prototype), a.ExifMap.prototype.getAll = function() {
            var a, b, c = {};
            for (a in this) this.hasOwnProperty(a) && (b = this.tags[a], b && (c[b] = this.getText(b)));
            return c
        }
});

/*
 * JavaScript Canvas to Blob 2.0.5
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on stackoverflow user Stoive's code snippet:
 * http://stackoverflow.com/q/4998908
 */

/*jslint nomen: true, regexp: true */
/*global window, atob, Blob, ArrayBuffer, Uint8Array, define */

(function (window) {
    'use strict';
    var CanvasPrototype = window.HTMLCanvasElement &&
            window.HTMLCanvasElement.prototype,
        hasBlobConstructor = window.Blob && (function () {
            try {
                return Boolean(new Blob());
            } catch (e) {
                return false;
            }
        }()),
        hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array &&
            (function () {
                try {
                    return new Blob([new Uint8Array(100)]).size === 100;
                } catch (e) {
                    return false;
                }
            }()),
        BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
            window.MozBlobBuilder || window.MSBlobBuilder,
        dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob &&
            window.ArrayBuffer && window.Uint8Array && function (dataURI) {
                var byteString,
                    arrayBuffer,
                    intArray,
                    i,
                    mimeString,
                    bb;
                if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                    // Convert base64 to raw binary data held in a string:
                    byteString = atob(dataURI.split(',')[1]);
                } else {
                    // Convert base64/URLEncoded data component to raw binary data:
                    byteString = decodeURIComponent(dataURI.split(',')[1]);
                }
                // Write the bytes of the string to an ArrayBuffer:
                arrayBuffer = new ArrayBuffer(byteString.length);
                intArray = new Uint8Array(arrayBuffer);
                for (i = 0; i < byteString.length; i += 1) {
                    intArray[i] = byteString.charCodeAt(i);
                }
                // Separate out the mime component:
                mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                // Write the ArrayBuffer (or ArrayBufferView) to a blob:
                if (hasBlobConstructor) {
                    return new Blob(
                        [hasArrayBufferViewSupport ? intArray : arrayBuffer],
                        {type: mimeString}
                    );
                }
                bb = new BlobBuilder();
                bb.append(arrayBuffer);
                return bb.getBlob(mimeString);
            };
    if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
        if (CanvasPrototype.mozGetAsFile) {
            CanvasPrototype.toBlob = function (callback, type, quality) {
                if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
                    callback(dataURLtoBlob(this.toDataURL(type, quality)));
                } else {
                    callback(this.mozGetAsFile('blob', type));
                }
            };
        } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
            CanvasPrototype.toBlob = function (callback, type, quality) {
                callback(dataURLtoBlob(this.toDataURL(type, quality)));
            };
        }
    }
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return dataURLtoBlob;
        });
    } else {
        window.dataURLtoBlob = dataURLtoBlob;
    }
}(window));

/*
 * jQuery Iframe Transport Plugin 1.8.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts four additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    // options.initialIframeSrc: the URL of the initial iframe src,
    //  by default set to "javascript:false;"
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            // javascript:false as initial iframe src
            // prevents warning popups on HTTPS in IE6:
            /*jshint scripturl: true */
            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',
            /*jshint scripturl: false */
                form,
                iframe,
                addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $(
                        '<iframe src="' + initialIframeSrc +
                            '" name="iframe-transport-' + counter + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="' + initialIframeSrc + '"></iframe>')
                                    .appendTo(form);
                                window.setTimeout(function () {
                                    // Removing the form in a setTimeout call
                                    // allows Chrome's developer tools to display
                                    // the response result
                                    form.remove();
                                }, 0);
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                            // Remove the HTML5 form attribute from the input(s):
                            options.fileInput.removeAttr('form');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                // Restore the original name and form properties:
                                $(input)
                                    .prop('name', clone.prop('name'))
                                    .attr('form', clone.attr('form'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', initialIframeSrc);
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc :
                        $.parseXML((xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml) ||
                            $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));

/*
 * jQuery File Upload Plugin 5.40.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, window, document, location, Blob, FormData */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default the complete document.
            // Set to null to disable paste support:
            pasteZone: $(document),
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).pipe(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).pipe(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    this._sequence = this._sequence.pipe(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (limitSize && (!filesLength || files[0].size === undefined)) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (input) {
            var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                dirReader;
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                dirReader.readEntries(function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                }, errorHandler);
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data.fileInput);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        'dragover',
                        $.Event('dragover', {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                dataTransfer.dropEffect = 'copy';
            }
        },

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options,
                clone = $(this.element[0].cloneNode(false));
            // Initialize options set via HTML5 data-attributes:
            $.each(
                clone.data(),
                function (key, value) {
                    var dataAttributeName = 'data-' +
                        // Convert camelCase to hyphen-ated key:
                        key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                    if (clone.attr(dataAttributeName)) {
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data).then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));

/*
 * jQuery File Upload Processing Plugin 1.3.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {
    'use strict';

    var originalAdd = $.blueimp.fileupload.prototype.options.add;

    // The File Upload Processing plugin extends the fileupload widget
    // with file processing functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The list of processing actions:
            processQueue: [
                /*
                {
                    action: 'log',
                    type: 'debug'
                }
                */
            ],
            add: function (e, data) {
                var $this = $(this);
                data.process(function () {
                    return $this.fileupload('process', data);
                });
                originalAdd.call(this, e, data);
            }
        },

        processActions: {
            /*
            log: function (data, options) {
                console[options.type](
                    'Processing "' + data.files[data.index].name + '"'
                );
            }
            */
        },

        _processFile: function (data, originalData) {
            var that = this,
                dfd = $.Deferred().resolveWith(that, [data]),
                chain = dfd.promise();
            this._trigger('process', null, data);
            $.each(data.processQueue, function (i, settings) {
                var func = function (data) {
                    if (originalData.errorThrown) {
                        return $.Deferred()
                                .rejectWith(that, [originalData]).promise();
                    }
                    return that.processActions[settings.action].call(
                        that,
                        data,
                        settings
                    );
                };
                chain = chain.pipe(func, settings.always && func);
            });
            chain
                .done(function () {
                    that._trigger('processdone', null, data);
                    that._trigger('processalways', null, data);
                })
                .fail(function () {
                    that._trigger('processfail', null, data);
                    that._trigger('processalways', null, data);
                });
            return chain;
        },

        // Replaces the settings of each processQueue item that
        // are strings starting with an "@", using the remaining
        // substring as key for the option map,
        // e.g. "@autoUpload" is replaced with options.autoUpload:
        _transformProcessQueue: function (options) {
            var processQueue = [];
            $.each(options.processQueue, function () {
                var settings = {},
                    action = this.action,
                    prefix = this.prefix === true ? action : this.prefix;
                $.each(this, function (key, value) {
                    if ($.type(value) === 'string' &&
                            value.charAt(0) === '@') {
                        settings[key] = options[
                            value.slice(1) || (prefix ? prefix +
                                key.charAt(0).toUpperCase() + key.slice(1) : key)
                        ];
                    } else {
                        settings[key] = value;
                    }

                });
                processQueue.push(settings);
            });
            options.processQueue = processQueue;
        },

        // Returns the number of files currently in the processsing queue:
        processing: function () {
            return this._processing;
        },

        // Processes the files given as files property of the data parameter,
        // returns a Promise object that allows to bind callbacks:
        process: function (data) {
            var that = this,
                options = $.extend({}, this.options, data);
            if (options.processQueue && options.processQueue.length) {
                this._transformProcessQueue(options);
                if (this._processing === 0) {
                    this._trigger('processstart');
                }
                $.each(data.files, function (index) {
                    var opts = index ? $.extend({}, options) : options,
                        func = function () {
                            if (data.errorThrown) {
                                return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                            }
                            return that._processFile(opts, data);
                        };
                    opts.index = index;
                    that._processing += 1;
                    that._processingQueue = that._processingQueue.pipe(func, func)
                        .always(function () {
                            that._processing -= 1;
                            if (that._processing === 0) {
                                that._trigger('processstop');
                            }
                        });
                });
            }
            return this._processingQueue;
        },

        _create: function () {
            this._super();
            this._processing = 0;
            this._processingQueue = $.Deferred().resolveWith(this)
                .promise();
        }

    });

}));

/*
 * jQuery File Upload Image Preview & Resize Plugin 1.7.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, window, Blob */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'load-image',
            'load-image-meta',
            'load-image-exif',
            'load-image-ios',
            'canvas-to-blob',
            './jquery.fileupload-process'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadImageMetaData',
            disableImageHead: '@',
            disableExif: '@',
            disableExifThumbnail: '@',
            disableExifSub: '@',
            disableExifGps: '@',
            disabled: '@disableImageMetaDataLoad'
        },
        {
            action: 'loadImage',
            // Use the action as prefix for the "@" options:
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            noRevoke: '@',
            disabled: '@disableImageLoad'
        },
        {
            action: 'resizeImage',
            // Use "image" as prefix for the "@" options:
            prefix: 'image',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            forceResize: '@',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImage',
            quality: '@imageQuality',
            type: '@imageType',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImageMetaData',
            disabled: '@disableImageMetaDataSave'
        },
        {
            action: 'resizeImage',
            // Use "preview" as prefix for the "@" options:
            prefix: 'preview',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            thumbnail: '@',
            canvas: '@',
            disabled: '@disableImagePreview'
        },
        {
            action: 'setImage',
            name: '@imagePreviewName',
            disabled: '@disableImagePreview'
        },
        {
            action: 'deleteImageReferences',
            disabled: '@disableImageReferencesDeletion'
        }
    );

    // The File Upload Resize plugin extends the fileupload widget
    // with image resize functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The regular expression for the types of images to load:
            // matched against the file type:
            loadImageFileTypes: /^image\/(gif|jpeg|png|svg\+xml)$/,
            // The maximum file size of images to load:
            loadImageMaxFileSize: 10000000, // 10MB
            // The maximum width of resized images:
            imageMaxWidth: 1920,
            // The maximum height of resized images:
            imageMaxHeight: 1080,
            // Defines the image orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            imageOrientation: false,
            // Define if resized images should be cropped or only scaled:
            imageCrop: false,
            // Disable the resize image functionality by default:
            disableImageResize: true,
            // The maximum width of the preview images:
            previewMaxWidth: 80,
            // The maximum height of the preview images:
            previewMaxHeight: 80,
            // Defines the preview orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            previewOrientation: true,
            // Create the preview using the Exif data thumbnail:
            previewThumbnail: true,
            // Define if preview images should be cropped or only scaled:
            previewCrop: false,
            // Define if preview images should be resized as canvas elements:
            previewCanvas: true
        },

        processActions: {

            // Loads the image given via data.files and data.index
            // as img element, if the browser supports the File API.
            // Accepts the options fileTypes (regular expression)
            // and maxFileSize (integer) to limit the files to load:
            loadImage: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (($.type(options.maxFileSize) === 'number' &&
                            file.size > options.maxFileSize) ||
                        (options.fileTypes &&
                            !options.fileTypes.test(file.type)) ||
                        !loadImage(
                            file,
                            function (img) {
                                if (img.src) {
                                    data.img = img;
                                }
                                dfd.resolveWith(that, [data]);
                            },
                            options
                        )) {
                    return data;
                }
                return dfd.promise();
            },

            // Resizes the image given as data.canvas or data.img
            // and updates data.canvas or data.img with the resized image.
            // Also stores the resized image as preview property.
            // Accepts the options maxWidth, maxHeight, minWidth,
            // minHeight, canvas and crop:
            resizeImage: function (data, options) {
                if (options.disabled || !(data.canvas || data.img)) {
                    return data;
                }
                options = $.extend({canvas: true}, options);
                var that = this,
                    dfd = $.Deferred(),
                    img = (options.canvas && data.canvas) || data.img,
                    resolve = function (newImg) {
                        if (newImg && (newImg.width !== img.width ||
                                newImg.height !== img.height ||
                                options.forceResize)) {
                            data[newImg.getContext ? 'canvas' : 'img'] = newImg;
                        }
                        data.preview = newImg;
                        dfd.resolveWith(that, [data]);
                    },
                    thumbnail;
                if (data.exif) {
                    if (options.orientation === true) {
                        options.orientation = data.exif.get('Orientation');
                    }
                    if (options.thumbnail) {
                        thumbnail = data.exif.get('Thumbnail');
                        if (thumbnail) {
                            loadImage(thumbnail, resolve, options);
                            return dfd.promise();
                        }
                    }
                }
                if (img) {
                    resolve(loadImage.scale(img, options));
                    return dfd.promise();
                }
                return data;
            },

            // Saves the processed image given as data.canvas
            // inplace at data.index of data.files:
            saveImage: function (data, options) {
                if (!data.canvas || options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (data.canvas.toBlob) {
                    data.canvas.toBlob(
                        function (blob) {
                            if (!blob.name) {
                                if (file.type === blob.type) {
                                    blob.name = file.name;
                                } else if (file.name) {
                                    blob.name = file.name.replace(
                                        /\..+$/,
                                        '.' + blob.type.substr(6)
                                    );
                                }
                            }
                            // Don't restore invalid meta data:
                            if (file.type !== blob.type) {
                                delete data.imageHead;
                            }
                            // Store the created blob at the position
                            // of the original file in the files list:
                            data.files[data.index] = blob;
                            dfd.resolveWith(that, [data]);
                        },
                        options.type || file.type,
                        options.quality
                    );
                } else {
                    return data;
                }
                return dfd.promise();
            },

            loadImageMetaData: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    dfd = $.Deferred();
                loadImage.parseMetaData(data.files[data.index], function (result) {
                    $.extend(data, result);
                    dfd.resolveWith(that, [data]);
                }, options);
                return dfd.promise();
            },

            saveImageMetaData: function (data, options) {
                if (!(data.imageHead && data.canvas &&
                        data.canvas.toBlob && !options.disabled)) {
                    return data;
                }
                var file = data.files[data.index],
                    blob = new Blob([
                        data.imageHead,
                        // Resized images always have a head size of 20 bytes,
                        // including the JPEG marker and a minimal JFIF header:
                        this._blobSlice.call(file, 20)
                    ], {type: file.type});
                blob.name = file.name;
                data.files[data.index] = blob;
                return data;
            },

            // Sets the resized version of the image as a property of the
            // file object, must be called after "saveImage":
            setImage: function (data, options) {
                if (data.preview && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.preview;
                }
                return data;
            },

            deleteImageReferences: function (data, options) {
                if (!options.disabled) {
                    delete data.img;
                    delete data.canvas;
                    delete data.preview;
                    delete data.imageHead;
                }
                return data;
            }

        }

    });

}));

/*
 * jQuery File Upload Video Preview Plugin 1.0.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'load-image',
            './jquery.fileupload-process'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadVideo',
            // Use the action as prefix for the "@" options:
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            disabled: '@disableVideoPreview'
        },
        {
            action: 'setVideo',
            name: '@videoPreviewName',
            disabled: '@disableVideoPreview'
        }
    );

    // The File Upload Video Preview plugin extends the fileupload widget
    // with video preview functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The regular expression for the types of video files to load,
            // matched against the file type:
            loadVideoFileTypes: /^video\/.*$/
        },

        _videoElement: document.createElement('video'),

        processActions: {

            // Loads the video file given via data.files and data.index
            // as video element if the browser supports playing it.
            // Accepts the options fileTypes (regular expression)
            // and maxFileSize (integer) to limit the files to load:
            loadVideo: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var file = data.files[data.index],
                    url,
                    video;
                if (this._videoElement.canPlayType &&
                        this._videoElement.canPlayType(file.type) &&
                        ($.type(options.maxFileSize) !== 'number' ||
                            file.size <= options.maxFileSize) &&
                        (!options.fileTypes ||
                            options.fileTypes.test(file.type))) {
                    url = loadImage.createObjectURL(file);
                    if (url) {
                        video = this._videoElement.cloneNode(false);
                        video.src = url;
                        video.controls = true;
                        data.video = video;
                        return data;
                    }
                }
                return data;
            },

            // Sets the video element as a property of the file object:
            setVideo: function (data, options) {
                if (data.video && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.video;
                }
                return data;
            }

        }

    });

}));

/*
 * jQuery File Upload Validation Plugin 1.1.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload-process'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {
    'use strict';

    // Append to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.push(
        {
            action: 'validate',
            // Always trigger this action,
            // even if the previous action was rejected: 
            always: true,
            // Options taken from the global options map:
            acceptFileTypes: '@',
            maxFileSize: '@',
            minFileSize: '@',
            maxNumberOfFiles: '@',
            disabled: '@disableValidation'
        }
    );

    // The File Upload Validation plugin extends the fileupload widget
    // with file validation functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            /*
            // The regular expression for allowed file types, matches
            // against either file type or file name:
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            // The maximum allowed file size in bytes:
            maxFileSize: 10000000, // 10 MB
            // The minimum allowed file size in bytes:
            minFileSize: undefined, // No minimal file size
            // The limit of files to be uploaded:
            maxNumberOfFiles: 10,
            */

            // Function returning the current number of files,
            // has to be overriden for maxNumberOfFiles validation:
            getNumberOfFiles: $.noop,

            // Error and info messages:
            messages: {
                maxNumberOfFiles: 'Maximum number of files exceeded',
                acceptFileTypes: 'File type not allowed',
                maxFileSize: 'File is too large',
                minFileSize: 'File is too small'
            }
        },

        processActions: {

            validate: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var dfd = $.Deferred(),
                    settings = this.options,
                    file = data.files[data.index],
                    fileSize;
                if (options.minFileSize || options.maxFileSize) {
                    fileSize = file.size;
                }
                if ($.type(options.maxNumberOfFiles) === 'number' &&
                        (settings.getNumberOfFiles() || 0) + data.files.length >
                            options.maxNumberOfFiles) {
                    file.error = settings.i18n('maxNumberOfFiles');
                } else if (options.acceptFileTypes &&
                        !(options.acceptFileTypes.test(file.type) ||
                        options.acceptFileTypes.test(file.name))) {
                    file.error = settings.i18n('acceptFileTypes');
                } else if (fileSize > options.maxFileSize) {
                    file.error = settings.i18n('maxFileSize');
                } else if ($.type(fileSize) === 'number' &&
                        fileSize < options.minFileSize) {
                    file.error = settings.i18n('minFileSize');
                } else {
                    delete file.error;
                }
                if (file.error || data.files.error) {
                    data.files.error = true;
                    dfd.rejectWith(this, [data]);
                } else {
                    dfd.resolveWith(this, [data]);
                }
                return dfd.promise();
            }

        }

    });

}));
