Cypress.Commands.add('login', () => {
    cy.fixture('login').then((login) => {
      
      // Use cy.session() to handle login sessions
        cy.visit('https://app.kinescope.io');
  
        cy.get('input[placeholder="Почта"]').type(login.email);
        cy.get('input[placeholder="Пароль"]').type(login.password);
        cy.get('button[type="submit"]').click();
      });
    });
    
    
    Cypress.Commands.add('getFolder', () => {
          cy.visit('https://app.kinescope.io/video')
          cy.wait(1000)
          cy.get('svg[viewBox="0 0 56 33"]').should('be.visible').click();
          cy.get('svg[viewBox="0 0 56 33"]').trigger('keydown', { keyCode: 13 });
        });



Cypress.Commands.add('uploadVideo', ({ videoFileName, videoPath, videoTitle, videoDescription, parentId, uploadToken }) => {
    // Read the video file as a binary file
    cy.readFile(videoPath, 'binary').then((fileContent) => {
      // Convert binary file
      const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'video/mp4');
  
      // upload the video
      return cy.request({
        method: 'POST',
        url: 'https://uploader.kinescope.io/v2/video',
        headers: {
          Authorization:`Bearer ${uploadToken}`,
          'X-Parent-ID': parentId,
          'X-Video-Title': videoTitle,
          'X-Video-Description': videoDescription,
          'X-File-Name': videoFileName,
          'Content-Type': 'video/mp4'
        },
        body: blob,
        encoding: 'binary',
        failOnStatusCode: false
      }).then((response) => {
        // Check the response
        if (response.status === 200) {
          cy.log('Video uploaded successfully:', response.body);
        }
      });
    });
  });

  // Add this to your Cypress setup (e.g., in your beforeEach or in the main test file)
  Cypress.Commands.add('blockAllRequests', () => {
    cy.intercept('*', (req) => {
      const allowedDomains = ['https://app.kinescope.io']; // Add domains you want to allow
  
      if (!allowedDomains.some(domain => req.url.includes(domain))) {
        req.destroy(); // Block the request
      }
    });
  });

  
Cypress.Commands.add('getLatestVideoId', () => {
  cy.fixture('videoInfo').then(({ uploadToken }) => {
    cy.request({
      method: 'GET',
      url: 'https://api.kinescope.io/v1/videos', // Assuming this is the correct endpoint
      headers: {
        Authorization: `Bearer ${uploadToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.body.data && response.body.data.length > 0) {
        const videoId = response.body.data[0].id; // Accessing the first video's ID in the array
        cy.log('Latest Video ID:', videoId);

        // Save videoId to a fixture file
        cy.writeFile('cypress/fixtures/videoId.json', { videoId });
      } else {
        cy.log('No video data found.');
      }
    });
  });
});

Cypress.Commands.add('updateVideo', (updateData) => {
  cy.fixture('videoId').then(({ videoId }) => {
    cy.fixture('videoInfo').then(({ uploadToken }) => {
      cy.request({
        method: 'PATCH',
        url: `https://api.kinescope.io/v1/videos/${videoId}`,
        headers: {
          Authorization: `Bearer ${uploadToken}`,
        },
        body: {
          title: updateData.newTitle,
          description: updateData.newDescription,
          privacy_type: updateData.privacyType,
          privacy_domains: updateData.privacyDomains,
          additional_materials_enabled: updateData.additionalMaterialsEnabled,
          tags: updateData.tags,
        },
      }).then((response) => {
        // Verify the update was successful
        expect(response.status).to.equal(200);

        // Store the updated title in the fixture file
        cy.writeFile('cypress/fixtures/updatedVideoInfo.json', {
          updatedTitle: updateData.newTitle,
          updatedDescription: updateData.newDescription,
        });
      });
    });
  });
});
  

  Cypress.Commands.add('deleteVideo', () => {
    cy.fixture('videoInfo').then(({ uploadToken }) => {
      cy.fixture('videoId').then(({ videoId }) => {
        cy.request({
          method: 'DELETE',
          url: `https://api.kinescope.io/v1/videos/${videoId}`,
          headers: {
            Authorization: `Bearer ${uploadToken}`
          },
          failOnStatusCode: false
        }).then((response) => {
          if (response.status === 200) {
            cy.log('Video deleted successfully');
          } else {
            cy.log('Failed to delete video:', response.body);
          }
        });
      });
    });
  });
  