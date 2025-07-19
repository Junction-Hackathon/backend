
# Kafka Topics and Payloads

This document outlines the Kafka topics used in the application and the expected payloads for each.

## Video Processing

### `video.start.process`

- **Direction:** Emitted
- **Emitted By:** `FileProcessor` in `src/queue/file/file.processor.ts`
- **Consumed By:** AI Video Processor
- **Description:**  Triggered when a video is successfully uploaded to Cloudinary. This event initiates the AI video processing workflow.
- **Payload:**
  ```json
  {
    "message": "Video Uploaded succefully",
    "videoMetadata": {
      // Data returned from cloudinaryService.uploadImage
    },
    "donor": {
      // Donor information from the job data
    },
    "slayer": {
      // Slayer information from the job data
    },
    "year": "string"
  }
  ```

### `video.process.done`

- **Direction:** Consumed
- **Emitted By:** AI Video Processor
- **Consumed By:** `AiVideoProcessorHandler` in `src/ai-video-processor/ai-video-upload.ts`
- **Description:**  Published when the AI has finished processing the video.
- **Payload (`videoDoneProcessingDto`):**
  ```json
  {
    "videoId": "string",
    "blurUrl": "string",
    "enhancedUrl": "string"
  }
  ```

### `video.process.error`

- **Direction:** Consumed
- **Emitted By:** AI Video Processor
- **Consumed By:** `AiVideoProcessorHandler` in `src/ai-video-processor/ai-video-upload.ts`
- **Description:**  Published when an error occurs during video processing.
- **Payload:**
  The full Kafka message context (`KafkaContext`).

## Notifications

### `notification.send`

- **Direction:** Emitted
- **Emitted By:** `AiVideoProcessorHandler` in `src/ai-video-processor/ai-video-upload.ts`
- **Consumed By:** Notification Service (presumably)
- **Description:**  Sent after a video has been successfully processed to notify the user.
- **Payload:**
  ```json
  {
    // TODO: Fill payload later
  }
  ```
