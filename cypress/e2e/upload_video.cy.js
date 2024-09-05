describe('Verify the video is uploaded', () => {

    // Block unwanted requests before each test
    beforeEach(() => {
      cy.blockAllRequests();
    });
  
    it('uploads the video then logs in and verifies the video is uploaded', () => {
      // Load video info from the fixture
      cy.fixture('videoInfo').then((data) => {
        cy.uploadVideo(data);
      });
  
      cy.login(); 
    });
  });