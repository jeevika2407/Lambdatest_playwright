Feature: Login with valid and invalid credentials with logout

  Background:
    Given the user is on the homepage
    When the user clicks on My Account
    # And the user clicks on login

  @login_valid_input
  Scenario: User logs in with valid credentials
    And the user enters valid credentials
    And the user clicks on the Login button
    Then the user should see the My Account page


  @login_invalid_input
  Scenario Outline: User tries to login with invalid credentials
    And the user enters E-Mail "<email>"
    And the user enters Password "<password>"
    And the user clicks on the Login button
    Then the user should see the "<expectedResult>" 

    Examples:
      | email            | password | expectedResult                                                                                     | 
      | atgs2@gmail.com  | 12345    | Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.   | 
      | atk62@gmail.com  | 1234     | Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.   | 
      |                  | 12345    | Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.  | 
      |                  |          | Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.  | 

  # @logout
  Scenario: User logs in with valid credentials and logs out
    When the user enters valid credentials
    And the user clicks on the Login button
    Then the user logs out
    And the user should see the Account Logout page



