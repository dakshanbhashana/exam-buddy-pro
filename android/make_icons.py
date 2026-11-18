#!/usr/bin/env python3
import os
import struct
import zlib

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "res")
SIZES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}
SS = 3
RADIUS = 0.22
START = (127, 16, 52)
END = (225, 29, 72)


def lerp(a, b, t):
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def inside_round_rect(x, y):
    r = RADIUS
    cx = min(max(x, r), 1.0 - r)
    cy = min(max(y, r), 1.0 - r)
    return (x - cx) ** 2 + (y - cy) ** 2 <= r * r


def inside_letter(x, y):
    if not (0.30 <= y <= 0.70):
        return False
    if 0.33 <= x <= 0.41:
        return True
    if x > 0.64:
        return False
    return any(lo <= y <= hi for lo, hi in ((0.30, 0.37), (0.485, 0.555), (0.63, 0.70)))


def chunk(tag, data):
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def make_icon(size):
    rows = []
    for py in range(size):
        row = bytearray()
        for px in range(size):
            r = g = b = a = 0
            for sy in range(SS):
                for sx in range(SS):
                    x = (px + (sx + 0.5) / SS) / size
                    y = (py + (sy + 0.5) / SS) / size
                    if not inside_round_rect(x, y):
                        continue
                    cr, cg, cb = lerp(START, END, min(1.0, max(0.0, (x + y) / 2)))
                    if inside_letter(x, y):
                        cr, cg, cb = 255, 255, 255
                    r += cr
                    g += cg
                    b += cb
                    a += 255
            n = SS * SS
            if a:
                r, g, b = r // (a // 255), g // (a // 255), b // (a // 255)
            row += bytes((r, g, b, a // n))
        rows.append(bytes(row))
    raw = b"".join(b"\x00" + row for row in rows)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    return (b"\x89PNG\r\n\x1a\n"
            + chunk(b"IHDR", ihdr)
            + chunk(b"IDAT", zlib.compress(raw, 9))
            + chunk(b"IEND", b""))


for folder, size in SIZES.items():
    target = os.path.join(OUT, folder)
    os.makedirs(target, exist_ok=True)
    with open(os.path.join(target, "ic_launcher.png"), "wb") as fh:
        fh.write(make_icon(size))
    print(folder, size)
