// src/getFile.js
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";

// Helper function to convert a ReadableStream to a string
const streamToString = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
};

export const getFileFromS3 = async (bucketName, fileName) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });
    const response = await s3Client.send(command);

    // Convert the ReadableStream to a string
    const fileContent = await streamToString(response.Body);
    return fileContent;
  } catch (error) {
    console.error("Error getting file from S3:", error);
    return null;
  }
};
