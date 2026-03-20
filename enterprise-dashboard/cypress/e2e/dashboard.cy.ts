describe('Dashboard', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login');
    cy.get('input[type="email"]').type('admin@enterprise.com');
    cy.get('input[type="password"]').type('password');
    cy.contains('button', 'Sign In').click();
    cy.url({ timeout: 5000 }).should('include', '/dashboard');
  });

  it('renders metric cards', () => {
    cy.contains('Total Revenue', { timeout: 5000 }).should('be.visible');
    cy.contains('Active Users').should('be.visible');
    cy.contains('Total Orders').should('be.visible');
    cy.contains('Conversion Rate').should('be.visible');
  });

  it('renders revenue chart', () => {
    cy.contains('Revenue & Expenses', { timeout: 5000 }).should('be.visible');
  });

  it('renders top products table', () => {
    cy.contains('Top Products', { timeout: 5000 }).should('be.visible');
  });

  it('changes time range', () => {
    cy.contains('30D').click();
    cy.contains('30D').should('have.class', 'Mui-selected');
  });

  it('navigates to analytics page', () => {
    cy.contains('Analytics').click();
    cy.url().should('include', '/analytics');
    cy.contains('Analytics').should('be.visible');
  });

  it('toggles notification panel', () => {
    cy.get('[data-testid="notification-button"], button:has(svg[data-testid="NotificationsOutlinedIcon"])').first().click();
    cy.contains('Notifications').should('be.visible');
  });

  it('navigates to settings', () => {
    cy.contains('Settings').click();
    cy.url().should('include', '/settings');
  });
});
