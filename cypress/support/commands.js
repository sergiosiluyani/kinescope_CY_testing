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
        const videoId = response.body.data.id;
        cy.log('Latest Video ID:', videoId);
  
        // Save videoId to a fixture file
        cy.writeFile('cypress/fixtures/videoId.json', { videoId });
      });
    });
  });

  Cypress.Commands.add('updateVideo', ({ newTitle, newDescription, privacyType, privacyDomains, additionalMaterialsEnabled, tags }) => {
    cy.fixture('videoInfo').then(({ uploadToken }) => {
      cy.fixture('videoId').then(({ videoId }) => {
        cy.request({
          method: 'PATCH',
          url: `https://api.kinescope.io/v1/videos/${videoId}`,
          headers: {
            Authorization: `Bearer ${uploadToken}`,
            'Content-Type': 'application/json'
          },
          body: {
            title: newTitle,
            description: newDescription,
            privacy_type: privacyType,
            privacy_domains: privacyDomains,
            additional_materials_enabled: additionalMaterialsEnabled,
            tags: tags
          },
          failOnStatusCode: false
        }).then((response) => {
          if (response.status === 200) {
            cy.log('Video updated successfully:', response.body);
          } else {
            cy.log('Failed to update video:', response.body);
          }
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
          if (response.status === 204) {
            cy.log('Video deleted successfully');
          } else {
            cy.log('Failed to delete video:', response.body);
          }
        });
      });
    });
  });
  