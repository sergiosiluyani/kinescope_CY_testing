describe('Video Upload Tests', () => {
    it('should upload the video file', () => {
      const videoFileName = 'Jellyfish_1080_10s_5MB.mp4';
      const fixturePath = 'cypress/fixtures';
  
      // Use the custom command to upload the video
      cy.uploadVideo(videoFileName, fixturePath);
    });
  });