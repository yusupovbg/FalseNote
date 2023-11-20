import { NextRequest, NextResponse } from "next/server";
const AWS = require('aws-sdk');

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData(); 
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file provided' })
  }
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer. from(bytes)

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

  // Extract postId and authorId from searchParams
  const postId = req.nextUrl.searchParams.get("postId");
  const authorId = req.nextUrl.searchParams.get("authorId");

  console.log(postId, authorId);

  if (!postId || !authorId) {
    return NextResponse.json({ success: false, message: 'postId and authorId are required query parameters' });
  }

  const s3 = new AWS.S3();
  const s3path = `blogs/covers/${authorId}/${postId}.${file.name.split('.').pop()}`;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: s3path,
    Body: buffer,
  };

  const url = `https://s3.${process.env.REGION}.amazonaws.com/${process.env.BUCKET_NAME}/${s3path}`;

  s3.upload(params, function (err: any, data: any) {
    if (err) {
      console.log('error in callback');
      console.log(err);
    }
    // console.log('success');
    // console.log(data);
  });

  return NextResponse.json({ success: true, message: 'File uploaded', data: { url } })
  } catch (error : any) {
    return NextResponse.json({ success: false, message: error.message })
  }
}