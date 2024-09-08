describe('Video API Tests', () => {

    it('deletes video', () => {

        cy.fixture('videoInfo').then((data) => {
            cy.uploadVideo(data);
    });
  });
});