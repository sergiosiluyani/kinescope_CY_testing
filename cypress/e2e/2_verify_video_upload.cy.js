describe('Verify the video is uploaded', () => {

    // Block unwanted requests before each test
    beforeEach(() => {
      cy.blockAllRequests();
    });
  
    it('verifies the video is uploaded', () => {
      
        // Step 1: user visits the page where the video is uploaded
        cy.visit('https://app.kinescope.io/video');

        cy.getFolder();
        
        // Step 2: user verifies the video with the correct title is present
        cy.contains(videoInfo.videoTitle).should('be.visible');

        cy.log(`The video "${videoInfo.videoTitle}" has successfully appeared on the page.`);

        cy.get('button').contains('Дата загрузки').click();

        cy.wait(1000);

        // Step 3: Find and verify the upload date is not empty
        cy.get('div._1hx3amt')
        .invoke('text')
        .should('not.be.empty')
        .then((text) => {
          cy.log('The upload date is present and not empty.');
        
    });
  });

});