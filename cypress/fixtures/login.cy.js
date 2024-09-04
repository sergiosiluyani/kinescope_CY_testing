describe('Login Test for Kinescope', () => {
    it('should log in successfully with valid credentials', () => {
      // Visit the Kinescope login page
      cy.visit('https://app.kinescope.io/');
      cy.get('input[placeholder="Почта"]').type('sergeysiluyanov@yandex.ru');
      cy.get('input[placeholder="Пароль"]').type('Ss09011992Af!');
      cy.get('button[type="submit"]').click();
    });
  });