Feature: Login and Logout
  Verify that users can log in and out correctly, and that invalid credentials are handled appropriately.

  Background:
    Given I am on the login page

  @positive
  Scenario: Login and Logout with valid credentials
    When I enter valid email
    #And I click the Next button
    And I enter valid password
    And I click on the submit button
    And I should be logged in and see the dashboard
    When I click on the logout button

  @negative
  Scenario Outline: Login with invalid credentials
    When I enter email "<email>"
    #And I click the Next button
    And I enter password "<password>"
    And I click on the submit button
    Then I should see an error message

    Examples:
      | email        | password     |
      | problem_user | wrongpass123 |
      | loganathan   | secret_sauce |
