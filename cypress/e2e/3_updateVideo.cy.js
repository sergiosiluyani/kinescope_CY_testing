describe('Video API Tests', () => {

  it('gets the latest video ID', () => {
    // Step 1: Get the latest video ID and save it
    cy.getLatestVideoId();

    // Step 2: Update the video using the saved video ID
    cy.updateVideo({
      newTitle: 'Updated Video Title',
      newDescription: 'Updated Video Description',
      privacyType: 'nowhere',
      privacyDomains: ['example.com'],
      additionalMaterialsEnabled: false,
      tags: ['tag1', 'tag2']

      });
    });
  });