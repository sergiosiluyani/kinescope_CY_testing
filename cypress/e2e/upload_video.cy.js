describe('verify the video is uploaded', () => {
    
    // Block unwanted requests before each test
    beforeEach(() => {
        // Block unwanted requests before the tests
        cy.blockAllRequests();
      });

    it('login first', () => {
        cy.login(); // Call the custom login command
        
        // Upload the video with the specified parameters
        cy.uploadVideo('Jellyfish_1080_10s_5MB.mp4', 'cypress/fixtures', 'test_name', 'test_description', 'f38a59fa-0957-4de7-ae66-a3de1fbbeff2');
    });
});