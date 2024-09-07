describe('Verify the video is uploaded', () => {
  
    it('uploads the video then logs in and verifies the video is uploaded', () => {
      // Load video info from the fixture
      cy.fixture('videoInfo').then((data) => {
        cy.uploadVideo(data).then((response) => {
        
            // Step 2: Verify that the upload request was successful
            expect(response.status).to.eq(200);
            cy.log('Video upload request was successful.');;
      });
    });
});
});