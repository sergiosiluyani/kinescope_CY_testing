describe('Verify the video is uploaded', () => {

    // Block unwanted requests before each test
    beforeEach(() => {
      cy.blockAllRequests();
    });
  
    it('verifies the video is uploaded', () => {

      //Step 1: login to page
        cy.fixture('login').then((credentials) => {
          cy.login(credentials);  // Assuming cy.login() is a custom command
        });
        
      
        // Step 2: user visits the page where the video is uploaded
        cy.visit('https://app.kinescope.io/video');

        cy.getFolder();
        
        // Step 3: user verifies the video with the correct title is present
        cy.fixture('updatedVideoInfo').then((data) => {
          // Ensure the updated title exists
          expect(data).to.have.property('updatedTitle');
          const updatedTitle = data.updatedTitle;

        cy.contains(updatedTitle).should('be.visible');
        cy.log(`The video with the updated title "${updatedTitle}" has successfully appeared on the page.`);


  });

});
});