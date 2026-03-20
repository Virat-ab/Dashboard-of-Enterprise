describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('shows the login page', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('Sign In').should('be.visible');
  });

  it('shows error with invalid credentials', () => {
    cy.get('input[type="email"]').clear().type('wrong@email.com');
    cy.get('input[type="password"]').clear().type('wrongpassword');
    cy.contains('button', 'Sign In').click();
    cy.contains('Invalid credentials', { timeout: 3000 }).should('be.visible');
  });

  it('logs in with valid credentials and redirects to dashboard', () => {
    cy.get('input[type="email"]').clear().type('admin@enterprise.com');
    cy.get('input[type="password"]').clear().type('password');
    cy.contains('button', 'Sign In').click();
    cy.url({ timeout: 5000 }).should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('redirects authenticated users away from login', () => {
    // Login first
    cy.get('input[type="email"]').type('admin@enterprise.com');
    cy.get('input[type="password"]').type('password');
    cy.contains('button', 'Sign In').click();
    cy.url().should('include', '/dashboard');

    // Try to go back to login
    cy.visit('/login');
    cy.url().should('include', '/dashboard');
  });
});
