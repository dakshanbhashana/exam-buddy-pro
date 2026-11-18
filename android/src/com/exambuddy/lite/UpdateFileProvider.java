package com.exambuddy.lite;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import android.provider.OpenableColumns;

import java.io.File;
import java.io.FileNotFoundException;

public class UpdateFileProvider extends ContentProvider {
    public static final String AUTHORITY = "com.exambuddy.lite.updates";
    public static final String FILE_NAME = "exam-buddy-update.apk";

    public static Uri uri() {
        return Uri.parse("content://" + AUTHORITY + "/" + FILE_NAME);
    }

    private File updateFile() {
        File dir = getContext() == null ? null : getContext().getExternalFilesDir(null);
        return dir == null ? null : new File(dir, FILE_NAME);
    }

    @Override
    public boolean onCreate() {
        return true;
    }

    @Override
    public ParcelFileDescriptor openFile(Uri uri, String mode) throws FileNotFoundException {
        if (uri == null || !FILE_NAME.equals(uri.getLastPathSegment())) {
            throw new FileNotFoundException("Unknown update file");
        }
        File file = updateFile();
        if (file == null || !file.isFile() || file.length() <= 0) {
            throw new FileNotFoundException("Update file not found");
        }
        return ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
                        String[] selectionArgs, String sortOrder) {
        File file = updateFile();
        if (file == null || !file.isFile()) return null;
        String[] columns = projection != null ? projection :
                new String[]{OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE};
        MatrixCursor cursor = new MatrixCursor(columns, 1);
        Object[] row = new Object[columns.length];
        for (int i = 0; i < columns.length; i += 1) {
            if (OpenableColumns.DISPLAY_NAME.equals(columns[i])) {
                row[i] = FILE_NAME;
            } else if (OpenableColumns.SIZE.equals(columns[i])) {
                row[i] = file.length();
            } else {
                row[i] = null;
            }
        }
        cursor.addRow(row);
        return cursor;
    }

    @Override
    public String getType(Uri uri) {
        return "application/vnd.android.package-archive";
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        return null;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        return 0;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
        return 0;
    }
}
