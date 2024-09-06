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
  
      
      cy.fixture('videoInfo.json').then((videoInfo) => {
      
        // Step 2: Visit the page where the video is uploaded
        cy.visit('https://app.kinescope.io/video');

        cy.getFolder();
        
        // Step 3: Verify the video with the correct title is present
        cy.contains(videoInfo.videoTitle).should('be.visible');

        cy.log(`The video "${videoInfo.videoTitle}" has successfully appeared on the page.`)
        
        // You can also verify the presence of other elements related to the video, if needed
        // For example, checking the description
        //cy.contains(videoInfo.videoDescription).should('be.visible');
    });
  });

});