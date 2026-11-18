#!/usr/bin/env python3
import struct
import sys
import zipfile


def align_extra(offset, name_length):
    base = (-(offset + 30 + name_length)) % 4
    length = base if base >= 4 else base + 4
    return struct.pack("<HH", 0xD935, length - 4) + b"\0" * (length - 4)


def copy_entry(zin, zout, info, data, align):
    out = zipfile.ZipInfo(info.filename, info.date_time)
    out.compress_type = info.compress_type
    out.external_attr = info.external_attr
    out.internal_attr = info.internal_attr
    out.create_system = info.create_system
    out.comment = info.comment
    out.extra = align_extra(zout.fp.tell(), len(info.filename)) if align else b""
    zout.writestr(out, data)


def main():
    unsigned, dex_path, output = sys.argv[1:4]
    with zipfile.ZipFile(unsigned) as zin, zipfile.ZipFile(output, "w") as zout:
        for info in zin.infolist():
            copy_entry(zin, zout, info, zin.read(info.filename),
                       info.compress_type == zipfile.ZIP_STORED)

        name = "classes.dex"
        with open(dex_path, "rb") as fh:
            dex = fh.read()
        out = zipfile.ZipInfo(name, (2026, 1, 1, 0, 0, 0))
        out.compress_type = zipfile.ZIP_STORED
        out.external_attr = 0o644 << 16
        out.extra = align_extra(zout.fp.tell(), len(name))
        zout.writestr(out, dex)


if __name__ == "__main__":
    main()
