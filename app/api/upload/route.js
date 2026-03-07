import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// POST /api/upload - Upload review photos
export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');
    const entityType = formData.get('entityType');
    const entityId = formData.get('entityId');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { ok: false, message: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate file count
    if (files.length > 5) {
      return NextResponse.json(
        { ok: false, message: 'Maximum 5 files allowed' },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'reviews');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadedFiles = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { ok: false, message: 'Only image files are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { ok: false, message: 'File size must be less than 5MB' },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2);
      const filename = `${timestamp}-${randomString}-${file.name}`;
      const filepath = join(uploadDir, filename);

      // Write file
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filepath, buffer);

      // Return public URL
      const publicUrl = `/uploads/reviews/${filename}`;
      uploadedFiles.push({
        url: publicUrl,
        name: file.name,
        size: file.size,
        type: file.type
      });
    }

    return NextResponse.json({
      ok: true,
      files: uploadedFiles,
      message: 'Files uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

// DELETE /api/upload - Delete uploaded file
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { ok: false, message: 'Filename is required' },
        { status: 400 }
      );
    }

    // Security check - ensure file is in uploads directory
    if (!filename.startsWith('/uploads/reviews/')) {
      return NextResponse.json(
        { ok: false, message: 'Invalid file path' },
        { status: 400 }
      );
    }

    const filepath = join(process.cwd(), 'public', filename);

    // Check if file exists
    if (!existsSync(filepath)) {
      return NextResponse.json(
        { ok: false, message: 'File not found' },
        { status: 404 }
      );
    }

    // Delete file
    await unlink(filepath);

    return NextResponse.json({
      ok: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete file error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
