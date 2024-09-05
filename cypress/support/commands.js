Cypress.Commands.add('login', () => {
    cy.fixture('login').then((login) => {
      
      // Use cy.session() to handle login sessions
        cy.visit('https://app.kinescope.io');
  
        cy.get('input[placeholder="Почта"]').type(login.email);
        cy.get('input[placeholder="Пароль"]').type(login.password);
        cy.get('button[type="submit"]').click();
      });
    });


  Cypress.Commands.add('uploadVideo', (videoFileName, fixturePath) => {
    // Load the headers from the fixture file
    cy.fixture('headers').then((headers) => {
      const videoFilePath = `${fixturePath}/${videoFileName}`;
  
      // Read the video file as a binary file
      cy.readFile(videoFilePath, 'binary').then((fileContent) => {
        // Convert binary file content into a Blob
        const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'video/mp4');
  
        // Send the request to upload the video
        return cy.request({
          method: 'POST',
          url: 'https://uploader.kinescope.io/v2/video',
          headers: {
            Authorization: headers.Authorization,
            'X-Parent-ID': headers['X-Parent-ID'],
            'X-Video-Title': headers['X-Video-Title'],
            'X-Video-Description': headers['X-Video-Description'],
            'X-File-Name': headers['X-File-Name'],
            'Content-Type': 'video/mp4' // Correctly set the content type
          },
          body: blob, // Send as raw binary
          encoding: 'binary', // Ensure the binary encoding
          failOnStatusCode: false // Handle unsuccessful responses
        }).then((response) => {
          // Log and check the response
          if (response.status === 200) {
            cy.log('Video uploaded successfully:', response.body);
          } else {
            cy.log(`Upload failed: ${response.status} - ${response.body}`);
          }
        });
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
