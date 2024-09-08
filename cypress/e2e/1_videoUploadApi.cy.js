describe('Video API Tests', () => {

    it('uploads the video', () => {

        cy.fixture('videoInfo').then((data) => {
            cy.uploadVideo(data);
    });
  });
});